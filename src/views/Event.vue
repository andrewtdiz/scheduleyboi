<template>
  <div class="pt-24 w-full flex flex-col items-center">
    <div class="container flex flex-col">
      <div class="flex justify-between items-start w-full">
         <div class="flex flex-col items-start w-full">
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

      <div class="flex h-full items-center justify-center my-4">
        
        <div class="flex justify-center items-center cursor-pointer rounded-full text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-4">
          <svg version="1.1" class="h-3 fill-current   w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 492 492" xml:space="preserve">
            <g>
              <g>
                <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
                  C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
                  c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
                  l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/>
              </g>
            </g>
          </svg>
        </div>

        
        

        <p class="text-2xl mx-3 font-bold text-gray-800">May 24th</p>

        <div class="flex justify-center items-center cursor-pointer rounded-full text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-4">
          <svg version="1.1" class="h-3 fill-current   w-3" style="transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 492 492" xml:space="preserve">
            <g>
              <g>
                <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
                  C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
                  c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
                  l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div v-for="(userKey, index) in Object.keys(users)" :key="index+99" class="" >
        <button @click="$store.commit('flipTime',ind)" v-for="ind in 16" :key="ind+898" class="px-4 py-2"  :class="(((time[userKey] >> ind)% 2) == 1)? ['bg-indigo-500', 'text-white'] : ['text-indigo-500']">{{time[userKey]}}</button>
      </div>

      <WeekSelector />
      

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
      timesEqual: true,
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
    changeTimeZone(val) {
      this.userTime = val
    },
  },
  computed: {
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
  },
  created() {
    this.$store.commit('setTimeCreated', moment())
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

</style>
