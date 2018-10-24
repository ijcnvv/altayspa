<template lang="pug">
  section.modal(:class="{'modal_active': dialog}")
    v-dialog(v-model="dialog" persistent)
      v-card.modal__body(v-if="dialog")
        v-card-title
          span.headline Заказать подарочный сертификат
        v-card-text
          v-form(v-model="valid" ref="form")
            v-text-field(label="Ваше имя" :rules="nameRules" v-model="name" prepend-icon="face" validate-on-blur)
            v-text-field(label="Телефон для связи" :rules="phoneRules" v-model="phone" prepend-icon="phone" validate-on-blur)
            v-text-field(label="Email" :rules="emailRules" v-model="email" prepend-icon="email" validate-on-blur)
            v-layout.row
              v-switch.modal__switch.modal__switch_no_message(label="Заказать сертификат на определенную сумму" v-model="isPrice")
            v-select(label="Выберите программу из списка" v-model="program" :items="programNames" prepend-icon="receipt" :rules="programRules" v-if="!isPrice" :key="isPrice")
            v-select(label="Выберите сумму из списка" v-model="price" :items="priceNames" prepend-icon="money" :rules="priceRules" v-else :key="isPrice")
            v-textarea(label="Комментарий" hint="Вы можете указать в какое время вам позвонить" prepend-icon="subject" v-model="comment")
            v-layout.row
              v-switch.modal__switch(label='Даю согласие на обработку моих персональных данных на основании Федерального закона №152-ФЗ "О персональных данных" от 27.07.2006 г.' :rules="permissionRules" v-model="permission")
            v-layout.row.justify-end
              v-btn(color="blue darken-1" flat @click.prevent="changeOrder(false)") Отмена
              v-btn(color="blue darken-1" flat @click.prevent="onSubmit" :disabled="!valid") Отправить
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
      programs: 'programs/list',
      city: 'cities/current'
    }),
    programNames () {
      return this.programs.filter(item => item.city == this.city.text).map(item => item.title)
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
      this.name = ''
      this.phone = ''
      this.email = ''
      this.program = ''
      this.price = ''
      this.comment = ''
      this.isPrice = false
      this.permission = false

      this.sendOrder(false)
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

<style lang="less">
@import '../less/val';

.modal {
  textarea {
    height: 50px;
  }

  .v-input {
    margin-top: 8px;

    &__slot {
      flex-direction: column;
      align-items: flex-start;
    }

    &--switch {
      &__track {
        &.accent--text{
          color: @color-default;
        }
      }
    }
  }

  .v-menu {
    &__content {
      left: 0 !important;
      top:0 !important;
    }
  }

  .v-dialog {
    overflow: visible;
  }

  .v-messages {
    &__message {
      color: @color-danger;
    }
  }

  .v-text-field {
    &__slot{
      width: 100%;
    }
  }

  &__switch {
    .v-input__slot {
      flex-direction: row;
      margin-bottom: 0;
    }

    &_no_message {
      .v-messages {
        display: none;
      }
    }
  }
}

</style>
