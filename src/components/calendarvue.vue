<template>
  <div class="flex flex-col w-full">
      <div class="w-full flex items-center text-black">
          <div  class="rounded flex w-full justify-center items-center px-3 cursor-pointer text-gray-900 hover:text-black">
            <div v-if="!canGoBack" class="opacity-0 justify-center flex text-gray-800 items-center h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-left']" />

            </div>
            <div @click="changeMonth(-1)" v-if="canGoBack" class="justify-center flex text-gray-800 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-left']" />

            </div>

            <div class="flex justify-center w-64 select-none ">
                <button class="hover:bg-gray-200 rounded font-medium text-xl px-4 mx-4 py-2 cursor-pointer">{{monthViewingDisplay}}</button>

            </div>
            
            <div @click="changeMonth(1)" class="justify-center flex text-gray-800 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-right']" class=""/>

            </div>

          </div>

      </div>
      <div class="flex justify-around mt-6">
          <div v-for="day in days" :key="day" class="flex justify-center" style="width: 50px">
            <p class="text-sm select-none" >{{day}}</p>

          </div>
      </div>

      <CalendarDisplay :today="today" :monthViewing="monthViewing" />
      
      
  </div>
</template>

<script>
let moment = require('moment')

import CalendarDisplay from './calendardisplay.vue'
export default {
    name: 'CalendarVue',
    components: {
        CalendarDisplay
    },
    data () {
        return {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            selected: [],
            monthViewing: undefined,
            today: undefined,
        }
    },
    methods: {
        changeMonth (num) {
            let newVal;
            if(num>0)   newVal = this.monthViewing.clone().add(1, 'month')
            else    newVal = this.monthViewing.clone().subtract(1,'month')
            this.monthViewing = newVal
        },
    },
    created () {
        this.today = moment()
        this.monthViewing = moment().startOf('month')
    },
    computed: {
        canGoBack () {
            return !this.monthViewing.isSame(this.today, 'month')
        },
        monthViewingDisplay() {
            let temp = this.monthViewing.clone()
            return temp.format('MMMM YYYY')
        },
    },
    watch: {
        monthViewing () {
        },
    }
}
</script>

<style>
.select-none {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>