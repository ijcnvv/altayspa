<template lang="pug">
div
  v-btn.ma-0(
    color="green white--text" 
    @click="dialog = true"
    ) Добавить акцию
  ul.admin__list(v-if="!dataLoading")
    li.admin__list-item(v-for="(item, index) in promoList" :key="index")
      .admin__list-img-wrap
        img.admin__list-img(:src="item.src")
      .admin__list-body
        .admin__list-row
          .admin__list-city г. {{ cityInList(item.city) }}
        .admin__list-title {{ item.title }}
        .admin__list-row {{ item.subtitle }}
        .admin__list-row
          .admin__list-desc(v-html="item.desc")        
        .admin__list-row
          v-btn.ma-0(
            color="red white--text" 
            @click="removePromo(item.id)"
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
          h2.modal__title Добавить акцию
          v-form.form(
            v-model="valid"
            ref="form")
            v-text-field(
              color="orange darken-3"
              label="Заголовок"
              :rules="titleRules"
              v-model="title"
              validate-on-blur)
            v-text-field(
              color="orange darken-3"
              label="Подзаголовок"
              v-model="subtitle"
              validate-on-blur)
            v-select.header__city(
              color="orange darken-3"
              :items="citiesList"
              v-model="city"
              label="Город")
            v-textarea(
              color="orange darken-3"
              label="Описание"
              v-model="comment"
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
    subtitle: '',
    city: 1,
    comment: '',
    imageSrc: null,
    titleRules: [
      v => !!v || 'Необходимо указать заголовок'
    ],
    commentRules: [
      v => !!v || 'Необходимо добавить описание',
      v => v.length<=1000 || 'Превышен лимит описания'
    ]
  }),

  computed: {
    ...mapGetters({
      citiesList: 'cities/listSmall',
      processing: 'common/getProcessing',
      pList: 'promo/list',
      dataLoading: 'promo/getLoading'
    }),

    promoList () {
      return this.pList.map(el => el).sort((a,b)=> a.city - b.city)
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
      addPromo: 'promo/addPromo',
      delPromo: 'promo/delPromo'
    }),

    removePromo (id) {
      if (!confirm('Подтвердите удаление')) {
        return false
      }

      this.delPromo(id)
    },

    fileUpload () {
      this.$refs.fileInput.click()
    },

    onFileChange (event) {
      const file = event.target.files[0]

      if (!file) return false
      
      imgResize(file, 1920, src => {
        this.imageSrc = src
      })          
    },

    onClose () {
      this.formReset()
    },

    onSubmit () {
      const desc = this.comment.replace(/(\r|\n)/g, "<br>"),
        promo = {
          title: this.title,
          subTitle: this.subtitle,
          city: this.city,
          desc
        }   

      this.addPromo({
        promo,
        image: this.imageSrc
      }).then(()=>{
        this.formReset()
      })
      
    },

    formReset () {
      this.title = ''
      this.subtitle = ''
      this.comment = ''
      this.imageSrc = null
      this.valid = false
      this.dialog = false
    }
  }
}
</script>
