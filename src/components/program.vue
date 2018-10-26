<template lang="pug">
include ../tools/mixins.pug
+b.SECTION.program#spa(v-if="isProgram")
  v-layout.row.inner.justify-center
    .inner.main__title-wrap
      h2.main__title SPA меню
  .inner
    v-layout.row
      +e.NAV.nav
          +e.UL.nav-list
            +e.nav-item(
              v-for="(item, i) in navList"
              :key="i"
              @click="setNav(item)"
              :class="{'program__nav-item_active': nav == item}") {{ item }}
    v-layout.row
      v-flex.sm3
        +e.NAV.sub-nav
            +e.UL.sub-nav-list
              +e.sub-nav-item(
                v-for="(item,i) in subNavList"
                :key="i"
                @click="setSubNav(item)"
                :class="{'program__sub-nav-item_active': subnav == item}") {{ item }}
      v-flex.sm9
        +e.container
          +e.UL.list
            +e.item(v-for="(item, i) in programList")
              +e.V-CARD.card
                v-img.program__img(:src="item.img")
                +e.V-CARD-TITLE.body
                  +e.H3.sub-title {{ item.title }}
                  +e.desc(v-html="item.desc")
                  +e.time Время {{ item.time }} ч
                  +e.price Цена {{ item.price }}
                    font-awesome-icon(icon="ruble-sign" class='fa-fw')
                  v-layout.row.align-self-end
                    v-btn(dark color="orange darken-3") Заказать сертификат
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    nav: null,
    subnav: null
  }),

  mounted () {
    this.navReset()
  },

  methods: {
    setNav (value) {
      this.nav = value
      this.subnav = this.subNavList[0]
    },

    setSubNav (value) {
      this.subnav = value
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
    }
  },

  computed: {
    ...mapGetters({
      city: 'cities/currentName',
      list: 'programs/currenCityList'
    }),

    programs () {
      return this.list(this.city)
    },

    isProgram () {
      return this.programs.length > 0
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
