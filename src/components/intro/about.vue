<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION#about.about
  .inner
    +e.UL.list
      +e.item(v-for="(item, i) in list" :key="i")
        font-awesome-icon.fa-3x.about__ico(:icon="item.ico")
        +e.SPAN.text(v-html="item.title")      
</template>

<script>
export default {
  data: () => ({
    list: [
      {
        ico: ['fab','pagelines'],
        title: 'Натуральные природные компоненты'
      },
      {
        ico: ['fas','hand-holding-heart'],
        title: 'Искренний сервис'
      },
      {
        ico: ['fas','mortar-pestle'],
        title: 'Эффективность уникальных<br>SPA-программ'
      },
      {
        ico: ['fas','leaf'],
        title: 'Доступный<br>и полезный отдых'
      }
    ]
  })
}
</script>
