module Api
  class ScoresController < BaseController
    def index
      game = params[:game]

      unless Score::GAME_SORT.key?(game)
        return render json: { error: "Unknown game" }, status: :bad_request
      end

      top      = Score.top_10(game).map { |s| { "name" => s.name, "value" => s.value } }
      my_best  = my_best_score(game)
      my_scores = my_personal_scores(game)

      response.headers["Cache-Control"] = "no-store"
      render json: { scores: top, my_best: my_best, my_scores: my_scores, player: current_player&.username }
    end

    def create
      body  = JSON.parse(request.body.read) rescue {}
      game  = body["game"].to_s
      name  = body["name"].to_s
      value = body["value"].to_i

      unless Score::GAME_SORT.key?(game)
        return render json: { error: "Unknown game" }, status: :bad_request
      end

      if value <= 0
        return render json: { error: "Value must be positive" }, status: :bad_request
      end

      name = current_player.username if current_player
      score_attrs = { game: game, name: name, value: value }
      score_attrs[:player_id] = current_player.id if current_player

      Score.create!(score_attrs)

      top      = Score.top_10(game).map { |s| { "name" => s.name, "value" => s.value } }
      my_best  = my_best_score(game)
      my_scores = my_personal_scores(game)

      render json: { scores: top, my_best: my_best, my_scores: my_scores, player: current_player&.username }, status: :created
    end

    private

    def my_best_score(game)
      return nil unless current_player
      direction = Score::GAME_SORT.fetch(game, :desc)
      score = Score.where(game: game, player: current_player).order(value: direction).first
      score ? { "name" => score.name, "value" => score.value } : nil
    end

    def my_personal_scores(game)
      return [] unless current_player
      direction = Score::GAME_SORT.fetch(game, :desc)
      Score.where(game: game, player: current_player).order(value: direction).limit(5)
           .map { |s| { "name" => s.name, "value" => s.value } }
    end
  end
end
