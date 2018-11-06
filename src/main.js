import 'vuetify/dist/vuetify.min.css'
import './less/styles.less'
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
  faHandHoldingUsd,
  faAward
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
  faMapMarkerAlt,
  faAward
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import fbConfig from './config/fb'
import fb from 'firebase/app'
import {mapActions} from 'vuex'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    fb.initializeApp(fbConfig)    
    
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.login(user)
      }
    })

    this.fetchPromoList().then(()=>{
      document.querySelector(".preloader").classList.remove("preloader_in")
    })
    this.fetchProgramList()
  },
  methods: {
    ...mapActions({
      login: 'user/autoSignIn',
      fetchPromoList: 'promo/fetchPromoList',
      fetchProgramList: 'programs/fetchProgramList'
    })
  }
})