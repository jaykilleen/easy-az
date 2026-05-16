class Score < ApplicationRecord
  belongs_to :player, optional: true
  GAME_SORT = {
    "space-dodge" => :desc,
    "bloom" => :asc,
    "cat-vs-mouse" => :desc,
    "dodgeball" => :desc,
    "descent" => :asc,
    "corrupted" => :desc,
    "az-cipher" => :desc,
    "trivia" => :desc,
    "spotlight" => :desc,
    "treasure-hunt" => :desc,
    "hacker-pro" => :asc,
    "boomerang-brawl" => :desc,
    "letterbox" => :desc,
    "magnet-lab" => :desc,
    "marble-run" => :asc,
    "dino-jump"  => :desc
  }.freeze

  DEFAULT_NAMES = {
    "space-dodge" => "C&C",
    "bloom" => "ANON",
    "cat-vs-mouse" => "ANON",
    "dodgeball" => "LACHIE",
    "descent" => "ANON",
    "corrupted" => "COOPER",
    "az-cipher" => "JAYKILL",
    "letterbox" => "JAYKILL",
    "magnet-lab" => "JAYKILL"
  }.freeze

  validates :game, presence: true, inclusion: { in: GAME_SORT.keys }
  validates :value, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :name, presence: true

  before_validation :normalize_name

  scope :top_10, ->(game) {
    where(game: game).order(value: GAME_SORT.fetch(game, :desc)).limit(10)
  }

  private

  def normalize_name
    self.name = name.to_s.strip
    self.name = DEFAULT_NAMES[game] if name.blank? && game.present?
    self.name = name.to_s.upcase[0, 12]
  end
end
