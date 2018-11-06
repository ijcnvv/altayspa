<template lang="pug">
div
  v-btn.ma-0(
    v-if="isSubnavList"
    color="green white--text" 
    @click="dialog = true"
    ) Добавить SPA-программу
  div(v-else) Вы не можете добавлять SPA-программы, т.к. у вас не добавлено ни одной категории
  ul.admin__list(v-if="!dataLoading")
    li.admin__list-item(v-for="(item, index) in programList" :key="index")
      .admin__list-img-wrap
        img.admin__list-img(:src="item.src")
      .admin__list-body
        .admin__list-row
          .admin__list-city г. {{ cityInList(item.city) }}
        .admin__list-title {{ item.title }} ({{ item.time }} мин, {{ item.price}} руб.)
        .admin__list-row
          .admin__list-desc(v-html="item.desc")        
        .admin__list-row
          v-btn.ma-0(
            color="red white--text" 
            @click="removeProgram(item.id)"
            :disabled="processing"
            :loading="processing"
            ) Удалить
  v-container(v-else)
    v-layout.row.mt-5
      v-flex.xs12.text-xs-center
        v-progress-circular(
          :size="100"
          :width="5"
          color="orange darken-3"
          indeterminate)
  section.modal(:class="{'modal_active': dialog}")
    v-dialog(v-model="dialog" persistent)
      v-card.modal__body(v-if="dialog")
        v-card-text
          h2.modal__title Добавить SPA-программу
          v-form.form(
            v-model="valid"
            ref="form")
            v-text-field(
              color="orange darken-3"
              label="Заголовок"
              :rules="inputRules"
              v-model="title"
              validate-on-blur)
            v-select.header__city(
              color="orange darken-3"
              :items="citiesList"
              v-model="city"
              label="Город")
            v-layout.row
              v-flex.xs6.pr-2
                v-select.header__city(
                  color="orange darken-3"
                  :items="navList"
                  v-model="navType"
                  label="Меню")
              v-flex.xs6.pl-2
                v-select.header__city(
                  color="orange darken-3"
                  :items="subnavList"
                  :rules="inputRules"
                  v-model="subnavType"
                  label="Категория")            
            v-layout.row
              v-flex.xs6.pr-2
                v-text-field(
                  color="orange darken-3"
                  label="Время (в минутах)"
                  :rules="numRules"
                  v-model="time"
                  validate-on-blur)
              v-flex.xs6.pl-2
                v-text-field(
                  color="orange darken-3"
                  label="Стоимость (в рублях)"
                  :rules="numRules"
                  v-model="price"
                  validate-on-blur)
            v-textarea(
              color="orange darken-3"
              label="Описание программы"
              v-model="comment"
              :rules="commentRules"
              counter="1000")
            v-textarea(
              color="orange darken-3"
              label="Расписание программы"
              v-model="timetable"
              :rules="commentRules"
              counter="1000")
            v-layout.row
              v-flex.xs12
                v-btn.ma-0.warning(@click="fileUpload") Добавить фото
                  v-icon(right dark) cloud_upload
                input(
                  ref="fileInput"
                  type="file" 
                  style="display: none;" 
                  accept="image/jpg"
                  @change="onFileChange")
                span.modal__img-desc Допустимый формат *.jpg
            v-layout.row
              v-flex.xs12
                img.modal__img.mt-3(:src="imageSrc" v-if="imageSrc")
            v-layout.row.justify-end
              v-btn(
                color="orange darken-3"
                flat
                @click.prevent="onClose"
                :disabled="processing") Отмена
              v-btn(
                color="orange darken-3"
                flat
                @click.prevent="onSubmit"
                :disabled="btnDisabled"
                :loading="processing") Добавить
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import imgResize from '../../tools/imgResize.js'

export default {
  data: () => ({
    dialog: false,
    valid: false,
    title: '',
    city: 1,
    navType: 0,
    subnavType: null,
    time: 0,
    price: 0,
    comment: '',
    timetable: '',
    imageSrc: null,
    inputRules: [
      v => !!v || 'Необходимо заполнить поле'
    ],
    numRules: [
      v => !!v || 'Необходимо заполнить поле',
      v => /^\d+$/.test(v) || 'Необходимо указать целое число'
    ],
    commentRules: [
      v => v.length <= 1000 || 'Превышен лимит текста'
    ]
  }),

  computed: {
    ...mapGetters({
      citiesList: 'cities/listSmall',
      processing: 'common/getProcessing',
      list: 'programs/list',
      nav: 'programs/nav',
      subnavList: 'programs/subnav',
      dataLoading: 'programs/getLoading'
    }),

    isSubnavList () {
      return this.subnavList.length > 0
    },

    navList () {
      return this.nav.map((el, index) => {
        return {
          value: index,
          text: el
        }
      })
    },    

    programList () {
      return this.list.map(el => el).sort((a,b) => a.city - b.city)
    },

    cityInList () {
      return id => {
        return this.citiesList.find(el => el.value === id).text
      }
    },

    btnDisabled () {
      return !this.valid || this.processing || !this.imageSrc
    }
  },

  methods: {
    ...mapActions({
      addProgram: 'programs/addProgram',
      delProgram: 'programs/delProgram'
    }),

    removeProgram (id) {
      if (!confirm('Подтвердите удаление')) {
        return false
      }

      this.delProgram(id)
    },

    fileUpload () {
      this.$refs.fileInput.click()
    },

    onFileChange (event) {
      const file = event.target.files[0]

      if (!file) return false

      imgResize(file, 720, src => {
        this.imageSrc = src
      })
    },

    onClose () {
      this.formReset()
    },

    onSubmit () {
      const desc = this.comment.replace(/(\r|\n)/g, "<br>"),
        timetable = this.timetable.replace(/(\r|\n)/g, "<br>"),
        program = {
          title: this.title,
          city: this.city,
          nav: this.navType,
          subnav: this.subnavType,
          price: +this.price,
          time: +this.time,
          desc,
          timetable
        }   

      this.addProgram({
        program,
        image: this.imageSrc
      }).then(()=>{
        this.formReset()
      })
      
    },

    formReset () {
      this.title = ''
      this.city = 1
      this.navType = 0
      this.subnavType = 0
      this.time = 0
      this.price = 0
      this.comment = ''
      this.timetable = ''
      this.imageSrc = null
      this.valid = false
      this.dialog = false
    }
  }
}
</script>
