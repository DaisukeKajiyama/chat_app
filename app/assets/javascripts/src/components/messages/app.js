import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import CurrentUserStore from '../../stores/currentUser'
import UserList from './userList'
import MessagesBox from './messagesBox'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const openChatID = MessagesStore.getOpenChatUserID()
    const currentUser = CurrentUserStore.getCurrentUser()
    if (!currentUser) return {}
    const currentUserMessages = currentUser.messages ? currentUser.messages : []
    const currentUserMessagesToUser = _.filter(currentUserMessages, {to_user_id: openChatID})
    const users = MessagesStore.getUserMessages()
    const openUserMessages = users.messages ? _.filter(users.messages, {to_user_id: currentUser.id}) : []
    const allMessages = _.concat(currentUserMessagesToUser, openUserMessages)
    const messages = _.sortBy(allMessages, (message) => { return Date.parse(message.created_at) })

    return {
      currentUser,
      messages,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    CurrentUserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <UserList />
          <MessagesBox {...this.state} />
        </div>
      )
  }
}

export default App
