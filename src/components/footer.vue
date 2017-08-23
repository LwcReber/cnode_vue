<template lang="html">
  <div class="nav" v-if="$route.path.indexOf('detail') === -1">
    <div class="item" v-bind:class="{ activeNav: item.path == $route.path }" @click="goto(item)" v-for="item in footerTab">
      <div class="item-content">{{item.name}}</div>
      <div class="icon-img" v-bind:class="item.icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footerTab: [
        { tab: 'home', name: '主页', path: '/home', icon: 'icon-home' },
        { tab: 'msg', name: '消息', path: '/msg', icon: 'icon-bubbles3' },
        { tab: 'publish', name: '发表', path: '/publish', icon: 'icon-compass' },
        { tab: 'user', name: '个人', path: '/user', icon: 'icon-user' }
      ]
    }
  },
  methods: {
    goto: function (tab) {
      // 命名的路由
      this.$router.push({ path: tab.path })
    }
  }

}
</script>

<style lang="scss">
@import "../css/pxRem.scss";

.nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #03A8F3;
  width: 100%;
  height: pxRem(60);
  z-index: 10;
  .item {
    width: 25%;
    height: pxRem(60);
    line-height: pxRem(60);
    color: #fff;
    cursor: pointer;
    text-align:center;
    display: inline-block;
    &.activeNav {
      background-color: #0287D0;
      animation: wobble 0.5s;
    }
    .item-content, .icon-img {
      height: pxRem(30);
      line-height: pxRem(30);
    }
  }
}

@keyframes wobble {
  from {
    transform: none;
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: none;
  }
}
</style>
