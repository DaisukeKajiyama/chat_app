import React from 'react'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import CurrentUserStore from '../../stores/currentUser'
// import UserList from './userList'
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
    const currentUser = CurrentUserStore.getCurrentUser()
    return {
      currentUser,
    }
  }

  componentDidMount() {
  CurrentUserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
  CurrentUserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <MessagesBox {...this.state} />
        </div>
      )
  }
}

export default App
