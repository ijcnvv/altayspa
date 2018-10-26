export default {
  namespaced: true,
  state: {
    list: [{
      name: 'user 1',
      img: '/img/1.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      city: 'Абакан',
      source: 'vk'
    },
    {
      name: 'user 2',
      img: '/img/2.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      city: 'Абакан',
      source: 'ok'
    },
    {
      name: 'user 3',
      img: '/img/3.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam?',
      city: 'Тюмень',
      source: 'ok'
    }]
  },
  getters: {
    list (state) {
      return state.list
    }
  }
}