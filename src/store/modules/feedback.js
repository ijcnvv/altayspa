export default {
  namespaced: true,
  state: {
    list: [{
      name: 'user 1',
      img: '/img/1.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!',
      city: 'Абакан'
    },
    {
      name: 'user 2',
      img: '/img/2.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!',
      city: 'Абакан'
    },
    {
      name: 'user 3',
      img: '/img/3.jpg',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum explicabo aspernatur alias numquam? Laboriosam nisi est debitis, beatae error fugiat molestias voluptas numquam iusto aliquam ipsum eum ex quam? Repellat cum esse deserunt nihil voluptate excepturi. Cumque dolores nam ipsa. Voluptas cum voluptatum quos? Sequi, quod. Accusantium amet veritatis velit!',
      city: 'Тюмень'
    }]
  },
  getters: {
    list (state) {
      return state.list
    }
  }
}