class MarbleRunController < ApplicationController
  def tv
    send_file Rails.root.join('public', 'games', 'marble-run.html'),
              type: 'text/html', disposition: 'inline'
  end

  def join
    render layout: false
  end
end
