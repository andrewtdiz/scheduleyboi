<template>
  <div class="pt-16 bg-gray-100 w-full h-screen">
    <h1>1</h1>
  </div>
</template>

<script>
export default {
  computed: {
    eventName () {
      return this.$store.getters.getEventName
    }
  },
}
</script>

<style>

</style>
