<template lang="pug">
include ../../tools/mixins.pug
+b.NAV.nav-top
  +e.wrap
    +e.inner.inner
      +e.UL.list
        +e.item(v-for="(el, i) in menu" :key="i")
          +e.link(href="#" @click.prevent="scrolling(el.target)") {{ el.title }}
</template>

<script>
import cssSup from '../../tools/css.js'
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      menu: 'menu/list'
    })
  },

  methods: {
    scrolling (value) {
      if (document.querySelector(value)) {
        this.$vuetify.goTo(value, {
          offset: -55
        })
      }
    }
  },

  mounted () {

    // фикс для прилипшей шапки для браузеров
    // не поддерживающих свойство position: sticky

    const isSticky = cssSup("position", "sticky");

    if (!isSticky) {

      let header = document.querySelector('.nav-top'),
        posSticky = header.offsetTop;

      window.onscroll = function () {
        if (window.pageYOffset > posSticky) {
          header.classList.add("nav-top_sticky");
        } else {
          header.classList.remove("nav-top_sticky");
        }
      }
    }
  }
}
</script>

