export default {
  namespaced: true,
  state: {
    list: [{
      title: 'img 1',
      src: '/img/1.jpg',
      city: 'Абакан'
    },
    {
      title: 'img 2',
      src: '/img/2.jpg',
      city: 'Абакан'
    },
    {
      title: 'img 3',
      src: '/img/3.jpg',
      city: 'Абакан'
    },
    {
      title: 'img 1',
      src: '/img/1.jpg',
      city: 'Абакан'
    },
    {
      title: 'img 2',
      src: '/img/2.jpg',
      city: 'Абакан'
    },
    {
      title: 'img 1',
      src: '/img/1.jpg',
      city: 'Тюмень'
    },
    {
      title: 'img 3',
      src: '/img/3.jpg',
      city: 'Тюмень'
    },
    {
      title: 'img 4',
      src: '/img/4.jpg',
      city: 'Санкт-Петербург'
    }]
  },
  getters: {
    list(state){
      return state.list
    }
  }
}