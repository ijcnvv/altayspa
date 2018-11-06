<template lang="pug">
  section.modal(:class="{'modal_active': dialog}")
    v-dialog(v-model="dialog" persistent)
      v-card.modal__body(v-if="dialog")
        v-card-text
          h2.modal__title Заказать подарочный сертификат
          v-form.form(
            v-model="valid"
            ref="form")
            v-text-field(
              color="orange darken-3"
              label="Ваше имя *"
              :rules="nameRules"
              v-model="name"
              prepend-icon="face"
              validate-on-blur)
            v-layout.row
              v-flex.xs12.sm6.pr-2
                v-text-field(
                  color="orange darken-3"
                  label="Телефон для связи *"
                  type="tel"
                  :rules="phoneRules"
                  v-model="phone"
                  prepend-icon="phone"
                  validate-on-blur)
              v-flex.xs12.sm6.pl-2
                v-text-field(
                  color="orange darken-3"
                  label="Email"
                  type="email"
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
              label="Выберите программу из списка *"
              v-model="program"
              :items="programNameList"
              prepend-icon="receipt"
              :rules="programRules"
              :key="isPrice")
            v-select(
              v-else
              color="orange darken-3"
              label="Выберите сумму из списка *"
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
            v-alert.mt-2.mb-2(:value="message" type="success") Заказ отправлен
            v-layout.row.justify-end
              v-btn.ma-0(
                color="orange darken-3"
                flat
                @click.prevent="onClose"
                :disabled="processing") Отмена
              v-btn.ma-0.ml-2(
                color="orange darken-3"
                flat
                @click.prevent="onSubmit"
                :disabled="!valid || processing"
                :loading="processing") Отправить
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  data: () => ({
    message: false,
    valid: false,
    isPrice: false,
    permission: false,
    name: '',
    phone: '',
    email: '',
    comment: '',
    price: '',
    priceNames: [1000, 2000, 3000, 5000, 10000],
    nameRules: [
      v => !!v || 'Необходимо указать имя',
      v => /^.{2,}/.test(v) || 'Имя должно содержать не менее 2х символов'
    ],
    phoneRules: [
      v => !!v || 'Необходимо указать телефон',
      v => /^\+?(7|8)?\d{10}$/.test(v) || 'Неверный формат телефона'
    ],
    emailRules: [
      v => /^$/.test(v) || /^.+?@.+?\..+$/.test(v) || 'E-mail указан некорректно'
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
      dialog: 'order/showForm',
      programId: 'order/programId',
      list: 'programs/currenCityList',
      city: 'cities/current',
      processing: 'common/getProcessing'
    }),
    program: {
      get () {
        return this.programId || -1
      },
      set (id) {
        this.setProgramId(id)
      }
    },
    programNameList () {
      return this.list(this.city.id).map(item => {
        return {
          value: item.id,
          text: item.title
        }
      })
    },
    programName () {
      const obj = this.programNameList.find(el => el.value === this.program)
      return obj ? obj.text : ''
    }
  },
  methods: {
    ...mapMutations({
      changeOrder: 'order/showForm',
      setProgramId: 'order/setProgramId'  
    }),
    ...mapActions({
      addOrder: 'order/addOrder'
    }),
    onSubmit () {
      const format = num => num < 10 ? '0' + num : num,
        _d = new Date(),
        year = _d.getFullYear(),
        month = format(_d.getMonth() + 1),
        day = format(_d.getDate()),
        hour = format(_d.getHours()),
        min = format(_d.getMinutes()),   
        dateFormated = `${year}.${month}.${day} ${hour}:${min}`,
        desc = this.comment.replace(/(\r|\n)/g, ". ").replace(/\.{2,}/g, '.')
      
      this.message = false

      this.addOrder({
        name: this.name,
        phone: this.phone,
        comment: desc,
        email: this.email,
        city: this.city.text,
        date: dateFormated,
        read: false,
        type: this.isPrice ? 'price' : 'program',
        value: this.isPrice ? this.price : this.programName
      }).then(() => {

        this.message = true
        this.formReset()

        setTimeout(()=> {
          this.changeOrder(false)
          this.message = false
        }, 2500)
      })       
    },
    onClose () {
      this.formReset()
      this.changeOrder(false)
      this.message = false
    },
    formReset () {
      this.setProgramId(-1)
      this.name = ''
      this.phone = ''
      this.email = ''
      this.isPrice = false
      this.valid = false
      this.comment = ''
      this.price = ''
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
