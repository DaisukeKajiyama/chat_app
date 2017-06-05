Rails.application.routes.draw do
  get 'users/search' => 'users#search'

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

  namespace :api, {format:'json'} do
    resources :messages
    resources :users do
      collection do
        get 'search'
      end
    end
    resources :current_user
  end
end
