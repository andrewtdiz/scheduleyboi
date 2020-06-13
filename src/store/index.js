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
      console.log(val)
      if ((((state.time >> val)% 2) == 0)){
        state.time += 2**val
      }else{
        state.time -= 2**val
      }
      this._vm.$socket.emit('sendAva')
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
      this._vm.$socket.emit('makeRoom',state.selected)
    },

    //Socket Handlers
    SOCKET_makeRoom(state,data){
      console.log(data)
      router.push('/event/' + data.roomid)
    },
    SOCKET_recieveAva(state,data){
      console.log(data)
      router.push('/event/' + data.roomid)
    }
  },
  actions: {

  },
  modules: {
  }
})
