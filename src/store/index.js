import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: [],
    eventName: '',
    startTimeSelected: 3,
    endTimeSelected: 12,
    timeZoneSelected: 5,
    failedCreate: false,

  },
  getters: {
    getStartTimeSelected(state) {
      return state.startTimeSelected
    },
    getEndTimeSelected(state) {
      return state.endTimeSelected
    },
    getTimeZoneSelected(state) {
      return state.timeZoneSelected
    },
    getEventName(state) {
      return state.eventName
    },
    getSelectedLength(state) {
      return state.selected.length
    },
    getFailedCreate(state) {
      return state.failedCreate
    },
  },
  mutations: {
    updateSelected (state, val) {
      state.selected = val
    },
    setFailedCreate(state, val) {
      state.failedCreate = val
    },
    setEventName (state, val) {
      state.eventName = val
    },
    changeDropDownValue (state, {loc, val}) {
      state[loc] = val
    },
    changeStartTime(state, val) {
      state.startTimeSelected = val 
    },
    changeEndTime(state, val) {
      state.endTimeSelected = val 
    },
  },
  actions: {

  },
  modules: {
  }
})
