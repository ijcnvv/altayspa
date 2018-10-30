<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.feedback#feedback(v-if="isFeedback")
  .inner.main__title-wrap
    h2.main__title Отзывы
  .inner.slider
    +e.SLICK.list(ref="slick" :options="slickOptions" :key="cityName")
      +e.wrap(v-for="(item, index) in feedbacks" :key="index")
        +e.item
          +e.img(:style="'background-image: url(' + item.img + ')'")
          +e.container
            +e.quote._t
              v-icon(large) format_quote
            +e.block
              +e.H3.title {{ item.name }}
              +e.text {{ item.desc }}
            +e.quote._b
              v-icon(large) format_quote
  v-layout.row.justify-center.mt-4(v-if="isLink")
    +e.A.more(:href="feedbackLink" target="_blank")
      v-btn(color="orange darken-3 white--text") Больше отзывов
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
      list: 'feedback/currenCityList',
      city: 'cities/current'
    }),
    cityName () {
      return this.city.text
    },
    feedbackLink () {
      return this.city.feedback
    },
    isLink () {
      return this.feedbackLink.length > 0
    },
    feedbacks () {
      return this.list(this.cityName)
    },
    isFeedback () {
      return this.feedbacks.length > 0
    }
  }
}
</script>

