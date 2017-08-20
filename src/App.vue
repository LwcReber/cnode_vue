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

.bounce-enter-active  {
  // transition: opacity .5s;
  animation: bounceInLeft 1s ease-in-out;

}
.bounce-leave-active {
  // transition: opacity .1s;
  animation: bounceOutRight 1s ease-in-out;
}

.zoom-enter-active {
  animation: zoomIn .5s ease-in-out;
}

.zoom-leave-active {
  animation: zoomOut .5s ease-in-out;
}

@keyframes bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
}

@keyframes bounceInLeft {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }

  75% {
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    transform: translate3d(5px, 0, 0);
  }

  to {
    transform: none;
  }
}
#app {
  position: relative;
  height: 100%;
  font-size: pxRem(16);
}
</style>
