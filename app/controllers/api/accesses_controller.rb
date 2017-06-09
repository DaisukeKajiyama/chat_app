module Api
  class AccessesController < ApplicationController

    def create
      @access = current_user.accesses.create(to_user_id:params[:to_user_id],last_access:params[:last_access])
      render json: @access
    end

    def update
      @access = current_user.accesses.find_by(to_user_id:params[:to_user_id]).update(last_access:params[:last_access])
      render json: @access
    end
    
  end
end
