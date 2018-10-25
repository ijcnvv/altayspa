<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.gallery#gallery(v-if="isGallery")
  v-layout.column.justify-center.align-center
    .inner.main__title-wrap
      h2.main__title Галерея
    slider(:list="galleryList" :show="3" :arrow="false" :height="350" :fullWidth="true")
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
      list: 'gallery/list',
      currentCity: 'cities/current'
    }),

    galleryList () {
      return this.list.filter(item => item.city == this.currentCity.text)
    },

    isGallery () {
      return this.galleryList.length > 0
    }
  }
}
 </script>