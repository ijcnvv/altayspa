export default {
  namespaced: true,
  state: {
    list: [{
      id: 1,
      title: 'Программа 1',
      img: '/img/1.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:30',
      price: '300',
      nav: 'Массаж',
      subnav: 'Общий'
    },
    {
      id: 2,
      title: 'Программа 2',
      img: '/img/2.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:50',
      price: '400',
      nav: 'Массаж',
      subnav: 'Релакс'
    },
    {
      id: 2,
      title: 'Программа 4',
      img: '/img/2.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:10',
      price: '500',
      nav: 'Массаж',
      subnav: 'Релакс'
    },
    {
      id: 3,
      title: 'Программа 3',
      img: '/img/3.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:20',
      price: '600',
      nav: 'SPA для нее',
      subnav: 'Расслабляющие'
    },
    {
      id: 2,
      title: 'Программа 4',
      img: '/img/3.jpg',
      city: 'Тюмень',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:40',
      price: '700',
      nav: 'SPA для нее',
      subnav: 'Расслабляющие'
    },
    {
      id: 2,
      title: 'Программа 5',
      img: '/img/3.jpg',
      city: 'Тюмень',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:30',
      price: '800',
      nav: 'SPA для нее',
      subnav: 'Расслабляющие'
    },
    {
      id: 2,
      title: 'Программа 6',
      img: '/img/3.jpg',
      city: 'Тюмень',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:30',
      price: '900',
      nav: 'SPA для нее',
      subnav: 'Расслабляющие'
    },

    {
      id: 2,
      title: 'Программа 10',
      img: '/img/3.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      time: '01:30',
      price: '1000',
      nav: 'SPA для нее',
      subnav: 'Расслабляющие'
    }]
  },
  getters: {
    list (state) {
      return state.list
    },
    currenCityList (state, getters) {
      return city => getters.list.filter(item => item.city == city)
    }
  }
}