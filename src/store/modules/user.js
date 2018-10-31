import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    isAuth: false,
    uid: null
  },
  getters: {
    getAuth: state => state.isAuth
  },
  mutations: {
    setUser (state, payload) {
      state.isAuth = true
      state.uid = payload
    }
  },
  actions: {
    signin ({commit, rootGetters}, payload) {

      if (rootGetters['common/getProcessing'] === false) {

        commit('common/setProcessing', true, {root: true})
        commit('common/cleanError', null, {root: true})

        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', user.uid)
          commit('isAuth', true)
          commit('common/setProcessing', false, {root: true})
        })
        .catch(error => {
          commit('common/setError', error.message, {root: true})
          commit('common/setProcessing', false, {root: true})
        })
      }
    }
  }
}