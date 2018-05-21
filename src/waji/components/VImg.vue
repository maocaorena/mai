<template>
  <img :src="finalSrc" @error="error">
</template>

<script>
export default {
  props: {
    src: String,
    defaultSrc: String
  },
  data() {
    return {
      finalSrc: this.src || this.defaultSrc
    }
  },
  methods: {
    error() {
      this.finalSrc = this.defaultSrc
    }
  },
  watch: {
    src() {
      this.finalSrc = this.src || this.defaultSrc
    }
  }
}
</script>

<style>

</style>
