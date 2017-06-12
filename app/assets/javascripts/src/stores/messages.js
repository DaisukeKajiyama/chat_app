import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from './users'
import CurrentUserStore from './currentUser'
import MessagesAction from '../actions/messages'
import {ActionTypes} from '../constants/app'
import _ from 'lodash'

var openChatID = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class ChatStore extends BaseStore {

  getOpenChatUserID() {
    const users = UserStore.getUsers()
    if (Number.isNaN(openChatID) && users.length !== 0) {
      openChatID = users[0].id
      MessagesAction.loadUserMessages(openChatID)
    }
    return openChatID
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
  // const currentUserID = CurrentUserStore.getCurrentUser().id
  // const openChatId = MessagesStore.getOpenChatUserID()
  // const currentUser = CurrentUserStore.getCurrentUser()
  // if (!currentUser) return {}
  // const currentUserMessages = currentUser.messages ? currentUser.messages : []
  // const currentUserMessagesToUser = _.filter(currentUserMessages, {to_user_id: openChatId})
  // const users = MessagesStore.getUserMessages()
  // const openUserMessages = users.messages ? _.filter(users.messages, {to_user_id: currentUser.id}) : []
  // const allMessages = _.concat(currentUserMessagesToUser, openUserMessages)
  // const messages = _.sortBy(allMessages, (message) => { return message.created_at })

  switch (action.type) {

    case ActionTypes.LOAD_USER_MESSAGES:
      openChatID = action.id
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

window.hoge = MessagesStore

export default MessagesStore
