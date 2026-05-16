class BugsController < ApplicationController
  layout false

  def index
    @player      = current_player
    @games       = Game.all
    @bugs        = BugReport.where(status: %w[approved squashed]).by_votes
    @my_pending  = @player ? @player.bug_reports.where(status: %w[pending dismissed]).order(created_at: :desc) : []
    @leaderboard = BugReport.where(status: %w[approved squashed])
                             .joins(:player)
                             .group("players.id", "players.username")
                             .select("players.id, players.username, COUNT(*) AS total, SUM(CASE WHEN bug_reports.status = 'squashed' THEN 2 ELSE 1 END) AS points")
                             .order("points DESC, total DESC")
                             .limit(10)
    @flash  = flash
  end

  def create
    unless current_player
      redirect_to bugs_path, alert: "You need a gamer tag to report bugs — play a game first."
      return
    end

    bug = current_player.bug_reports.build(
      game_slug:   params[:game_slug].presence,
      description: params[:description].to_s.strip
    )

    if bug.save
      redirect_to bugs_path, notice: "Bug reported! Az will investigate."
    else
      redirect_to bugs_path, alert: bug.errors.full_messages.first || "Could not submit bug."
    end
  end

  def update
    bug = current_player&.bug_reports&.find_by(id: params[:id], status: "pending")
    unless bug
      redirect_to bugs_path, alert: "Can't edit that bug."
      return
    end
    bug.update!(
      game_slug:   params[:game_slug].presence,
      description: params[:description].to_s.strip
    )
    redirect_to bugs_path, notice: "Bug updated."
  end

  def destroy
    bug = current_player&.bug_reports&.find_by(id: params[:id], status: "pending")
    unless bug
      redirect_to bugs_path, alert: "Can't delete that bug."
      return
    end
    bug.destroy!
    redirect_to bugs_path, notice: "Bug removed."
  end

  def vote
    unless current_player
      render json: { error: "Login required" }, status: :unauthorized
      return
    end

    bug  = BugReport.find(params[:id])
    vote = bug.bug_votes.find_by(player: current_player)

    if vote
      vote.destroy
    else
      bug.bug_votes.create!(player: current_player)
    end

    bug.reload
    respond_to do |format|
      format.json { render json: { votes: bug.votes_count } }
      format.html { redirect_to bugs_path }
    end
  end
end
