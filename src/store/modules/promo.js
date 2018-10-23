export default {
  namespaced: true,
  state: {
    list: [{
      title: 'Акция 1',
      src: '/img/1.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!'
    },
    {
      title: 'Акция 2',
      src: '/img/2.jpg',
      city: 'Абакан',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!'
    },
    {
      title: 'Акция 3',
      src: '/img/3.jpg',
      city: 'Тюмень',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!'
    }]
  },
  getters: {
    list (state) {
      return state.list
    }
  }
}
