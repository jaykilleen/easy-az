class MarbleRunChannel < ApplicationCable::Channel
  MARBLE_COLORS = {
    "red"      => "#ff4757",
    "blue"     => "#3742fa",
    "orange"   => "#ff6b35",
    "green"    => "#2ed573",
    "purple"   => "#a855f7",
    "yellow"   => "#ffd700",
    "pink"     => "#ff6b9d",
    "cyan"     => "#00d2ff",
    "white"    => "#f0f0f0",
    "lime"     => "#b5ff4d",
    "coral"    => "#ff7f50",
    "teal"     => "#00b894",
    "magenta"  => "#ff00ff",
    "gold"     => "#ffc200",
    "rose"     => "#ff0055",
    "sky"      => "#87ceeb",
    "mint"     => "#98ffda",
    "amber"    => "#ffbf00",
    "lavender" => "#b57bee",
    "silver"   => "#c0c0c0"
  }.freeze

  SESSIONS    = {}
  SESSIONS_MU = Mutex.new

  def subscribed
    code = params[:code].to_s.upcase.gsub(/[^A-Z0-9]/, "")
    return reject if code.blank? || code.length < 4 || code.length > 6

    @code = code
    @role = params[:role].to_s

    stream_from "marble_run:#{@code}"

    SESSIONS_MU.synchronize do
      if @role == "tv"
        SESSIONS[@code] ||= new_session
      end
    end

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    transmit({ type: "state", phase: s ? s[:phase] : "waiting", players: player_list(s), code: @code }) if s
  end

  def unsubscribed
    return unless @role == "phone" && @code

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s && s[:phase] == "lobby"

    SESSIONS_MU.synchronize do
      if s[:color_key]
        s[:players].delete(s[:color_key])
      end
    end

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:    "lobby_update",
      players: player_list(s)
    })
  end

  # Phone: join the game
  # data: { name: String, color: String }
  def join(data)
    return if @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return transmit({ type: "join_error", message: "Game not found" }) unless s
    return transmit({ type: "join_error", message: "Game already started" }) unless s[:phase] == "lobby"

    color_key = data["color"].to_s.downcase
    return transmit({ type: "join_error", message: "Invalid colour" }) unless MARBLE_COLORS.key?(color_key)

    name = data["name"].to_s.strip.upcase[0, 12]
    return transmit({ type: "join_error", message: "Enter a name" }) if name.blank?

    SESSIONS_MU.synchronize do
      return transmit({ type: "join_error", message: "That colour is taken" }) if s[:players].key?(color_key)
      return transmit({ type: "join_error", message: "Game is full (max 10)" }) if s[:players].size >= 10

      s[:players][color_key] = { name: name, color: MARBLE_COLORS[color_key] }
      @color_key = color_key
    end

    transmit({ type: "joined", color: color_key, color_hex: MARBLE_COLORS[color_key], name: name })

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:    "lobby_update",
      players: player_list(s)
    })
  end

  # TV: start the series
  # data: { race_count: Integer, bot_count: Integer }
  def start_series(data)
    return unless @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s

    race_count = data["race_count"].to_i.clamp(1, 20)
    bot_count  = data["bot_count"].to_i.clamp(0, 10)

    SESSIONS_MU.synchronize do
      add_bots(s, bot_count)
      total = s[:players].size
      return transmit({ type: "error", message: "Need 2+ racers" }) if total < 2

      s[:phase]         = "countdown"
      s[:race_count]    = race_count
      s[:series_points] = s[:players].keys.to_h { |k| [k, 0] }
    end

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:       "series_starting",
      race_count: race_count,
      players:    player_list(s)
    })
  end

  # TV: race has started (after countdown)
  def race_started(_data)
    return unless @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s

    SESSIONS_MU.synchronize do
      s[:phase]        = "racing"
      s[:current_race] = s[:current_race].to_i + 1
      s[:race_results] = []
      s[:gem_winners]  = []   # one slot per gem; one gem per player
    end

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:         "race_started",
      current_race: s[:current_race]
    })
  end

  # TV: a marble crossed the finish
  # data: { color: String }
  def marble_finished(data)
    return unless @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s && s[:phase] == "racing"

    color = data["color"].to_s.downcase
    return unless MARBLE_COLORS.key?(color) && s[:players].key?(color)

    finish_pos = nil
    SESSIONS_MU.synchronize do
      unless s[:race_results].any? { |r| r[:color] == color }
        s[:race_results] << { color: color, position: s[:race_results].size + 1 }
        finish_pos = s[:race_results].size
      end
    end

    if finish_pos
      ActionCable.server.broadcast("marble_run:#{@code}", {
        type:     "marble_finished",
        color:    color,
        position: finish_pos
      })

      if s[:race_results].size >= s[:players].size
        end_race(s)
      end
    end
  end

  # TV: gem collected
  # data: { color: String, gem_index: Integer }
  def gem_collected(data)
    return unless @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s && s[:phase] == "racing"

    color     = data["color"].to_s.downcase
    gem_index = data["gem_index"].to_i
    return unless MARBLE_COLORS.key?(color) && s[:players].key?(color)

    gem_count = s[:players].size
    return if gem_index < 0 || gem_index >= gem_count

    recorded = false
    SESSIONS_MU.synchronize do
      already_has_gem = s[:gem_winners].any? { |g| g[:color] == color }
      slot_taken      = s[:gem_winners].any? { |g| g[:index] == gem_index }
      if !already_has_gem && !slot_taken
        s[:gem_winners] << { color: color, index: gem_index }
        recorded = true
      end
    end

    if recorded
      ActionCable.server.broadcast("marble_run:#{@code}", {
        type:      "gem_collected",
        color:     color,
        gem_index: gem_index
      })
    end
  end

  # Phone: nudge own marble (8s cooldown)
  def nudge(_data)
    return unless @role == "phone" && @color_key

    s = get_session
    return unless s && s[:phase] == "racing"
    return unless s[:players].key?(@color_key)

    now = Time.now.to_f
    SESSIONS_MU.synchronize do
      s[:nudge_times] ||= {}
      return if now - s[:nudge_times].fetch(@color_key, 0) < 8.0
      s[:nudge_times][@color_key] = now
    end

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:  "nudge",
      color: @color_key
    })
  end

  # TV: advance to next race or end the series
  def next_race(_data)
    return unless @role == "tv"

    s = SESSIONS_MU.synchronize { SESSIONS[@code] }
    return unless s

    if s[:current_race].to_i >= s[:race_count].to_i
      SESSIONS_MU.synchronize { s[:phase] = "game_over" }
      winner = s[:series_points].max_by { |_, pts| pts }
      ActionCable.server.broadcast("marble_run:#{@code}", {
        type:    "game_over",
        winner:  winner ? { color: winner[0], color_hex: MARBLE_COLORS[winner[0]], name: s[:players].dig(winner[0], :name), points: winner[1] } : nil,
        scores:  series_scores(s)
      })
    else
      SESSIONS_MU.synchronize { s[:phase] = "countdown" }
      ActionCable.server.broadcast("marble_run:#{@code}", {
        type:   "next_countdown",
        scores: series_scores(s)
      })
    end
  end

  BOT_NAMES = %w[RUSTY ZIPPY BOLT ZOOM DASH SPIKE TURBO FLASH COMET BLAZE
                 STORM SWIFT ARROW SONIC VIPER TITAN NOVA ECHO PIXEL FIZZ].freeze

  private

  def add_bots(s, count)
    return if count <= 0
    available_colors = MARBLE_COLORS.keys - s[:players].keys
    available_names  = BOT_NAMES - s[:players].values.map { |p| p[:name] }
    count.times do
      break if available_colors.empty? || available_names.empty?
      color = available_colors.shift
      name  = available_names.shift
      s[:players][color] = { name: name, color: MARBLE_COLORS[color], bot: true }
    end
  end

  def new_session
    {
      phase:         "lobby",
      players:       {},
      series_points: {},
      race_count:    5,
      current_race:  0,
      race_results:  [],
      gem_winners:   [],
      nudge_times:   {}
    }
  end

  def player_list(s)
    return [] unless s
    s[:players].map do |key, p|
      { color: key, color_hex: p[:color], name: p[:name], bot: p[:bot] == true }
    end
  end

  def series_scores(s)
    s[:series_points].map do |key, pts|
      { color: key, color_hex: MARBLE_COLORS[key], name: s[:players].dig(key, :name), points: pts }
    end.sort_by { |e| -e[:points] }
  end

  def end_race(s)
    n = s[:players].size
    results = []

    SESSIONS_MU.synchronize do
      s[:race_results].each do |r|
        pts = n - r[:position] + 1
        pts += 3 if s[:gem_winners].any? { |g| g[:color] == r[:color] }  # star bonus
        s[:series_points][r[:color]] = s[:series_points].fetch(r[:color], 0) + pts
        results << {
          color:         r[:color],
          color_hex:     MARBLE_COLORS[r[:color]],
          name:          s[:players].dig(r[:color], :name),
          position:      r[:position],
          points_earned: pts
        }
      end
      s[:phase] = "results"
    end

    is_final = s[:current_race].to_i >= s[:race_count].to_i

    ActionCable.server.broadcast("marble_run:#{@code}", {
      type:       "race_over",
      race:       s[:current_race],
      race_count: s[:race_count],
      results:    results,
      gem_winners: s[:gem_winners].map { |g| g[:color] },
      scores:     series_scores(s),
      is_final:   is_final
    })
  end
end
