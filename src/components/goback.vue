<template lang="html">
  <span v-on:click="goBack">返回</span>
</template>

<script>
export default {
  methods: {
    goBack: function () {
      console.log('点击')
      // window.history.go(-1)
      this.$router.go(-1)
    }
  }
}
</script>
