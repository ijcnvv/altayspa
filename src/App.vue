<template lang="pug">
v-app.page(v-if="city" v-scroll="onScroll")
  app-header
  router-view
  app-footer.page__footer
  v-btn(color="orange darken-3" dark fixed bottom right fab v-show="showUpper" @click.prevent="$vuetify.goTo(0)")
    v-icon keyboard_arrow_up
section.page.page_center(v-else)
  app-city
</template>

<script>
import appHeader from './components/header'
import appFooter from './components/footer'
import appCity from './components/citySelect'
import {mapGetters} from 'vuex'

export default {
  components: {
    appHeader,
    appFooter,
    appCity
  },

  data: () => ({
    offsetTop: 0
  }),

  computed: {
    ...mapGetters({
      city: 'cities/current'
    }),
    showUpper () {
      return this.offsetTop > 700
    }
  },

  methods: {
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    }
  }
}
</script>
