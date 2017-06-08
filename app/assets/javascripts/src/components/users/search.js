import React from 'react'
import UserList from './userList'
import UsersAction from '../../actions/users'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchString: '',
    }
  }

  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UsersAction.loadSearchUsers(searchString)
  }

  render() {
    const {searchString} = this.state
    return (
      <div className='search'>
        <div className='chatapp-logo'>
          <h1 className = 'find-a-friend'>友達を追加</h1>
        </div>
        <input
          type='text'
          className='search_form'
          value={searchString}
          onChange={this.handleChange.bind(this)}
          placeholder='ユーザー名で検索しよう'
        />
        <UserList {...this.state} />
      </div>
    )
  }
}
