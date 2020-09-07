export const toast = {
  state: {
    obj: {
        active: false,
        color: '',
        message: '',
        icon: ''
    }
  },
  mutations: {
    toast (state, payload) {
      state.obj = { ... payload }
    }
  },
  getters: {
    getObj (state) {
        return state.obj
    }
  }
}