class FriendshipsController < ApplicationController

  def create
    user = User.find(params[:to_user_id])
    current_user.follow(user)
    redirect_to authenticated_root_path
  end

  def destroy
    user = User.find(params[:id])
    current_user.unfollow(user)
    redirect_to authenticated_root_path
  end
end
