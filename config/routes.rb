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

  resources :friendships, :only => [:create, :destroy]
  resources :users, :only => [:show]
  resources :messages

  namespace :api, {format:'json'} do
    resources :messages do
      collection do
        post 'upload_image'
      end
    end
    resources :users do
      collection do
        get 'search'
      end
    end
    resources :current_user
  end
end
