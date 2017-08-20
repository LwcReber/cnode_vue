<template lang="html">
  <div class="nav" v-if="$route.path.indexOf('detail') === -1">
    <span  v-bind:class="{ activeNav: item.path == $route.path}" @click="goto(item)" v-for="item in footerTab">
      {{item.tab}}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footerTab: [
        { tab: 'home', path: '/home' },
        { tab: 'msg', path: '/msg' },
        { tab: 'publish', path: '/publish' },
        { tab: 'user', path: '/user' }
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
.nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #03A8F3;
  width: 100%;
  height: 0.6rem;
  z-index: 10;
  span {
    width: 25%;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #fff;
    cursor: pointer;
    text-align:center;
    display: inline-block;
    &.activeNav {
      background-color: #0287D0;
    }
  }

}
</style>
