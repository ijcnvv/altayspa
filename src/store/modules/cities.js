export default {
  namespaced: true,
  state: {
    list: [{
      id: 1,
      text: 'Абакан',
      address: 'ул. Ивана Ярыгина, 24',
      coords: [53.720601, 91.433813],
      phone: '+7 (3902) 21-44-04',
      time: 'c 10:00 до 21:00',
      img: '/img/city/abakan.jpg',
      email: '',
      vk: 'https://vk.com/altayzdrav.abakan',
      ok: 'https://www.ok.ru/zdravnitca',
      im: 'https://www.instagram.com/zdravnitsa.abakan/',
      feedback: 'https://vk.com/topic-137830954_34918995'
    },
    {
      id: 2,
      text: 'Санкт-Петербург',
      address: '7-я Красноармейская, 18',
      img: '/img/city/sankt_peterburg.jpg',
      coords: [59.911529, 30.311788],
      phone: '+7 (911) 925-51-05',
      time: 'c 10:00 до 21:00',
      email: '',
      vk: 'https://vk.com/altay_spa_spb',
      ok: '',
      im: 'https://www.instagram.com/altay.spa.spb/',
      feedback: 'https://vk.com/topic-171337360_39603675'
    },
    {
      id: 3,
      text: 'Тюмень',
      address: 'ул. 50 лет Октября, 30',
      img: '/img/city/tyumen.jpg',
      coords: [57.149533, 65.572560],
      phone: '+7 (967) 385-44-44',
      time: 'c 10:00 до 21:00',
      email: '',
      vk: 'https://vk.com/altay_spa',
      ok: '',
      im: 'https://www.instagram.com/altay.spa/',
      feedback: 'https://vk.com/topic-157723922_36577430'
    }],
    target: window.localStorage.getItem('city') || ''
  },
  getters: {
    list: state => state.list,
    listSmall: (state, getters) => getters.list.map(el => {
      return {
        value: el.id,
        text: el.text
      }
    }),
    target: state => state.target,
    current: (state, getters) => getters.list.find(value => value.id == getters.target),
    currentId: (state, getters) => getters.current ? getters.current.id : -1
  },
  mutations: {
    setCity (state, payload) {
      state.target = payload
      window.localStorage.setItem('city', state.target)
    }
  }
}