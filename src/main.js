import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css'
import './less/main.less'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})