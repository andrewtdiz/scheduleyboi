<template>
  <div class="pt-24 w-full flex flex-col items-center" >
    <div class=" flex flex-col items-center w-full">
      <div class="flex w-3/4 justify-between items-start">
         <div class="flex  flex-col items-start w-full">
          <div class="flex w-full justify-between items-center">
            <div class="flex-1 flex items-end">
              <p class="text-2xl md:text-5xl font-bold text-gray-800">{{eventName}}</p>
              <div class="flex items-center ml-6 mb-2">
                <img class=" h-10 w-10 shadow border border-white object-cover rounded-full" src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="">
                <img class="absolute ml-8 h-10 w-10 shadow border border-white object-cover rounded-full" src="https://images.unsplash.com/photo-1535419218759-c71f0a6015b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="">
                <img class="absolute ml-16 h-10 w-10 shadow border border-white object-cover rounded-full" src="https://images.unsplash.com/flagged/photo-1574282893982-ff1675ba4900?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="">
                <p class="text-sm ml-20 hover:underline cursor-pointer text-gray-700 hover:text-gray-900">+4 more</p>
              </div>
              <div class="flex flex-col ml-auto mb-2">
                <DropDown :timeZones="timeZones" :sendUp="true" :value="userTime" @changeTimeZone="changeTimeZone($event)" class="w-72 ml-auto" :warning="!timesEqual&&showWarning"/>
                
              </div>
            </div>
            
          </div>
          
          <div class="flex mt-2 mb-3 items-baseline justify-start">
            <p class="text-base font-base text-black">Created on:</p>
            <p class="text-base ml-2 font-base text-gray-700">{{timeCreated.format("dddd, MMMM Do, h:MM a")}}</p>

          </div>
          <div class="flex my-2 items-baseline justify-start">
            <div class="inline-flex justify-center w-full bg-white rounded-md border border-gray-400 px-4 py-2 bg-white leading-5 text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150">
              <p class="text-base font-base text-gray-700">{{timeZones[timeZone].name}}</p>

            </div>

          </div>

        </div>
        
        
        
      </div>


      <div v-for="(num, index) in time" :key="index+99" class="w-3/4 relative" >
        <div class="flex absolute">
          <button @click="$store.commit('flipTime',ind)" v-for="(val, ind) in 16" :key="ind+898" class="px-8 py-6 border border-gray-600 rounded m-1"  :class="(((num >> ind)% 2) == 1)? ['bg-indigo-500', 'text-white'] : ['text-indigo-500']" style="opacity: 0.2"></button>
        </div>
      </div>
      <div class="flex w-3/4 justify-between items-start ">
        <WeekSelector class="mt-20" />
        <WeekSelector class="mt-20" />
        <div class="mt-20 w-1/3 shadow-md flex-col bg-white rounded" >
          <p class="text-left font-bold px-4 py-2">Chat</p>
          <div ref="chatScroll" class="overflow-y-scroll" id="style-2" style='height: 45vh'>
            <div class=" flex flex-col mt-4 mx-4" v-for="(msg, ind) in chats" :key="ind+99">
              <div class="flex items-start">
                <div class="h-6 w-6 rounded bg-indigo-500 mt-1"></div>
                <div class="flex flex-col items-start">
                  <div class="flex items-baseline">
                    <h1 class="font-bold text-md  rounded pl-2 pr-2" >{{users[msg.user_id]}}</h1>
                    <h1 class="font-medium text-gray-500 text-xs uppercase  rounded" >{{msg.timestamp.format('LT')}}</h1>
                  </div>
                  <h1 class="block  text-md rounded px-2 py-1" >{{msg.message}}</h1>
                </div>

              </div>
            </div>
          </div>
          <div class="flex flex-between my-4 mx-6 ">
            <input  type="text" placeholder="Message" class="px-2 mr-2 py-2 outline-none border border-gray-300 focus:border-gray-600 rounded appearance-none flex-1" v-model="chatText" @keypress.enter="submitMessage">
            <button class="bg-indigo-500 text-white ml-2 hover:bg-indigo-600 px-2 rounded py-1" @click="submitMessage">Send</button>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</template>

<script>
let moment = require('moment')
import DropDown from '../components/dropdown.vue'
import WeekSelector from '../components/weekselector.vue'

export default {
  components: {
    DropDown,
    WeekSelector,
  },
  data() {
    return {
      selectedSample: [],
      chatText: '',
      timesEqual: true,
      today: moment(),
      numDates: 7,
      userTime: 2,
      timeZones: [
        {
          name:'HST	Hawaii Standard Time',
          value: 0,
        },
        {
          name:'AST	Alaska Standard Time',
          value: 1,
        },
        {
          name:'PST	Pacific Standard Time',
          value: 2,
        },
        {
          name:'MST	Mountain Standard Time',
          value: 3,
        },
        {
          name:'CST	Central Standard Time',
          value: 4,
        },
        {
          name:'EST	Eastern Standard Time',
          value: 5,
        },
      ],
    }
  },
  methods: {
    submitMessage() {
      window.console.log(this.chatText)
      this.$store.commit("sendChat" , this.chatText)
      this.chatText = ''
    },
    changeTimeZone(val) {
      this.userTime = val
    },
    makeid() {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 20; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  },
  computed: {
    userArray(){
      return this.$store.getters.getUserArray
    },
    chats(){
      return this.$store.getters.getChat
    },
    user_id() {
      return this.$store.getters.getUserId
    },
    users() {
      return this.$store.getters.getUsers
    },
    eventName () {
      return this.$store.getters.getEventName
    },
    time() {      
      return this.$store.getters.getTime
    },
    timeCreated() {
      return this.$store.getters.getTimeCreated
    },
    selected() {
      return this.$store.getters.getSelected
    },
    timeZone() {
      return this.$store.getters.getTimeZoneSelected
    },
    showWarning(){
      return this.$store.getters.getShowWarning
    },
  },
  watch: {
    userTime () {
      this.timesEqual = this.userTime==this.timeZone
      this.$store.commit('setShowWarning', true)
    },
    chats() {
      setTimeout(() => this.$refs['chatScroll'].scrollTop = this.$refs['chatScroll'].scrollHeight, 100)
    },
  },
  created() {
    this.$store.commit('setTimeCreated', moment())
    this.$socket.emit('joinRoom',{room_id: this.$route.params.id, user_id: this.makeid()})
    for (let i=0; i< this.numDates; i++){
      this.selectedSample.push(moment().clone().add(i, 'days'))
    }
    window.console.log('sending selected')
    this.$store.commit('updateSelected', this.selectedSample)
    this.timesEqual = this.userTime==this.timeZone
  },
}
</script>

<style>

#style-2::-webkit-scrollbar-track
{
	border-radius: 7px;
}

#style-2::-webkit-scrollbar
{
	width: 8px;
	background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar-thumb
{
	border-radius: 7px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #cecece;
}
</style>
