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
    .header__nav
      router-link.link.header__nav-item(v-if="isMain" :to="{name: 'admin'}")
        span {{ adminLinkName }}      
      router-link.link.header__nav-item(v-else :to="{name: 'home'}")
        v-icon(color="white") arrow_back
        span.header__nav-text.ml-2 На главную
      a.link.header__nav-item(href="#" v-if="isAuth" @click.prevent="logout") Выйти
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cities: 'cities/listSmall',
      currentCity: 'cities/currentId',
      isAuth: 'user/getAuth'
    }),

    city: {
      get () {
        return this.currentCity
      },
      set (id) {
        this.setCity(id)
      }
    },

    isMain () {
      return this.$route.name == 'home'
    },
    adminLinkName () {
      return this.isAuth ? 'Админка' : 'Войти'
    }
  },

  methods: {
    ...mapMutations({
      setCity: 'cities/setCity'
    }),
    ...mapActions({
      signOut: 'user/signOut'
    }),
    logout () {
      this.signOut()
    }
  }
}
</script>
