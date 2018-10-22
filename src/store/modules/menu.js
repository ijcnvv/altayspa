export default {
  namespaced: true,
  state: {
    list: [{
      title: 'Акции',
      target: '#promo'
    },
    {
      title: 'SPA меню',
      target: '#spa'
    },
    {
      title: 'Галерея',
      target: '#gallery'
    },
    {
      title: 'Отзывы',
      target: '#feedback'
    },
    {
      title: 'Контакты',
      target: '#contacts'
    }]
  },
  getters: {
    list(state) {
      return state.list
    }
  }
}