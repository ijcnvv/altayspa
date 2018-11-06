<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION#about.about
  .inner
    +e.UL.list
      +e.item(v-for="(item, index) in list" :key="index")
        font-awesome-icon.fa-3x.about__ico(:icon="item.ico")
        +e.SPAN.text(v-html="item.title")      
</template>

<script>
export default {
  data: () => ({
    list: [{
        ico: ['fab','pagelines'],
        title: 'Натуральные природные компоненты'
      },
      {
        ico: ['fas','hand-holding-heart'],
        title: 'Искренний сервис'
      },
      {
        ico: ['fas','mortar-pestle'],
        title: 'Уникальные<br>SPA-программы'
      },
      {
        ico: ['fas','leaf'],
        title: 'Доступный<br>и полезный отдых'
      },
      {
        ico: ['fas','award'],
        title: 'Одобрено знахарями Сибири'
      }]
  })
}
</script>
