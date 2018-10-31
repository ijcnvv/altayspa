<template lang="pug">
header.header
  v-layout.row.inner(align-center justify-space-between color="borrow darken-4 white--text")
    v-flex.xs6.sm2
      v-select.header__city(
        color="orange darken-3"
        :items="cities"
        v-model="city"
        label="Ваш город"
        dark)
    router-link.link.header__enter(v-if="isMain" :to="{name: 'admin'}")
      span Войти
    router-link.link.header__enter(v-else :to="{name: 'home'}")
      v-icon(color="white") arrow_back
      span.ml-2 На главную
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cities: 'cities/list',
      currentCity: 'cities/currentName'
    }),

    city: {
      get () {
        return this.currentCity
      },
      set (value) {
        this.setCity(value)
      }
    },

    isMain () {
      return this.$route.name == 'home'
    }
  },

  methods: {
    ...mapMutations({
      setCity: 'cities/setCity'
    })
  }
}
</script>
