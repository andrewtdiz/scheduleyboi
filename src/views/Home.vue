<template>
  <div>
    <header class="fixed top-0 w-full shadow bg-white text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-2 md:p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Scheduley Boi</span>
        </a>
        <div class="md:ml-auto hidden md:flex items-end h-full justify-center">
          <a class="mr-12 cursor-pointer hover:text-gray-900">Get Started</a>
          <a class="mr-12 cursor-pointer hover:text-gray-900">Log in</a>
        </div>
        <button class="hidden md:inline-flex items-center bg-gray-200 hover:bg-indigo-600 hover:text-white border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Sign up
          
        </button>
      </div>
    </header>
    <div class="flex justify-center mt-20 md:mt-32">
      <div class="flex flex-wrap container justify-around"> 
        <CreateEvent class="md:mx-12" v-for="step in steps" :key="step" :step="step" />
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
