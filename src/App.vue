<template lang="pug">
transition(mode="out-in" name="fade")
  v-app.page(v-if="city" v-scroll="onScroll" key="1")
    app-header
    router-view
    app-footer.page__footer
    v-btn(color="orange darken-3" dark fixed bottom right fab v-show="showUpper" @click.prevent="$vuetify.goTo(0)")
      v-icon keyboard_arrow_up
    v-alert.page__alert(type="error" transition="fade-transition" :value="error" dismissible @click.prevent="cleanError") {{ error }}
  section.page.page__city-select(v-else key="2")
    app-city
</template>

<script>
import appHeader from './components/header/header'
import appFooter from './components/footer'
import appCity from './components/citySelect'
import {mapGetters, mapMutations} from 'vuex'

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
      city: 'cities/current',
      error: 'common/getError'
    }),

    showUpper () {
      return this.offsetTop > 700
    }
  },

  methods: {
    ...mapMutations({
      cleanError: 'common/cleanError'
    }),
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    }
  }
}
</script>
