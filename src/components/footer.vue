<template lang="pug">
include ../tools/mixins.pug
+b.FOOTER.footer
  v-layout.row.inner(justify-space-between align-start)
    +e.IMG.logo(alt="logo" src="https://via.placeholder.com/350x80")
    +b.NAV.nav-bt.__nav
      +e.UL.list
        +e.LI.item(v-for="(el, i) in menu" :key="i")
          +e.A.link.link(href="#" @click.prevent="scrolling(el.target)") {{ el.title }}
    +b.contacts.__contacts
      +e.list
        +e.item
          +e.SPAN.name
            font-awesome-icon(icon="map-marker-alt" class='fa-fw')
          +e.A.link  {{ address }}
        +e.item(v-if="city.time")
          +e.SPAN.name
            font-awesome-icon(:icon="['far','clock']" class='fa-fw')
          +e.A.link  {{ city.time }}
        +e.item(v-if="city.phone")
          +e.SPAN.name
            font-awesome-icon(icon="phone-volume" class='fa-fw')
          +e.A.link  {{ city.phone }}
      +b.social
        +e.UL.list
          +e.item(v-if="city.vk")
            +e.A.link(target="_blank" :href="city.vk")
              font-awesome-icon(:icon="['fab','vk']" )
          +e.item(v-if="city.ok")
            +e.A.link(target="_blank" :href="city.ok")
              font-awesome-icon(:icon="['fab','odnoklassniki']")
          +e.item(v-if="city.im")
            +e.A.link(target="_blank" :href="city.im")
              font-awesome-icon(:icon="['fab','instagram']")
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      city: 'cities/current',
      menu: 'menu/list'
    }),
    address(){
      return `г. ${this.city.text}, ${this.city.address}`
    }
  },
  methods: {
    scrolling (value) {
      if (document.querySelector(value)) {
        this.$vuetify.goTo(value)
      }
    }
  }
}
</script>
