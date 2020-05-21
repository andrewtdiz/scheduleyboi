<template>
  <div class="bg-white" style="width: 400px;">
      <div v-if="step==0" class="w-full h-full flex flex-col rounded">
            <p class="font-medium text-2xl"> <span class="font-bold mr-2">Step 1:</span>Name and Date</p>
            
            <div class="w-full flex justify-center mt-6">
                <div class="w-3/4 flex justify-center">
                    <input class="w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4 sm:mb-0" placeholder="Event Name" type="text">

                </div>
                <button></button>

            </div>

            <CalendarVue class="mt-6" />

      </div>
  </div>
</template>

<script>
import CalendarVue from './calendarvue.vue'

export default {
  name: 'CreateEvent',
  props:['step'],
  components: {
      CalendarVue
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
