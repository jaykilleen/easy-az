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

### Dodgeball - World Championship 1988

A top-down 2v2 dodgeball game by Lachie (`public/games/dodgeball.html`). 1-4 players on one keyboard, with bots filling empty spots. Best of 3 rounds, tournament mode for 1-player with increasing difficulty. Features a wandering referee, crowd runners, and ball boys.

### Cat vs Mouse

A rope puzzle game by Lil (`public/games/cat-vs-mouse.html`). Guide your cat, hook the pegs, and trap the mouse across 8 levels.

### Descent

A maze runner by Jaykill (`public/games/descent.html`). 1-player, procedurally generated floors with flashlight cone vision and fog of war. 4 selectable dinosaur characters (Slate, Pixel, Fern, Echo) each with unique visual themes and traits. Sprint with stamina, collect breadcrumbs, and find what Az lost at the bottom. Az appears as a rescue guide if you get lost. Scored by total time (ASC leaderboard).

### Corrupted

A first-person raycaster zombie fighter by Charlie & Cooper (`public/games/corrupted.html`). 1 or 2 player split screen. Fight through 6 themed worlds (sewers, school, fairground, frozen lab, volcano, corruption core) with unique zombie types and bosses. Start with fists, loot armour, shields and swords from defeated zombies. Points-based scoring (DESC leaderboard).

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
- Rails 8 / Ruby 3.4.2 / SQLite / Puma
- Action Cable for real-time TV remote and trivia channels
- Propshaft for asset pipeline (no Sprockets, no Webpack)
- `rqrcode` gem for QR code generation
- `bcrypt` for player session tokens
- `honeybadger` for error monitoring
- Minitest + rack-test for unit and integration tests

## App Structure

```
app/
  controllers/
    api/              # JSON API -- scores, players, sessions, version, store, watch
    rooms_controller  # TV room management
    tv_controller     # TV display (big screen)
    tv_remote_controller  # Phone remote
    watch_controller  # /watch TV channel experience
    code_controller   # QR-based store unlock (Cipher)
    trivia_controller # Trivia game
    learn_controller  # Learning tracks
  models/
    player.rb         # Persistent identity via session token
    room.rb           # TV room (host + members)
    score.rb          # Game leaderboard entry
    game.rb           # Game metadata
    learning_track.rb # Structured learning content
    learning_channel.rb # Action Cable channel for learning
  channels/
    room_channel.rb       # TV room presence
    tv_remote_channel.rb  # Phone-to-TV controller input
    trivia_channel.rb     # Trivia game state
  views/             # ERB, minimal -- most UI is in public/ or inline HTML
public/
  index.html         # Store front (shelf of games)
  games/             # Self-contained game HTML files
docs/
  decisions/         # ADRs (Architecture Decision Records)
```

## Zone Component Names

The phone companion system has established names. Use these in conversation and code comments.

**Phone side (the Zone)** — `tv_remote/show.html.erb`, served at `/tv/remote`

| Name | What it is |
|------|-----------|
| Zone | The whole phone companion experience |
| Zone Bar | Top strip: EZ-AZ brand + live connection dot |
| Zone Screen | The current main content panel (one of the states below) |
| Zone Rail | Three-tab navigation bar at the bottom (game / remote / options) |
| Zone Pad | The D-pad directional controller |
| Action Button | The circular FIRE button on the Pad |
| Options Panel | The overlay shown when the Options tab is active |

Zone Screen states: `claim` · `shelf` · `lobby` · `waiting` · `buzzer` · `watching` · `disconnected`

**TV side (the Stage)**

| Name | What it is |
|------|-----------|
| Stage | Whatever is on the big screen |
| Shelf | The store front Stage (`public/index.html`) |
| Party Stage | Any game-specific TV view with Zone support |
| QR Badge | The always-visible scan badge on the Shelf |

**The engine**

- `TvRemote` / `TvRemoteChannel` — the ActionCable protocol between Stage and Zone
- `DPAD_SCREENS` — Zone Screen states where the Pad is shown
- `TABBED_SCREENS` — Zone Screen states where the Rail is shown
- See ADR 001 and ADR 005 for architecture decisions

## Key Conventions

- ADRs live in `docs/decisions/` -- read before touching TV, rooms, or player identity
- API controllers live under `app/controllers/api/` and inherit from `Api::BaseController`
- Game slugs must be registered in `config.ru` (`GAME_SORT` and `DEFAULT_NAMES` hashes)
- Dev server runs on port 5001 (port 3000 is reserved for TXTavern)
- No Turbo, no Stimulus -- this is not a standard Rails app; the frontend is vanilla JS and Canvas

## Development

Start the server: `bin/rails server -p 5001`

Games live in `public/games/`. The store front is `public/index.html`. Game files are self-contained with no external dependencies.

Run tests: `bin/rails test`

## Deployment

Deployed via Kamal to a Linode server at https://ez-az.net. After deploy, poll `/api/version` until the new version is confirmed live.
