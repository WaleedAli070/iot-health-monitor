import * as socketClient from '../helpers/socketsClient'

export default {
  install (Vue) {
    Vue.socketClient = socketClient
    Vue.prototype.$socketClient = socketClient
  }
}