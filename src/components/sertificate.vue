<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.sertificate#sertificate
  .inner.main__title-wrap
    h2.main__title Подарочный сертификат
  v-layout.row.inner
    v-flex.sm6
      +e.img  
    +e.V-FLEX.info.sm6.align-self-center
      +e.title.mb-3 Подарочный сертификат - лучший подарок<br>для любимых
      +e.UL.list
        +e.item(v-for="(item, i) in list" :key="i" v-if="item.exept != city")
          font-awesome-icon.fa-2x.fa-fw.about__ico(:icon="item.ico")
          +e.SPAN.text(v-html="item.title") 
      v-btn.mt-4(color="orange darken-3 white--text" large @click.prevent="showOrder(true)") заказать сертификат
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  data: () => ({
    list: [
      {
        ico: ['far','list-alt'],
        title: 'Выберите программу или сумму подарка',
        exept: ''
      },
      {
        ico: ['far','edit'],
        title: 'Заполните заявку',
        exept: ''
      },
      {
        ico: ['fas','car'],
        title: 'Заберите сертификат у нас или закажите доставку',
        exept: 'Абакан'
      },
      {
        ico: ['fas','hand-holding-usd'],
        title: 'Оплатите заказ при получении',
        exept: ''
      }
    ]
  }),

  computed: {
    ...mapGetters({
      city: 'cities/currentName'
    })
  },

  methods: {
    ...mapMutations({
      showOrder: 'order/showForm'
    })
  }
}
</script>

