export default {
  state: {
    list: [{
      title: 'Акция 1',
      img: '/img/1.jpg',
      city: 'abk',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!'
    },
    {
      title: 'Акция 2',
      img: '/img/2.jpg',
      city: 'abk',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!'
    }]
  },
  getters: {
    getPromo(state){
      return state.list
    }
  }
}
