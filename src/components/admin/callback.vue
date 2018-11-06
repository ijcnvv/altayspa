<template lang="pug">
div
  v-layout.row.wrap(
    v-if="!dataLoading"    
  )
    v-flex.xs12.sm3.mb-4(v-for="(item, index) in listSorted" :key="index")
      v-card.admin__card
        v-card-text.admin__card-text
          div
            div.headline {{ item.name }}
            span.grey--text г. {{ item.city }} ({{ item.date }})
          div.mt-3.mb-2
            span.grey--text Тел.: 
            a.text-xs-left.admin__link.link(
              :href="'tel:' + item.phone") {{ item.phone }}
          .admin__list-footer
            v-btn.ma-0(
              color="red"
              flat
              @click.prevent="remove(item.id)"
              :loading="processing"
              :disabled="processing || !item.read") Удалить
            v-btn.ma-0(
              color="orange darken-3"
              flat
              @click.prevent="readCallback(item.id)"
              :loading="processing"
              :disabled="processing || item.read") Прочитано
            
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
  computed: {
    ...mapGetters({
      list: 'contacts/getList',
      dataLoading: 'contacts/getLoading',
      processing: 'common/getProcessing'
    }),

    listSorted () {
      return this.list.map(el => el).sort((a,b)=>{
        const date_a = new Date(a.date).getTime(),
          date_b = new Date(b.date).getTime()

        return date_b - date_a
      })
    }
  },  

  methods: {
    ...mapActions({
      readCallback: 'contacts/readCallback',
      delCallback: 'contacts/delCallback'
    }),

    remove (id) {
      if (!confirm("Подтвердите удаление")) return false

      this.delCallback(id)
    }
  }
}
</script>
