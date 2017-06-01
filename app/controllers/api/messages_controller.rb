module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(contents:params[:contents],from:1,send_to:params[:send_to])
    end

  end

end
