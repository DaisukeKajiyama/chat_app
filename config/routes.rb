Rails.application.routes.draw do
  namespace :api, {format:'json'} do
    resources :messages
  end

  resources :messages
  root 'messages#index'
end
