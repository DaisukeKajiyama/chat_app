module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def create
      @message = current_user.messages.create(message_params)
      render json: {message: @message}
    end

    def upload_image
      @message = current_user.messages.create(to_user_id:params[:to_user_id], image:params[:image])
      render json: {message: @message}
    end

    private

      def message_params
        params.require(:message).permit(:content, :to_user_id)
      end

  end
end
