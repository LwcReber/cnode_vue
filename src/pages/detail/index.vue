<template lang="html">
  <div class="">
    <div class="header">
      <v-goback></v-goback>
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
      topicCtn: this.getDetail(this.$route.query.id)
    }
  },
  mounted () {
    localStorage.setItem('id', this.$route.query.id)
  },
  destroy () {
    localStorage.removeItem('id')
  },
  methods: {
    getDetail (id) {
      this.$http.get('https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true')
      .then(
        // 响应成功
        (respone) => {
          this.topicCtn = respone.data.data.content
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
@import "../../css/pxRem.scss";

.content {
  position: absolute;
  top: pxRem(60);
  left: pxRem(10);
  right: pxRem(10);
  // bottom: 0;
  overflow-y: scroll;
  background-color: #ECEFF1;
  img {
    max-width: 100%;
  }
}
</style>
