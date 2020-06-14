<template>
  <div id="app" class="min-h-screen" style="background: #f5f5f5" @mouseup="stopDrag">
    <header class="absolute top-0 w-full shadow-md bg-white text-gray-700 body-font z-10">
      <div class="mx-auto w-3/4 flex flex-wrap p-2 md:p-3 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-0">
          <img src=".././public/logo2.png" class="h-12 w-12" alt="">
          <span class="ml-3 text-xl font-bold text-gray-700 tracking-wide"> <span class="text-indigo-500">FoundA</span>Time</span>
        </a>
        <div class="md:ml-auto hidden md:flex items-end h-full justify-center">
          <router-link to="/">
            <a class="mr-12 cursor-pointer hover:text-gray-900">Find a Time</a>

          </router-link>
          <a class="mr-12 cursor-pointer hover:text-gray-900">Log in</a>
        </div>
        <button class="hidden md:inline-flex items-center bg-gray-200 hover:bg-indigo-600 hover:text-white border-0 py-2 px-4 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Sign up
          
        </button>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    stopDrag() {
      this.$store.commit('setDraggingStart', false)
      this.$store.commit('setDraggingEnd', false)
    },
  },
  watch: {
    $route(to) {
      if (to.name == 'Event'){
        console.log('did i do it?')
      }
      console.log(to.name)
    },
  },
  mounted(){
    if (localStorage.user_id){
      this.$store.commit('setUserId',localStorage.user_id)
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Varela+Round');

  #app {
    font-family: 'Inter', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }



#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
