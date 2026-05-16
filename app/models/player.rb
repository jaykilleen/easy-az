class Player < ApplicationRecord
  has_secure_password :pin, validations: false

  MAX_ATTEMPTS    = 5
  LOCKOUT_MINUTES = 15

  has_many :scores
  has_many :memberships, class_name: "RoomMembership"
  has_many :bug_reports
  has_many :bug_votes

  normalizes :username, with: ->(v) { v.strip.upcase.gsub(/[^A-Z0-9_]/, "").first(16) }

  validates :username,
    presence: true,
    uniqueness: true,
    length: { maximum: 16 },
    format: { with: /\A[A-Z0-9_]+\z/, message: "letters, numbers and underscores only" }

  validates :pin,
    format: { with: /\A\d{4}\z/, message: "must be exactly 4 digits" },
    allow_nil: true

  before_create :generate_device_token

  # Claim a username from a new device. Returns the player on success,
  # or raises ActiveRecord::RecordInvalid on validation failure.
  def self.claim!(username)
    create!(username: username)
  end

  def locked?
    locked_until.present? && locked_until > Time.current
  end

  def lockout_remaining_seconds
    return 0 unless locked?
    (locked_until - Time.current).ceil
  end

  def record_failed_attempt!
    new_count = failed_attempts + 1
    attrs = { failed_attempts: new_count }
    attrs[:locked_until] = LOCKOUT_MINUTES.minutes.from_now if new_count >= MAX_ATTEMPTS
    update_columns(attrs)
  end

  def reset_failed_attempts!
    update_columns(failed_attempts: 0, locked_until: nil)
  end

  private

  def generate_device_token
    self.device_token ||= SecureRandom.hex(16)
  end
end
