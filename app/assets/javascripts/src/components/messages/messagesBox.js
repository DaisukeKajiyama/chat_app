import React from 'react'
import classNames from 'classnames'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      currentUser: React.PropTypes.object,
      messages: React.PropTypes.array,
    }
  }

  render() {
    const {messages, currentUser} = this.props

    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      return (
        <li key={message.id} className={messageClasses}>
          {message.image.url ? (
            <div className='message-box__item__images'>
              <img className='image-message' src={message.image.url} />
            </div>
          ) : (
            <div className='message-box__item__contents'> {message.content} </div>
          )}
        </li>
      )
    })

    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {userMessages}
        </ul>
        <ReplyBox />
      </div>
    )
  }
}

export default MessagesBox
