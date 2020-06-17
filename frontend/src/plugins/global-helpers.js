import * as helpers from '../helpers/utils'

export default {
  install (Vue) {
    Vue.helpers = helpers
    Vue.prototype.$helpers = helpers
  }
}