import fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

export default {
  namespaced: true,
  state: {
    list: [],
    loading: false
  },
  getters: {
    list: state => state.list,
    getLoading: state => state.loading,
    currenCityList: (state, getters) => city => getters.list.filter(item => item.city == city)
  },
  mutations: {
    addPromo (state, payload) {
      state.list.push(payload)
    },

    setLoading (state, payload) {
      state.loading = payload
    },

    makePromoList (state, payload) {
      state.list = payload
    },

    delPromo (state, payload) {
      const index = state.list.findIndex(el => el.id === payload)
      if(index >= 0) state.list.splice(index, 1)
    }
  },
  actions: {
    async delPromo ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {        
        await fb.database().ref('promo').child(payload).remove()
        await fb.storage().ref().child(`promo/${payload}.jpg`).delete()

        commit('common/setProcessing', false, {root: true})
        commit('delPromo', payload)
      } catch (error) {
        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      }  
    },
    
    async addPromo ({commit, rootGetters}, payload) {

      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        const promoObj = await fb.database().ref('promo').push(payload.promo),
          promoId = promoObj.key

        await fb.storage().ref().child(`promo/${promoId}.jpg`).putString(payload.image, 'data_url')

        const imgSrc = await fb.storage().ref().child(`promo/${promoId}.jpg`).getDownloadURL(),
          promo = {
            ...payload.promo,
            src: imgSrc,
            id: promoId
          }

        await fb.database().ref('promo').child(promoId).update({
          src: imgSrc
        })
 
        commit('addPromo', promo)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      }      
    },
    async fetchPromoList ({commit}) {
      commit('setLoading', true)
      commit('common/cleanError', null, {root: true})

      try {
        const promo = await fb.database().ref('promo').once('value'),      
          promoObj = promo.val()     
        
        let promoArr = []

        if (promoObj) {
          promoArr = Object.keys(promoObj).reduce((arr, key) => {
            
            const obj = {
              ...promoObj[key],
              id: key
            }

            arr.push(obj)
            return arr          
          }, [])
        } 

        commit('makePromoList', promoArr)        
        commit('setLoading', false)

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('setLoading', false)
        throw error
      } 
    }
  }
}
