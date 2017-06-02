import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import CurrentUserAction from '../actions/currentUser'
import App from '../components/messages/app'

export default class MessageRouter extends BaseRouter {
  register() {
    this.route('/', this.initStores, this.decorateApp)
  }

  initStores(ctx, next) {
    CurrentUserAction.loadCurrentUser()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
