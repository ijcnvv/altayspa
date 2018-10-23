<template <template lang="pug">
include ../tools/mixins.pug
+b.SECTION.promo#promo(v-if="isPromo")
  v-layout.row.inner.justify-center
    h2.main__title Акции
  .inner
    slider(:list="promoList" :show="1" :arrow="false")
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
      list: 'promo/list',
      currentCity: 'cities/current'
    }),
    promoList () {
      return this.list.filter(item => item.city == this.currentCity.text)
    },
    isPromo () {
      return this.promoList.length > 0
    }
  }
}
</script>
