<template>
  <div class="" style="width: 400px;">
      <div v-if="step==0" class="w-full h-full flex flex-col rounded">
            <p class="font-medium text-2xl"> <span class="font-bold mr-2">Step 1:</span>Name and Dates</p>
            
            <div class="w-full flex justify-center mt-6">
                <div class="w-full flex items-center flex-col justify-center">
                    <input @keydown.enter="tryCreate" :class="(eventName.length==0 && failedCreate) ? ['', 'border-red-500'] : 'border-gray-400'" @input="setEventName($event.target.value)" :value="eventName" class="w-full rounded border focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4 sm:mb-0" placeholder="Event Name" type="text">
                    <p v-if="failedCreate && eventName.length==0" class="text-xs text-red-500">Event must have a name!</p>
                    <p v-else class="text-xs text-red-500"></p>
                </div>
                <button></button>

            </div>

            <CalendarVue @keydown.enter="tryCreate" class="mt-6" />
            <p v-if="(selectedLength==0 && failedCreate)" class="text-xs text-red-500">Event must have at least 1 date selected!</p>
            <p v-else class="text-xs text-red-500"></p>
              
            

      </div>
      <div v-if="step==1" class="w-full h-full flex flex-col rounded">
        <p class="font-medium text-2xl"> <span class="font-bold mr-2">Step 2:</span>Time Stuff</p>
            
        <div class="w-full flex mt-6">
          <p class="text-black text-lg">Between:</p>
        </div>

        <div class="w-full flex mt-6">
          <p class="text-black text-lg">Time Zone:</p>
        </div>
        
        <div class="w-full flex  mt-32">
            
        </div>
      </div>
      <div v-if="step==2" class="w-full h-full flex flex-col rounded">
        
        <div class="w-full flex justify-between mb-4 items-baseline">
                <DropDown :timeZones="timeZones" class="w-full"/>
            </div>
        <div class="flex flex-col bg-white shadow items-stretch w-full">
          <div v-for="(day,ind) in selected" :key="ind+56"  class="w-full flex justify-center">
            <timeselecteddisplay :ind="ind" :day="day" />
          </div>
              
            </div>
            <TimeRangeSelector />

            <div class="container justify-center mt-12 rounded flex items-baseline">
                <p class="text-xl text-gray-800 mr-6">Ready?</p>
                  <button @click="tryCreate" class="font-medium text-white text-xl bg-indigo-500 hover:bg-indigo-600 rounded px-4 py-2">Create Event</button>
            </div>
      </div>
  </div>
</template>

<script>
let moment = require('moment')

import CalendarVue from './calendarvue.vue'
import DropDown from './dropdown.vue'
import TimeRangeSelector from './timerangeselector.vue'
import timeselecteddisplay from './timeselecteddisplay.vue'

export default {
  name: 'CreateEvent',
  props:['step'],
  components: {
      CalendarVue,
      timeselecteddisplay,
      DropDown,
      TimeRangeSelector,
  },
  methods: {
    setEventName(val) {
      this.$store.commit('setEventName', val)
    },
    tryCreate () {
      if(this.eventName.length>0 && this.selectedLength){
        this.$store.commit('makeRoom')
      } 
      else {
        this.$store.commit('setFailedCreate', true)
        this.$store.commit('setTimeCreated', moment())

      }
    },
  },
  computed: {
    
    eventName () {
      return this.$store.getters.getEventName
    },
    failedCreate () {
      return this.$store.getters.getFailedCreate
    },
    canCreate () {
      return this.$store.getters.canCreate
    },
    selectedLength () { 
      return this.$store.getters.getSelectedLength
    },
    selected() {
      return this.$store.getters.getSelected
    },
  },
  data () {
    return {
       
      startTimes: [
        {
          value: 5,
          name: '6 A.M.'},
        {
          value: 6,
          name: '7 A.M.'},
        {
          value: 7,
          name: '8 A.M.'},
        {
          value: 8,
          name: '9 A.M.'},
        {
          value: 9,
          name: '10 A.M.'},
      ],
      endTimes: [
        {
          value: 14,
          name: '3 P.M.'},
        {
          value: 15,
          name: '4 P.M.'},
        {
          value: 16,
          name: '5 P.M.'},
        {
          value: 17,
          name: '6 P.M.'},
        {
          value: 18,
          name: '7 P.M.'},
      ],
      timeZones: [
        {
          name:'HST	Hawaii Standard Time	GMT-10:00',
          value: 0,
        },
        {
          name:'AST	Alaska Standard Time	GMT-9:00',
          value: 1,
        },
        {
          name:'PST	Pacific Standard Time	GMT-8:00',
          value: 2,
        },
        {
          name:'MST	Mountain Standard Time	GMT-7:00',
          value: 3,
        },
        {
          name:'CST	Central Standard Time	GMT-6:00',
          value: 4,
        },
        {
          name:'EST	Eastern Standard Time	GMT-5:00',
          value: 5,
        },
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
