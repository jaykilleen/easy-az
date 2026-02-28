require "json"

COUNTER_FILE ||= File.expand_path("data/counter.json", __dir__)

run lambda { |env|
  path = env["PATH_INFO"]

  if path == "/counter" && env["REQUEST_METHOD"] == "GET"
    count = 0
    File.open(COUNTER_FILE, File::RDWR | File::CREAT) do |f|
      f.flock(File::LOCK_EX)
      data = f.read
      count = (JSON.parse(data)["count"] rescue 0) + 1
      f.rewind
      f.write(JSON.generate({ "count" => count }))
      f.truncate(f.pos)
    end
    next [200, { "content-type" => "application/json", "cache-control" => "no-store" }, [JSON.generate({ "count" => count })]]
  end

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
    [200, { "content-type" => content_type, "cache-control" => "public, max-age=3600" }, [File.read(file_path)]]
  else
    [404, { "content-type" => "text/html" }, ["<h1>404 - Game not found</h1><p><a href='/'>Back to EZ-AZ</a></p>"]]
  end
}
