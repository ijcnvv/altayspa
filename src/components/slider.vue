<template lang="pug">
.slider(:class="isArrow")
  slick.slider__list(ref="slick" :options="slickOptions" @afterChange="handleAfterChange" @beforeChange="handleBeforeChange" :key="city")
    a.slider__item(v-for="(item,i) in list" :key="i" :class="isStableHeight")
      img.slider__img(:alt="item.title" :src="item.src" @click.prevent="showDialog(item.src)")
  v-dialog(v-model="dialog" width="auto" v-if="modal")
    img.slider__modal(:src="dialogImg" )
</template>

<script>
import Slick from 'vue-slick'

export default {
  components: {
    Slick
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    show: {
      type: Number,
      default: 1
    },
    arrow: {
      type: Boolean,
      default: false
    },
    dots: {
      type: Boolean,
      default: true
    },
    heightstable: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: false,
      dialogImg: '',
      swiping: false,
      slickOptions: {
        slidesToShow: this.show,
        centerMode: false,
        slidesToScroll: 1,
        dots: this.dots,
        arrows: this.arrow,
        adaptiveHeight: !this.heightstable,
        infinite: false,
        dotsClass: `${this.dots ? 'slider__dots' : ''}${this.dots && this.show === 1 ? ' slider__dots_inside' : ''} `,
        prevArrow: '<span class="slider__arrow left"><span class="arrow arrow_left arrow_md"></span></span>',
        nextArrow: '<span class="slider__arrow right"><span class="arrow arrow_right arrow_md"></span></span>',
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
              centerMode: true,
              centerPadding: '0',
              slidesToShow: this.show > 2 ? 2 : this.show
            }
          }
        ]
      }
    }
  },
  computed: {
    city(){
      return this.list[0].city
    },
    isArrow(){
      return {
        'slider_isarrow': this.arrow
      }
    },
    isStableHeight(){
      return {
        'slider__item_height_sm': this.heightstable
      }
    }
  },
  methods: {
    showDialog(src){
      if(!this.modal) return false

      this.dialogImg = src
      this.dialog = true
    },
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

<style lang="less">
@import '../less/val';
.v-dialog {
  overflow: hidden;
  box-shadow: none;

  &--active{
    max-width: 90%;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  &__content{
    &--active{
      background-color: fade(@color-black,20%)
    }
  }
}
</style>
