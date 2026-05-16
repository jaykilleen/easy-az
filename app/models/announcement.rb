# Post a new announcement from the console:
#   Announcement.create!(emoji: '📺', title: 'TV Guide', body: 'Browse the full weekly schedule...')
#   Announcement.create!(emoji: '🐛', title: 'Squash a Bug', body: 'Report bugs and earn points.')
#
# The published_at field defaults to now. Backdate with:
#   Announcement.create!(emoji: '🎮', title: 'Magnet Lab', body: '...', published_at: 2.weeks.ago)
class Announcement < ApplicationRecord
  validates :title, :body, presence: true

  before_create { self.published_at ||= Time.current }

  scope :recent, -> { order(published_at: :desc) }
end
