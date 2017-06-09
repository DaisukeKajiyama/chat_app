class AddUserIdToAccesses < ActiveRecord::Migration
  def change
    add_column :accesses, :user_id, :integer
  end
end
