port ENV.fetch("PORT", 5003)
environment ENV.fetch("RAILS_ENV") { ENV.fetch("RACK_ENV", "production") }
pidfile ENV.fetch("PIDFILE", "tmp/pids/server.pid")
