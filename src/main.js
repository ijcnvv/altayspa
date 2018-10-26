import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { faOdnoklassniki } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faRubleSign } from '@fortawesome/free-solid-svg-icons'

library.add(faRubleSign)
library.add(faVk)
library.add(faOdnoklassniki)
library.add(faInstagram)
library.add(faPhoneVolume)
library.add(faClock)
library.add(faMapMarkerAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)

import 'vuetify/dist/vuetify.min.css'
import './less/styles.less'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})