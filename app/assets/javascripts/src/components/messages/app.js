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
    this.onStoreChange = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const currentUser = CurrentUserStore.getCurrentUser()
    const messages = MessagesStore.getUserMessages()
    const sortedMessages = _.sortBy(messages, message => { return Date.parse(message.created_at) })

    return {
      currentUser,
      messages: sortedMessages,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onStoreChange)
    CurrentUserStore.onChange(this.onStoreChange)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange)
    CurrentUserStore.offChange(this.onStoreChange)
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
