const defaultToast = {
  active: false,
  color: '',
  message: '',
  icon: '',
  timeout: 2000
}

export const toast = {
  state: {
    obj: { ...defaultToast }
  },
  mutations: {
    toast (state, payload) {
      state.obj = { 
        ...defaultToast,
        ...payload,
        active: true
      }
    }
  },
  getters: {
    getObj (state) {
        return state.obj
    }
  }
}