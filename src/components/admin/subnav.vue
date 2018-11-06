<template lang="pug">
div
  v-layout.row.align-center
    v-flex.sm3
      v-text-field(
        color="orange darken-3"
        label="Категория"
        :rules="inputRules"
        v-model="title"
        validate-on-blur)
    v-flex.sm9.pl-3
      v-btn.ma-0(
        color="green white--text"
        @click="addItem"
        :disabled="addDisabled"
        ) Добавить
  ul.mt-5.admin__list(v-if="!dataLoading")
    li.admin__list-item(v-for="(item, index) in navList" :key="index")
      v-layout.row.align-center
        v-flex.sm3.xs7
          span {{ item.text }}
        v-flex.sm9.xs5.pl-3
          v-btn.ma-0(
            color="red white--text" 
            @click="remove(item.value)"
            :disabled="delDisabled(item.value)"
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
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data: () => ({
    title: '',
    inputRules: [
      v => !!v || 'Необходимо заполнить поле'
    ]
  }),

  computed: {
    ...mapGetters({
      navList: 'programs/subnav',
      programList: 'programs/list',
      dataLoading: 'programs/getLoading',
      processing: 'common/getProcessing'
    }),

    delDisabled () {
      return id => {
        return this.processing || this.programList.some(el => el.subnav === id)
      }
    },

    addDisabled () {
      return !this.title || this.processing
    }
  },

  methods: {
    ...mapActions({
      addSubnav: 'programs/addSubnav',
      delSubnav: 'programs/delSubnav'
    }),
    addItem () {
      if (!this.title) return false

      this.addSubnav(this.title).then(()=>{
        this.title = ''
      })
    },
    remove (id) {
      if (!confirm('Подтвердите удаление')) {
        return false
      }

      this.delSubnav(id)
    }
  }
}
</script>
