# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_05_16_052618) do
  create_table "bug_reports", force: :cascade do |t|
    t.text "az_note"
    t.datetime "created_at", null: false
    t.text "description", null: false
    t.string "game_slug"
    t.integer "player_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "updated_at", null: false
    t.integer "votes_count", default: 0, null: false
    t.index ["player_id"], name: "index_bug_reports_on_player_id"
    t.index ["status"], name: "index_bug_reports_on_status"
  end

  create_table "bug_votes", force: :cascade do |t|
    t.integer "bug_report_id", null: false
    t.datetime "created_at", null: false
    t.integer "player_id", null: false
    t.datetime "updated_at", null: false
    t.index ["bug_report_id", "player_id"], name: "index_bug_votes_on_bug_report_id_and_player_id", unique: true
  end

  create_table "counters", force: :cascade do |t|
    t.string "key", null: false
    t.integer "value", default: 0, null: false
    t.index ["key"], name: "index_counters_on_key", unique: true
  end

  create_table "error_reports", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "fingerprint", null: false
    t.datetime "first_seen_at", null: false
    t.string "game"
    t.datetime "last_seen_at", null: false
    t.string "message", limit: 500, null: false
    t.integer "occurrences", default: 1, null: false
    t.text "stack"
    t.datetime "updated_at", null: false
    t.string "url", limit: 500
    t.string "user_agent", limit: 500
    t.index ["fingerprint"], name: "index_error_reports_on_fingerprint", unique: true
    t.index ["game"], name: "index_error_reports_on_game"
    t.index ["last_seen_at"], name: "index_error_reports_on_last_seen_at"
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "device_token"
    t.integer "failed_attempts", default: 0, null: false
    t.datetime "locked_until"
    t.string "pin_digest"
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "watch_track_slug"
    t.integer "watch_video_index", default: 0, null: false
    t.index ["device_token"], name: "index_players_on_device_token", unique: true, where: "device_token IS NOT NULL"
    t.index ["username"], name: "index_players_on_username", unique: true
  end

  create_table "room_memberships", force: :cascade do |t|
    t.boolean "connected", default: true, null: false
    t.datetime "created_at", null: false
    t.string "device_token"
    t.string "name", limit: 12, null: false
    t.integer "player_id"
    t.integer "role", default: 1, null: false
    t.integer "room_id", null: false
    t.string "session_id"
    t.integer "slot", null: false
    t.datetime "updated_at", null: false
    t.index ["device_token"], name: "index_room_memberships_on_device_token"
    t.index ["player_id"], name: "index_room_memberships_on_player_id"
    t.index ["room_id", "session_id"], name: "index_room_memberships_on_room_id_and_session_id", unique: true, where: "session_id IS NOT NULL"
    t.index ["room_id", "slot"], name: "index_room_memberships_on_room_id_and_slot", unique: true
    t.index ["room_id"], name: "index_room_memberships_on_room_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.string "code", null: false
    t.datetime "created_at", null: false
    t.datetime "expires_at", null: false
    t.string "game_slug"
    t.integer "state", default: 0, null: false
    t.string "tv_token"
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_rooms_on_code", unique: true
    t.index ["expires_at"], name: "index_rooms_on_expires_at"
    t.index ["tv_token"], name: "index_rooms_on_tv_token", unique: true, where: "tv_token IS NOT NULL"
  end

  create_table "scores", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "game", null: false
    t.string "name", null: false
    t.integer "player_id"
    t.datetime "updated_at", null: false
    t.integer "value", null: false
    t.index ["game"], name: "index_scores_on_game"
    t.index ["player_id"], name: "index_scores_on_player_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.string "contact_email", null: false
    t.datetime "created_at", null: false
    t.string "creators", null: false
    t.text "game_html", null: false
    t.boolean "is_chill", default: false, null: false
    t.text "notes"
    t.datetime "reviewed_at"
    t.text "reviewer_notes"
    t.string "score_direction", default: "desc", null: false
    t.string "slug", null: false
    t.string "status", default: "pending", null: false
    t.string "submitter_ip"
    t.string "tagline", null: false
    t.string "title", null: false
    t.datetime "updated_at", null: false
    t.index ["created_at"], name: "index_submissions_on_created_at"
    t.index ["slug"], name: "index_submissions_on_slug"
    t.index ["status"], name: "index_submissions_on_status"
  end

  add_foreign_key "room_memberships", "players"
  add_foreign_key "room_memberships", "rooms"
  add_foreign_key "scores", "players"
end
