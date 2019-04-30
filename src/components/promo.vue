<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.promo#promo(v-if="isPromo")
  slick.promo__list(
    ref="slick"
    :options="slickOptions"
    :key="sliderKey")
    +e.wrap(v-for="(item, i) in promoList" :key="i")
      +e.item
        +e.img._darken(:style="{backgroundImage: `url('${item.src}')`}")
        .inner
          +e.H3.title {{ item.title }}
          +e.sub-title(v-if="item.subTitle.length") {{ item.subTitle }}
          v-btn.ma-0.mt-4(color="orange darken-3 white--text" large @click.prevent="showDialog(item)") Подробнее
  v-dialog(v-model="dialog" width="auto")
    +e.V-CARD.modal-text
      v-card-text
        +e.H2.modal-title {{ dialogObj.title }}
        div(v-html="dialogObj.desc")
        div.mt-4 
          span Узнайте подробности по телефону
          +e.A.link.link(:href="'tel:' + city.phone") {{ city.phone }}
          span или закажите обратный звонок и мы свяжемся с вами в ближайшее время
        v-btn.ma-0.mt-3(color="orange darken-3 white--text" @click.prevent="scrolling") Заказать звонок
+b.SECTION.promo._loading#promo(v-else-if="isLoading")
  v-container.fluid.fill-height
    v-layout.align-center.justify-center
      v-flex.xs12.text-xs-center
        v-progress-circular(
          :size="100"
          :width="5"
          color="orange darken-3"
          indeterminate)
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
    dialogObj: {},
    slickOptions: {
      slidesToShow: 1,
      autoplay: true,
      autoplaySpeed: 7000,
      dots: true,
      arrows: false,
      infinite: false,
      dotsClass: 'slider__dots slider__dots_inside'
    }
  }),

  watch: {
    dialog () {
      if (this.dialog) {
        document.querySelector('html').classList.add('out')
        this.$refs.slick.pause();
      } else {
        document.querySelector('html').classList.remove('out')
        this.$refs.slick.play();
      }
    }
  },

  computed: {
    ...mapGetters ({
      list: 'promo/currenCityList',
      city: 'cities/current',
      isLoading: 'promo/getLoading'
    }),
    promoList () {
      return this.list(this.city.id)
    },
    isPromo () {
      return this.promoList.length > 0
    },
    sliderKey () {
      return `${this.city.text}_${this.promoList.length}`
    }
  },

  methods: {
    showDialog (val) {
      this.dialogObj = val
      this.dialog = true
    },

    scrolling () {
      this.dialog = false
      this.$vuetify.goTo('#contacts', {
        offset: -60
      })
    }
  }
}
</script>
