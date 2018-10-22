export default {
  namespaced: true,
  state: {
    list: [{
      title: 'img 1',
      src: '/img/1.jpg'
    },
    {
      title: 'img 2',
      src: '/img/2.jpg'      
    },
    {
      title: 'img 3',
      src: '/img/3.jpg'      
    },
    {
      title: 'img 4',
      src: '/img/4.jpg'      
    }]
  },
  getters: {
    list(state){
      return state.list
    }
  }
}