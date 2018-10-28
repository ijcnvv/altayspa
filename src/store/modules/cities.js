export default {
  namespaced: true,
  state: {
    list: [{
      text: 'Абакан',
      address: 'ул. Ивана Ярыгина, 24',
      coords: [53.720601, 91.433813],
      phone: '+7 (3902) 21-44-04',
      time: 'c 10:00 до 21:00',
      img: '/img/1.jpg',
      email: '',
      vk: 'https://vk.com/altayzdrav.abakan',
      ok: 'https://www.ok.ru/zdravnitca',
      im: 'https://www.instagram.com/zdravnitsa.abakan/',
      feedback: 'https://vk.com/topic-137830954_34918995'
    },
    {
      text: 'Санкт-Петербург',
      address: '',
      img: '/img/2.jpg',
      coords: [53.720601, 91.433813],
      phone: '',
      time: '',
      email: '',
      vk: '',
      ok: '',
      im: '',
      feedback: ''
    },
    {
      text: 'Тюмень',
      address: 'ул. Свердлова, 5/2, 2 этаж',
      img: '/img/3.jpg',
      coords: [57.158337, 65.552904],
      phone: '+7 (3452) 79-01-79',
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
    list (state) {
      return state.list
    },
    target (state) {
      return state.target
    },
    current (state, getters) {
      return getters.list.find(value => value.text == getters.target)
    },
    currentName (state, getters) {
      return getters.current ? getters.current.text : ''
    }
  },
  mutations: {
    setCity (state, payload) {
      state.target = payload
      window.localStorage.setItem('city', state.target)
    }
  }
}