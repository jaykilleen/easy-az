require "minitest/autorun"
require "rack/test"
require "rack/builder"

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
    assert_equal "public, max-age=3600", last_response.headers["cache-control"]
  end

  def test_game_has_cache_header
    get "/games/space-dodge.html"
    assert_equal "public, max-age=3600", last_response.headers["cache-control"]
  end
end
