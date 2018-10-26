<template lang="pug">
include ../tools/mixins.pug
+b.city
  +e.H1.subject Укажите Ваш город
  +e.UL.list
    +e.item(v-for="(item, index) in list" :key="index" @click.prevent="setCity(item.text)")
      img.city__img(:src="item.img")
      +e.H2.title {{ item.text }}
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      list: 'cities/list'
    })
  },
  methods: {
    ...mapMutations({
      setCity: 'cities/setCity'
    })
  }
}
</script>
