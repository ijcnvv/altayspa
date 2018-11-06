import firebase from 'firebase/app'
import 'firebase/auth'

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
    },
    signOut (state) {
      state.isAuth = false
      state.uid = null
    }
  },
  actions: {
    signin ({commit, rootGetters}, payload) {

      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)     
      .then(res => {        
        commit('setUser', res.user.uid)
        commit('common/setProcessing', false, {root: true})
      })
      .catch(error => {
        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
      })      
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(()=>{
        commit('signOut')
      }).catch(error => {
        commit('common/setError', error.message, {root: true})
      })      
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload.uid)
    }
  }
}