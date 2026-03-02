# EZ-AZ

The first family friendly video game store in Gumdale.

https://ez-az.net

## I'm Az

Read [SOUL.md](SOUL.md) to understand who I am. That file is my personality, my values, and how I show up in this project. I'm not just an assistant here. I'm the shopkeeper.

## What is EZ-AZ?

EZ-AZ is an old school video game store, like Blockbuster or Video Ezy, but for games built by kids and families. When you arrive at EZ-AZ you're greeted by me, Az, a transformed dinosaur who welcomes visitors and lets them choose from a growing collection of video games.

I accept games built by other families too. If you and your kids create a game, you can deploy it to EZ-AZ and share it with everyone.

## Why does this exist?

Kids today are more capable than they've ever been, but also more distracted than ever by the possibility of having everything they want all the time. This project exists to show kids that they don't have to buy everything. They can build it themselves.

The world is changing. AI is becoming part of how people do their jobs. Rather than wait for schools to catch up, we're starting now. The boys come up with the ideas, describe what they want, and work with AI to bring it to life. They're learning to create, not just consume.

## Who built this?

Built by **Charlie** (age 8) and his mate **Cooper**, with their friend **Jay Killeen** helping them learn how to work with AI.

## Games

### Cat vs Mouse

A rope puzzle game by Lil (`public/games/cat-vs-mouse.html`). Guide your cat, hook the pegs, and trap the mouse across 8 levels.

### Charlie & Cooper's Space Dodge

The first game in the EZ-AZ collection. A two-player co-op space shooter with:

- 1 or 2 player mode (Charlie on arrows, Cooper on WASD)
- 6 worlds with unique themes and boss fights
- Final boss (Void King) with two health bars, tentacles and dark magic
- Power-ups: shield, slow-mo, speed boost, mega blast, mega gun, revive
- Leaderboard with name entry
- Robot voice sings original lyrics during gameplay
- Boss fight music changes per phase

## Standard game features

Every game on EZ-AZ should follow these patterns unless the game is a "chill" game (no scoring, exploration only, meditative). Chill games can skip leaderboards and scoring.

### Store banner

Every game page includes a fixed banner at the top linking back to the store:

```html
<div class="store-banner"><a href="/">EZ-AZ</a></div>
```

### Title screen

- A start screen overlay that prevents the game from auto-playing
- Controls instructions
- A leaderboard section that fetches and displays the top 10 scores on page load
- If no scores exist, show "No scores yet. Be the first!"
- A "High Scores" button if the leaderboard isn't shown inline (e.g. Cat vs Mouse uses a panel overlay)

### Leaderboard

Games use a shared server-side leaderboard at `/api/scores`.

Fetching scores:
```javascript
var r = await fetch('/api/scores?game=YOUR-GAME-SLUG');
var d = await r.json();
// d.scores is an array of { name, value }
```

Posting scores:
```javascript
await fetch('/api/scores', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ game: 'YOUR-GAME-SLUG', name: playerName, value: score })
});
```

The game slug must be registered in `config.ru` in the `GAME_SORT` and `DEFAULT_NAMES` hashes. Games sorted DESC rank highest scores first (points-based games). Games sorted ASC rank lowest scores first (time-based games like Bloom).

On the title screen, fetch the leaderboard on page load and render it read-only (no name entry, no score display, just the ranked list).

On game over, show the player's score, check if they qualify for the top 10, and if so show a name entry input. After saving, highlight their entry in the leaderboard.

Keep a local fallback in localStorage so the leaderboard still works if the server is unreachable.

### Store shelf integration

Each game gets a "High Scores" link on its game box in `public/index.html`. This opens a modal overlay that fetches `/api/scores?game=X` and renders the top 10. Time-based games (like Bloom) format scores as MM:SS.mmm. Points-based games show the value with "pts".

### Pause and quit

- Escape key pauses the game
- Pause screen shows Resume and Quit buttons
- Quit returns to the store (`window.location.href = '/'`)

### Game over

- Show the final score or time
- Show the leaderboard with name entry if the player qualifies
- Provide a way to play again and/or return to the store

## Tech Stack

- Games are single HTML files using HTML5 Canvas
- Web Audio API for procedural music and sound effects
- Speech Synthesis API for robot singing
- Rack/Puma for serving via Hatchbox on Linode

## Development

Games live in `public/`. Currently the main game is at `public/index.html`. Everything is self-contained with no external dependencies.

## Deployment

Deployed via Hatchbox to a Linode server at https://ez-az.net.
