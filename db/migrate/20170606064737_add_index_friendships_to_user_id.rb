class AddIndexFriendshipsToUserId < ActiveRecord::Migration
  def change
    add_index :friendships, :from_user_id
    add_index :friendships, :to_user_id
    add_index :friendships, [:from_user_id, :to_user_id], unique: true
  end
end
