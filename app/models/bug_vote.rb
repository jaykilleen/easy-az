class BugVote < ApplicationRecord
  belongs_to :bug_report, counter_cache: true
  belongs_to :player

  validates :bug_report_id, uniqueness: { scope: :player_id }
end
