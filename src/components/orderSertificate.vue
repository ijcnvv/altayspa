<template lang="pug">
  section.modal(:class="{'modal_active': dialog}")
    v-dialog(v-model="dialog" persistent)
      v-card.modal__body(v-if="dialog")
        v-card-title
          span.headline Заказать подарочный сертификат
        v-card-text
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
            v-text-field(
              color="orange darken-3"
              label="Email"
              :rules="emailRules"
              v-model="email"
              prepend-icon="email"
              validate-on-blur)
            v-layout.row
              v-switch.form__switch.form__switch_no_message(
                color="orange darken-3"
                label="Заказать сертификат на определенную сумму"
                v-model="isPrice")
            v-select(
              v-if="!isPrice"
              color="orange darken-3"
              label="Выберите программу из списка"
              v-model="program"
              :items="programNames"
              prepend-icon="receipt"
              :rules="programRules"
              :key="isPrice")
            v-select(
              v-else
              color="orange darken-3"
              label="Выберите сумму из списка"
              v-model="price"
              :items="priceNames"
              prepend-icon="money"
              :rules="priceRules"
              :key="isPrice")
            v-textarea(
              color="orange darken-3"
              label="Комментарий"
              hint="Вы можете указать в какое время вам позвонить"
              prepend-icon="subject"
              v-model="comment")
            v-layout.row
              v-switch.form__switch(
                color="orange darken-3"
                label='Даю согласие на обработку моих персональных данных на основании Федерального закона №152-ФЗ "О персональных данных" от 27.07.2006 г.'
                :rules="permissionRules"
                v-model="permission")
            v-layout.row.justify-end
              v-btn(
                color="orange darken-3"
                flat
                @click.prevent="changeOrder(false)") Отмена
              v-btn(
                color="orange darken-3"
                flat
                @click.prevent="onSubmit"
                :disabled="!valid") Отправить
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  data: () => ({
    valid: false,
    isPrice: false,
    permission: false,
    name: '',
    phone: '',
    email: '',
    program: '',
    comment: '',
    price: '',
    priceNames: [1000, 2000, 3000, 5000, 10000],
    nameRules: [
      v => !!v || 'Необходимо указать имя',
      v => v.length >= 2 || 'Имя должно содержать не менее 2х символов'
    ],
    phoneRules: [
      v => !!v || 'Необходимо указать телефон',
      v => /^\+?(7|8)?\d{10}$/.test(v) || 'Неверный формат телефона'
    ],
    emailRules: [
      v => !!v || 'Необходимо указать E-mail',
      v => /^.+?@.+?\..+$/.test(v) || 'E-mail указан некорректно'
    ],
    programRules: [
      v => !!v || 'Необходимо выбрать программу'
    ],
    priceRules: [
      v => !!v || 'Необходимо выбрать сумму'
    ],
    permissionRules: [
      v => !!v || 'Необходимо дать согласие на обработку персональных данных'
    ]
  }),
  computed: {
    ...mapGetters({
      dialog: 'common/showOrder',
      list: 'programs/currenCityList',
      city: 'cities/currentName'
    }),
    programNames () {
      return this.list(this.city).map(item => item.title)
    }
  },
  methods: {
    ...mapMutations({
      changeOrder: 'common/changeOrder'
    }),
    ...mapActions({
      sendOrder: 'common/sendOrder'
    }),
    onSubmit () {
      this.sendOrder(false)
      this.$refs.form.reset()
    }
  },
  watch: {
    dialog () {
      if (this.dialog) {
        document.querySelector('html').classList.add('out')
      } else {
        document.querySelector('html').classList.remove('out')
      }
    }
  }
}
</script>
