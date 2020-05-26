<template>
    <div class="w-1/2 flex items-stretch relative" style="min-height: 50vh"> 
        <div class="w-16" style="min-height: 50vh">

        </div>
        <div class="absolute w-16 h-full flex flex-col" style="min-height: 50vh">
            <div :style="{'height': 50/hourRange.length+'vh'}">

            </div>
            <div v-for="(hour, ind) in hourRange" :key="ind+50" class="flex w-full relative" :style="{'z-index': 20-ind, 'height': 50/hourRange.length+'vh'}">
                <p  class="-mt-4 absolute pr-2 top-0 right-0 " style="transform: translateY(50%); font-size: 0.75rem">{{hour>12 ? (hour-12+ ' PM') :  (hour + ' AM')}}</p>
                <p v-if="ind==hourRange.length-1"  class="absolute pr-2 bottom-0 right-0 " style="transform: translateY(50%); font-size: 0.75rem">{{hour>12 ? (hour+1-12+ ' PM') :  (hour+1 + ' AM')}}</p>

            </div>
        </div>
        <div class="flex-1 flex bg-white flex-col items-stretch border border-gray-300">
            <div class="flex-1 flex w-full">
                <div v-for="(day,ind) in selected" :key="ind" :class="ind==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="flex-1 px-4 flex flex-col items-center justify-between border-gray-200">
                    <p class="text-xs text-gray-600">{{day.clone().format('ddd')}}</p>
                    <p class="text-sm">{{day.clone().date()}}</p>
                </div>
            </div>
            <div v-for="(hour, ind) in hourRange" :key="ind+50" class="flex-1 flex w-full">
                <div v-for="(day,ind2) in selected" :key="ind2" :class="ind==(hourRange.length-1) ? (ind2==(selected.length-1) ? '' : 'border-r') :  ind2==(selected.length-1) ? 'border-b' : ['border-r', 'border-b']" class="flex-1 px-4 flex flex-col hover:shadow-inner items-center justify-between py-2 border-gray-200">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startTime: 8,
            endTime: 16,
            hourRange: [],
        }
    },
    computed: {
        selected() {
            return this.$store.getters.getSelected
        },
    },
    created() {
        for(let i=this.startTime; i<=(this.endTime); i++) {
            this.hourRange.push(i)
        }
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