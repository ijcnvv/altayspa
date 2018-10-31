<template lang="pug">
include ../tools/mixins.pug
+b.FOOTER.footer
  .inner
    +e.wrap
      +e.logo-wrap
        img.footer__logo(
          src="/img/logo-white.png"
          alt="logo")
        +e.SPAN.logo-text Таёжный SPA
      +b.NAV.nav-bt.__nav
        +e.UL.list
          +e.LI.item(v-for="(el, i) in menu" :key="i")
            +e.A.link.link(href="#" @click.prevent="scrolling(el.target)") {{ el.title }}
      +e.CONTACT-INFO.contacts
</template>

<script>
import {mapGetters} from 'vuex'
import contactInfo from './contacts/contactInfo'

export default {
  components: {
    contactInfo
  },

  computed: {
    ...mapGetters ({
      menu: 'menu/list'
    })
  },

  methods: {
    scrolling (value) {
      if (document.querySelector(value)) {
        this.$vuetify.goTo(value,{
          offset: -55
        })
      }
    }
  }
}
</script>
