import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    eventName: '',
  },
  getters: {

  },
  mutations: {
    updateSelected (state, val) {
      state.selected = val
      window.console.log(state.selected)
    },
  },
  actions: {

  },
  modules: {
  }
})
