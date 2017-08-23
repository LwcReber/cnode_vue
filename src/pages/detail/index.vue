<template lang="html">
  <div class="">
    <div class="header">
      <v-goback></v-goback>
      <span v-bind:class='{uncoll: collStatus.status , collect: !collStatus.status}' @click="collect" v-show='regStatus && showBtn'>{{collStatus.status ? collStatus.ucltContent : collStatus.cltContent}}</span>
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
      topicCtn: '',
      regStatus: localStorage.loginStatus || false, // 用是否登录,
      showBtn: false, // 先隐藏按钮，查询结果返回时再显示按钮
      accesstoken: localStorage.accesstoken || '', // 用户的登录码
      topicId: this.$route.query.id,
      collStatus: {
        status: false, // 收藏状态
        cltContent: '收藏', // 没有收藏显示的文字
        ucltContent: '取消收藏' // 已经收藏的显示的文字
      }
    }
  },
  mounted () {
    this.getDetail(this.$route.query.id)
  },
  methods: {
    // 收藏主题
    collect () {
      if (!this.collStatus.status) {
        this.$http.post('https://cnodejs.org/api/v1/topic_collect/collect',
          {
            accesstoken: this.accesstoken,
            topic_id: this.topicId
          })
        .then(
          (respone) => {
            this.collStatus.status = true
          },
          (err) => {
            console.log(err)
          }
        )
      } else {
        // 取消收藏
        this.$http.post('https://cnodejs.org/api/v1/topic_collect/de_collect',
          {
            accesstoken: this.accesstoken,
            topic_id: this.topicId
          })
        .then(
          (respone) => {
            this.collStatus.status = false
          },
          (err) => {
            console.log(err)
          }
        )
      }
    },
    getDetail (id) {
      // 有topic的id以及用户已经登录的情况下请求，主题是否已经被收藏
      if (this.$route.query.id) {
        this.showBtn = false
        this.$http.get('https://cnodejs.org/api/v1/topic/' + id + '?mdrender=true' + '&accesstoken=' + this.accesstoken)
        .then(
          (respone) => {
            // 如果已经登录就获取主题收藏状态
            if (this.regStatus) {
              this.showBtn = true
              this.collStatus.status = respone.data.data.is_collect
            }
            this.topicCtn = respone.data.data.content
          },
          (err) => {
            console.log(err)
          }
        )
      } else {
         // 没有id传过来就返回
        this.$router.go(-1)
      }
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
