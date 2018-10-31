<template lang="pug">
v-container.fluid.fill-height
  v-layout.align-center.justify-center
    v-flex.xs-12.sm4
      v-card.elevation-12
        v-toolbar(dark color="orange darken-3")
          v-toolbar-title Авторизация
        v-card-text
          v-form
            v-text-field(prepend-icon="person" label="Email" type="email" color="orange darken-3" v-model="email")
            v-text-field(prepend-icon="lock" label="Пароль" type="password" color="orange darken-3" v-model="password")
        v-card-actions
          v-spacer
          v-btn(color="orange darken-3 white--text" @click.prevent="onSignin" :disabled="processing" :loading="processing") Войти
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    email: null,
    password: null
  }),

  computed: {
    ...mapGetters({
      processing: 'common/getProcessing'
    })
  },

  methods: {
    ...mapActions({
      signin: 'user/signin'
    }),

    onSignin () {
      this.signin({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
