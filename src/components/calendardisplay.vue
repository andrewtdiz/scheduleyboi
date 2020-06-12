<template>
  <div  @mouseleave="dragging = -1" @mouseup="dragging = -1" class="mt-2 flex flex-col justify-center select-none">
        <div v-for="(week, ind) in calendar" :key="ind+50" class="flex select-none justify-around">
            <div @mouseenter="handleDrag(day.date)" @mousedown="startDrag(day.date)" v-for="(day, ind2) in week" :key="ind2+100" class="w-16 h-16 relative select-none noselect cursor-pointer items-center justify-center justify-center">
                <h1 class="absolute text-lg font-normal cursor-pointer pointer-events-none select-none noselect" :class="textStyle[day.type]" style="user-select: none !important; left: 50%; top:50%; transform: translate(-50%, -50%)" >{{day.date.date()}}</h1>
                <div class="w-12 h-12 absolute z-10" :class="dateStyle[day.type]" style="transform: translate(-50%, -50%); left: 50%; top: 50%"></div>
                <div class="h-12 absolute z-0" :class="edgeStyle[day.type]" style="transform: translate(0%, -50%); top: 0%; top:50%; width: 50%"></div>
                <div class="h-14 w-14 absolute flex justify-center opacity-0 hover:opacity-100 items-center bg-white rounded-full border-2 border-transparent" :class="hoverStyle[day.type]" style="z-index:100; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                    <h1 class="text-lg font-normal cursor-pointer pointer-events-none select-none noselect text-gray-800" style="z-index: 1000; user-select: none !important; left: 50%; top:50%; transform: translate(0%, 0%)" >{{day.date.date()}}</h1>
                    
                </div>
            </div>
        </div>
        <h1 class="text-red-500" v-if="selectedLengthError">Please select less than 10 days</h1>
        
    </div>
</template>

<script>
//  let moment = require('moment')


export default {
    name: 'CalendarDisplay',
    props: ['monthViewing', 'today'],
    data() {
        return {
            hoverStyle: [
                ['hover:border-indigo-500'], 
                ['hover:border-indigo-500'], 
                ['hover:border-indigo-200'], 
                ['hover:border-indigo-200'], 
                ['hover:border-indigo-200'], 
                ['hover:border-indigo-200'], 
                ['text-gray-400'],
            ],
            textStyle: [
                    'text-gray-300',
                    ['text-gray-700', 'z-20'],
                    ['text-indigo-100', 'hover:text-gray-700', 'z-20'],
                    ['text-gray-700', 'z-20'],
                    ['text-indigo-100', 'hover:text-gray-700', 'z-20'],
                    ['text-indigo-100', 'hover:text-gray-700', 'z-20'],
                    'text-gray-400',
            ],
            dateStyle: [
                ['text-gray-300', 'cursor-not-allowed'], 
                ['text-gray-700', 'hover:bg-indigo-100', 'hover:z-10'], 
                ['text-white', 'bg-indigo-500', 'hover:bg-indigo-600', 'rounded-full', 'hover:z-10'], 
                ['text-white', 'bg-indigo-200', 'hover:z-10', 'w-fulltwo'], 
                ['text-white', 'bg-indigo-500', 'rounded-full', 'hover:z-10'], 
                ['text-white', 'rounded-full', 'bg-indigo-500', 'hover:z-10'], 
                ['text-gray-400'],
            ],
            edgeStyle: [
                ['text-gray-300', 'cursor-not-allowed'], 
                ['text-gray-700', 'hover:bg-indigo-100', 'hover:z-10'], 
                ['text-white', 'bg-indigo-200', 'left-50'], 
                ['text-white', 'bg-indigo-200', 'left-0', 'w-fulltwo'], 
                ['text-white', 'bg-indigo-200', 'left-0'], 
                ['text-white', 'left-0'], 
                ['text-gray-400'],
            ],
            base: undefined,
            calendar: [],
            selected: [],
            startDragDate: undefined,
            dragging: -1,
            previousStart: undefined,
            previousDate: undefined,
            selectedLengthError: false,
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
        removeFromSelected(val) {
            this.selected.splice(val, 1)
        },
        renderCalendar(){
            this.calendar = []
            let arr = []
            if(this.monthViewing.isSame(this.today, 'month')) {
                this.base = this.today.clone().subtract(1,'week').startOf('week');
            } else {
                this.base = this.monthViewing.clone().startOf('week');
            }
            let rows; 
            if(this.monthViewing.clone().daysInMonth()+this.monthViewing.clone().day()>=36){
                rows = 6
            } else {
                rows = 5
            }
            if(this.monthViewing.isSame(this.today, 'month')) {
                rows = this.today.clone().endOf('month').diff(this.today, 'weeks')+2
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
        addToSelected(date) {
            if(this.selected.length==0) {
                this.selected.push(date.clone())
                return
            }
            for(let i=0; i<this.selected.length; i++) {
                if(this.selected[i].clone().diff(date.clone(), 'days') > 0) {
                    this.selected.splice(i,0,date.clone())
                    return
                }
            }
            this.selected.push(date.clone())
        },
        selectDate (date) {
            if(date.clone().diff(this.today.clone(), 'days') <= -1) {
                return 
            }

            if(!(date.clone().diff(this.today.clone(), 'days') <= -1) && !this.selectedContains(date)) {
                if(this.selected.length > 10 ){
                    this.selectedLengthError = true
                    return 
                } else {
                    this.selectedLengthError = false
                }
                this.addToSelected(date)
            } else {
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
                    if(this.selected.length > 10) {
                        this.selectedLengthError = true
                        break
                    }
                    if(change && !this.selectedContains(dragstart.clone().add(i, 'weeks').add(j, 'days')) && dragstart.clone().add(i,'weeks').add(j, 'days').diff(this.today.clone(), 'days')>-1 ) this.addToSelected(dragstart.clone().add(i, 'weeks').add(j, 'days'))
                    else if(!change) {
                        for(let k=0; k<this.selected.length; k++) {
                            if(this.selected[k].isSame(dragstart.clone().add(i, 'weeks').add(j, 'days'))) {
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

        },
        typeCalculator(j) {
            let hold = 0

            for(let i=0; i<this.selected.length; i++) {

                if (this.base.clone().add(j,'days').isSame(this.selected[i], 'days')) {
                    for(let k=0; k<this.selected.length; k++) {
                        if (this.base.clone().add(j-1,'days').isSame(this.selected[k], 'days')) {
                            hold = (hold==1) ? 2 : -1
                        }
                        if (this.base.clone().add(j+1,'days').isSame(this.selected[k], 'days')) {
                            hold = (hold==-1) ? 2 : 1
                        }
                        if(hold==2) break
                    }
                    switch (hold) {
                        case 0:
                            return 5
                        case -1:
                            return 4
                        case 1:
                            return 2
                        case 2:
                            return 3
                        default:
                            return 4
                    }
                }
            }

            if(this.base.clone().add(j, 'days').diff(this.today.clone(), 'days') <= -1) return 0

            return this.base.clone().add(j, 'days').isSame(this.monthViewing.clone(), 'month') ? 1 : 6
        }
    },
}
</script>

<style scoped>

.box {
  position: relative;
  width: 64px;
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

.anim-cal {
    transition: all 0.15s;
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