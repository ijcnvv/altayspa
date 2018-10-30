export default {
  namespaced: true,
  state: {
    showForm: false,
    programId: -1
  },
  getters: {
    showForm (state) {
      return state.showForm
    },
    programId (state) {
      return state.programId
    },
  },
  mutations: {
    showForm (state, payload) {
      state.showForm = payload
    },
    setProgramId (state, payload) {
      state.programId = payload
    }
  }
}