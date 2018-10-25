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
              v-card
                v-img(:src="item.img")
                v-card-title
                  h3.title {{ item.title }}
                  div(v-html="item.desc")
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data: () => ({
    nav: null,
    subnav: null
  }),

  mounted () {
    if(this.programs[0]){
      this.nav = this.programs[0].nav
      this.subnav = this.programs[0].subnav
    }
  },

  methods: {
    setNav (value) {
      this.nav = value
      this.subnav = this.subNavList[0]
    },

    setSubNav (value) {
      this.subnav = value
    }
  },

  computed: {
    ...mapGetters({
      city: 'cities/current',
      programs: 'programs/list'
    }),

    programsInCity () {
      return this.programs.filter(item => item.city == this.city.text)
    },

    isProgram () {
      return this.programsInCity.length > 0
    },

    navList () {
      return this.programsInCity.reduce((arr, item) => {
        if(!arr.some(el => el == item.nav)) arr.push(item.nav)
        return arr
      }, [])
    },

    subNavList () {
      return this.programsInCity.filter(item => item.nav == this.nav).reduce((arr, item) => {
        if(!arr.some(el => el == item.subnav)) arr.push(item.subnav)
        return arr
      }, [])
    },

    programList () {
      return this.programsInCity.filter(item => item.nav == this.nav && item.subnav == this.subnav)
    }

  }
}
</script>
