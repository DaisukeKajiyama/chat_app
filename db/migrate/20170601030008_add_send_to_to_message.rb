class AddSendToToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :send_to, :integer
  end
end
