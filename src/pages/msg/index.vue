<template lang="html">
  <div class="">
    <div class="header">
      <a href="#home">主页</a>
    </div>
    <div class="v-content">
      <div class="no-msg">
        暂无消息
      </div>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script>
export default {
  // methods: {
  //   goHome: function () {
  //     this.$router.replace({ path: '/home' })
  //     console.log(this.$route.path)
  //   }
  // }
}
</script>

<style lang="scss">
  .no-msg {
    position: absolute;
    width: auto;/* 宽度根据内容自适应 */
    height:auto;/* 高度根据内容自适应 */
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }
</style>
