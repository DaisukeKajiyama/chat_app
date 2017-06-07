import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import UsersAction from '../actions/users'
import CurrentUserAction from '../actions/currentUser'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadUsers, this.loadCurrentUser)
  }

  loadUsers(ctx, next) {
    UsersAction.loadUsers()
    next()
  }

  loadCurrentUser(ctx, next) {
    CurrentUserAction.loadCurrentUser()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
