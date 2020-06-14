<template>
  <div>

    <div class="flex justify-center pt-24 min-h-screen bg-gray-100 md:pt-32">
      <div class="flex container md:p-5 justify-between"> 
        <CreateEvent :step="0" />
        <div class="flex flex-col justify-between flex-wrap w-full mt-24 pt-8" style="height: 385px">
              <div v-for="(day,ind) in selected" :key="ind+56" class="mx-2 mb-4 w-32 bg-white rounded shadow px-4 py-2 flex items-center">
                  <p class="text-gray-800">{{day.format('MMMM Do')}}</p>

              </div>
            </div>
        <CreateEvent :step="1" />
      </div>    
    </div>
    
    
  </div>
</template>

<script>
import CreateEvent from '../components/createevent.vue'

export default {
  name: 'Home',
  components: {
    CreateEvent
  },
  computed: {
    selected() {
      return this.$store.getters.getSelected
    },
  },
  data() {
    return {
      steps: [0,1]
    }
  }
}
</script>
