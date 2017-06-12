module Api
  class CurrentUserController < ApplicationController

    def index
      # 変数に代入する必要ない
      @user = current_user
      render json: @user.as_json(methods: [:messages,:accesses])
    end

  end
end
