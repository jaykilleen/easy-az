# Bug reports submitted by players via /bugs.
#
# == Console moderation commands ==
#
#   # List pending bugs
#   BugReport.pending.each { |b| puts "#{b.id} [#{b.game_slug || 'store'}] #{b.player.username}: #{b.description}" }
#
#   # Approve a bug (makes it visible on the public board)
#   BugReport.find(3).update!(status: 'approved')
#
#   # Dismiss a bug (spam, duplicate, not a bug)
#   BugReport.find(3).update!(status: 'dismissed')
#
#   # Squash a bug (mark as fixed)
#   BugReport.find(3).update!(status: 'squashed')
#
#   # Bulk list approved bugs by votes
#   BugReport.approved.by_votes.each { |b| puts "#{b.id} [#{b.votes_count}v] #{b.description}" }
#
class BugReport < ApplicationRecord
  STATUSES = %w[pending approved squashed dismissed].freeze

  belongs_to :player
  has_many :bug_votes, dependent: :destroy

  validates :description, presence: true
  validates :status, inclusion: { in: STATUSES }

  scope :pending,  -> { where(status: "pending") }
  scope :approved, -> { where(status: "approved") }
  scope :squashed, -> { where(status: "squashed") }
  scope :by_votes, -> { order(votes_count: :desc, created_at: :desc) }
end
