<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.gallery#gallery(v-if="isGallery")
  v-layout.row.inner.justify-center
    h2.main__title Галерея
  .inner
    slider(:list="galleryList" :show="3" :arrow="true" :heightstable="true" :modal="true")
</template>

<script>
import {mapGetters} from 'vuex'
import Slider from './slider'

export default {
  components: {
    Slider
  },
  computed: {
    ...mapGetters ({
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