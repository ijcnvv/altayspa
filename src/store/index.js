import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu.js'
import cities from './modules/cities.js'
import promo from './modules/promo.js'
import gallery from './modules/gallery.js'
import common from './modules/common.js'
import programs from './modules/programs.js'

const isDev = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    cities,
    gallery,
    promo,
    common,
    programs
  },
  strict: isDev
});