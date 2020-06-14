<template>
  <div>

    <div class="flex justify-center pt-24 min-h-screen bg-gray-100 md:pt-32">
      <div class="flex container md:p-5 justify-between"> 
        <CreateEvent :step="0" />
        <CreateEvent :step="2" />
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
