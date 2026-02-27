require "rake/testtask"

Rake::TestTask.new(:test) do |t|
  t.test_files = FileList["test/**/*_test.rb"]
end

desc "Run Playwright end-to-end tests"
task :e2e do
  sh "npx playwright test"
end

task default: :test
