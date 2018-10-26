<template lang="pug">
include ../tools/mixins.pug
+b.contacts
  +e.list
    +e.item
      +e.SPAN.name
        font-awesome-icon(icon="map-marker-alt" class='fa-fw')
      +e.SPAN.link  {{ address }}
    +e.item(v-if="city.time")
      +e.SPAN.name
        font-awesome-icon(:icon="['far','clock']" class='fa-fw')
      +e.SPAN.link  {{ city.time }}
    +e.item(v-if="city.phone")
      +e.SPAN.name
        font-awesome-icon(icon="phone-volume" class='fa-fw')
      +e.SPAN.link  {{ city.phone }}
  +b.social._default
    +e.UL.list
      +e.item(v-if="city.vk")
        +e.A.link(target="_blank" :href="city.vk")
          font-awesome-icon(:icon="['fab','vk']")
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
      city: 'cities/current'
    }),
    address () {
      return `г. ${this.city.text}${this.city.address ? ', ' + this.city.address : ''}`
    }
  },
}
</script>
