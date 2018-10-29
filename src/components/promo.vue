<template <template lang="pug">
include ../tools/mixins.pug
+b.SECTION.promo#promo(v-if="isPromo")
  slick.promo__list(
    ref="slick"
    :options="slickOptions"
    :key="city.text")
    +e.wrap(v-for="(item, i) in promoList" :key="i")
      +e.item
        +e.img._darken(:style="{backgroundImage: `url('${item.src}')`}")
        .inner
          +e.H3.title {{ item.title }}
          +e.sub-title(v-if="item.subTitle.length") {{ item.subTitle }}
          v-btn.ma-0.mt-4(color="orange darken-3 white--text" large @click.prevent="showDialog(item)") Подробнее
  v-dialog(v-model="dialog" width="auto")
    +e.V-CARD.modal-text
      v-card-title
        span.headline {{ dialogObj.title }}
      v-card-text
        div(v-html="dialogObj.desc")
        div.mt-4 Узнайте подробности по телефону {{ city.phone }} или закажите обратный звонок и мы свяжемся с вами в ближайшее время
        v-btn.ma-0.mt-3(color="orange darken-3 white--text" @click.prevent="scrolling") Заказать звонок
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
      city: 'cities/current'
    }),
    promoList () {
      return this.list(this.city.text)
    },
    isPromo () {
      return this.promoList.length > 0
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
