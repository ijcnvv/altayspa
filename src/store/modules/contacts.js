import fb from 'firebase/app'
import 'firebase/database'

export default {
  namespaced: true,
  state: {
    list: [],
    loading: false
  },
  getters: {
    getList: state => state.list,
    getLoading: state => state.loading
  },
  mutations: {
    addCallback (state, payload) {
      state.list.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    makeList (state, payload) {
      state.list = payload
    },
    readCallback (state, payload) {
      const index = state.list.findIndex(el => el.id == payload)
      if (index >= 0) {
        state.list[index].read = true
      }
    },
    delCallback (state, payload) {
      const index = state.list.findIndex(el => el.id == payload)
      if (index >= 0) {
        state.list.splice(index, 1)
      }
    }
  },
  actions: {
    async addCallback ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        const Obj = await fb.database().ref('callback').push(payload),
          id = Obj.key,
          callback = {
            ...payload,
            id
          }
 
        commit('addCallback', callback)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async readCallback ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        await fb.database().ref('callback').child(payload).update({
          read: true
        })
 
        commit('readCallback', payload)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async delCallback ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        await fb.database().ref('callback').child(payload).remove()
 
        commit('delCallback', payload)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async fetchCallback ({commit}) {
      commit('setLoading', true)
      commit('common/cleanError', null, {root: true})

      try {
        const callback = await fb.database().ref('callback').once('value'),      
          obj = callback.val()
        
        let list = []

        if (obj) {
          list = Object.keys(obj).reduce((arr, key) => {
            arr.push({...obj[key], id: key})
            return arr
          }, [])
        }

        commit('makeList', list)
        commit('setLoading', false)

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('setLoading', false)
        throw error
      } 
    }
  }
}