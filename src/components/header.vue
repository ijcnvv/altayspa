<template lang="pug">
include ../tools/mixins.pug
+b.HEADER.header
  +e.service
    v-layout.row.inner(align-center justify-space-between)
      v-flex.xs2
        +e.V-SELECT.city(
          :items="cities" 
          v-model="city" 
          label="Ваш город" 
          dark)
      router-link(
        :to="{name: 'admin'}" 
        class="link") Войти
  +e.info
    v-layout.row.inner.align-center
      v-flex.xs4
        +e.CONTACT-INFO.contacts
      v-flex.xs4.header__logo-wrap
        img.header__logo(
          src="/img/logo-color.png" 
          alt="logo")
      v-flex.xs4.header__order-wrap
        +e.BUTTON.order.btn._default._lg(@click.prevent="showOrder(true)") заказать сертификат
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import contactInfo from './contactInfo'

export default {
  components: {
    contactInfo
  },

  computed: {
    ...mapGetters({
      cities: 'cities/list',
      currentCity: 'cities/current'
    }),

    city: {
      get () {
        return this.currentCity.text
      },
      set (value) {
        this.setCity(value)
      }
    }
  },

  methods: {
    ...mapMutations({
      setCity: 'cities/setCity',
      changeOrder: 'common/changeOrder'
    }),

    showOrder (val) {
      this.changeOrder(val)
    }
  }
}
</script>

<style lang="less">
.header {
  .v-input {
    margin-top: 8px;

    &__slot{
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .v-menu {
    &__content {
      left: 0 !important;
    }
  }
}
</style>
