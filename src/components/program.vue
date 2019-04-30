<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.program#spa(v-if="isProgram")
  .inner
    .main__title-wrap
      h2.main__title SPA меню
    +e.mobile-nav
      v-flex.xs6
        v-select.program__mobile-nav-select(
          color="orange lighten-2"
          :items="navListForSelect"
          v-model="nav"
          dark
          @change="onChangeNav")
      v-flex.xs6(v-if="isSubNavList")
        v-select.program__mobile-nav-select(
          color="orange lighten-2"
          :items="subNavList"
          v-model="subnav"
          dark
          @change="scrolling")
    v-layout.row
      +e.NAV.nav.mb-4
          +e.UL.nav-list
            +e.nav-item(
              v-for="(item, index) in navList"
              :key="index"
              @click="setNav(index)"
              :class="{'program__nav-item_active': nav == index}") {{ item }}
    v-layout.row.wrap
      v-flex.sm3.xs12
        +e.aside
          +e.NAV.sub-nav(v-if="isSubNavList")
              +e.UL.sub-nav-list
                +e.sub-nav-item(
                  v-for="(item, index) in subNavList"
                  :key="index"
                  @click="setSubNav(item.value)"
                  :class="{'program__sub-nav-item_active': subnav == item.value}") {{ item.text }}
          +e.sort(v-if="isProgramList")
            v-select(
              color="orange darken-3"
              :items="sortList"
              v-model="sort"
              label="Сортировать")
      v-flex.sm9.xs12
        +e.container(v-if="isProgramList")
          +e.UL.list
            +e.item(v-for="(item, index) in listSorted" :key="index" :class="{'program__item_hidden': !showAll && index > 3}")
              +e.V-CARD.card
                v-img.program__img(:src="item.src")
                +e.V-CARD-TITLE.body
                  +e.H3.title.mb-2 {{ item.title }}
                  +e.timetable.mb-2(v-html="item.timetable" v-if="item.timetable")
                  +e.footer
                    v-flex
                      +e.time
                        font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','clock']")
                        span {{ time(item.id) }}
                      +e.price
                        font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','ruble-sign']")
                        span {{ item.price }}
                    +e.V-BTN.btn.ma-0(color="orange darken-3 white--text" @click.prevent="showDialog(item.id)") Подробнее
          +e.show-more(v-if="showLoadMore")
            v-btn.ma-0(color="orange darken-3 white--text" large @click.prevent="showAll = true") Показать все
        +e.helper.mt-5(v-else) В данный раздел SPA-программы еще не добавлены
  v-dialog(v-model="modalMore" width="600")
    +e.V-CARD.modal-text(v-if="modalMore")
      v-card-text
        v-img.program__modal-img.mb-3(:src="dialogObj.src")
        +e.H2.title.mb-2 {{ dialogObj.title }}
        +e.desc.mb-3(v-html="dialogObj.desc" v-if="dialogObj.desc")
        div.mb-3(v-if="dialogObj.timetable")
          +e.H4.sub-title Расписание
          +e.timetable(v-html="dialogObj.timetable")
        +e.footer
          v-flex
            +e.time
              font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','clock']")
              span {{ time(programId) }}
            +e.price
              font-awesome-icon.fa-fw.program__ico.mr-2(:icon="['fas','ruble-sign']")
              span {{ dialogObj.price }}
          +e.V-BTN.btn.ma-0(color="orange darken-3 white--text" @click="showOrder") Заказать сертификат
+b.SECTION.program._loading#spa(v-else-if="isLoading")
  v-container.fluid.fill-height
    v-layout.align-center.justify-center
      v-flex.xs12.text-xs-center
        v-progress-circular(
          :size="100"
          :width="5"
          color="orange darken-3"
          indeterminate)
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
    showAll: false,
    sort: window.localStorage.getItem('sort') || 'title',
    sortList: [{
      text:'По названию',
      value:'title'
    },
     {
      text:'По времени',
      value:'time'
    },
     {
      text:'По цене',
      value:'price'
    }],
    programId: -1,
    nav: null,
    subnav: null
  }),

  mounted () {
    this.navReset()
  },

  methods: {
    ...mapMutations({
      setProgramId: 'order/setProgramId',
      changeOrder: 'order/showForm'
    }),

    showOrder () {
      this.modalMore = false
      this.setProgramId(this.programId)
      this.changeOrder(true)
    },

    showDialog (id) {
      this.programId = id
      this.modalMore = true
    },

    setNav (value) {
      this.nav = value
      if (this.isSubNavList) this.subnav = this.subNavList[0].value
      this.scrolling()
    },

    setSubNav (value) {
      this.subnav = value
      this.scrolling()
    },

    navReset (){
      if(this.isProgram){
        this.nav = this.programs[0].nav
        this.subnav = this.programs[0].subnav
      }
    },

    onChangeNav () {
      if (this.isSubNavList) this.subnav = this.subNavList[0].value
      this.scrolling()
    },

    scrolling () {
      this.$vuetify.goTo('#spa', {
        offset: -60
      })
    }
  },

  watch: {
    sort () {
      window.localStorage.setItem('sort', this.sort)
    },

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
      city: 'cities/currentId',
      list: 'programs/currenCityList',
      navList: 'programs/nav',
      subnavListFull: 'programs/subnav',
      isLoading: 'programs/getLoading'
    }),

    navListForSelect () {
      return this.navList.map((el, index) => {
        return {
          value: index,
          text: el
        }
      })
    },

    dialogObj () {
      return this.programId != -1 ? this.programs.find(el => el.id == this.programId) : {}
    },

    programs () {
      return this.list(this.city)
    },

    isProgram () {
      return this.programs.length > 0
    },

    time () {
      return id => {

        if(id < 0) return ''

        let time = +this.programs.find(el => el.id == id).time,
          hour = Math.floor(time / 60),
          min = time - hour * 60

          hour = hour > 0 ? `${hour} ${ending(hour, 'час', '','а','ов')}` : '';
          min = min > 0 ? `${min} ${ending(min, 'минут', 'а','ы','')}` : '';

        return (`${hour} ${min}`).trim()
      }
    },   

    subNavList () {
      return this.programs.filter(item => item.nav == this.nav).reduce((arr, item) => {
        if(!arr.some(el => el.value == item.subnav)) {
          const obj = this.subnavListFull.find(el => el.value == item.subnav)
          arr.push(obj)
        }
        return arr
      }, [])
    },

    isSubNavList () {
      return this.subNavList && this.subNavList.length > 0
    },
   
    programList () {
      return this.programs.filter(item => item.nav == this.nav && item.subnav == this.subnav)
    },

    isProgramList () {
      return this.programList && this.programList.length > 0
    },

    listSorted () {
      let s = this.sort

      return this.programList.sort((a,b) => {
        if (a[s] > b[s]) return 1
        if (a[s] < b[s]) return -1
        return 0
      })
    },

    showLoadMore () {
      return !this.showAll && this.programList.length > 4
    }
  }
}
</script>
