<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION.information#information
  v-layout.row.inner.align-center.wrap
    v-flex.sm4.xs12
      +e.CONTACT-INFO.contacts
    +e.V-FLEX.logo-wrap.sm4.xs12
      img.information__logo(
        src="/img/logo-white.png"
        alt="logo")
      +e.SPAN.logo-text Таёжный SPA
    +e.V-FLEX.order-wrap.sm4.xs12
      v-btn.ma-0(color="orange darken-3 white--text" large @click.prevent="scrolling")
        +e.V-ICON.order-ico(left) card_giftcard
        +e.SPAN.order-text заказать сертификат
</template>

<script>
import contactInfo from '../contacts/contactInfo'

export default {
  components: {
    contactInfo
  }, 

  methods: {   
    scrolling () {
      this.$vuetify.goTo('#sertificate', {
        offset: -60
      })
    }
  }
}
</script>
