Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  mount ActionCable.server => "/cable"

  get "/tv",        to: "tv#show"
  get "/tv/remote", to: "tv_remote#show", as: :tv_remote
  get "/learn",     to: "learn#show"
  get "/watch",     to: "watch#show"
  get "/scan",      to: "scan#show"

  get  "/games/trivia",       to: "trivia#new",  as: :new_trivia
  get  "/games/trivia/:code", to: "trivia#show", as: :trivia

  get  "/games/spotlight",       to: "spotlight#new",  as: :new_spotlight
  get  "/games/spotlight/:code", to: "spotlight#show", as: :spotlight

  get  "/games/treasure-hunt",       to: "treasure#new",  as: :new_treasure
  get  "/games/treasure-hunt/:code", to: "treasure#show", as: :treasure

  get  "/games/hacker-pro",       to: "hacker#new",  as: :new_hacker
  get  "/games/hacker-pro/:code", to: "hacker#show", as: :hacker

  get  "/games/boomerang-brawl",       to: "boomerang#new",  as: :new_boomerang
  get  "/games/boomerang-brawl/:code", to: "boomerang#show", as: :boomerang

  resources :rooms, only: [:new, :create, :show], param: :code do
    member do
      get  :join,     action: :join
      post :join,     action: :add_member
      get  :play
      post :start
    end
  end

  get "/room-input.js",    to: "room_input#show", defaults: { format: :js }
  get "/manifest.json",    to: "manifest#show"
  get "/icons/:name.:format", to: "icons#show", constraints: { format: /png|jpg|jpeg|svg|webp/ }

  get "/counter", to: "counters#show"
  get "/gamers",  to: "counters#gamers"

  namespace :api do
    resources :submissions, only: [:create]
    resources :scores,  only: [:index, :create]
    resource  :session, only: [:show, :create, :destroy]
    get "version",      to: "version#show"
    get "store/status", to: "store#status"
    resources :players, only: [:create] do
      collection do
        get  :check
        post :claim
        post :login
        post :pin, action: :set_pin
      end
    end
    resources :errors,  only: [:create]
    get "watch/position", to: "watch#position"
    put "watch/position", to: "watch#update_position"
    get "tv_session",     to: "tv_session#show"
    get    "active_rooms",       to: "active_rooms#index"
    delete "active_rooms/:code", to: "active_rooms#destroy"
  end

  get "/errors", to: "errors_dashboard#index"

  namespace :admin do
    resources :submissions, only: [:index, :show] do
      member do
        get  :preview
        post :approve
        post :reject
      end
    end
  end

  resources :bugs, only: [:index, :create, :update, :destroy] do
    member do
      post :vote
    end
  end

  get "/code",     to: "code#index"
  get "/code/view", to: "code#show"

  match "/404", to: "errors#not_found",       via: :all
  match "/500", to: "errors#internal_error",  via: :all
end
