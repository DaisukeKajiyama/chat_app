import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/users'
import MessagesAction from '../../actions/messages'
import {CSRFToken} from '../../constants/app'
import CurrentUserStore from '../../stores/currentUser'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const currentUser = CurrentUserStore.getCurrentUser()
    const currentUserID = currentUser.id
    return {
      users: UserStore.getUsers(),
      openChatId: MessagesStore.getOpenChatUserId(),
      currentUser,
      currentUserID,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    UserStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    UserStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  changeOpenChat(userID) {
    MessagesAction.loadUserMessages(userID)
  }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
  }

  render() {
    const {users, openChatId} = this.state

    const friendUsers = _.map(users, (user) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatId === user.id,
      })
      return (
        <li
          key={user.id}
          onClick={this.changeOpenChat.bind(this, user.id)}
          className={itemClasses}
        >
          <form action={`/friendships/${user.id}`} method='post'>
            <input
              type='hidden'
              name='authenticity_token'
              value={CSRFToken()}
            />
            <input
              type='hidden'
              name='_method'
              value='delete'
            />
            <input
              type='submit'
              value='&#xf057;'
              className='remove-chat-btn'
              onClick={this.deleteChatConfirm.bind(this)}
            />
          </form>
          <div className='user-list__item__picture'>
            <img src={user.image.url ? user.image.url : 'assets/images/default_image.jpg'}/>
          </div>
          <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                 {user.name}
              </h4>
          </div>
        </li>
      )
    }, this)

    return (
        <div className='user-list'>
          <ul className='user-list__list'>
            {friendUsers}
           </ul>
        </div>
    )
  }
}

export default UserList
