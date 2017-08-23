<template>
  <div id="app">
    <transition name="bounce" mode="out-in">
      <router-view></router-view>
    </transition>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "./css/pxRem.scss";

#app {
  position: relative;
  height: 100%;
  font-size: pxRem(16);
}
</style>
