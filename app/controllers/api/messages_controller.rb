module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = current_user.messages.create(content:params[:content], to_user_id: params[:to_user_id])
      render json: @message
    end

  end

end
