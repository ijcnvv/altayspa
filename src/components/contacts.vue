<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.contacts#contacts
  .inner.main__title-wrap
    h2.main__title Контакты
  v-layout.row.inner.justify-center
    v-flex.xs12.sm6
      +e.block
        +e.P.desc Остались вопросы? Нужна помошь или консультация? Оставьте свои контактные данные и мы вам перезвоним в ближайшее время!
        v-form.form(
          v-model="valid"
          ref="form")
          v-text-field(
            color="orange darken-3"
            label="Ваше имя"
            :rules="nameRules"
            v-model="name"
            prepend-icon="face"
            validate-on-blur)
          v-text-field(
            color="orange darken-3"
            label="Телефон для связи"
            :rules="phoneRules"
            v-model="phone"
            prepend-icon="phone"
            validate-on-blur)
          v-layout.row
            v-switch.form__switch(
              color="orange darken-3"
              label='Даю согласие на обработку моих персональных данных на основании Федерального закона №152-ФЗ "О персональных данных" от 27.07.2006 г.'
              :rules="permissionRules"
              v-model="permission")
          v-layout.row.justify-start
            v-btn.ma-0.mt-4(color="orange darken-3 white--text" large @click.prevent="onSubmit" :disabled="!valid") Отправить
        +e.H3.sub-title Наш адрес
        +e.CONTACT-INFO.info
    v-flex.xs12.sm6
      yandex-map.contacts__map(
        :coords="city.coords"
        zoom="16"
        style="width: 600px; height: 600px;"
        :scroll-zoom="false")
        ymap-marker(
          marker-id="1"
          marker-type="placemark"
          :coords="city.coords"
          :icon="{color: 'orange', glyph: 'dot'}"
          :balloonTemplate="balloonTemplate")
</template>

<script>
import {yandexMap, ymapMarker} from 'vue-yandex-maps'
import {mapGetters} from 'vuex'
import contactInfo from './contactInfo'

export default {
  components: {
    yandexMap,
    ymapMarker,
    contactInfo
  },
  data: () => ({
    valid: false,
    permission: true,
    name: '',
    phone: '',
    nameRules: [
      v => !!v || 'Необходимо указать имя',
      v => /^.{2,}/.test(v) || 'Имя должно содержать не менее 2х символов'
    ],
    phoneRules: [
      v => !!v || 'Необходимо указать телефон',
      v => /^\+?(7|8)?\d{10}$/.test(v) || 'Неверный формат телефона'
    ],
    permissionRules: [
      v => !!v || 'Необходимо дать согласие на обработку персональных данных'
    ]
  }),
  computed: {
    ...mapGetters ({
      city: 'cities/current'
    }),
    balloonTemplate () {
      return `<p>г. ${this.city.text}${this.city.address ? ', ' + this.city.address : ''}</p><p>Время работы ${this.city.time}</p><p>Телефон ${this.city.phone}</p>`
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.reset()
    }
  }
}
</script>

