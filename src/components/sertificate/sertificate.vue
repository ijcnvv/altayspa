<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION.sertificate#sertificate
  .inner
    .main__title-wrap
      h2.main__title Подарочный сертификат
    v-layout.row.wrap
      v-flex.sm6.xs12
        +e.img
      +e.V-FLEX.info.sm6.align-self-center.xs12
        +e.title.mb-3 Подарочный сертификат - лучший подарок для любимых
        +e.UL.list
          +e.item(
            v-for="(item, index) in list" 
            :key="index" 
            v-if="!isExept(index)")
            font-awesome-icon.fa-2x.fa-fw.about__ico(:icon="item.ico")
            +e.SPAN.text(v-html="item.title")
        v-btn.mt-4(v-if="isProgram" color="orange darken-3 white--text" large @click.prevent="showOrder(true)") заказать сертификат
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data: () => ({
    list: [
      {
        ico: ['far','list-alt'],
        title: 'Выберите программу или сумму подарка',
        exeptCity: [],
      },
      {
        ico: ['far','edit'],
        title: 'Заполните заявку',
        exeptCity: []
      },
      {
        ico: ['fas','car'],
        title: 'Заберите сертификат у нас или закажите доставку',
        exeptCity: [1]
      },
      {
        ico: ['fas','hand-holding-usd'],
        title: 'Оплатите заказ при получении',
        exeptCity: [1]
      },
      {
        ico: ['fas','hand-holding-usd'],
        title: 'Оплатите и получите сертификат в Таёжном SPA',
        exeptCity: [2, 3]
      }
    ]
  }),

  computed: {
    ...mapGetters({
      programs: 'programs/currenCityList',
      city: 'cities/currentId'
    }),

    isExept () {
      return index => {
        return this.list[index].exeptCity.some(el => el === this.city)
      }
    },

    isProgram () {
      return this.programs(this.city).length > 0
    }
  },

  methods: {
    ...mapMutations({
      showOrder: 'order/showForm'
    })
  }
}
</script>

