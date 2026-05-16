class LearningTrack
  # Tracks are curated via conversation — add youtube_id (the part after ?v= in the YouTube URL).
  # duration_s is approximate runtime in seconds; used by the Watch channel scheduler so videos
  # appear at predictable times of day (kids tuning in at different times see different content).
  TRACKS = [
    {
      slug:        "how-ai-works",
      title:       "How AI Works",
      emoji:       "🤖",
      colour:      "#00ffc8",
      description: "What's actually happening inside AI? From neural nets to the tools you use every day.",
      videos: [
        { title: "But what is a neural network?",                youtube_id: "aircAruvnKk", note: "3Blue1Brown",  duration_s: 1140 },
        { title: "Gradient descent: how neural networks learn", youtube_id: "IHZwWFHWa-w", note: "3Blue1Brown",  duration_s: 1260 },
        { title: "What is backpropagation really doing?",        youtube_id: "Ilg3gGewQ5U", note: "3Blue1Brown",  duration_s: 810 },
        { title: "Backpropagation calculus",                     youtube_id: "tIeHLnjs5U8", note: "3Blue1Brown",  duration_s: 600 },
        { title: "Large Language Models explained briefly",      youtube_id: "LPZh9BOjkQs", note: "3Blue1Brown",  duration_s: 480 },
        { title: "How might LLMs store facts",                   youtube_id: "9-Jl0dxWQs8", note: "3Blue1Brown",  duration_s: 1500 },
        { title: "Attention in transformers, visually",          youtube_id: "eMlx5fFNoYc", note: "3Blue1Brown",  duration_s: 1560 },
        { title: "But what is a GPT? Visual intro to transformers", youtube_id: "wjZofJX0v4M", note: "3Blue1Brown", duration_s: 1620 },
        { title: "Visualizing transformers and attention",       youtube_id: "KJtZARuO3JY", note: "3Blue1Brown",  duration_s: 1500 },
      ]
    },
    {
      slug:        "maths-for-games",
      title:       "Maths for Games",
      emoji:       "📐",
      colour:      "#ffe44d",
      description: "Vectors, coordinates and the maths that makes games move.",
      videos: [
        { title: "Vectors, what even are they?",         youtube_id: "fNk_zzaMoSs", note: "3Blue1Brown", duration_s: 600 },
        { title: "Linear combinations, span, basis",     youtube_id: "k7RM-ot2NWY", note: "3Blue1Brown", duration_s: 600 },
        { title: "Linear transformations and matrices",  youtube_id: "kYB8IZa5AuE", note: "3Blue1Brown", duration_s: 660 },
        { title: "Matrix multiplication as composition", youtube_id: "XkY2DOUCWMU", note: "3Blue1Brown", duration_s: 600 },
        { title: "Three-dimensional linear transformations", youtube_id: "rHLEWRxRGiM", note: "3Blue1Brown", duration_s: 300 },
        { title: "The determinant",                      youtube_id: "Ip3X9LOh2dk", note: "3Blue1Brown", duration_s: 600 },
        { title: "Inverse matrices, column space, null space", youtube_id: "uQhTuRlWMxw", note: "3Blue1Brown", duration_s: 780 },
        { title: "Dot products and duality",             youtube_id: "LyGKycYT2v0", note: "3Blue1Brown", duration_s: 840 },
        { title: "Cross products",                       youtube_id: "eu6i7WJeinw", note: "3Blue1Brown", duration_s: 540 },
        { title: "Eigenvectors and eigenvalues",         youtube_id: "PFDu9oVAE-g", note: "3Blue1Brown", duration_s: 1020 },
        { title: "Essence of calculus",                  youtube_id: "WUvTyaaNkzM", note: "3Blue1Brown", duration_s: 1140 },
        { title: "The paradox of the derivative",        youtube_id: "9vKqVkMQHKk", note: "3Blue1Brown", duration_s: 1020 },
      ]
    },
    {
      slug:        "game-design",
      title:       "Game Design",
      emoji:       "🎮",
      colour:      "#ff6ec7",
      description: "Why do games feel fun? Design theory from the people who make them.",
      videos: [
        { title: "What Makes a Good Puzzle?",              youtube_id: "zsjC6fa_YBg", note: "Game Maker's Toolkit", duration_s: 720 },
        { title: "Why Does Celeste Feel So Good to Play?", youtube_id: "yorTG9at90g", note: "Game Maker's Toolkit", duration_s: 540 },
        { title: "Juice it or Lose it",                    youtube_id: "Fy0aCDmgnxg", note: "GDC",                  duration_s: 1500 },
        { title: "How to make your game feel great",       youtube_id: "AJdEqssNZ-U", note: "GDC",                  duration_s: 2100 },
      ]
    },
    {
      slug:        "coding-history",
      title:       "Coding History",
      emoji:       "🕹️",
      colour:      "#4aaeff",
      description: "From punch cards to AI — the wild story of how computing got here.",
      videos: [
        { title: "Boolean Logic & Logic Gates",      youtube_id: "gI-qXk7XojA", note: "Crash Course CS #3",  duration_s: 660 },
        { title: "Representing Numbers & Letters",   youtube_id: "1GSjbWt0c9M", note: "Crash Course CS #4",  duration_s: 660 },
        { title: "How Computers Calculate — the ALU", youtube_id: "1I5ZMmrOfnA", note: "Crash Course CS #5", duration_s: 660 },
        { title: "Registers and RAM",                youtube_id: "fpnE6UAfbtU", note: "Crash Course CS #6",  duration_s: 660 },
        { title: "The Central Processing Unit",      youtube_id: "FZGugFqdr60", note: "Crash Course CS #7",  duration_s: 720 },
        { title: "Instructions & Programs",          youtube_id: "zltgXvg6r3k", note: "Crash Course CS #8",  duration_s: 720 },
        { title: "Advanced CPU Designs",             youtube_id: "sK-49uz3lGg", note: "Crash Course CS #9",  duration_s: 720 },
        { title: "Early Programming",                youtube_id: "nwDq4adJwzM", note: "Crash Course CS #10", duration_s: 720 },
      ]
    },
    {
      slug:        "how-things-work",
      title:       "How Things Work",
      emoji:       "⚡",
      colour:      "#ff8c42",
      description: "The science and engineering behind everyday technology.",
      videos: [
        { title: "How does WiFi work?",                      youtube_id: "hePLDVbULZc", note: "Kurzgesagt",          duration_s: 600 },
        { title: "How does the Internet work?",              youtube_id: "x3c1ih2NJEg", note: "Kurzgesagt",          duration_s: 660 },
        { title: "The Quantum World",                        youtube_id: "JhHMJCUmq28", note: "Kurzgesagt",          duration_s: 540 },
        { title: "What is electricity?",                     youtube_id: "ru032Mfsfig", note: "Crash Course Physics", duration_s: 660 },
      ]
    },
    {
      slug:        "space",
      title:       "Space",
      emoji:       "🚀",
      colour:      "#a78bfa",
      description: "Black holes, rockets, and the size of everything.",
      videos: [
        { title: "Black Holes Explained",                          youtube_id: "e-P5IFTqB98", note: "Kurzgesagt",  duration_s: 480 },
        { title: "The Size of the Universe",                       youtube_id: "GoW8Tf7hTGA", note: "Kurzgesagt",  duration_s: 540 },
        { title: "How to Understand the Image of a Black Hole",    youtube_id: "zUyH3XhpLTo", note: "Veritasium",  duration_s: 1080 },
        { title: "Why the Universe is Way Bigger Than You Think",  youtube_id: "Iy7NzjCmUf0", note: "Kurzgesagt",  duration_s: 540 },
      ]
    },
    {
      slug:        "world-around-us",
      title:       "The World Around Us",
      emoji:       "🌍",
      colour:      "#4caf50",
      description: "Wildlife, plants, ecosystems — and how to grow things yourself.",
      videos: [
        { title: "How Wolves Change Rivers",       youtube_id: "ysa5OBhXz-Q", note: "Sustainable Man", duration_s: 270 },
        { title: "Why Elephants Don't Get Cancer", youtube_id: "1AElONvi9WQ", note: "SciShow",         duration_s: 420 },
      ]
    },
    {
      slug:        "science-experiments",
      title:       "Science Experiments",
      emoji:       "🔬",
      colour:      "#7c3aed",
      description: "Real experiments, surprising results, and the science behind them.",
      videos: [
        { title: "What is NOT Random?",              youtube_id: "sMb00lz-IfE", note: "Veritasium", duration_s: 780 },
        { title: "The Science of Thinking",          youtube_id: "UBVV8pch1dM", note: "Veritasium", duration_s: 720 },
        { title: "The Most Radioactive Places on Earth", youtube_id: "TRL7o2kPqw0", note: "Veritasium", duration_s: 960 },
        { title: "World's Roundest Object",          youtube_id: "ZMByI4s-D-Y", note: "Veritasium", duration_s: 600 },
      ]
    },
    {
      slug:        "how-its-made",
      title:       "How It's Made",
      emoji:       "🏭",
      colour:      "#94a3b8",
      description: "Factories, engineering, and the processes behind everyday objects.",
      videos: [
        { title: "How Power Grids Work",    youtube_id: "v1BMWczn7JM", note: "Practical Engineering", duration_s: 780 },
        { title: "How Bridges Are Built",   youtube_id: "oVOnRPefcno", note: "Practical Engineering", duration_s: 840 },
        { title: "Engineering with Origami", youtube_id: "ThwuT3_AG6w", note: "Veritasium",           duration_s: 780 },
      ]
    },
    {
      slug:        "make-something",
      title:       "Make Something",
      emoji:       "🔧",
      colour:      "#f97316",
      description: "3D printing, electronics, robots, and building things with your hands.",
      videos: [
        { title: "Marble Machine",                  youtube_id: "IvUU8joBb1Q", note: "Wintergatan",   duration_s: 240 },
        { title: "How to solder properly",          youtube_id: "Qps9woUGkvI", note: "Pace",          duration_s: 900 },
        { title: "3D Printing for absolute beginners", youtube_id: "nb-Bzf4nQdE", note: "Teaching Tech", duration_s: 780 },
        { title: "Arduino in 100 seconds",          youtube_id: "1ENiVwk8idM", note: "Fireship",      duration_s: 120 },
      ]
    },
    {
      slug:        "world-wonders",
      title:       "World Wonders",
      emoji:       "🏺",
      colour:      "#f59e0b",
      description: "Ancient civilisations, lost cities, and the strangest places on Earth.",
      # TODO: needs video curation — all initial IDs failed verification
      videos: []
    },
  ].freeze

  def self.all
    TRACKS
  end

  def self.find(slug)
    TRACKS.find { |t| t[:slug] == slug }
  end

  # Convenience: total seconds of content in a track. Used by the scheduler.
  def self.duration_s(slug)
    track = find(slug)
    return 0 unless track
    track[:videos].sum { |v| v[:duration_s] || 600 }
  end
end
