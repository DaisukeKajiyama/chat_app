Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    authenticated :user do
      root :to => 'messages#index', as: :authenticated_root
    end
    unauthenticated :user do
      root :to => 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  resources :users, only:[:index, :show, :edit, :update]
  resources :messages

  # root "messages#index"

  namespace :api, {format:'json'} do
    resources :messages
  end
end
