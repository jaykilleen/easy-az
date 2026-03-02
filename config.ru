require "json"
require "sqlite3"

DB_PATH ||= File.expand_path("data/leaderboard.sqlite3", __dir__)

FileUtils.mkdir_p(File.dirname(DB_PATH))

unless defined?(DB)
  DB = SQLite3::Database.new(DB_PATH)
  DB.results_as_hash = true
  DB.execute <<~SQL
    CREATE TABLE IF NOT EXISTS scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game TEXT NOT NULL,
      name TEXT NOT NULL,
      value INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  SQL
  DB.execute "CREATE INDEX IF NOT EXISTS idx_scores_game ON scores(game)"
  DB.execute <<~SQL
    CREATE TABLE IF NOT EXISTS counters (
      key TEXT PRIMARY KEY,
      value INTEGER NOT NULL DEFAULT 0
    )
  SQL
  DB.execute "INSERT OR IGNORE INTO counters (key, value) VALUES ('visitors', 0)"

  # Migrate from JSON file if it exists and SQLite counter is still 0
  counter_file = File.expand_path("data/counter.json", __dir__)
  if File.exist?(counter_file)
    current = DB.get_first_value("SELECT value FROM counters WHERE key = 'visitors'")
    if current == 0
      old_count = (JSON.parse(File.read(counter_file))["count"] rescue 0)
      DB.execute("UPDATE counters SET value = ? WHERE key = 'visitors'", [old_count]) if old_count > 0
    end
  end
end

GAME_SORT ||= { "space-dodge" => "DESC", "bloom" => "ASC", "cat-vs-mouse" => "DESC" }.freeze
DEFAULT_NAMES ||= { "space-dodge" => "C&C", "bloom" => "ANON", "cat-vs-mouse" => "ANON" }.freeze

def fetch_top_scores(game)
  direction = GAME_SORT[game]
  DB.execute("SELECT name, value FROM scores WHERE game = ? ORDER BY value #{direction} LIMIT 10", [game])
end

run lambda { |env|
  path = env["PATH_INFO"]

  # Visitor counter
  if path == "/counter" && env["REQUEST_METHOD"] == "GET"
    DB.execute("UPDATE counters SET value = value + 1 WHERE key = 'visitors'")
    count = DB.get_first_value("SELECT value FROM counters WHERE key = 'visitors'")
    next [200, { "content-type" => "application/json", "cache-control" => "no-store" }, [JSON.generate({ "count" => count })]]
  end

  # GET /api/scores?game=space-dodge
  if path == "/api/scores" && env["REQUEST_METHOD"] == "GET"
    params = Rack::Utils.parse_query(env["QUERY_STRING"])
    game = params["game"]

    unless GAME_SORT.key?(game)
      next [400, { "content-type" => "application/json" }, [JSON.generate({ "error" => "Unknown game" })]]
    end

    scores = fetch_top_scores(game)
    next [200, { "content-type" => "application/json", "cache-control" => "no-store" }, [JSON.generate({ "scores" => scores })]]
  end

  # POST /api/scores
  if path == "/api/scores" && env["REQUEST_METHOD"] == "POST"
    body = JSON.parse(env["rack.input"].read) rescue {}
    game = body["game"].to_s
    name = body["name"].to_s.strip
    value = body["value"].to_i

    unless GAME_SORT.key?(game)
      next [400, { "content-type" => "application/json" }, [JSON.generate({ "error" => "Unknown game" })]]
    end

    if value <= 0
      next [400, { "content-type" => "application/json" }, [JSON.generate({ "error" => "Value must be positive" })]]
    end

    name = DEFAULT_NAMES[game] if name.empty?
    name = name.upcase[0, 12]

    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", [game, name, value])
    scores = fetch_top_scores(game)
    next [201, { "content-type" => "application/json" }, [JSON.generate({ "scores" => scores })]]
  end

  # Static file serving
  file_path = File.join("public", path)
  if path == "/" || path == ""
    file_path = "public/index.html"
  end

  if File.exist?(file_path) && !File.directory?(file_path)
    ext = File.extname(file_path)
    content_type = case ext
      when ".html" then "text/html"
      when ".css"  then "text/css"
      when ".js"   then "application/javascript"
      when ".png"  then "image/png"
      when ".jpg", ".jpeg" then "image/jpeg"
      when ".gif"  then "image/gif"
      when ".svg"  then "image/svg+xml"
      when ".ico"  then "image/x-icon"
      when ".json" then "application/json"
      when ".webmanifest" then "application/manifest+json"
      else "application/octet-stream"
    end
    cache = ext == ".html" ? "no-cache" : "public, max-age=3600"
    [200, { "content-type" => content_type, "cache-control" => cache }, [File.read(file_path)]]
  else
    [404, { "content-type" => "text/html" }, ["<h1>404 - Game not found</h1><p><a href='/'>Back to EZ-AZ</a></p>"]]
  end
}
