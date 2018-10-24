<template lang="pug">
include ../tools/mixins.pug
+b.HEADER.header
  +e.service
    v-layout.row.inner(align-center justify-space-between)
      v-flex.xs2
        +e.V-SELECT.city(:items="cities" v-model="city" label="Ваш город" dark)
      router-link(:to="{name: 'admin'}" class="link") Войти
  +e.info
    v-layout.row.inner.align-center
      v-flex.xs4
        +b.contacts.__contacts
          +e.list
            +e.item
              +e.SPAN.name
                font-awesome-icon(icon="map-marker-alt" class='fa-fw')
              +e.A.link  {{ address }}
            +e.item(v-if="currentCity.time")
              +e.SPAN.name
                font-awesome-icon(:icon="['far','clock']" class='fa-fw')
              +e.A.link  {{ currentCity.time }}
            +e.item(v-if="currentCity.phone")
              +e.SPAN.name
                font-awesome-icon(icon="phone-volume" class='fa-fw')
              +e.A.link  {{ currentCity.phone }}
          +b.social._default
            +e.UL.list
              +e.item(v-if="currentCity.vk")
                +e.A.link(target="_blank" :href="currentCity.vk")
                  font-awesome-icon(:icon="['fab','vk']")
              +e.item(v-if="currentCity.ok")
                +e.A.link(target="_blank" :href="currentCity.ok")
                  font-awesome-icon(:icon="['fab','odnoklassniki']")
              +e.item(v-if="currentCity.im")
                +e.A.link(target="_blank" :href="currentCity.im")
                  font-awesome-icon(:icon="['fab','instagram']")
      v-flex.xs4.header__logo-wrap
        img.header__logo(src="/img/logo-color.png" alt="logo")
      v-flex.xs4.header__order-wrap
        +e.order.btn._default._lg(@click.prevent="showOrder(true)") заказать сертификат
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      cities: 'cities/list',
      currentCity: 'cities/current'
    }),

    address () {
      return `г. ${this.currentCity.text}${this.currentCity.address ? ', ' + this.currentCity.address : ''}`
    },

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
