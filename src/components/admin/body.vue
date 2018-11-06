<template lang="pug">
.inner.pb-5.pt-4
  v-tabs.admin__tabs(
    fixed-tabs 
    v-model="active" 
    slider-color="orange darken-3" 
    color="transparent")
    v-tab(
      v-for="(tab, index) in tabs" 
      :key="index")
      div.admin__tab        
        v-badge(color="red")
          span(slot="badge" v-if="tab.component == 'app-callback' && callbackIsNotReaded") {{ callbackNotReadedCount }}
          span(slot="badge" v-if="tab.component == 'app-order' && orderIsNotReaded") {{ orderNotReadedCount }}
          span {{ tab.title }}
    v-tab-item(v-for="(tab, index) in tabs" :key="index")
      v-container.pa-0.pt-4
        component(:is="tab.component")      
</template>

<script>
import appPromo from './promo'
import appPrograms from './programs'
import appSubnav from './subnav'
import appCallback from './callback'
import appOrder from './order'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    appPromo,
    appPrograms,
    appSubnav,
    appCallback,
    appOrder
  },

  data: () => ({
    tabs: [
      {
        title: 'Акции',
        component: 'app-promo'
      },
      {
        title: 'SPA-программы',
        component: 'app-programs'
      },
      {
        title: 'Категории программ',
        component: 'app-subnav'
      },
      {
        title: 'Обратный звонок',
        component: 'app-callback'
      },
      {
        title: 'Заказ сертификата',
        component: 'app-order'
      }
    ],
    active: 0
  }),

  computed: {
    ...mapGetters({
      callbackList: 'contacts/getList',
      orderList: 'order/getList'
    }),
    callbackNotReadedCount () {
      return this.callbackList.filter(el => !el.read).length      
    },
    callbackIsNotReaded () {
      return this.callbackNotReadedCount > 0
    },
    orderNotReadedCount () {
      return this.orderList.filter(el => !el.read).length      
    },
    orderIsNotReaded () {
      return this.orderNotReadedCount > 0
    }
  },

  methods: {
    ...mapActions({
      fetchCallback: 'contacts/fetchCallback',
      fetchOrder: 'order/fetchOrder'
    })    
  },

  mounted () {
    this.fetchCallback()
    this.fetchOrder()
  }
}
</script>
