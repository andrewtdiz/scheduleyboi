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
        <div @mouseleave="stopDrag" @mouseup="stopDrag" class=" flex bg-white flex-col w-64 items-stretch border border-gray-500">
            <div  class="flex-1 flex w-full">
                <div v-for="(data,ind) in selected" :key="ind" :class="ind==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="flex-1 flex flex-col items-center justify-between border-gray-500">
                    <p class="text-xs text-gray-600">{{data.day.clone().format('ddd')}}</p>
                    <p class="text-sm">{{data.day.clone().date()}}</p>
                </div>
            </div>
            <div v-for="(hour, ind) in hourRange" :key="ind+50" class="flex-1 flex w-full">
                <div v-for="(day,ind2) in selected" :key="ind2" :class="ind==(hourRange.length-1) ? (ind2==(selected.length-1) ? '' : 'border-r') :  ind2==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="relative flex-1 flex flex-col items-center justify-between py-2 border-gray-500">
                    
                    <div v-if="label=='My availability'" :class="(((-1*removeTimesData[ind2] >> (ind*2))% 2) == 1) ? 'bg-red-500' : ''" class="absolute z-10 pointer-events-none cursor-pointer hover:shadow-inner w-full border-b border-dashed" style="height: 50%; user-select: none !important; top: 0%"></div>
                    <div v-if="label=='My availability'" :class="(((-1*removeTimesData[ind2] >> (ind*2+1))% 2) == 1) ? 'bg-red-500' : ''" class='absolute z-10 pointer-events-none cursor-pointer hover:shadow-inner w-full' style="height: 50%; user-select: none !important; top: 50%"></div>
                    <div v-if="label=='My availability'" @mouseenter="handleDrag(ind2,ind*2)" @mousedown="startDrag(ind2,ind*2)" :class="(((timesData[ind2] >> (ind*2))% 2) == 1) ? 'bg-blue-200' : ''" class="absolute cursor-pointer hover:shadow-inner w-full border-b border-dashed" style="height: 50%; user-select: none !important; top: 0%"></div>
                    <div v-if="label=='My availability'" @mouseenter="handleDrag(ind2,ind*2+1)" @mousedown="startDrag(ind2,ind*2+1)" :class="(((timesData[ind2] >> (ind*2+1))% 2) == 1) ? 'bg-blue-200' : ''" class='absolute cursor-pointer hover:shadow-inner w-full' style="height: 50%; user-select: none !important; top: 50%"></div>
                    <div v-if="label=='My availability'" :class="(((actualTimes[ind2] >> (ind*2))% 2) == 1) ? 'bg-indigo-500' : ''" class="absolute pointer-events-none cursor-pointer hover:shadow-inner w-full border-b border-dashed" style="height: 50%; user-select: none !important; top: 0%"></div>
                    <div v-if="label=='My availability'" :class="(((actualTimes[ind2] >> (ind*2+1))% 2) == 1) ? 'bg-indigo-500' : ''" class='absolute pointer-events-none cursor-pointer hover:shadow-inner w-full' style="height: 50%; user-select: none !important; top: 50%"></div>
                    
                    <div v-if="label=='Group availability'" class="absolute cursor-pointer w-full" style="height: 100%; user-select: none !important; top: 0%">
                        <div v-for="(user_id, ind) in Object.keys(users)" :key="ind+999" class="absolute w-full" style="height: 100%; user-select: none !important; top: 0%">
                            <div :class="(((time[user_id][ind2] >> (ind*2))% 2) == 1) ? ['bg-red-500', 'opacity-25'] : ''" class="absolute w-full border-b border-dashed" style="height: 50%; user-select: none !important; top: 0%"></div>
                            <div :class="(((time[user_id][ind2] >> (ind*2+1))% 2) == 1) ? ['bg-red-500', 'opacity-25'] : ''" class='absolute w-full' style="height: 50%; user-select: none !important; top: 50%"></div>
                        </div>
                    </div>
                    
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['label', 'type'],
    methods: {
        stopDrag(){
            if(this.dragging & this.selecting==1) {
                this.dragging = false
                window.console.log(this.timesData)
                let h = 0
                let i = this.lastCol
                while(h <100) {
                    for(let j = this.lastRow; 0<Math.abs(j-this.startRow); j+=Math.sign(this.startRow - this.lastRow)){
                        if (( (this.actualTimes[i] >> (j) ) % 2) == 1){
                            this.actualTimes.splice(i, 1, this.actualTimes[i]-2**j)
                        }
                    }
                    if (( (this.actualTimes[i] >> (this.startRow) ) % 2) == 1){
                            this.actualTimes.splice(i, 1, this.actualTimes[i]-2**this.startRow)
                    }

                    if(i==this.startCol) break
                    else {
                        i += Math.sign(this.startCol - this.lastCol)
                    }
                    h++
                }
                if (this.selecting){
                    this.timesData.forEach((elem,ind) => {
                        this.actualTimes.splice(ind, 1, this.actualTimes[ind]+elem)
                        this.timesData.splice(ind, 1, 0)
                    });
                }else{
                    this.timesData.forEach((elem,ind) => {
                        this.timesData.splice(ind, 1, 0)
                    });
                }
            } else if(this.dragging & this.selecting==0) {
                this.dragging = false
                window.console.log(this.timesData)
                let h = 0
                let i = this.lastCol
                while(h <100) {
                    for(let j = this.lastRow; 0<Math.abs(j-this.startRow); j+=Math.sign(this.startRow - this.lastRow)){
                        if (( (this.actualTimes[i] >> (j) ) % 2) == 1){
                            this.actualTimes.splice(i, 1, this.actualTimes[i]-2**j)
                        }
                    }
                    if (( (this.actualTimes[i] >> (this.startRow) ) % 2) == 1){
                            this.actualTimes.splice(i, 1, this.actualTimes[i]-2**this.startRow)
                    }

                    if(i==this.startCol) break
                    else {
                        i += Math.sign(this.startCol - this.lastCol)
                    }
                    h++
                }
                this.timesData.forEach((elem,ind) => {
                    this.timesData.splice(ind, 1, 0)
                });
                this.removeTimesData.forEach((elem,ind) => {
                    this.removeTimesData.splice(ind, 1, 0)
                });
            }
            this.$store.commit("sendActualTime",this.actualTimes)

        },
        startDrag(col, row){
            this.changeTime(col,row)
            if(((((this.actualTimes[col] >> (row))% 2) == 1))) this.selecting = 0
            else this.selecting = 1
            this.dragging = true
            this.startRow = row
            this.startCol = col
            this.lastRow = row
            this.lastCol = col
        },
        clearTimesData(){
            this.timesData = this.timesData.map(() => {
                return 0
            })

        },
        clearRemoveTimesData(){
            this.removeTimesData = this.removeTimesData.map(() => {
                return 0
            })

        },
        handleDrag(col,row) {
            if(this.dragging & this.selecting == 1) {
                this.lastRow = row
                this.lastCol = col
                this.clearTimesData()
                let i = col
                let h = 0
                while(h <1000) {
                    for(let j = row; 0<Math.abs(j-this.startRow); j+=Math.sign(this.startRow - row)){
                        this.timesData.splice(i, 1, this.timesData[i]+2**j)
                    }
                    this.timesData.splice(i, 1, this.timesData[i]+2**this.startRow)

                    if(i==this.startCol) break
                    else {
                        i += Math.sign(this.startCol - col)
                    }
                    h++
                }
            } else if (this.dragging  & this.selecting == 0) {
                this.lastRow = row
                this.lastCol = col
                this.clearRemoveTimesData()
                let i = col
                let h = 0
                while(h <1000) {
                    for(let j = row; 0<Math.abs(j-this.startRow); j+=Math.sign(this.startRow - row)){
                        this.removeTimesData.splice(i, 1, this.removeTimesData[i]-2**j)
                    }
                    this.removeTimesData.splice(i, 1, this.removeTimesData[i]-2**this.startRow)

                    if(i==this.startCol) break
                    else {
                        i += Math.sign(this.startCol - col)
                    }
                    h++
                }
            }
        },
        changeTime(col,row){
            console.log(col,row)
            // console.log(this.timesData)
            this.timesData.splice(col, 1, ((((this.timesData[col] >> (row))% 2) == 0)) ? this.timesData[col]+2**row : this.timesData[col]-2**row)
        }
       
    },
    data() {
        return {
            startTime: 0,
            startRow: 0,
            startCol: 0,
            endTime: 0,
            timesData: [],
            removeTimesData: [],
            actualTimes: [],
            dragging: false,
            selecting: 0,
            canChangeTimes: true,
        }
    },
    computed: {
        selected() {
            return this.$store.getters.getSelected
        },
        users() {
            return this.$store.getters.getUsers
        },
        time() {
            return this.$store.getters.getTime
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
            if(this.canChangeTimes) {
                this.startTime = this.selected[0].startTimeSelected +5
                this.endTime = this.selected[0].endTimeSelected +5
                for(let j=0; j<this.selected.length; j++) {
                    this.timesData.push(0)
                    this.actualTimes.push(0)
                    this.removeTimesData.push(0)
                }
            }
            
        },
    },
    },
    created() {
        setTimeout(() => this.canChangeTimes = false, 5000)
        this.startTime = 8
        this.endTime = 17
        
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