class CreateAnnouncements < ActiveRecord::Migration[8.1]
  def change
    create_table :announcements do |t|
      t.string :emoji
      t.string :title
      t.text :body
      t.datetime :published_at

      t.timestamps
    end
  end
end
