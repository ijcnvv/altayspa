import fb from 'firebase/app'
import 'firebase/database'

export default {
  namespaced: true,
  state: {
    showForm: false,
    programId: -1,
    loading: false,
    list: []
  },
  getters: {
    showForm: state => state.showForm,
    programId: state => state.programId,
    getList: state => state.list,
    getLoading: state => state.loading
  },
  mutations: {
    showForm (state, payload) {
      state.showForm = payload
    },
    setProgramId (state, payload) {
      state.programId = payload
    },
    addOrder (state, payload) {
      state.list.push(payload)
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    makeList (state, payload) {
      state.list = payload
    },
    readOrder (state, payload) {
      const index = state.list.findIndex(el => el.id == payload)
      if (index >= 0) {
        state.list[index].read = true
      }
    },
    delOrder (state, payload) {
      const index = state.list.findIndex(el => el.id == payload)
      if (index >= 0) {
        state.list.splice(index, 1)
      }
    }
  },
  actions: {
    async addOrder ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        const Obj = await fb.database().ref('order').push(payload),
          id = Obj.key,
          order = {
            ...payload,
            id
          }
 
        commit('addOrder', order)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async readOrder ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        await fb.database().ref('order').child(payload).update({
          read: true
        })
 
        commit('readOrder', payload)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async delOrder ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        await fb.database().ref('order').child(payload).remove()
 
        commit('delOrder', payload)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },

    async fetchOrder ({commit}) {
      commit('setLoading', true)
      commit('common/cleanError', null, {root: true})

      try {
        const order = await fb.database().ref('order').once('value'),      
          obj = order.val()
        
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