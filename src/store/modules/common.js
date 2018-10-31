export default {
  namespaced: true,
  state: {
    showOrderSertificate: false,
    processing: false,
    error: null
  },
  getters: {
    showOrder: state => state.showOrderSertificate,
    getProcessing: state => state.processing,
    getError: state => state.error
  },
  mutations: {
    changeOrder (state, payload) {
      state.showOrderSertificate = payload
    },
    setProcessing (state, payload) {
      state.processing = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    cleanError (state) {
      state.error = null
    }
  }
}