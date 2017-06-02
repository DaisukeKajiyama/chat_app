module Api
  class CurrentUserController < ApplicationController

    def index
      @user = current_user
      render json: @user
    end

  end

end
