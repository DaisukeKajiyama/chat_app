import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from './users'
import CurrentUserStore from './currentUser'
import MessagesAction from '../actions/messages'
import {ActionTypes} from '../constants/app'

let openChatId = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class ChatStore extends BaseStore {

  getOpenChatUserId() {
    const users = UserStore.getUsers()
    if (Number.isNaN(openChatId) && users.length !== 0) {
      openChatId = users[0].id
      MessagesAction.loadUserMessages(openChatId)
    }
    return openChatId
  }

  getUserMessages() {
    if (!this.get('userMessages')) this.setUserMessages({})
    return this.get('userMessages')
  }

  setUserMessages(obj) {
    this.set('userMessages', obj)
  }

}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {

    case ActionTypes.LOAD_USER_MESSAGES:
      openChatId = action.id
      MessagesStore.setUserMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_MESSAGE:
      {
        const messages = CurrentUserStore.getCurrentUser().messages
        const currentUserID = CurrentUserStore.getCurrentUser().id
        messages.push({
          id: Math.floor(Math.random() * 1000000),
          content: action.content,
          to_user_id: action.to_user_id,
          user_id: currentUserID,
          created_at: action.created_at,
          image: '',
        })
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.SAVE_IMAGE_CHAT:
      {
        const messages = CurrentUserStore.getCurrentUser().messages
        const currentUserID = CurrentUserStore.getCurrentUser().id
        messages.push({
          to_user_id: action.to_user_id,
          user_id: currentUserID,
          created_at: action.created_at,
          image: {url: '/message_images/' + action.image},
        })
      }
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
