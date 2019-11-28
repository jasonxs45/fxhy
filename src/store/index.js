import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    user: {
      id: '',
      lastName: '',
      lastTel: ''
    }
  },
  actions: {
  },
  mutations: {
    lastSuggest (state, opt) {
      const { LastSuggestName, LastSuggestTel } = opt
      state.lastName = LastSuggestName
      state.lastTel = LastSuggestTel
    }
  },
  getters: {
  },
  modules: {
  }
})
export default store
