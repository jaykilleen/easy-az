class CreateBugReports < ActiveRecord::Migration[8.0]
  def change
    create_table :bug_reports do |t|
      t.integer :player_id, null: false
      t.string  :game_slug
      t.text    :description, null: false
      t.string  :status, null: false, default: "pending"
      t.integer :votes_count, null: false, default: 0

      t.timestamps
    end

    add_index :bug_reports, :player_id
    add_index :bug_reports, :status
  end
end
