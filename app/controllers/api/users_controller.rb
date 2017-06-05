module Api
  class UsersController < ApplicationController

    def index
      @users = User.all
      render json: @users.as_json(methods: [:messages])
    end

    def show

    end

    def search
      @users = User.search(params[:search_string])
      render json: @users
    end

  end
end
