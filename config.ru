use Rack::Static,
  urls: [""],
  root: "public",
  index: "index.html"

run lambda { |_env|
  [200, { "content-type" => "text/html" }, [File.read("public/index.html")]]
}
