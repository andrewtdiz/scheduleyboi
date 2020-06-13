import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    draggingStart: false,
    draggingEnd: false,
    selected: [],
    time: 1,
    eventName: 'Offical Team Meeting',
    startTimeSelected: 3,
    endTimeSelected: 12,
    timeZoneSelected: 5,
    timeCreated: 5,
    failedCreate: false,
    
    showWarning: true,

  },
  getters: {
    getTime(state) {
      return state.time
    },
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
    flipTime(state,val) {
      if ((((state.time >> val)% 2) == 0)){
        state.time += 2**val
      }else{
        state.time -= 2**val
      }
      var temp = {
        room_id: state.room_id,
        time: state.time,
      }
      this._vm.$socket.emit('sendAva',state.time)
    },
    updateSelected (state, val) {
      state.selected = val
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
    makeRoom(state){
      var temp = {
        selected: state.selected,
        eventName: state.eventName,
        startTimeSelected: state.startTimeSelected,
        endTimeSelected: state.endTimeSelected,
        timeZoneSelected: state.timeZoneSelected
      }
      this._vm.$socket.emit('makeRoom',temp)
    },

    //Socket Handlers
    SOCKET_makeRoom(state,data){
      router.push('/event/' + data.room_id)
    },
    SOCKET_joinRoom(state,data){
      Object.keys(data).forEach((u) => {
        state[u] = data[u]
      });
    },
    SOCKET_sendAva(state,data){
      state.time = data
    }
  },
  actions: {

  },
  modules: {
  }
})
