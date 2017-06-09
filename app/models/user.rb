class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
has_many :messages
has_many :accesses
has_many :friendships_of_from_user, :class_name => 'Friendship', :foreign_key => 'from_user_id', :dependent => :destroy
has_many :friendships_of_to_user, :class_name => 'Friendship', :foreign_key => 'to_user_id', :dependent => :destroy
has_many :friends_of_from_user, :through => :friendships_of_from_user, :source => 'to_user'
has_many :friends_of_to_user, :through => :friendships_of_to_user, :source => 'from_user'
mount_uploader :image, ImageUploader
validates :email, presence: true,
          uniqueness: true

    def self.search(search)
      where(['name LIKE ?', "%#{search}%"])
    end

    def friends
      friends_of_from_user + friends_of_to_user
    end

    def follow(other_user)
      friendships_of_from_user.create(to_user_id:other_user.id)
    end

    def unfollow(other_user)
      if from_friend?(other_user)
        friendships_of_from_user.find_by(to_user_id:other_user.id).destroy
      elsif to_friend?(other_user)
        friendships_of_to_user.find_by(from_user_id:other_user.id).destroy
      end
    end

    def from_friend?(other_user)
      friends_of_from_user.include?(other_user)
    end

    def to_friend?(other_user)
      friends_of_to_user.include?(other_user)
    end

end
