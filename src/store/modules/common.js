export default {
  namespaced: true,
  state: {
    showOrderSertificate: false,
    showRegisterOnline: false,
    processiong: false,
    someError: false
  },
  getters: {
    showOrder (state) {
      return state.showOrderSertificate
    },
    showRegister (state) {
      return state.showRegisterOnline
    }
  },
  mutations: {
    changeOrder (state, payload) {
      state.showOrderSertificate = payload
    },
    changeRegister (state, payload) {
      state.showRegisterOnline = payload
    }
  },
  actions: {
    sendOrder ({commit}, payload) {
      commit('changeOrder', payload)
    }
  }
}