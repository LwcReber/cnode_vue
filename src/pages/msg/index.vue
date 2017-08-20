<template lang="html">
  <div class="">

    <div class="header">
      <v-goback></v-goback>
      <!-- <a href="#home">主页</a> -->
    </div>
    <div class="v-content">
      <div class="no-msg">
        暂无消息
      </div>
    </div>
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
@import "../../css/pxRem.scss";

  .no-msg {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }
</style>
