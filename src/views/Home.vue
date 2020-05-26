<template>
  <div>

    <div class="flex justify-center pt-20 min-h-screen bg-gray-100 md:pt-32">
      <div class="flex flex-wrap container md:p-5 justify-between"> 
        <CreateEvent class="" v-for="step in steps" :key="step" :step="step" />
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
  data() {
    return {
      steps: [0,1]
    }
  }
}
</script>
