import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { formatDistance, subDays } from 'date-fns'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

Vue.component(formatDistance)
Vue.component(subDays)
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('https://172.6.249.239'), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);
 

library.add(faCaretRight)
library.add(faCaretLeft)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
