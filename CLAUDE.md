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

Built by **Charlie** (age 8) and his mate **Cooper**, with their Dad **Jay Killeen** helping them learn how to work with AI.

## Games

### Charlie & Cooper's Space Dodge

The first game in the EZ-AZ collection. A two-player co-op space shooter with:

- 1 or 2 player mode (Charlie on arrows, Cooper on WASD)
- 6 worlds with unique themes and boss fights
- Final boss (Void King) with two health bars, tentacles and dark magic
- Power-ups: shield, slow-mo, speed boost, mega blast, mega gun, revive
- Leaderboard with name entry
- Robot voice sings original lyrics during gameplay
- Boss fight music changes per phase

## Tech Stack

- Games are single HTML files using HTML5 Canvas
- Web Audio API for procedural music and sound effects
- Speech Synthesis API for robot singing
- Rack/Puma for serving via Hatchbox on Linode

## Development

Games live in `public/`. Currently the main game is at `public/index.html`. Everything is self-contained with no external dependencies.

## Deployment

Deployed via Hatchbox to a Linode server at https://ez-az.net.
