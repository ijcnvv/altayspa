export default {
  namespaced: true,
  state: {
    list: [{
      text: 'Абакан',
      address: 'ул. Ивана Ярыгина, 24',
      coords: [53.720601, 91.433813],
      phone: '+7 (3902) 21-44-04',
      time: 'c 10:00 до 21:00',
      email: '',
      vk: 'https://vk.com/altayzdrav.abakan',
      ok: 'https://www.ok.ru/zdravnitca',
      im: 'https://www.instagram.com/zdravnitsa.abakan/'
    },
    {
      text: 'Санкт-Петербург',
      address: '',
      coords: [53.720601, 91.433813],
      phone: '',
      time: '',
      email: '',
      vk: '',
      ok: '',
      im: ''
    },
    {
      text: 'Тюмень',
      address: 'ул. Свердлова, 5/2, 2 этаж',
      coords: [57.158337, 65.552904],
      phone: '+7 (3452) 79-01-79',
      time: 'c 10:00 до 21:00',
      email: '',
      vk: 'https://vk.com/altay_spa',
      ok: '',
      im: 'https://www.instagram.com/altay.spa/'
    }],
    target: ''
  },
  getters: {
    list (state) {
      return state.list
    },
    target (state) {
      return state.target
    },
    current (state, getters) {
      const value = getters.list.find(value => value.text == getters.target) || getters.list[0]
      return value
    }
  },
  mutations: {
    setCity(state, payload){
      state.target = payload
    }
  }
}