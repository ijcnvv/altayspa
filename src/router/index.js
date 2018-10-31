import Vue from 'vue'
import VueRouter from 'vue-router'

import Admin from '../components/admin/admin'
import Home from '../components/home'
import Empty from '../components/404'

const routes = [{
    path: '',
    component: Home,
    name: 'home'
  },
  {
    path: '/admin',
    component: Admin,
    name: 'admin'
  },
  {
    path: '*',
    component: Empty,
    name: 'empty'
  }
];

Vue.use(VueRouter);

export default new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});