<template>
  <div v-if="warning" class="absolute top-0 w-96 right-0 mt-12 bg-red-100 border text-sm mt-2 flex flex-col justify-center border-red-400 text-red-700 pl-6 pr-12 py-3 rounded" role="alert">
            
        <div class="flex flex-col items-center">
        <p class="font-bold w-full text-left">Warning!
        <span class="block font-normal sm:inline w-full">This event was originally made in {{timeZones[timeZoneSelected].name.substring(0,3)}}. Are you sure you want to respond to this in your current time zone?</span>
        </p>
        </div>
        <span class="absolute top-0 text-red-300 hover:text-red-500 cursor-pointer right-0 px-2 py-2 mx-1" @click="$store.commit('setShowWarning', false)">
        <svg class="fill-current h-6 w-6 " role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>

    </div>
</template>

<script>
export default {
    name: 'Warning',
    props: ['warning'],
    data() {
        return {
            timeZones: [
        {
          name:'HST	Hawaii Standard Time',
          value: 0,
        },
        {
          name:'AST	Alaska Standard Time',
          value: 1,
        },
        {
          name:'PST	Pacific Standard Time',
          value: 2,
        },
        {
          name:'MST	Mountain Standard Time',
          value: 3,
        },
        {
          name:'CST	Central Standard Time',
          value: 4,
        },
        {
          name:'EST	Eastern Standard Time',
          value: 5,
        },
      ],
        }
    },
    computed: {
        timeZoneSelected() {
            return this.$store.getters.getTimeZoneSelected
        },
        showWarning() {
            return this.$store.getters.getShowWarning
        },
    },
}
</script>

<style>

</style>