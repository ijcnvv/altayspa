export default {
  namespaced: true,
  state: {
    list: [{
      src: '/img/gallery/akb(1).jpg',
      preview: '/img/gallery/akb(1)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb(2).jpg',
      preview: '/img/gallery/akb(2)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb(3).jpg',
      preview: '/img/gallery/akb(3)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb (4).jpg',
      preview: '/img/gallery/akb (4)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb (5).jpg',
      preview: '/img/gallery/akb (5)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb (6).jpg',
      preview: '/img/gallery/akb (6)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/akb (7).jpg',
      preview: '/img/gallery/akb (7)_1.jpg',
      city: 'Абакан'
    },
    {
      src: '/img/gallery/tmn (1).jpg',
      preview: '/img/gallery/tmn (1)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (2).jpg',
      preview: '/img/gallery/tmn (2)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (3).jpg',
      preview: '/img/gallery/tmn (3)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (4).jpg',
      preview: '/img/gallery/tmn (4)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (5).jpg',
      preview: '/img/gallery/tmn (5)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (6).jpg',
      preview: '/img/gallery/tmn (6)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (7).jpg',
      preview: '/img/gallery/tmn (7)_1.jpg',
      city: 'Тюмень'
    },
    {
      src: '/img/gallery/tmn (8).jpg',
      preview: '/img/gallery/tmn (8)_1.jpg',
      city: 'Тюмень'
    },
    ]
  },
  getters: {
    list(state){
      return state.list
    },
    currenCityList (state, getters) {
      return city => getters.list.filter(item => item.city == city)
    }
  }
}