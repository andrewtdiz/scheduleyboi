import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    draggingStart: false,
    draggingEnd: false,
    selected: [],
    eventName: 'Offical Team Meeting',
    startTimeSelected: 3,
    endTimeSelected: 12,
    timeZoneSelected: 5,
    timeCreated: 5,
    failedCreate: false,
    
    showWarning: true,

  },
  getters: {
    getDraggingStart(state) {
      return state.draggingStart
    },
    getDraggingEnd(state) {
      return state.draggingEnd
    },
    getStartTimeSelected(state) {
      return state.startTimeSelected
    },
    getShowWarning(state) {
      return state.showWarning
    },  
    getTimeCreated(state) {
      return state.timeCreated
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
    getSelected(state) {
      return state.selected
    },
    getFailedCreate(state) {
      return state.failedCreate
    },
  },
  mutations: {
    updateSelected (state, val) {

      state.selected = val
      window.console.log('updated selected', state.selected)

    },
    setDraggingStart(state, val) {
      state.draggingStart = val
    },
    setDraggingEnd(state, val) {
      state.draggingEnd = val
    },
    setShowWarning(state, val) {
      state.showWarning = val
    },
    setTimeCreated (state, val) {
      state.timeCreated = val
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
