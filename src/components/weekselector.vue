<template>
    <div class="flex items-stretch relative -ml-16" style="min-height: 50vh"> 
        <div class="w-16" style="min-height: 50vh">

        </div>
        <div class="absolute w-16 h-full flex flex-col" style="min-height: 50vh">
            <div :style="{'height': 50/hourRange.length+'vh'}">

            </div>
            <div v-for="(hour, ind) in hourRange" :key="ind+50" class="flex w-full relative" :style="{'z-index': 20-ind, 'height': 50/hourRange.length+'vh'}">
                <p  class="-mt-4 absolute pr-2 top-0 right-0 " style="transform: translateY(50%); font-size: 0.70rem">{{hour>12 ? (hour-12+ ' PM') :  (hour + ' AM')}}</p>
                <p v-if="ind==hourRange.length-1"  class="absolute pr-2 bottom-0 right-0 " style="transform: translateY(50%); font-size: 0.75rem">{{hour>12 ? (hour+1-12+ ' PM') :  (hour+1 + ' AM')}}</p>

            </div>
        </div>
        <div class=" flex bg-white flex-col w-64 items-stretch border border-gray-500">
            <div  class="flex-1 flex w-full">
                <div v-for="(data,ind) in selected" :key="ind" :class="ind==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="flex-1 flex flex-col items-center justify-between border-gray-500">
                    <p class="text-xs text-gray-600">{{data.day.clone().format('ddd')}}</p>
                    <p class="text-sm">{{data.day.clone().date()}}</p>
                </div>
            </div>
            <div v-for="(hour, ind) in hourRange" :key="ind+50" class="flex-1 flex w-full">
                <div v-for="(day,ind2) in selected" :key="ind2" :class="ind==(hourRange.length-1) ? (ind2==(selected.length-1) ? '' : 'border-r') :  ind2==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="relative flex-1 flex flex-col items-center justify-between py-2 border-gray-500">
                    <div @mousedown="startDrag(ind+ind2)" @mousemove="handleDrag(ind+ind2)" class="absolute cursor-pointer hover:shadow-inner w-full border-b border-dashed" :class="timesData[val+val2] ? 'bg-blue-500' : ''" style="height: 50%; top: 0%"></div>
                    <div @mousedown="startDrag(ind+ind2+1)" @mousemove="handleDrag(ind+ind2+1)" class='absolute cursor-pointer hover:shadow-inner w-full' style="height: 50%; top: 50%"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['label', 'type'],
    methods: {
        startDrag(val) {
            this.dragging = true
            if(this.timesData[val] == false) {
                this.selecting = 1
            } else {
                this.selecting = -1
            }
        },
        handleDrag(val) {
            if(this.dragging = true && this.selecting==1) {
                Vue.set(this.dragging, val, true)
            }
        },
    },
    data() {
        return {
            startTime: 0,
            endTime: 0,
            timesData: [],
            dragging: false,
            selecting: 0,
        }
    },
    computed: {
        selected() {
            return this.$store.getters.getSelected
        },
        hourRange() {
            let temp = []
            for(let i=this.startTime; i<(this.endTime); i++) {
                temp.push(i)
            }
            return temp
        },
    },
    watch: {
        selected: {
            deep: true,
            handler: function() {
            window.console.log('selected changed', this.selected)
            this.startTime = this.selected[0].startTimeSelected +5
            this.endTime = this.selected[0].endTimeSelected +5
            for(let j=0; j<this.selected.length; j++) {
                for(let i=this.startTime; i<(this.endTime); i++) {
                    this.timesData.push(0)
                    this.timesData.push(0)
                }
            }
            window.console.log('data empty', this.timesData)
        },
    },
    },
    created() {
        
        this.startTime = 8
        this.endTime = 12
        
        console.log('crated shjow', this.selected)
    },
}
</script>

<style scoped>

.hatching {
  background-image: repeating-linear-gradient(-45deg,
      transparent,
      transparent 2px,
      rgb(216, 216, 216) 2px,
      rgb(207, 207, 207) 4px);
  /* with multiple color stop lengths */
  background-image: repeating-linear-gradient(-45deg, 
      transparent 0 2px, 
      rgb(207, 207, 207) 2px 4px);
}

</style>