class AddAzNoteToBugReports < ActiveRecord::Migration[8.1]
  def change
    add_column :bug_reports, :az_note, :text
  end
end
