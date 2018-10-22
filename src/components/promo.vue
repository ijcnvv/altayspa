<template <template lang="pug">
include ../tools/mixins.pug
+b.SECTION.promo#promo
  v-layout.row.inner.justify-center
    h2.main__title Акции

<!-- <section class="slider page__block">

  <h2 class="title title_lg">{{ title }}</h2>

  <slick ref="slick" :options="slickOptions" class="slider__list" @afterChange="handleAfterChange" @beforeChange="handleBeforeChange">

    <a v-for="(item,i) in slider" class="slider__item" @click.prevent="route(item.name)" :key="i">
      <img :src="item.src" :alt="item.alt" class="slider__img">
    </a>

  </slick>

</section> -->
</template>

 <script>
// import Slick from 'vue-slick';
// import {
//   mapGetters
// } from 'vuex';

// export default {
//   components: {
//     Slick
//   },

//   data() {
//     return {
//       swiping: false,

//       slickOptions: {
//         slidesToShow: 3,
//         centerMode: false,
//         slidesToScroll: 1,
//         dots: true,
//         infinite: false,
//         dotsClass: 'slider__dots',
//         prevArrow: '<span class="slider__arrow left"><span class="arrow arrow_left arrow_md"></span></span>',
//         nextArrow: '<span class="slider__arrow right"><span class="arrow arrow_right arrow_md"></span></span>',
//         responsive: [{
//             breakpoint: 767,
//             settings: {
//               arrows: false,
//               centerMode: true,
//               centerPadding: '0',
//               slidesToShow: 1
//             }
//           },
//           {
//             breakpoint: 991,
//             settings: {
//               arrows: false,
//               centerPadding: '0',
//               slidesToShow: 2
//             }
//           }
//         ]
//       }
//     }
//   },

//   computed: {
//     ...mapGetters({
//       slider: 'slider/list',
//       menu: 'menu/list'
//     }),

//     // заголовок страницы подтягиваем из меню
//     title() {
//       let item = this.menu.find(el => {
//         return el.name == this.$route.name
//       })
//       return item.text;
//     }
//   },

//   methods: {
//     // фикс бага для IE и FF:
//     // срабатывает клик по ссылке при свайпе
//     route(name) {
//       if (this.swiping) return false;
//       this.$router.push({
//         name
//       })
//     },

//     handleAfterChange() {
//       this.swiping = false;
//     },

//     handleBeforeChange() {
//       this.swiping = true;
//     }
//   }
// }
 </script>
