require "minitest/autorun"
require "rack/test"
require "rack/builder"
require "json"

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Rack::Builder.parse_file(File.expand_path("../../config.ru", __FILE__))
  end

  # Root path

  def test_root_returns_200
    get "/"
    assert_equal 200, last_response.status
  end

  def test_root_serves_index_html
    get "/"
    assert_equal "text/html", last_response.content_type
    assert_includes last_response.body, "EZ-AZ"
  end

  def test_root_contains_store_content
    get "/"
    assert_includes last_response.body, "The Family Video Game Store"
    assert_includes last_response.body, "space-dodge.html"
  end

  # Game pages

  def test_space_dodge_returns_200
    get "/games/space-dodge.html"
    assert_equal 200, last_response.status
  end

  def test_space_dodge_serves_html
    get "/games/space-dodge.html"
    assert_equal "text/html", last_response.content_type
    assert_includes last_response.body, "Space Dodge"
  end

  # Help page

  def test_help_returns_200
    get "/help.html"
    assert_equal 200, last_response.status
  end

  def test_help_serves_html
    get "/help.html"
    assert_equal "text/html", last_response.content_type
    assert_includes last_response.body, "Submit your game"
  end

  def test_help_contains_github_link
    get "/help.html"
    assert_includes last_response.body, "github.com/jaykilleen/easy-az"
  end

  def test_help_contains_back_link
    get "/help.html"
    assert_includes last_response.body, 'href="/"'
  end

  # Navigation links on index

  def test_index_has_game_link
    get "/"
    assert_includes last_response.body, 'href="/games/space-dodge.html"'
  end

  def test_index_has_help_link
    get "/"
    assert_includes last_response.body, 'href="/help.html"'
  end

  # Coming soon placeholders

  def test_index_has_coming_soon_boxes
    get "/"
    assert_includes last_response.body, "coming-soon"
    assert_includes last_response.body, "Coming"
  end

  # 404 handling

  def test_missing_page_returns_404
    get "/nope"
    assert_equal 404, last_response.status
  end

  def test_404_contains_back_link
    get "/nope"
    assert_includes last_response.body, "Back to EZ-AZ"
  end

  # Cache headers

  def test_root_has_cache_header
    get "/"
    assert_equal "no-cache", last_response.headers["cache-control"]
  end

  def test_game_has_cache_header
    get "/games/space-dodge.html"
    assert_equal "no-cache", last_response.headers["cache-control"]
  end
end

class LeaderboardApiTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Rack::Builder.parse_file(File.expand_path("../../config.ru", __FILE__))
  end

  def setup
    app # ensure config.ru is loaded and DB is initialised
    DB.execute("DELETE FROM scores")
  end

  # GET /api/scores

  def test_get_scores_requires_game_param
    get "/api/scores"
    assert_equal 400, last_response.status
    data = JSON.parse(last_response.body)
    assert_equal "Unknown game", data["error"]
  end

  def test_get_scores_rejects_unknown_game
    get "/api/scores", game: "pong"
    assert_equal 400, last_response.status
  end

  def test_get_scores_returns_empty_array
    get "/api/scores", game: "space-dodge"
    assert_equal 200, last_response.status
    data = JSON.parse(last_response.body)
    assert_equal [], data["scores"]
  end

  def test_get_scores_space_dodge_sorted_desc
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "AAA", 100])
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "BBB", 500])
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "CCC", 300])

    get "/api/scores", game: "space-dodge"
    data = JSON.parse(last_response.body)
    values = data["scores"].map { |s| s["value"] }
    assert_equal [500, 300, 100], values
  end

  def test_get_scores_bloom_sorted_asc
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["bloom", "AAA", 5000])
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["bloom", "BBB", 2000])
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["bloom", "CCC", 8000])

    get "/api/scores", game: "bloom"
    data = JSON.parse(last_response.body)
    values = data["scores"].map { |s| s["value"] }
    assert_equal [2000, 5000, 8000], values
  end

  def test_get_scores_limited_to_10
    12.times do |i|
      DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "P#{i}", (i + 1) * 100])
    end

    get "/api/scores", game: "space-dodge"
    data = JSON.parse(last_response.body)
    assert_equal 10, data["scores"].length
  end

  def test_get_scores_filters_by_game
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "AAA", 100])
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["bloom", "BBB", 5000])

    get "/api/scores", game: "space-dodge"
    data = JSON.parse(last_response.body)
    assert_equal 1, data["scores"].length
    assert_equal "AAA", data["scores"][0]["name"]
  end

  # POST /api/scores

  def test_post_creates_score
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "AZ", value: 1337 }), { "CONTENT_TYPE" => "application/json" }
    assert_equal 201, last_response.status
    data = JSON.parse(last_response.body)
    assert_equal 1, data["scores"].length
    assert_equal "AZ", data["scores"][0]["name"]
    assert_equal 1337, data["scores"][0]["value"]
  end

  def test_post_returns_updated_leaderboard
    DB.execute("INSERT INTO scores (game, name, value) VALUES (?, ?, ?)", ["space-dodge", "AAA", 500])

    post "/api/scores", JSON.generate({ game: "space-dodge", name: "BBB", value: 1000 }), { "CONTENT_TYPE" => "application/json" }
    data = JSON.parse(last_response.body)
    assert_equal 2, data["scores"].length
    assert_equal "BBB", data["scores"][0]["name"]
  end

  def test_post_rejects_unknown_game
    post "/api/scores", JSON.generate({ game: "pong", name: "AZ", value: 100 }), { "CONTENT_TYPE" => "application/json" }
    assert_equal 400, last_response.status
  end

  def test_post_rejects_zero_value
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "AZ", value: 0 }), { "CONTENT_TYPE" => "application/json" }
    assert_equal 400, last_response.status
    data = JSON.parse(last_response.body)
    assert_equal "Value must be positive", data["error"]
  end

  def test_post_rejects_negative_value
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "AZ", value: -5 }), { "CONTENT_TYPE" => "application/json" }
    assert_equal 400, last_response.status
  end

  def test_post_uppercases_name
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "charlie", value: 100 }), { "CONTENT_TYPE" => "application/json" }
    data = JSON.parse(last_response.body)
    assert_equal "CHARLIE", data["scores"][0]["name"]
  end

  def test_post_truncates_name_to_12_chars
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "ABCDEFGHIJKLMNOP", value: 100 }), { "CONTENT_TYPE" => "application/json" }
    data = JSON.parse(last_response.body)
    assert_equal 12, data["scores"][0]["name"].length
    assert_equal "ABCDEFGHIJKL", data["scores"][0]["name"]
  end

  def test_post_defaults_name_space_dodge
    post "/api/scores", JSON.generate({ game: "space-dodge", name: "", value: 100 }), { "CONTENT_TYPE" => "application/json" }
    data = JSON.parse(last_response.body)
    assert_equal "C&C", data["scores"][0]["name"]
  end

  def test_post_defaults_name_bloom
    post "/api/scores", JSON.generate({ game: "bloom", name: "  ", value: 5000 }), { "CONTENT_TYPE" => "application/json" }
    data = JSON.parse(last_response.body)
    assert_equal "ANON", data["scores"][0]["name"]
  end

  def test_get_scores_has_no_cache_header
    get "/api/scores", game: "space-dodge"
    assert_equal "no-store", last_response.headers["cache-control"]
  end
end
