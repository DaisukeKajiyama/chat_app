module Api
  class CurrentUserController < ApplicationController

    def index
      render json: current_user.as_json(methods: [:messages,:accesses])
    end

  end
end
