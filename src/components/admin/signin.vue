<template lang="pug">
v-container.fluid.fill-height.pt-5.pb-5
  v-layout.align-center.justify-center
    v-flex.xs-12.sm3
      v-card.elevation-12
        v-toolbar(dark color="orange darken-3")
          v-toolbar-title Авторизация
        v-card-text
          v-form(v-model="valid")
            v-text-field(prepend-icon="person" :rules="emailRules" label="Email" type="email" color="orange darken-3" v-model="email")
            v-text-field(prepend-icon="lock" :rules="passRules" label="Пароль" type="password" color="orange darken-3" v-model="password")
            v-layout.justify-end
              v-btn(color="orange darken-3 white--text" @click.prevent="onSignin" :disabled="btnDisabled" :loading="processing") Войти          
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    email: null,
    password: null,
    valid: false,
    passRules: [
      v => !!v || 'Необходимо ввести пароль'
    ],
    emailRules: [
      v => !!v || 'Необходимо ввести E-mail',
      v => /^.+?@.+?\..+$/.test(v) || 'E-mail указан некорректно'
    ],
  }),

  computed: {
    ...mapGetters({
      processing: 'common/getProcessing'
    }),
    btnDisabled () {
      return this.processing || !this.valid
    }
  },

  methods: {
    ...mapActions({
      signin: 'user/signin'
    }),

    onSignin () {
      if (this.btnDisabled) return false

      this.signin({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
