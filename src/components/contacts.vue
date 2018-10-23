<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.contacts#contacts
  v-layout.row.inner.justify-center
    h2.main__title Контакты
  v-layout.row.inner.justify-center
    yandex-map(:coords="currentCity.coords" zoom="16" style="width: 600px; height: 600px;" :scroll-zoom="false")
      ymap-marker(marker-id="1" marker-type="placemark" :coords="currentCity.coords" :icon="{color: 'orange', glyph: 'dot'}" :balloonTemplate="balloonTemplate")
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import {mapGetters} from 'vuex'

export default {
  components: {
    yandexMap,
    ymapMarker
  },
  computed: {
    ...mapGetters ({
      currentCity: 'cities/current'
    }),
    balloonTemplate() {
      return `<p>г. ${this.currentCity.text}${this.currentCity.address ? ', ' + this.currentCity.address : ''}</p><p>Время работы ${this.currentCity.time}</p><p>Телефон ${this.currentCity.phone}</p>`
    }
  }


}
</script>

