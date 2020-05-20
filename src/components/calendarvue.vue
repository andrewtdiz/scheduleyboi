<template>
  <div class="flex flex-col w-full">
      <div class="w-full flex items-center text-black">
          <div class="rounded flex w-full justify-center items-center px-3 cursor-pointer text-gray-900 hover:text-black">
            <div class="justify-center flex text-gray-600 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-left']" class=""/>

            </div>

            <div class="flex justify-center">
                <p class="hover:bg-gray-200 rounded font-medium text-xl px-4 mx-4 py-2 cursor-pointer">May 2020</p>

            </div>
            
            <div class="justify-center flex text-gray-600 items-center hover:bg-gray-400 hover:text-black h-6 w-6 rounded-full">
                <font-awesome-icon :icon="['fas', 'caret-right']" class=""/>

            </div>

          </div>

      </div>
      <div class="flex justify-around mt-6">
          <div v-for="day in days" :key="day" class="flex select-none justify-center" style="width: 50px">
            <p class="text-sm" >{{day}}</p>

          </div>
      </div>
      <!-- <div v-for="week in weeks" :key="week" class="flex justify-around py-2" style="width: 50px">
          <div v-for="day in week" :key="day" class=""> 
              <p class="text-sm">Day</p>
          </div>
      </div> -->
  </div>
</template>

<script>
export default {
    name: 'CalendarVue',
    data () {
        return {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            calendar: []
        }
    },
    methods: {
        daysInMonth (year, month) {
            return new Date(year, month, 0).getDate();
        },
        firstDayOfWeek (year, month, day) {
            if(day<8) {
                let prevMonthDays = this.daysInMonth(year, month-1)
                prevMonthDays = prevMonthDays.splice(prevMonthDays.length - new Date().getDay())
            }
            let prevMonthDays = this.daysInMonth()
        },
    },
    mounted () {
        let currentYear = new Date().getFullYear()
        let currentMonth = new Date().getMonth()+1
        let currentDay = new Date().getDate()
        let monthDays = this.daysInMonth(2020, currentMonth)
        let arr = []

        for(let i=0; i<28; i++) {
            if(i%7==0) arr = []
            arr.push(currentDay==0 ? {
                number: this.days[currentDay], 
                type: 0
            } : {
                number: this.firstDayOfWeek(currentYear, currentMonth, currentDay), 
                type: -1
            })

        }

        
    },
}
</script>

<style>

</style>