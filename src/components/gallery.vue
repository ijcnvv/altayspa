<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.gallery#gallery(v-if="isGallery")
  v-layout.column.justify-center.align-center
    .inner.main__title-wrap
      h2.main__title Галерея
    slider(
      :list="gallery"
      :show="4"
      :arrow="false"
      :height="350"
      :fullWidth="true")
</template>

<script>
import {mapGetters} from 'vuex'
import Slider from './slider'

export default {
  components: {
    Slider
  },

  computed: {
    ...mapGetters({
      list: 'gallery/currenCityList',
      city: 'cities/currentName'
    }),

    gallery () {
      return this.list(this.city)
    },

    isGallery () {
      return this.gallery.length > 0
    }
  }
}
 </script>