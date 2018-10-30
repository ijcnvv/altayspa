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
    router-link(
      :to="{name: 'admin'}"
      class="link header__enter") Войти
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
    }
  },

  methods: {
    ...mapMutations({
      setCity: 'cities/setCity'
    })
  }
}
</script>
