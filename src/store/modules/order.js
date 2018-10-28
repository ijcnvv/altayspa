export default {
  namespaced: true,
  state: {
    showForm: false,
    name: '',
    phone: '',
    email: '',
    program: '',
    price: '',
    message: ''
  },
  getters: {
    showForm (state) {
      return state.showForm
    },
    name (state) {
      return state.name
    },
    phone (state) {
      return state.phone
    },
    email (state) {
      return state.email
    },
    program (state) {
      return state.program
    },
    price (state) {
      return state.price
    },
    message (state) {
      return state.message
    }
  },
  mutations: {
    showForm (state, payload) {
      state.showForm = payload
    },
    setName (state, payload) {
      state.name = payload     
    },
    setPhone (state, payload) {
      state.phone = payload     
    },
    setEmail (state, payload) {
      state.email = payload     
    },
    setPrice (state, payload) {
      state.price = payload     
    },
    setMessage (state, payload) {
      state.message = payload     
    },    
    setProgram (state, payload) {
      state.program = payload
    }
  }
}