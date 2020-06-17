import Vue from 'vue'
// import VueSocketIO from 'vue-socket.io';
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import https from './plugins/https';
import helpers from './plugins/global-helpers'
import socketClient from './plugins/sockets'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(https)
Vue.use(helpers)
Vue.use(socketClient)
// Vue.use(new VueSocketIO({
//   transports: ['websocket'],
//   debug: true,
//   connection: process.env.VUE_APP_SOCKET_URL,
// }))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
