<template>
  <div id="app" class="min-h-screen" style="background: #f5f5f5" @mouseup="stopDrag">
    <div v-if="!check" class="absolute flex justify-center items-center top-0 h-full w-screen" style="z-index: 10000">
      <div class=" absolute w-full h-full bg-black opacity-75">
        
      </div>
      <div class="z-10 bg-white px-12 py-6 rounded shadow-lg" style="width: 30%">
        <p class="text-4xl text-gray-800">Insert Username</p>
        <div class="h-12 w-full flex justify-center">
          <div class="h-full flex justify-center items-center opacity-100">
            <div @click="$store.commit('setColor', colorRef)" v-for="(colorRef, ind) in colors" :key="ind+44" :class="color==colorRef ? ['border-black', colorRef] : ['border-white', colorRef]" class="h-8 w-8 hover:opacity-75 cursor-pointer rounded-full border shadow-md mx-2">

            </div>
          </div>
        </div>
        <div class="flex items-center mb-2 mt-4">
          <p class="w-32">Username: </p>
          <input  type="text" placeholder="Message" class="px-2 mr-2 py-2 outline-none border border-gray-300 focus:border-gray-600 rounded appearance-none flex-1" v-model="username2" @change="$store.commit('setUsername', username)" >

        </div>
        <div class="flex items-center">
          <p class="w-32">Password: <br> <span class='text-sm'>(optional)</span> </p>
          <input  type="text" placeholder="Message" class="px-2 mr-2 py-2 outline-none border border-gray-300 focus:border-gray-600 rounded appearance-none flex-1" v-model="password" >

        </div>
        <div class="flex justify-end">
          <button class="bg-indigo-500 hover:bg-indigo-600 text-white mt-6 ml-auto px-4 py-2 rounded" @click="checkPassword">Save</button>

        </div>
      </div>
    </div>
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
  data() {
    return {
      username2: '',
      password: '',
    }
  },
  methods: {
    stopDrag() {
      this.$store.commit('setDraggingStart', false)
      this.$store.commit('setDraggingEnd', false)
    },
    makeid() {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 20; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    checkPassword(){
      this.$store.commit('checkPassword', this.password)
    },
    pushUser(){
      this.$store.commit('pushUser')
    },
  },
  computed:{
    user_id() {
      return this.$store.getters.getUserId
    },    
    color() {
      return this.$store.getters.getColor
    },  
    check() {
      return this.$store.getters.getPasswordCheck
    }, 
    username() {
      return this.$store.getters.getUsername
    },      
    colors() {
      return this.$store.getters.getColors
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
    // if (localStorage.user_id){
    //   this.$store.commit('setUserId',localStorage.user_id)
    // }
    
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
