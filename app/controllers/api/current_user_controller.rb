module Api
  class CurrentUserController < ApplicationController

    def index
      @user = current_user
      render json: @user.as_json(methods: [:messages])
    end

  end

end