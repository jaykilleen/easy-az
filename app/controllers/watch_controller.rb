require "rqrcode"

class WatchController < ApplicationController
  include RespectsStoreHours
  layout false

  def show
    @tracks         = LearningTrack.all
    @version        = EzAz::Version::STRING
    @holiday_ranges = StoreHours::HOLIDAYS

    token  = params[:t].to_s.upcase.gsub(/[^A-Z0-9]/, "")[0, 8]
    @room  = Room.active.find_by(tv_token: token) if token.present?
    @room ||= Room.create_tv_session!

    remote_url = tv_remote_url(token: @room.tv_token, code: @room.code, v: @version)
    svg = RQRCode::QRCode.new(remote_url).as_svg(
      color: "00ffc8",
      shape_rendering: "crispEdges",
      module_size: 6,
      standalone: true,
      use_path: true
    )
    svg = svg.sub(/<\?xml[^?]*\?>/, "")
             .sub(/width="(\d+)" height="(\d+)"/, 'width="100%" height="100%" viewBox="0 0 \1 \2"')
    @qr_code_svg = svg.html_safe
  end
end
