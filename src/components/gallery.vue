<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.gallery#gallery
  v-layout.row.inner.justify-center
    h2.main__title Галерея
  v-layout.row.inner.justify-center
    +e.wrap
      +e.SLICK.list(ref="slick" :options="slickOptions" @afterChange="handleAfterChange" @beforeChange="handleBeforeChange")
        +e.A.item(v-for="(item,i) in slider" :key="i") 
          img.gallery__img(:alt="item.title" :src="item.src") 
</template>

<script>
import Slick from 'vue-slick'
import {mapGetters} from 'vuex'

export default {
  components: {
    Slick
  },

  data() {
    return {
      swiping: false,
      slickOptions: {
        slidesToShow: 3,
        centerMode: false,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        dotsClass: 'gallery__dots',
        prevArrow: '<span class="gallery__arrow left"><span class="arrow arrow_left arrow_md"></span></span>',
        nextArrow: '<span class="gallery__arrow right"><span class="arrow arrow_right arrow_md"></span></span>',
        responsive: [{
            breakpoint: 767,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '0',
              slidesToShow: 1
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              centerPadding: '0',
              slidesToShow: 2
            }
          }
        ]
      }
    }
  },

  computed: {
    ...mapGetters({
      slider: 'gallery/list'
    })
  },

  methods: {
    // фикс бага для IE и FF:
    // срабатывает клик по ссылке при свайпе
    route(name) {
      if (this.swiping) return false
      
    },

    handleAfterChange() {
      this.swiping = false
    },

    handleBeforeChange() {
      this.swiping = true
    }
  }
}
 </script>