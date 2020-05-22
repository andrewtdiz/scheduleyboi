<template>
  <div  @mouseleave="dragging = -1" @mouseup="dragging = -1" class="mt-2 flex flex-col w-full justify-center w-3/4 select-none">
        <div v-for="(week, ind) in calendar" :key="ind+50" class="flex select-none justify-around">
            <div @mouseenter="handleDrag(day.date)" @mousedown="startDrag(day.date)" v-for="(day, ind2) in week" :key="ind2+100" class="flex box select-none noselect cursor-pointer items-center justify-center justify-center" :class="dateStyle[day.type]">
                <h1 class="text-xl font-medium cursor-pointer select-none noselect" style="user-select: none !important;" >{{day.date.date()}}</h1>

            </div>
        </div>
    </div>
</template>

<script>
//  let moment = require('moment')


export default {
    name: 'CalendarDisplay',
    props: ['monthViewing', 'today'],
    data() {
        return {
            dateStyle: [['text-gray-300', 'cursor-not-allowed'], ['text-gray-700', 'hover:z-10'], ['text-gray-700', 'hover:bg-gray-100','hover:z-10'], ['text-indigo-600', 'bg-indigo-200', 'hover:z-10'], ['text-gray-400']],
            base: undefined,
            calendar: [],
            selected: [],
            startDragDate: undefined,
            dragging: -1,
            previousStart: undefined,
            previousDate: undefined,
        }
    },
    created () {
        this.renderCalendar()
    },
    watch: {
        monthViewing() {
            this.renderCalendar()
        },
        selected () {
            this.renderCalendar()
            this.$store.commit('updateSelected', this.selected)
        }
    },
    methods: {
        renderCalendar(){
            this.calendar = []
            let arr = []
            if(this.monthViewing.isSame(this.today, 'month')) {
                this.base = this.today.clone().startOf('month').startOf('week');
            } else {
                this.base = this.monthViewing.clone().startOf('week');
            }
            let rows; 
            if(this.monthViewing.clone().daysInMonth()+this.monthViewing.clone().day()>=36){
                rows = 6
            } else {
                rows = 5
            }
            for(let i=0; i<rows*7; i++) {
                arr.push({
                    type: this.typeCalculator(i),
                    date: this.base.clone().add(i,'days'),
                })
                if((i+1)%7==0 && i!=0) {
                    this.calendar.push(arr)
                    arr = []
                }
            }
        },
        selectedContains (date) {
            for(let i=0; i<this.selected.length; i++) {
                if (date.clone().isSame(this.selected[i], 'days')) {
                    return true
                }
            }
            return false
        },
        selectDate (date) {
            
            if(!(date.clone().diff(this.today.clone(), 'days') <= -1) && !this.selectedContains(date)) this.selected.push(date)
            else {
                 for(let i=0; i<this.selected.length; i++) {
                    if (date.clone().isSame(this.selected[i], 'days')) {
                        this.selected.splice(i,1)
                        return 0
                    }
                }
            }
            return 1

        },
        startDrag(date){
            this.dragging = this.selectDate(date)
            this.startDragDate = date
        },
        handleDrag(date) {
            if (this.dragging ==1) {
                this.previousStart = this.startDragDate.clone()
                this.previousDate = date.clone()
                this.changeSelects(this.previousStart, this.previousDate, 0)
                window.console.log(this.previousStart.clone().date(), this.previousDate.clone().date())
                this.changeSelects(this.startDragDate, date, 1)
            } else if (this.dragging == 0) {
                this.changeSelects(this.startDragDate, date, 0)

            }
        },
        changeSelects(dragstart, date, change) {
                let weeksSpanned =  date.clone().week() - dragstart.clone().week()
                let daysSpanned = date.clone().day() - dragstart.clone().day() 
                let i = weeksSpanned
                let j = daysSpanned
                let doubleBreak = false
                while(!doubleBreak) {
                    if(change && !this.selectedContains(dragstart.clone().add(i, 'weeks').add(j, 'days'))) this.selected.push(dragstart.clone().add(i, 'weeks').add(j, 'days'))
                    else if(!change) {
                        for(let k=0; k<this.selected.length; k++) {
                            if(this.selected[k].isSame(dragstart.clone().add(i, 'weeks').add(j, 'days'))) {
                                window.console.log(this.selected[k].clone().date(), dragstart.clone().add(i, 'weeks').add(j, 'days').date(), ' are the same')
                                this.selected.splice(k,1)
                                break
                            }
                        }
                    }

                    if(i==0 && j==0) doubleBreak = true
                    if(j==0) {
                        j = daysSpanned
                        i -= Math.sign(i)
                    } else {
                        j -= Math.sign(j)
                    }

                }

                // let handler = false
                // for(let i=0; i<this.selected.length; i++) {
                //     if (date.clone().isSame(this.selected[i], 'days')) {
                //         handler = true
                //     }
                // }
                // if(!handler && !(date.clone().diff(this.today.clone(), 'days') <= -1)) this.selected.push(date)
        },
        typeCalculator(j) {
            
            for(let i=0; i<this.selected.length; i++) {
                if (this.base.clone().add(j,'days').isSame(this.selected[i], 'days')) return 3
            }

            if(this.base.clone().add(j, 'days').diff(this.today.clone(), 'days') <= -1) return 0

            return this.base.clone().add(j, 'days').isSame(this.monthViewing.clone(), 'month') ? 1 : 4
        }
    },
}
</script>

<style scoped>

.box {
  position: relative;
  width: 60px;
  height: 60px;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box:hover {
  -webkit-transform: scale(1.05, 1.05);
  transform: scale(1.05, 1.05);
}

.box:hover::after {
    opacity: 1;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.box-shadow-indigo {
    -webkit-box-shadow: 0px 0px 0px 1px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 0px 1px rgba(0,0,0,1);
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,1);
}
</style>