import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import cities from './modules/cities'
import promo from './modules/promo'
import gallery from './modules/gallery'
import common from './modules/common'
import programs from './modules/programs'
import feedback from './modules/feedback'
import order from './modules/order'
import user from './modules/user'

const isDev = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    cities,
    gallery,
    promo,
    common,
    programs,
    feedback,
    order,
    user
  },
  strict: isDev
});