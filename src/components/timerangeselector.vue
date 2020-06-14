<template>
  <div class="flex justify-center w-full" @mousemove="handleDrag">
    <div class="h-12 pt-12 mt-20 mb-4 relative px-auto " style="width: 300px" >
        <div class="absolute left-0 w-full h-1 bg-gray-300" style="top: 50%; transform: translateY(-50%)">

        </div>
        <div class="absolute text-white rounded bg-indigo-500 px-2 py-1" :class="lastSelected==0 ? 'z-10' : ''" style="top: 50%; transform: translate(-50%, -200%); white-space: nowrap;" :style="{'left': (startTime/this.times.length)*containerWidth+'px'}">
          <p class="text-sm" style="user-select:none !important">{{times[startTime]}}</p>
        </div>
        <div @mousedown="startDrag(0)" :class="getDraggingStart ? ['bg-indigo-700', 'z-10'] : ['z-10', 'bg-indigo-500', 'hover:bg-indigo-600']" class="cursor-pointer absolute w-6 h-6 rounded-full" style="top: 50%; transform: translate(-50%,-50%); " :style="{'left': (startTime/this.times.length)*containerWidth+'px'}">
            
        </div>
        <div class="absolute h-1  rounded-full bg-indigo-500 z-0 " style="top: 50%; transform: translateY(-50%)" :style="{'left': (startTime/this.times.length)*containerWidth+'px', 'width': ((endTime-startTime)/this.times.length)*containerWidth+'px'}">
            
        </div>
        <div @mousedown="startDrag(1)" class="cursor-pointer absolute w-6 h-6 rounded-full bg-indigo-500" :class="lastSelected==1 ? 'z-10' : ''" style="top: 50%; transform: translate(0%,-50%)" :style="{'left': (endTime/this.times.length)*containerWidth+'px'}">
            
        </div>
        <div class="absolute text-white rounded bg-indigo-500 px-2 py-1" :class="lastSelected==1 ? 'z-10' : ''" style="top: 50%; transform: translate(0%, -200%); white-space: nowrap;" :style="{'left': (endTime/this.times.length)*containerWidth+'px'}">
          <p class="text-sm" style="user-select:none !important">{{times[endTime]}}</p>
        </div>
    </div>
  </div>
    
</template>

<script>
export default {
    data() {
        return {
            containerWidth: 299,
            draggingStart: false,
            draggingEnd: false,
            xDisplacement: 0,
            xStarting: 0,
            timeStarting: 0,
            lastSelected: 0,
            times: [
                '5 A.M.',
                '6 A.M.',
                '7 A.M.',
                '8 A.M.',
                '9 A.M.',
                '10 A.M.',
                '11 A.M.',
                '12 P.M.',
                '1 P.M.',
                '2 P.M.',
                '3 P.M.',
                '4 P.M.',
                '5 P.M.',
                '6 P.M.',
                '7 P.M.',
                '8 P.M.',
                '9 P.M.',
                '10 P.M.',
            ]
        }  
    },
    computed: {
        startTime() {
            return this.$store.getters.getStartTimeSelected
        },
        endTime() {
            return this.$store.getters.getEndTimeSelected
        },
        getDraggingStart() {
            return this.$store.getters.getDraggingStart
        },
        getDraggingEnd() {
            return this.$store.getters.getDraggingEnd
        },
    },
    methods: {
        stopDrag() {
            this.draggingStart = false
            this.draggingEnd = false
            this.$store.commit('setDraggingStart', false)
            this.$store.commit('setDraggingEnd', false)
        },
        startDrag(val) {
            if(val==0) {
                this.draggingStart = true
                this.$store.commit('setDraggingStart', true)
                this.lastSelected = val
                this.timeStarting = this.startTime
            }
            else {
                this.draggingEnd = true
                this.$store.commit('setDraggingEnd', true)
                this.lastSelected = 1
                this.timeStarting = this.endTime

            }
            this.xUpdated = 0
            this.xStarting = event.clientX
        },  
        handleDrag() {
            if(this.getDraggingStart || this.getDraggingEnd) {
                this.xUpdated = event.clientX
                let diff = Math.trunc((this.xUpdated - this.xStarting)/(this.containerWidth/this.times.length))
                let send = undefined
                if(diff !=0) {
                    if(this.timeStarting+diff<=0) send = 0
                    else if (this.timeStarting+diff>=(this.times.length)) send = this.times.length-1
                    if(this.lastSelected==0 && (this.timeStarting+diff>this.endTime)) send = this.endTime
                    else if(this.lastSelected==1 && (this.timeStarting+diff<this.startTime)) send = this.startTime
                    if(this.lastSelected==0) this.$store.commit('changeStartTime', send==undefined ? this.timeStarting+diff : send)
                    else this.$store.commit('changeEndTime', send==undefined ? this.timeStarting+diff : send)
                }
            }
            
        },
    },
}
</script>

<style>

</style>