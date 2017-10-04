module Api
  class MessagesController < ApplicationController

    def index
      @messages = Message.all
      render json: @messages
    end

    def show
      @receiving_messages = Message.where(to_user_id:current_user.id, user_id:params[:id])
      @sending_messages = Message.where(to_user_id:params[:id], user_id:current_user.id)
      @messages = @receiving_messages + @sending_messages
      render json: @messages
    end

    def create
      @message = current_user.messages.create(message_params)
      render json: {message: @message}
    end

    def upload_image
      @message = current_user.messages.create(to_user_id:params[:to_user_id],image:params[:image])
      render json: {message: @message}
    end

    private

      def message_params
        params.require(:message).permit(:content, :to_user_id, :created_at)
      end

  end
end
