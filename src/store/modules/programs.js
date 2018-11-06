import fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
export default {
  namespaced: true,
  state: {
    loading: false,
    list: [],
    nav: [
      'SPA для нее',
      'SPA для него',
      'Для двоих',
      'SPA-девичники',
      'Массаж',
      'Дополнительно'
    ],
    subnav: []
  },
  getters: {
    list: state => state.list,
    nav: state => state.nav,
    subnav: state => state.subnav,
    getLoading: state => state.loading,
    currenCityList: (state, getters) => city => getters.list.filter(item => item.city == city)
  },
  mutations: {
    addSubnav (state, payload) {
      state.subnav.push(payload)
    },
    delSubnav (state, payload) {
      const index = state.subnav.findIndex(el => el.value === payload)
      if(index >= 0) state.subnav.splice(index, 1)
    },
    makeSubnavList (state, payload) {
      state.subnav = payload
    },
    addProgram (state, payload) {
      state.list.push(payload)
    },

    setLoading (state, payload) {
      state.loading = payload
    },

    makeProgramList (state, payload) {
      state.list = payload
    },

    delProgram (state, payload) {
      const index = state.list.findIndex(el => el.id === payload)
      if(index >= 0) state.list.splice(index, 1)
    }
  },
  actions: {
    async addSubnav ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        const Obj = await fb.database().ref('subnav').push(payload),
          id = Obj.key,
          subnav = {
            text: payload,
            value: id
          }
 
        commit('addSubnav', subnav)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      }  
    },
    async delSubnav ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        await fb.database().ref('subnav').child(payload).remove()

        commit('common/setProcessing', false, {root: true})
        commit('delSubnav', payload)

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      } 
    },
    async delProgram ({commit, rootGetters}, payload) {
      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {        
        await fb.database().ref('program').child(payload).remove()
        await fb.storage().ref().child(`program/${payload}.jpg`).delete()

        commit('common/setProcessing', false, {root: true})
        commit('delProgram', payload)
      } catch (error) {
        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      }  
    },
    
    async addProgram ({commit, rootGetters}, payload) {

      if (rootGetters['common/getProcessing'] !== false) return false

      commit('common/setProcessing', true, {root: true})
      commit('common/cleanError', null, {root: true})

      try {
        const Obj = await fb.database().ref('program').push(payload.program),
          programId = Obj.key

        await fb.storage().ref().child(`program/${programId}.jpg`).putString(payload.image, 'data_url')

        const imgSrc = await fb.storage().ref().child(`program/${programId}.jpg`).getDownloadURL(),
          program = {
            ...payload.program,
            src: imgSrc,
            id: programId
          }

        await fb.database().ref('program').child(programId).update({
          src: imgSrc
        })
 
        commit('addProgram', program)
        commit('common/setProcessing', false, {root: true})

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('common/setProcessing', false, {root: true})
        throw error
      }      
    },

    async fetchProgramList ({commit}) {
      commit('setLoading', true)
      commit('common/cleanError', null, {root: true})

      try {
        const program = await fb.database().ref('program').once('value'),      
          programObj = program.val(),
          subnav = await fb.database().ref('subnav').once('value'),      
          subnavObj = subnav.val()
        
        let programArr = [],
        subnavArr = []

        if (programObj) {
          programArr = Object.keys(programObj).reduce((arr, key) => {
            
            const obj = {
              ...programObj[key],
              id: key
            }

            arr.push(obj)
            return arr          
          }, [])
        } 

        if (subnavObj) {
          subnavArr = Object.keys(subnavObj).reduce((arr, key) => {
            
            const obj = {
              text: subnavObj[key],
              value: key
            }

            arr.push(obj)
            return arr          
          }, [])
        } 

        commit('makeSubnavList', subnavArr)
        commit('makeProgramList', programArr)
        commit('setLoading', false)

      } catch (error) {

        commit('common/setError', error.message, {root: true})
        commit('setLoading', false)
        throw error
      } 
    }
  }
}