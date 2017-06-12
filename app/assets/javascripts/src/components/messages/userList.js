import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/users'
import MessagesAction from '../../actions/messages'
import CurrentUserAction from '../../actions/currentUser'
import {CSRFToken} from '../../constants/app'
import CurrentUserStore from '../../stores/currentUser'
import Utils from '../../utils'

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
      openChatID: MessagesStore.getOpenChatUserID(),
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
    const userChatAccess = this.getLastAccess(userID)
    if (userChatAccess) {
      MessagesAction.updateLastAccess(userID, new Date())
    } else {
      MessagesAction.createLastAccess(userID, new Date())
    }
    CurrentUserAction.loadCurrentUser()
  }

  getLastAccess(toUserID) {
    const {currentUser} = this.state
    const lastAccess = _.find(currentUser.accesses, {to_user_id: toUserID})
    return lastAccess
  }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
  }

  render() {
    const {users, currentUser, openChatID} = this.state

    const friendUsers = _.map(users, (user) => {
      const userChatAccess = this.getLastAccess(user.id)

      //  開いてるユーザーが自分に送ったメッセージ
      const messagestoCurrent = _.filter(user.messages, {to_user_id: currentUser.id})
      const messagestoCurrentLength = messagestoCurrent.length
      const lastMessagetoCurrent = messagestoCurrent[messagestoCurrentLength - 1]

      //  開いてるユーザーに自分が送ったメッセージ
      const messagesfromCurrent = _.filter(currentUser.messages, {to_user_id: user.id})
      const messagesfromCurrentLength = messagesfromCurrent.length
      const lastMessagefromCurrent = messagesfromCurrent[messagesfromCurrentLength - 1]

      var lastMessage
      if (lastMessagetoCurrent && lastMessagefromCurrent) {
        if (lastMessagefromCurrent.created_at > lastMessagetoCurrent.created_at) {
          lastMessage = lastMessagefromCurrent
        } else if (lastMessagefromCurrent.created_at < lastMessagetoCurrent.created_at) {
          lastMessage = lastMessagetoCurrent
        }
      } else if (!lastMessagefromCurrent && lastMessagetoCurrent) {
        lastMessage = lastMessagetoCurrent
      } else if (lastMessagefromCurrent && !lastMessagetoCurrent) {
        lastMessage = lastMessagefromCurrent
      }

      const date = lastMessage ? Utils.getNiceDate(lastMessage.created_at) : ''

      let newMessageIcon
      if (lastMessagetoCurrent) {
        if (!userChatAccess || lastMessagetoCurrent.created_at > userChatAccess.last_access) {
          newMessageIcon = (
            <i className='fa fa-circle new-message-icon' />
          )
        }
      }
      let statusIcon
      // 何かしら送られて来てるとき
      if (lastMessagetoCurrent && lastMessagefromCurrent) {
        if (lastMessagetoCurrent.created_at < lastMessagefromCurrent.created_at) {
          statusIcon = (
            <i className='fa fa-reply user-list__item__icon' />
            )
        }
      }
      // 何も送られて来てないとき
      if (!lastMessagetoCurrent && lastMessagefromCurrent) {
        statusIcon = (
          <i className='fa fa-reply user-list__item__icon' />
          )
      }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatID === user.id,
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
                 {newMessageIcon}{user.name}
                <abbr className='user-list__item__timestamp'>
                  {date}
                </abbr>
              </h4>
            <span className='user-list__item__message'>
              {statusIcon}
              {lastMessage ? lastMessage.content : ''}
            </span>
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

window.UserList = UserList
export default UserList
