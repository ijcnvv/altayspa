<template lang="pug">
include ../../tools/mixins.pug
+b.SECTION.contacts#contacts
  .inner.main__title-wrap
    h2.main__title Контакты
  v-layout.row.inner.justify-center.wrap
    v-flex.xs12.sm6
      +e.block
        +e.P.desc Остались вопросы? Нужна помошь или консультация? Оставьте свои контактные данные и мы вам перезвоним в ближайшее время!
        v-alert(:value="message" type="success") Сообщение отправлено
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
          +e.send-wrap
            v-btn.ma-0(
              color="orange darken-3 white--text" 
              @click.prevent="onSubmit" 
              :disabled="sendDisabled"
              :loading="processing"
              ) Отправить
        +e.H3.sub-title Наш адрес
        +e.CONTACT-INFO.info
    v-flex.xs12.sm6
      yandex-map.contacts__map(
        :coords="city.coords"
        zoom="16"
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
import {mapGetters, mapActions} from 'vuex'
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
    message: false,
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
      city: 'cities/current',
      processing: 'common/getProcessing'
    }),

    sendDisabled () {
      return !this.valid || this.processing
    },

    balloonTemplate () {
      return `<p>г. ${this.city.text}${this.city.address ? ', ' + this.city.address : ''}</p><p>Время работы ${this.city.time}</p><p>Телефон ${this.city.phone}</p>`
    }
  },
  methods: {
    ...mapActions({
      addCallback: 'contacts/addCallback'
    }),
    
    onSubmit () {     

      const format = num => num < 10 ? '0' + num : num,
        _d = new Date(),
        year = _d.getFullYear(),
        month = format(_d.getMonth() + 1),
        day = format(_d.getDate()),
        hour = format(_d.getHours()),
        min = format(_d.getMinutes()),   
        dateFormated = `${year}.${month}.${day} ${hour}:${min}`
      
      this.message = false

      this.addCallback({
        name: this.name,
        phone: this.phone,
        city: this.city.text,
        date: dateFormated,
        read: false
      }).then(()=>{
        this.message = true
        this.formReset()
      })      
    },

    formReset () {
      this.name = ''
      this.phone = ''
      this.valid = false
    }
  }
}
</script>

