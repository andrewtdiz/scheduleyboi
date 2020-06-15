import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
let moment = require('moment')

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    draggingStart: false,
    draggingEnd: false,
    colors: ['bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-indigo-500', 'bg-orange-500', 'bg-pink-500'],
    color: 'bg-indigo-500',
    password: '',
    selected: [],
    passwordCheck: false,
    chat: [],
    time: {},
    userArray: [],
    users: {},
    user_id: " ",
    user_index: -1,
    eventName: '',
    startTimeSelected: 3,
    endTimeSelected: 12,
    timeZoneSelected: 5,
    timeCreated: 5,
    failedCreate: false,
    
    showWarning: true,

  },
  getters: {
    getColors(state) {
      return state.colors
    },
    getColor(state) {
      return state.color
    },
    getPasswordCheck(state){
      return state.passwordCheck
    },
    getUsername(state) {
      return state.username
    },
    getUserArray(state){
      return state.userArray
    },
    getUserId(state){
      return state.user_id
    },
    getUsers(state){
      return state.users
    },
    getChat(state){
      return state.chat
    },
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
    // flipTime(state,val) {
    //   if ((((state.time[state.user_index] >> val)% 2) == 0)){
    //     let temp = state.time[state.user_index] + 2**val
    //     state.time.splice(state.user_index, 1, temp)

    //   }else{
    //     let temp = state.time[state.user_index] - 2**val
    //     state.time.splice(state.user_index, 1, temp)
    //   }
    //   var temp = {
    //     room_id: state.room_id,
    //     time: state.time[state.user_index],
    //   }
    //   this._vm.$socket.emit('sendAva',temp)
    // },
    sendActualTime(state,val){
      var temp = {
        room_id: state.room_id,
        time: val,
        user_id: state.user_id
      }
      console.log(state.time[state.user_id])
      Vue.set(state.time,state.user_id,val)
      val.forEach((element,index) => {
        Vue.set(state.time[state.user_id],index,element)
      });
      this._vm.$socket.emit('sendAva',temp)
    },
    setActualTime(state,data){
      console.log("User: " + data.user + "value: " + data.val)
      Vue.set(state.time,data.user,data.val)
      data.val.forEach((element,index) => {
        Vue.set(state.time[data.user],index,element)
      });
      console.log("I'm a puppy")
    },
    removeFromSelected(state, ind) {
      state.selected.splice(ind,1)
    },
    updateSelected (state, val) {
      state.selected = val
    },
    setDraggingStart(state, val) {
      state.draggingStart = val
    },
    setUserId(state,val){
      state.user_id = val
    },
    setColor(state,val){
      state.color = val
    },
    setPassword(state,val){
      state.password = val
    },
    setUsername(state,val){
      state.username = val
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
    checkPassword(state,password){
      state.password = password
      var temp = {
        user_id: state.user_id,
        username: state.username,
        color: state.color,
        password: password
      }
      this._vm.$socket.emit('passwordCheck',temp)
    },
    pushUser(state){
      var temp = {
        user_id: state.user_id,
        username: state.username,
        color: state.color,
        password: state.password
      }
      if (state.checkPassword){
        this._vm.$socket.emit('updateUser',temp)
      }
    },
    makeRoom(state){
      var tempS = []
      state.selected.forEach((d)=>{
        tempS.push({day: d,startTimeSelected: state.startTimeSelected, endTimeSelected: state.endTimeSelected})
      })
      var temp = {
        selected: tempS,
        eventName: state.eventName,
        startTimeSelected: state.startTimeSelected,
        endTimeSelected: state.endTimeSelected,
        timeZoneSelected: state.timeZoneSelected
      }
      this._vm.$socket.emit('makeRoom',temp)
    },
    sendChat(state,val){
      var temp = {message: val}
      temp.user_id = state.user_id
      state.chat.push(temp)
      temp.room_id = state.room_id
      temp.timestamp = moment()
      this._vm.$socket.emit('sendChat',temp)
    },
    updateUser(state,val){
      var temp = {}
      temp.room_id = state.room_id
      temp.username = val.username
      temp.color = val.color
      this._vm.$socket.emit('updateUser',temp)
    },

    //Socket Handlers
    SOCKET_makeRoom(state,data){
      router.push('/' + data.room_id)
    },
    SOCKET_passwordCheck(state,data){
      if (data == '1'){
        state.passwordCheck = true
      }
    },
    SOCKET_joinRoom(state,data){
      state.selected = []
      Object.keys(data).forEach((u) => {
        if (u=='selected'){
          var tempArr = []
          data[u].forEach(element => {
            var temp = element
            temp = element
            temp.day = moment(element.day)
            window.console.log(element)
            tempArr.push(temp)
          });
          state[u] = tempArr
        } else if (u=='time'){
          Object.keys(data[u]).forEach((user_id) =>{
            Vue.set(state.time,user_id,data[u][user_id])
          })
        }else if (u=='chat') {
          data[u].reverse().forEach(element => {
            element.timestamp = moment(element.timestamp)
            state.chat.push(element)
          });
        }else if (u=='users') {
          Object.keys(data[u]).forEach(user_id => {
            console.log("set users: "  + user_id , " data: " + JSON.stringify(data[u][user_id] ))
            Vue.set(state.users, user_id, data[u][user_id])
          })
        }else{
          state[u] = data[u]
        }
      });
      state.user_index = state.userArray.indexOf(state.user_id)
      console.log(state)
    },
    // SOCKET_sendAva(state,data){
    //   Object.keys(data).forEach(user => {
    //     // if (state.userArray.indexOf(user) < 0){
    //     //   state.userArray.length = state.userArray.length+1
    //     //   Vue.set(state.userArray, state.userArray.length-1, user)
    //     //   state.time.length = state.time.length+1
    //     //   Vue.set(state.time, state.time.length-1, data[user])
    //     // }else{
    //     //   state.time[user].splice(state.userArray.indexOf(user),1, data[user])
    //       Vue.set(state.time,user,data[user])
    //       data[user].forEach((value,ind)=>{
    //         // state.time[user].splice(ind,1,val)
    //         Vue.set(state.time[user],ind,value)
            
    //       })
    //     // }
    //   });
    //   console.log(state.time)
    // },
    SOCKET_updateUser(state,data){
      Object.keys(data).forEach(user_id => {
        Vue.set(state.users, user_id, data[user_id])
      });
    },
    SOCKET_sendChat(state,data){
      data.reverse().forEach(element => {
        element.timestamp = moment(element.timestamp)
        state.chat.push(element)
      });

    }
  },
  actions: {
    SOCKET_sendAva(context,data){
      Object.keys(data).forEach(user => {
        var temp = {user, val: data[user]}
        console.log(temp)
        context.commit('setActualTime',{user, val: data[user]})
      });
    },
    // sendActualTime(context,val){
    //   var temp = {
    //     room_id: context.room_id,
    //     time: val,
    //     user_id: context.user_id
    //   }
    //   console.log(context.time[context.user_id])
    //   context.commit('setActualTime',{user: context.user_id, val})
    //   this._vm.$socket.emit('sendAva',temp)
    // },

  },
  modules: {
  }
})
