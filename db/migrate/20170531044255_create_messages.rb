class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text :contents
      t.integer :from

      t.timestamps null: false
    end
  end
end
