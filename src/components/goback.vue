<template lang="html">
  <div class="">
    <div v-on:click="goBack">返回</div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack: function () {
      console.log('点击')
      window.history.go(-1)
    }
  }
}
</script>

<style lang="css">
</style>
