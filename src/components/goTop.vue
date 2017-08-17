<template lang="html">
  <div class="top" v-show="showTop" @click="returnTop">
    <img src="../assets/goTop.png">
  </div>

</template>

<script>
export default {
  data () {
    return {
      showTop: false,
      maxHeight: 2000 // 滑动到哪个距离该出现顶部按钮
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll, false)
  },
  methods: {
    returnTop () {
      // 回到顶部平滑过渡效果
      var timer = setInterval(() => {
        if (document.body.scrollTop) {
          document.body.scrollTop -= Math.ceil(document.body.scrollTop * 0.1)
        } else {
          document.documentElement.scrollTop -= Math.ceil(document.documentElement.scrollTop * 0.1)
        }
        if ((document.body.scrollTop || document.documentElement.scrollTop) === 0) {
          clearTimeout(timer)
        }
      }, 10)
    },
    getScroll () {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > this.maxHeight) {
        this.showTop = true
      } else {
        this.showTop = false
      }
    }
  },
  destroy () {
    window.removeEventListener('scroll', this.getScroll, false)
  }
}
</script>

<style lang="scss">
.top {
  position: fixed;
  right: 0.08rem;
  bottom: .8rem;
  z-index: 50;
  cursor: pointer;
}
</style>
