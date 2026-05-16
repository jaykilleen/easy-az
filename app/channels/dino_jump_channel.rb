class DinoJumpChannel < ApplicationCable::Channel
  SESSIONS    = {}
  SESSIONS_MU = Mutex.new

  def subscribed
    code = params[:code].to_s.upcase.gsub(/[^A-Z0-9]/, "")
    return reject if code.blank? || code.length < 4

    @code = code
    @role = params[:role].to_s
    stream_from "dino_jump:#{@code}"

    SESSIONS_MU.synchronize { SESSIONS[@code] ||= new_session } if @role == "tv"

    s = get_session
    transmit({ type: "state", phase: s&.dig(:phase) || "lobby", players: player_list(s) }) if s
  end

  def unsubscribed
    return unless @role == "phone" && !@char_slot.nil?

    # Always reset input so character stops moving
    ActionCable.server.broadcast("dino_jump:#{@code}", {
      type: "input", slot: @char_slot, dir: "none"
    })

    s = get_session
    return unless s && s[:phase] == "lobby"

    SESSIONS_MU.synchronize { s[:players].delete(@char_slot) }
    ActionCable.server.broadcast("dino_jump:#{@code}", {
      type: "lobby_update", players: player_list(s)
    })
  end

  # Phone: enter name, get assigned a character slot (0-3)
  def join(data)
    return if @role == "tv"

    s = get_session
    return transmit({ type: "join_error", message: "Game not found" }) unless s
    return transmit({ type: "join_error", message: "Game already started" }) unless s[:phase] == "lobby"

    name = data["name"].to_s.strip.upcase[0, 12]
    return transmit({ type: "join_error", message: "Enter a name" }) if name.blank?

    slot = nil
    SESSIONS_MU.synchronize do
      (0..3).each do |i|
        next if s[:players].key?(i)
        s[:players][i] = { name: name }
        @char_slot = i
        slot = i
        break
      end
    end

    return transmit({ type: "join_error", message: "Game is full (4 players)" }) if slot.nil?

    transmit({ type: "joined", slot: slot, name: name })
    ActionCable.server.broadcast("dino_jump:#{@code}", {
      type: "lobby_update", players: player_list(s)
    })
  end

  # Phone: send movement direction
  # data: { dir: 'left' | 'right' | 'none' }
  def input(data)
    return unless @role == "phone" && !@char_slot.nil?

    s = get_session
    return unless s && s[:phase] == "playing"

    dir = data["dir"].to_s
    return unless %w[left right none].include?(dir)

    ActionCable.server.broadcast("dino_jump:#{@code}", {
      type: "input", slot: @char_slot, dir: dir
    })
  end

  # TV: start the game
  def start_game(_data)
    return unless @role == "tv"

    s = get_session
    return unless s && s[:phase] == "lobby"

    SESSIONS_MU.synchronize { s[:phase] = "playing" }
    ActionCable.server.broadcast("dino_jump:#{@code}", { type: "game_started" })
  end

  # TV: report final results (resets session to lobby for rematch)
  def game_ended(data)
    return unless @role == "tv"

    s = get_session
    return unless s

    SESSIONS_MU.synchronize { s[:phase] = "lobby" }
    ActionCable.server.broadcast("dino_jump:#{@code}", {
      type: "game_over", results: data["results"] || []
    })
  end

  private

  def get_session
    SESSIONS_MU.synchronize { SESSIONS[@code] }
  end

  def new_session
    { phase: "lobby", players: {} }
  end

  def player_list(s)
    return [] unless s
    s[:players].map { |slot, p| { slot: slot, name: p[:name] } }
  end
end
