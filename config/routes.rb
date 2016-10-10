Rails.application.routes.draw do
  root to: 'home#index'
  resources :twitter_timeline, only: %i(show)
end
