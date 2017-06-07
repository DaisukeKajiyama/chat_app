module Api
  class UsersController < ApplicationController

    def index
      @users = current_user.friends
      render json: @users.as_json(methods: [:messages])
    end

    def show
      @user = User.find(params[:id])
      @messages = @user.messages
      render json: @messages
    end

    def search
      @users = User.search(params[:search_string])
      render json: @users.as_json(methods: [:messages])
    end

  end
end
