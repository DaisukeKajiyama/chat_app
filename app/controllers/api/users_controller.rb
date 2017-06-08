module Api
  class UsersController < ApplicationController

    def index
      @users = current_user.friends
      render json: @users.as_json(methods: [:messages])
    end

    def show
      @user = User.find(params[:id])
      render json: @user.as_json(methods: [:messages])
    end

    def search
      @users = User.where.not(id: current_user.id)
      @search_string = params[:search_string]
      if !@search_string || @search_string == ""
        @search_users = []
      else
        @search_users = @users.search(params[:search_string])
      end
      render json: @search_users.as_json(methods: [:messages])
    end

  end
end
