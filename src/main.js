import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faMapMarkerAlt, 
  faMortarPestle, 
  faPhoneVolume,   
  faLeaf,
  faHandHoldingHeart,
  faCar,
  faHandHoldingUsd
 } from '@fortawesome/free-solid-svg-icons'
import { 
  faClock,
  faListAlt,
  faEdit
} from '@fortawesome/free-regular-svg-icons'
import { 
  faVk, 
  faOdnoklassniki, 
  faInstagram, 
  faPagelines 
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faCar, 
  faHandHoldingUsd, 
  faListAlt, 
  faEdit, 
  faMortarPestle, 
  faLeaf, 
  faHandHoldingHeart,
  faPagelines,
  faVk,
  faOdnoklassniki,
  faInstagram,
  faPhoneVolume,
  faClock,
  faMapMarkerAlt
)

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