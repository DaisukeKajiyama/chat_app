import React from 'react'
import classNames from 'classnames'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      currentUser: React.PropTypes.object,
    }
  }

  render() {
    const {currentUser} = this.props
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
        </ul>
        <ReplyBox />
      </div>
    )
  }
}
export default MessagesBox
