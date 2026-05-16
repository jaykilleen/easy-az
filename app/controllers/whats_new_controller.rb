class WhatsNewController < ApplicationController
  layout false

  def index
    @announcements = Announcement.recent
  end
end
