<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.program#spa(v-if="isProgram")
  .inner.main__title-wrap
    h2.main__title SPA меню
  .inner
    v-layout.row
      +e.NAV.nav.mb-4
          +e.UL.nav-list
            +e.nav-item(
              v-for="(item, index) in navList"
              :key="index"
              @click="setNav(item)"
              :class="{'program__nav-item_active': nav == item}") {{ item }}
    v-layout.row
      v-flex.sm3
        +e.NAV.sub-nav
            +e.UL.sub-nav-list
              +e.sub-nav-item(
                v-for="(item, index) in subNavList"
                :key="index"
                @click="setSubNav(item)"
                :class="{'program__sub-nav-item_active': subnav == item}") {{ item }}
            +e.sort
      v-flex.sm9
        +e.container
          +e.UL.list
            +e.item(v-for="(item, index) in programList" :key="index")
              +e.V-CARD.card
                v-img.program__img(:src="item.img")
                +e.V-CARD-TITLE.body
                  +e.H3.title.mb-2 {{ item.title }}
                  +e.timetable.mb-2(v-html="item.timetable" v-if="item.timetable.length")
                  v-layout.row.mt-2.justify-space-between.align-end
                    v-flex
                      +e.time
                        font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','clock']")
                        span {{ time(item.id) }}
                      +e.price
                        font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','ruble-sign']")
                        span {{ item.price }}
                    v-btn.ma-0(color="orange darken-3 white--text" @click.prevent="showDialog(item.id)") Подробнее
  v-dialog(v-model="modalMore" width="600")
    +e.V-CARD.modal-text(v-if="modalMore")
      v-card-text
        v-img.program__modal-img.mb-3(:src="dialogObj.img")
        +e.H2.title.mb-2 {{ dialogObj.title }}
        +e.desc.mb-3(v-html="dialogObj.desc" v-if="dialogObj.desc.length")
        div.mb-3(v-if="dialogObj.timetable.length")
          +e.H4.sub-title Расписание
          +e.timetable(v-html="dialogObj.timetable")
        v-layout.row.justify-space-between.align-end
          v-flex
            +e.time
              font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','clock']")
              span {{ time(programId) }}
            +e.price
              font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','ruble-sign']")
              span {{ dialogObj.price }}
          v-btn.ma-0(color="orange darken-3 white--text") Заказать сертификат
</template>

<script>
import { mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRubleSign, faClock } from '@fortawesome/free-solid-svg-icons'
import ending from '../tools/ending.js'

library.add(faClock, faRubleSign)

export default {
  components: {
    FontAwesomeIcon
  },

  data: () => ({
    modalMore: false,
    programId: -1,
    nav: null,
    subnav: null
  }),

  mounted () {
    this.navReset()
  },

  methods: {
    showDialog (id) {
      this.programId = id
      this.modalMore = true
    },

    setNav (value) {
      this.nav = value
      this.subnav = this.subNavList[0]
    },

    setSubNav (value) {
      this.subnav = value
      this.$vuetify.goTo('#spa', {
        offset: -60
      })
    },

    navReset (){
      if(this.isProgram){
        this.nav = this.programs[0].nav
        this.subnav = this.programs[0].subnav
      }
    }
  },

  watch: {
    programs () {
      this.navReset()
    },
    modalMore () {
      if (this.modalMore) {
        document.querySelector('html').classList.add('out')
      } else {
        document.querySelector('html').classList.remove('out')
        this.programId = -1
      }
    }
  },

  computed: {
    ...mapGetters({
      city: 'cities/currentName',
      list: 'programs/currenCityList'
    }),

    dialogObj () {
      return this.programId > -1 ? this.programs.find(el => el.id == this.programId) : {}
    },

    programs () {
      return this.list(this.city)
    },

    isProgram () {
      return this.programs.length > 0
    },

    time () {
      return id => {

        if(id < 0) return false

        let time = this.programs.find(el => el.id == id).time,
          hour = Math.floor(time / 60),
          min = time - hour * 60

          hour = hour > 0 ? `${hour} час${ending(hour, '','а','ов')}` : ''
          min = min > 0 ? `${min} минут${ending(min, 'а','ы','')}` : ''

        return (`${hour} ${min}`).trim()
      }
    },

    navList () {
      return this.programs.reduce((arr, item) => {
        if(!arr.some(el => el == item.nav)) arr.push(item.nav)
        return arr
      }, [])
    },

    subNavList () {
      return this.programs.filter(item => item.nav == this.nav).reduce((arr, item) => {
        if(!arr.some(el => el == item.subnav)) arr.push(item.subnav)
        return arr
      }, [])
    },

    programList () {
      return this.programs.filter(item => item.nav == this.nav && item.subnav == this.subnav)
    }
  }
}
</script>
