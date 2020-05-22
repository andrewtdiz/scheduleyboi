<template>
  <div class="bg-white" style="width: 400px;">
      <div v-if="step==0" class="w-full h-full flex flex-col rounded">
            <p class="font-medium text-2xl"> <span class="font-bold mr-2">Step 1:</span>Name and Dates</p>
            
            <div class="w-full flex justify-center mt-6">
                <div class="w-full flex justify-center">
                    <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4 sm:mb-0" placeholder="Event Name" type="text">

                </div>
                <button></button>

            </div>

            <CalendarVue class="mt-6" />

      </div>
      <div v-if="step==1" class="w-full h-full flex flex-col rounded">
        <p class="font-medium text-2xl"> <span class="font-bold mr-2">Step 2:</span>Time Stuff</p>
            
        <div class="w-full flex mt-6">
          <p class="text-black text-lg">Between:</p>
        </div>
        <div class="w-full flex justify-between mt-4 items-baseline">
            <DropDown :defaultText="'8 A.M.'" :startTimes="startTimes"/>
             <p class="text-black text-lg">and</p>
            <DropDown :defaultText="'5 P.M.'" :endTimes="endTimes"/>
        </div>

        <div class="w-full flex mt-6">
          <p class="text-black text-lg">Time Zone:</p>
        </div>
        <div class="w-full flex justify-between mt-4 items-baseline">
            <DropDown :defaultText="'EST	Eastern Standard Time	GMT-5:00'" :timeZones="timeZones"/>
        </div>
        <div class="w-full flex  mt-32">
            <div class="container justify-center rounded flex items-baseline">
                <p class="text-xl text-gray-800 mr-6">Ready?</p>
                <button class="font-medium text-white text-xl bg-indigo-500 hover:bg-indigo-600 rounded px-4 py-2">Create Event</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import CalendarVue from './calendarvue.vue'
import DropDown from './dropdown.vue'

export default {
  name: 'CreateEvent',
  props:['step'],
  components: {
      CalendarVue,
      DropDown
  },
  data () {
    return {
      startTimes: ['6 A.M.', '7 A.M.', '8 A.M.', '9 A.M.', '10 A.M.'],
      endTimes: ['3 P.M.', '4 P.M.', '5 P.M.', '6 P.M.', '7 P.M.'],
      timeZones: [
        'HST	Hawaii Standard Time	GMT-10:00',
        'AST	Alaska Standard Time	GMT-9:00',
        'PST	Pacific Standard Time	GMT-8:00',
        'MST	Mountain Standard Time	GMT-7:00',
        'CST	Central Standard Time	GMT-6:00',
        'EST	Eastern Standard Time	GMT-5:00',
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
