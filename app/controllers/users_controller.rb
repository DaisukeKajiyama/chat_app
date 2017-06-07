class UsersController < ApplicationController
  def index
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    redirect_to 
  end

  def update
  end

  def search

  end

end
