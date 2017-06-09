class CreateAccesses < ActiveRecord::Migration
  def change
    create_table :accesses do |t|
      t.integer :to_user_id
      t.timestamp :last_access

      t.timestamps null: false
    end
  end
end
