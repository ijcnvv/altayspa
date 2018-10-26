<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.feedback#feedback
  v-layout.row.inner.justify-center
    .inner.main__title-wrap
      h2.main__title Отзывы
  .inner.slider
    +e.SLICK.list(ref="slick" :options="slickOptions" :key="cityName")
      +e.wrap(v-for="(item, index) in feedbacks" :key="index")
        +e.item
          +e.img(:style="'background-image: url(' + item.img + ')'")
          +e.quote._t
            v-icon(large) format_quote
          +e.container
            +e.H3.title {{ item.name }}
            +e.text {{ item.desc }}
          +e.quote._b
            v-icon(large) format_quote
</template>

<script>
import {mapGetters} from 'vuex'
import Slick from 'vue-slick'

export default {
  components: {
    Slick
  },

  data: () => ({
    swiping: false,
    slickOptions: {
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      dots: true,
      arrows: false,
      adaptiveHeight: true,
      infinite: false,
      dotsClass: 'slider__dots'
    }
  }),

  computed: {
    ...mapGetters({
      list: 'feedback/list',
      city: 'cities/current'
    }),
    cityName () {
      return this.city.text
    },
    feedbacks () {
      return this.list.filter(item => item.city == this.cityName)
    }
  }
}
</script>

