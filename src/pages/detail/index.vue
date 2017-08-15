<template lang="html">
  <div class="">
    <div class="header">
      <a href="#home">主页</a>
    </div>
    <div class="content" v-html="topicCtn">
      <div>{{topicCtn}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topicCtn: this.getDetail(this.$route.params.id)
    }
  },
  methods: {
    getDetail (id) {
      var vm = this
      this.$http.get('https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true')
      .then(
        // 响应成功
        (respone) => {
          vm.topicCtn = respone.data.data.content
        },
        // 响应失败
        (result) => {
          console.log(result)
        }
      )
    }
  }
}
</script>

<style lang="scss">
.content {
  position: absolute;
  top: .6rem;
  left: .1rem;
  right: .1rem;
  bottom: 0;
  overflow-y: scroll;
  background-color: #ECEFF1;
  img {
    max-width: 100%;
  }
}
</style>
