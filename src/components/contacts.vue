<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.contacts#contacts
  v-layout.row.inner.justify-center
    .inner.main__title-wrap
      h2.main__title Контакты
  v-layout.row.inner.justify-center
    v-flex.xs12.sm6
      +e.block
        +e.P.desc Остались вопросы? Нужна помошь или консультация? Оставьте свои контактные данные и мы вам перезвоним в ближайшее время!
        v-form.form(v-model="valid" ref="form")
          v-text-field(label="Ваше имя" :rules="nameRules" v-model="name" prepend-icon="face" validate-on-blur )
          v-text-field(label="Телефон для связи" :rules="phoneRules" v-model="phone" prepend-icon="phone" validate-on-blur)
          v-layout.row
            v-switch.form__switch(
              label='Даю согласие на обработку моих персональных данных на основании Федерального закона №152-ФЗ "О персональных данных" от 27.07.2006 г.'
              :rules="permissionRules"
              v-model="permission"
            )
          v-layout.row.justify-end
            +e.BUTTON.btn.btn._default._lg(@click.prevent="onSubmit" :disabled="!valid") Отправить
        +e.H3.sub-title Наш адрес
        +e.CONTACT-INFO.info
    v-flex.xs12.sm6
      yandex-map(:coords="currentCity.coords" zoom="16" style="width: 600px; height: 600px;" :scroll-zoom="false")
        ymap-marker(marker-id="1" marker-type="placemark" :coords="currentCity.coords" :icon="{color: 'orange', glyph: 'dot'}" :balloonTemplate="balloonTemplate")
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
    permission: false,
    name: '',
    phone: '',
    nameRules: [
      v => !!v || 'Необходимо указать имя',
      v => v.length >= 2 || 'Имя должно содержать не менее 2х символов'
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
      currentCity: 'cities/current'
    }),
    balloonTemplate () {
      return `<p>г. ${this.currentCity.text}${this.currentCity.address ? ', ' + this.currentCity.address : ''}</p><p>Время работы ${this.currentCity.time}</p><p>Телефон ${this.currentCity.phone}</p>`
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.reset()
    }
  }
}
</script>

