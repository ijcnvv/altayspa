<template lang="pug">
include ../tools/mixins.pug
+b.FOOTER.footer
  v-layout.row.inner(justify-space-between align-start)
    +e.IMG.logo(alt="logo" src="https://via.placeholder.com/350x80")
    +b.NAV.nav-bt.__nav
      +e.UL.list
        +e.LI.item(v-for="(el, i) in menu" :key="i")
          +e.A.link.link(href="#") {{ el.title }}
    +b.contacts.__contacts
      +e.list
        +e.item
          +e.SPAN.name Адрес:
          +e.A.link  {{ city.text }}
        +e.item
          +e.SPAN.name Время работы:
          +e.A.link  {{ city.time }}
        +e.item
          +e.SPAN.name Тел.:
          +e.A.link  {{ city.phone }}
      +b.social
        +e.UL.list
          +e.item
            +e.A.link(target="_blank" :href="city.vk") {{ city.vk }}
          +e.item
            +e.A.link(target="_blank" :href="city.ok") {{ city.ok }}
          +e.item
            +e.A.link(target="_blank" :href="city.im") {{ city.im }}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      city: 'cities/current',
      menu: 'menu/list'
    })
  }
}
</script>
