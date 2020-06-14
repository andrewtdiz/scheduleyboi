<template>
    <div @mouseenter="hovering=true" @mouseleave="hovering=false" class="w-full pl-5 mx-4 my-2 cursor-pointer w-32 bg-gray-200 hover:bg-gray-100 text-white rounded-full shadow px-4 py-2 flex items-center">
        <p class="text-black" style="user-select: none !important;">{{day.format('MMMM Do')}}</p>
        <p class="text-gray-600 ml-auto text-sm uppercase" style="user-select: none !important;">{{times[startTime]}} - {{times[endTime]}}</p>
        <div @click="removeFromSelected" class="w-7 ml-1 h-7 justify-center items-center flex text-gray-600 hover:text-gray-800 cursor-pointer" :class="hovering ? 'opacity-100' : 'opacity-0'">
            <svg version="1.1" class="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve">
                <g>
                    <g>
                    <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872
                        c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872
                        c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052
                        L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116
                        c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952
                        c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116
                        c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"/>
                    </g>
                </g>
            </svg>
        </div>
        
    </div>
        
</template>

<script>
export default {
    props: ['ind', 'day'],
    data() {
        return {
            hovering: false,
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
      ],
        }
    },
    methods: {
        removeFromSelected() {
            this.$store.commit('removeFromSelected', {ind: this.ind})
        },
    },
    computed: {
        startTime() {
      return this.$store.getters.getStartTimeSelected
    },
    endTime() {
      return this.$store.getters.getEndTimeSelected
    },
    },
}
</script>

<style>

</style>