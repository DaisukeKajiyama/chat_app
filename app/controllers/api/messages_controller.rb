module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = Message.create(content:"Hello",from:"1")
    end

  end

end
