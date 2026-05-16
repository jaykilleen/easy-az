class Game
  GAMES = [
    {
      slug: "space-dodge",
      title: "Space Dodge",
      creators: "Charlie & Cooper",
      tagline: "2-player co-op space shooter with 6 worlds and a Void King boss",
      path: "/games/space-dodge.html",
      icon: "rocket",
      tv_optimised: true
    },
    {
      slug: "dodgeball",
      title: "Dodgeball '88",
      creators: "Lachie",
      tagline: "Top-down 2v2 dodgeball tournament, best of 3 rounds",
      path: "/games/dodgeball.html",
      icon: "dodgeball",
      tv_optimised: false
    },
    {
      slug: "corrupted",
      title: "Corrupted",
      creators: "Charlie & Cooper",
      tagline: "First-person raycaster zombie fighter, 6 themed worlds",
      path: "/games/corrupted.html",
      icon: "zombie",
      tv_optimised: false
    },
    {
      slug: "descent",
      title: "Descent",
      creators: "Jaykill",
      tagline: "Maze runner with flashlight vision and 4 dinosaur heroes",
      path: "/games/descent.html",
      icon: "maze",
      tv_optimised: true
    },
    {
      slug: "cat-vs-mouse",
      title: "Cat vs Mouse",
      creators: "Lil",
      tagline: "Rope puzzle across 8 levels, hook pegs and trap the mouse",
      path: "/games/cat-vs-mouse.html",
      icon: "cat",
      tv_optimised: false
    },
    {
      slug: "bloom",
      title: "Bloom",
      creators: "Az",
      tagline: "Chill exploration, time-based scoring, no pressure",
      path: "/games/bloom.html",
      icon: "bloom",
      tv_optimised: false
    },
    {
      slug: "trivia",
      title: "Family Trivia",
      creators: "Az",
      tagline: "Scan the QR code — everyone plays on their phone. First to buzz wins!",
      path: "/games/trivia",
      icon: "trivia",
      tv_optimised: true
    },
    {
      slug: "spotlight",
      title: "Spotlight",
      creators: "Az",
      tagline: "One round, one star. The Spotlight answers — everyone else guesses what they'd say.",
      path: "/games/spotlight",
      icon: "spotlight",
      tv_optimised: true
    },
    {
      slug: "treasure-hunt",
      title: "Treasure Hunt",
      creators: "Az",
      tagline: "Pick a card. Win the round. Take the pot. Most treasure wins. Plays with a real deck on holidays too.",
      path: "/games/treasure-hunt",
      icon: "treasure",
      tv_optimised: true
    },
    {
      slug: "hacker-pro",
      title: "Hacker Pro",
      creators: "Az",
      tagline: "Brute-force the code together. Easy cracks fast. Impossible never cracks. That's the password lesson.",
      path: "/games/hacker-pro",
      icon: "hacker",
      tv_optimised: true
    },
    {
      slug: "marble-run",
      title: "Marble Run",
      creators: "Jaykill & Cooper",
      tagline: "Pick your colour. Watch your marble race. Up to 20 players, phones as scoreboards.",
      path: "/games/marble-run",
      icon: "marble",
      tv_optimised: true
    },
    {
      slug: "boomerang-brawl",
      title: "Boomerang Brawl",
      creators: "Az",
      tagline: "Top-down arena brawl. Throw your boomerang, dodge theirs. Last one standing wins the round. Best of 3.",
      path: "/games/boomerang-brawl",
      icon: "boomerang",
      tv_optimised: true,
      controller: :joystick
    },
    {
      slug: "letterbox",
      title: "Letterbox",
      creators: "Jaykill",
      tagline: "Az rides through Gumdale on his bike, getting the word out. Hit the letterbox, dodge the dog, grab a coffee for the mums and dads.",
      path: "/games/letterbox/",
      icon: "letterbox",
      tv_optimised: true
    },
    {
      slug: "dino-jump",
      title: "Dino Jump",
      creators: "Jaykill",
      tagline: "4 players, one keyboard. Slate, Pixel, Fern and Echo race for the sky. Highest altitude wins.",
      path: "/games/dino-jump.html",
      icon: "dino-jump",
      tv_optimised: true
    },
    {
      slug: "magnet-lab",
      title: "Magnet Lab",
      creators: "Jaykill",
      tagline: "Two robot scientists, opposite ends of the table. Place magnets to push and pull the energy ball into the target. Co-op physics, 2 players, one keyboard.",
      path: "/games/magnet-lab.html",
      icon: "magnet",
      tv_optimised: false
    }
  ].freeze

  def self.all
    GAMES
  end

  def self.for_tv
    GAMES.select { |g| g[:tv_optimised] }
  end

  def self.coming_to_tv
    GAMES.reject { |g| g[:tv_optimised] }
  end

  def self.find(slug)
    GAMES.find { |g| g[:slug] == slug }
  end
end
