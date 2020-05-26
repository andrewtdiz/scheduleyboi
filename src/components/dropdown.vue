<template>
  <div class="relative inline-block text-left" >
        <div class="w-full">
        <span @click="isOpened = !isOpened" class="rounded-md shadow-sm cursor-pointer">
            <div :class="dropStyle" class="inline-flex justify-center w-full rounded-md border border-gray-400 px-4 py-2 leading-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 transition ease-in-out duration-150">
            <p class="appearance-none " style="cursor: pointer !important; user-select: none !important">{{value!=undefined ? options[value].name : options[defaultSelected].name}}</p>
            <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            </div>
        </span>
        </div>

        <Warning :warning="warning" />

        <!--
        Dropdown panel, show/hide based on dropdown state.

        Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
        Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->
        <transition
        >
            <div v-if="isOpened" class="z-10 origin-top-right absolute left-0 mb-32 rounded-md shadow-lg" :class="type==3 ? 'w-full' : 'w-32'">
                <div class="rounded-md bg-white shadow-md border border-gray-300">
                    <div class="py-2 ">
                        <button @click="selectOption(ind)" v-for="(option,ind) in options" :key="ind+232" class="w-full block hover:text-white font-medium px-4 py-2 hover:bg-indigo-500 text-sm leading-5 text-gray-700 focus:outline-none">{{option.name}}</button>
                    </div>
                </div>
    
            </div>
        </transition>
    </div>
</template>

<script>
import Warning from './warning.vue'

export default {
    props: ['defaultText', 'startTimes', 'endTimes', 'timeZones', 'warning', 'sendUp', 'value'],
    components: {
        Warning
    },
    data() {
        return {
            isOpened: false,
            type: undefined,
            options: undefined,
            wasSelected: false,
        }
    },
    created() {
        if(this.startTimes) this.type = 1
        else if (this.endTimes) this.type = 2
        else if (this.timeZones) this.type = 3
        this.options = this.startTimes || this.endTimes || this.timeZones
    },
    computed: {
        defaultSelected () {
            if(this.type==1) return this.$store.getters.getStartTimeSelected
            else if(this.type==2) return  this.$store.getters.getEndTimeSelected
            else if (this.type==3) return this.$store.getters.getTimeZoneSelected
            else return 0
        },
        dropStyle() {
            let arr = []
            arr.push(this.warning ? ['text-white', 'bg-red-500'] : 'bg-white')
            arr.push((this.wasSelected && !this.warning) ? 'text-gray-700' : '')
            return arr
        },
    },
    methods: {
        selectOption(ind) {
            this.isOpened = false
            if(this.sendUp) {
                this.$emit('changeTimeZone', ind)
            } else {
                if(this.type==1) return this.$store.commit('changeDropDownValue', {loc: 'startTimeSelected', val: ind})
                else if(this.type==2) return  this.$store.commit('changeDropDownValue', {loc: 'endTimeSelected', val: ind})
                else if (this.type==3) return this.$store.commit('changeDropDownValue', {loc: 'timeZoneSelected', val: ind})
            }
        },
        
    },
}
</script>

<style scoped>
.faded {
    opacity:0
}
</style>>
