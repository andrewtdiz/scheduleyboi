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
      <div v-for="(week, ind) in calendar" :key="ind+50" class="flex justify-around mt-6">
          <div v-for="(day, ind2) in week" :key="ind2+100" class="flex select-none justify-center" :class="dateStyle[day.type+1]" style="width: 50px">
            <p class="text-sm" >{{day.number}}</p>

          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'CalendarVue',
    data () {
        return {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            calendar: [],
            dateStyle: ['text-red-500', 'text-green-500', 'text-gray-800', 'text-gray-800']
        }
    },
    methods: {
        daysInMonth (year, month) {
            return new Date(year, month, 0).getDate();
        },
        firstDayOfWeek (year, month, day, weekday) {
            if(day<8) {
                let prevMonthDays = this.daysInMonth(year, month-1)
                return prevMonthDays[prevMonthDays.length - 1 - weekday]
            } else {
                return day - weekday
            }
        },
    },
    mounted () {
        let currentYear = 2020
        let currentMonth = new Date().getMonth()+1
        let currentDay = new Date().getDate()
        let weekDay = new Date().getDay()
        let lastMonthLength = this.daysInMonth(currentYear,currentMonth-1)
        let nextMonthLength = this.daysInMonth(currentYear,currentMonth+1)
        let arr = []
        let firstDay = this.firstDayOfWeek(currentYear, currentMonth, currentDay, weekDay)
        
        let lastMonth = (currentDay<8)
        let nextMonth = false
        let inc = 1

        for(let i=0; i<29; i++) {
            if((i%7==0 && i!=0)) {
                this.calendar.push(arr)
                arr = []
            }
            arr.push({
                number: nextMonth ? inc : firstDay+i, 
                type: (firstDay+i<currentDay) ? -1 : nextMonth ? 2 : currentDay==firstDay+i ? 0  : 1
            })
            if(nextMonth) inc++
            if(lastMonthLength == firstDay+i) {
                lastMonth = false
            }
            window.console.log(lastMonth)
            if(nextMonthLength == firstDay+i) {
                nextMonth = true
            }

        }

        
    }
}
</script>

<style>

</style>