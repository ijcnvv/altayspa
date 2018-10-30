<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION.info
  v-layout.row.inner.align-center.wrap
    v-flex.sm4.xs12
      +e.CONTACT-INFO.contacts
    +e.V-FLEX.logo-wrap.sm4.xs12
      img.info__logo(
        src="/img/logo-white.png"
        alt="logo")
      +e.SPAN.logo-text Таёжный SPA
    +e.V-FLEX.order-wrap.sm4.xs12
      v-btn.ma-0(color="orange darken-3 white--text" large @click.prevent="scrolling")
        v-icon.info__order-ico(left) card_giftcard
        +e.SPAN.order-text заказать сертификат
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import contactInfo from '../contactInfo'

export default {
  components: {
    contactInfo
  },

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
    }),

    scrolling () {
      this.$vuetify.goTo('#sertificate', {
        offset: -60
      })
    }
  }
}
</script>
