<template lang="pug">
.slider(:class="isArrow")
  slick.slider__list(ref="slick" :options="slickOptions" @afterChange="handleAfterChange" @beforeChange="handleBeforeChange" :key="city")
    .slider__item(v-for="(item,i) in list" :key="i" :class="itemClasses" :style="[itemStyle, {backgroundImage: fullWidth ? 'url('+item.src+')': ''}]")
      img.slider__img(:alt="item.title" :src="item.src" @click.prevent="showDialog(item)" v-if="!fullWidth")
      .slider__inner(v-else)
        .inner
          h3.slider__title {{ item.title }}
          button.slider__btn.btn.btn_lg.btn_default(@click.prevent="showDialog(item)") Подробнее
  v-dialog(v-model="dialog" width="auto")
    img.slider__modal-img(:src="dialogImg" v-if="!dialogDesc")
    .slider__modal-text(v-else v-html="dialogDesc")
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
    height: {
      type: Number,
      default: 0
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    dialog: false,
    dialogImg: '',
    dialogDesc: '',
    swiping: false,
    slickOptions: null
  }),

  created () {
    this.slickOptions = {
      slidesToShow: this.fullWidth ? 1 : this.show,
      autoplay: this.autoplay,
      autoplaySpeed: 7000,
      centerMode: false,
      slidesToScroll: 1,
      dots: this.dots,
      arrows: this.arrow,
      adaptiveHeight: this.height === 0,
      infinite: false,
      dotsClass: `${this.dots ? 'slider__dots' : ''}${this.dots && this.fullWidth ? ' slider__dots_inside' : ''} `,
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
  },

  watch: {
    dialog () {
      if (this.dialog) {
        document.querySelector('html').classList.add('out')
      } else {
        document.querySelector('html').classList.remove('out')
      }
    }
  },

  computed: {
    city () {
      return this.list[0].city
    },
    isArrow () {
      return {
        'slider_isarrow': this.arrow
      }
    },
    itemClasses () {
      return {
        'slider__item_fw': this.fullWidth
      }
    },
    itemStyle () {
      return {
        'height': this.height > 0 ? `${this.height}px` : ''
      }
    }
  },

  methods: {
    showDialog (val) {
      if (this.swiping) return false

      this.dialogImg = val.src
      this.dialog = true

      if (val.desc) this.dialogDesc = val.desc
    },

    handleAfterChange () {
      this.swiping = false
    },

    handleBeforeChange () {
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

  &--active {
    max-width: 90%;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  &__content {
    &--active {
      background-color: fade(@color-black,20%)
    }
  }
}
</style>
