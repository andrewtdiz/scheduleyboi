<template>
  <div class="flex flex-col w-full justify-center w-3/4 select-none">
        <div v-for="(week, ind) in calendar" :key="ind+50" class="flex select-none justify-around">
            <div v-for="(day, ind2) in week" :key="ind2+100" class="flex select-none cursor-pointer hover:bg-gray-200 h-16 w-16 flex items-center justify-center border justify-center" :class="dateStyle[day.type]">
                <button class="text-xl font-medium cursor-pointer select-none" >{{day.value.date()}}</button>

            </div>
        </div>
    </div>
</template>

<script>
// let moment = require('moment')


export default {
    name: 'CalendarDisplay',
    props: ['monthViewing'],
    data() {
        return {
            dateStyle: ['text-gray-400', ['bg-indigo-200', 'text-indigo-700','border-indigo-600'], 'text-gray-800', 'text-gray-800'],
            base: undefined,
            calendar: [],
            today: undefined,
        }
    },
    created () {
        
    },
    methods: {
        renderCalendar(){
            
        }
    },
}
</script>

<style>

</style>