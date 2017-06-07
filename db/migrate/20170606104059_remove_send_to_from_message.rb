class RemoveSendToFromMessage < ActiveRecord::Migration
  def change
    remove_column :messages, :send_to, :integer
  end
end
