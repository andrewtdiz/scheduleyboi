<template>
  <div class="flex flex-col w-full">
      <div class="w-full flex items-center text-black">
          <div  class="rounded flex w-full justify-center items-center px-3 cursor-pointer text-gray-900 hover:text-black">
            <div v-if="!canMoveLeft" class="opacity-0 justify-center flex text-gray-800 items-center h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-left']" />

            </div>
            <div @click="prevMonth" v-if="canMoveLeft" class="justify-center flex text-gray-800 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-left']" />

            </div>

            <div class="flex justify-center w-64">
                <p class="hover:bg-gray-200rounded font-medium text-xl px-4 mx-4 py-2 cursor-pointer">{{monthViewing}}</p>

            </div>
            
            <div @click="nextMonth" class="justify-center flex text-gray-800 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-right']" class=""/>

            </div>

          </div>

      </div>
      <div class="flex justify-around mt-6">
          <div v-for="day in days" :key="day" class="flex select-none justify-center" style="width: 50px">
            <p class="text-sm" >{{day}}</p>

          </div>
      </div>

      <CalendarDisplay :today="today" :monthViewing="monthViewing" />
      
      
  </div>
</template>

<script>
// let moment = require('moment')

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

    },
    created () {
        
    },
    computed: {
        
        
    },
    watch: {
        
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