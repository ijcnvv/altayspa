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
          +e.LI.item
            +e.A.link.link(href="#" @click.prevent="dialog = true") Франшиза
      +e.CONTACT-INFO.contacts
  v-layout.row.justify-center.align-center.pt-4
    span.mr-2 Сайт разработан
    a.link(:href="'http://'+developer" target="_blank") {{ developer }}
  +e.V-DIALOG.dialog(v-model="dialog" width="auto")
    +e.V-CARD.modal-text
      v-card-text
        +e.H2.modal-title Франшиза
        div.mt-4 
          span Раздел находится в разработке. Вся информация по телефону 
          +e.A.link.link(href="tel:+79111133000") +7 (911) 113-30-00
</template>

<script>
import {mapGetters} from 'vuex'
import contactInfo from './contacts/contactInfo'

export default {
  components: {
    contactInfo
  },

  data: () => ({
    dialog: false,
    developer: 'www.novikovproject.ru'
  }),

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
