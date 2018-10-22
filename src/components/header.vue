<template lang="pug">
include ../tools/mixins.pug
+b.HEADER.header
  v-layout.row.inner(align-center justify-space-between)
    v-flex(xs2)
      +e.V-SELECT.city(:items="cities" v-model="city" label="Ваш город")
    router-link(:to="{name: 'admin'}") Авторизоваться
  v-layout.row.inner.justify-space-between
    +e.contacts контакты
    +e.logo лого
    +e.order заказать сертификат
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      cities: 'cities/list',
      current: 'cities/current'
    }),
    city: {
      get(){
        return this.current.text
      },
      set(value){
        this.setCity(value)
      }
    }
  },
  methods: {
    ...mapMutations({
      setCity: 'cities/setCity'
    })
  }
}
</script>

<style lang="less">
.v-input {
  &__slot{
    flex-direction: column;
    align-items: flex-start;
  }
}
.v-menu{
  &__content{
    left: 0 !important;
  }
}
</style>
