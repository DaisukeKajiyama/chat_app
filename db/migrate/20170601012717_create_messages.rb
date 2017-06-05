class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :to_user_id
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
