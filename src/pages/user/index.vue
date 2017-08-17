<template lang="html">
  <div class="">
    <div class="header">
      <a href="#home">返回</a>
      <span class="register">退出</span>
    </div>
    <div class="v-content">
      <div class="accCenter">
        <div v-show="userInfo==false" class="access">
          <div class="reg-title">
            请输入您的accesstoken
          </div>
          <input type="text"  class="reg-Ipt " v-model="accesstoken" placeholder="accesstoken">
          <div class="reg-button" @click="register">登录</div>
          <div class="alert-danger acc-warn" v-show='accWarn'>
            请输入accesstoken!!!
          </div>
        </div>
      </div>

      <div class="" v-show="userInfo==true">
        <div class="avatar">
          <img :src="user.imgUrl"  alt="">
          <span>用户名 : {{user.loginname}}</span>
        </div>
        <div class="topiccal">收藏话题{{user.Topiccal}}个</div>
        <div class="topic-item"
          v-for="collTopic in collTopicList">
          <div class="topicImg">
            <img :src="collTopic.author.avatar_url" alt="" >
          </div>
          <div class="topicCont">
            <div class="topichead">
              <span class="tabtype" v-bind:class="{true:'active' ,false:''}">{{collTopic.top?'置顶' : collTopic.good? '精华' : collTopic.tabtype=='ask' ? '问答' :'分享'}}</span>
              <span>{{collTopic.author.loginname}}</span>
            </div>
            <h4>{{collTopic.title}}</h4>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: false, // 是否有用户信息
      accesstoken: '', // 用户的登录码
      accWarn: false, // 没有登录警告显示
      collTopicList: [], // 用户收集的主题文章
      user: {
        loginname: '', // 用户名
        imgUrl: '', // 用户头像url
        userTopiccal: 0 // 收集主题数
      }
    }
  },
  methods: {
    register () {
      var vm = this
      if (this.userInfo === false) {
        // 如果没有输入accesstoken
        if (this.accesstoken === undefined || this.accesstoken === '') {
          this.accWarn = true
          return
        }
        this.accWarn = false

        // post请求登录
        this.$http.post('https://cnodejs.org/api/v1/accesstoken',
          {
            accesstoken: vm.accesstoken
          })
        // 成功响应
        .then((respone) => {
          alert('登录成功')
          // 清空原有的收藏主题
          vm.collTopicList.length = 0
          vm.userInfo = true
          vm.user.loginname = respone.data.loginname
          vm.user.imgUrl = respone.data.avatar_url
          vm.getCollected()
        },
        // 响应失败
        (result) => {
          console.log(result)
        }
        )
      }
    },
    getCollected () {
      var vm = this
      this.$http.get('https://cnodejs.org/api/v1/topic_collect/' + vm.user.loginname)
      .then((result) => {
        vm.userTopiccal = result.data.data.length
        vm.collTopicList = vm.collTopicList.concat(result.data.data)
      },
      (err) => {
        console.log(err)
      }
      )
    }
  }
}
</script>

<style lang="scss">
  //登录居中显示
  .accCenter {
    position: fixed;
    left: 50%;
    top: 50%;
    right: 50%;
    bottom: 50%;
    /* 用户登录验证*/
    .access {
      width: 3rem;
      height: 1.2rem;
      margin-left: -1.5rem;
      margin-top: -.6rem;
      font-size: .2rem;
      padding: .08rem;

      .reg-title {
        text-align: center;
      }
      .reg-Ipt {
        width: 100%;
        height: .5rem;
        font-size: 0.16rem;
        margin-top: .05rem;
        border: 1px solid #DCDCDC;
        border-radius: 0.05rem;
      }
      .reg-button {
        width: 100%;
        height: .3rem;
        margin-top: .08rem;
        border-radius: .05rem;
        text-align: center;
        background-color: #747474;
      }
      .acc-warn {
        height: .3rem;
      }
    }
  }
  /*用户头像*/
  .avatar {
    margin-top: .05rem;
    img {
      //float: left;
      width: .5rem;
      height: .5rem;
      border-radius: .05rem;
    }
  }
  //收藏的话题
  .topiccal {
    margin-top: .32rem;
  }

</style>
