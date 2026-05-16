class CreateBugVotes < ActiveRecord::Migration[8.0]
  def change
    create_table :bug_votes do |t|
      t.integer :bug_report_id, null: false
      t.integer :player_id, null: false

      t.timestamps
    end

    add_index :bug_votes, [ :bug_report_id, :player_id ], unique: true
  end
end
