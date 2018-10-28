<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.gallery#gallery(v-if="isGallery")
  .inner.main__title-wrap
    h2.main__title Галерея
  +e.slider
    +e.SLICK.list(
      ref="slick"
      :options="slickOptions"
      @afterChange="handleAfterChange"
      @beforeChange="handleBeforeChange"
      :key="city")
      +e.wrap(v-for="(item,i) in gallery" :key="i")
        +e.item(@click.prevent="showDialog(i)")
          .gallery__img(:style="{backgroundImage: `url('${item.preview}')`}")            
  +e.V-DIALOG.modal(v-model="dialog")
    +e.SPAN.arrow._left(@click.prevent="prev" :class="prevDisabled")
      +b.SPAN.arrow._left._md
    +e.SPAN.arrow._right(@click.prevent="next" :class="nextDisabled")
      +b.SPAN.arrow._right._md
    transition(mode="out-in" name="fade")
      img.gallery__modal-img(:src="img" :key="img")        
</template>

<script>
import {mapGetters} from 'vuex'
import Slick from 'vue-slick'

export default {
  components: {
    Slick
  },

  data: () => ({
    dialog: false,
    img: '',
    modalIndex: -1,
    swiping: false,
    slickOptions: {
      slidesToShow: 4,
      autoplay: false,
      dots: true,
      arrows: true,
      infinite: false,
      dotsClass: 'gallery__dots',
      prevArrow: '<span class="gallery__arrow gallery__arrow_left"><span class="arrow arrow_left arrow_md"></span></span>',
      nextArrow: '<span class="gallery__arrow gallery__arrow_right"><span class="arrow arrow_right arrow_md"></span></span>',
      responsive: [{
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0',
          slidesToShow: 1
        }
      }]
    }
  }),

  watch: {
    dialog () {
      if (this.dialog) {
        document.querySelector('html').classList.add('out')
      } else {
        document.querySelector('html').classList.remove('out')
        this.img = ''
        this.modalIndex = -1
      }
    },
    modalIndex () {
      if (this.modalIndex !== -1) {
        this.img = this.gallery[this.modalIndex].src
      }      
    }
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
    },
    prevDisabled () {
      return {
        'slick-disabled': this.modalIndex == 0
      }
    },
    nextDisabled () {
      return {
        'slick-disabled': this.modalIndex == this.gallery.length - 1
      }
    }
  },

  methods: {
    handleAfterChange () {
      this.swiping = false
    },
    handleBeforeChange () {
      this.swiping = true
    },
    showDialog (index) {
      if (this.swiping) return false
      this.modalIndex = index     
      this.dialog = true
    },
    prev () {
      this.modalIndex -= this.modalIndex > 0 ? 1 : 0
    },   
    next () {
      this.modalIndex += this.modalIndex >= this.gallery.length - 1 ? 0 : 1
    }
  }
}
 </script>