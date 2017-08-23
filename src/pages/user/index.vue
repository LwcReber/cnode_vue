<template lang="html">
  <div class="">
    <div class="header">
      <v-goback></v-goback>
      <span class="signOut" v-if="login" @click="signOut">退出</span>
    </div>
    <div class="v-content">
      <div v-show="!login" class="login">
        <div class="reg-title">
          请输入您的accesstoken
        </div>
        <input type="text"  class="reg-Ipt " v-model="accesstoken" placeholder="accesstoken">
        <div class="reg-button" @click="register">登录</div>
        <div class="alert-danger acc-warn" v-show='accWarn'>
          请输入accesstoken!!!
        </div>
      </div>

      <div class="userInfo" v-show="login">
        <div class="avatar">
          <img :src="user.imgUrl"  alt="用户头像">
          <span>{{user.loginName}}</span>
        </div>
        <div class="topiccal">收藏话题{{user.Topiccal}}个</div>
        <div class="topic-item"
          v-for="collTopic in collTopicList">
          <router-link class="link" :to="{path: 'detail', query: {id: collTopic.id}}"></router-link>
          <div class="topicImg">
            <img :src="collTopic.author.avatar_url" alt="" >
          </div>
          <div class="topicCont">
            <div class="topichead">
              <span class="tabtype" v-bind:class="{true:'active' ,false:''}">{{collTopic.top?'置顶' : collTopic.good? '精华' : collTopic.tabtype=='ask' ? '问答' :'分享'}}</span>
              <span class="topicAtr">发表人： {{collTopic.author.loginname}}</span>
            </div>
            <h4>{{collTopic.title}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: false, // 是否登录
      accesstoken: localStorage.accesstoken || '', // 用户的登录码
      accWarn: false, // 没有登录警告显示
      collTopicList: [], // 用户收集的主题文章
      user: {
        loginName: localStorage.loginName || '', // 用户名
        imgUrl: localStorage.imgUrl || '', // 用户头像url
        Topiccal: '0' // 收集主题数总数
      }
    }
  },
  mounted () {
    if (localStorage.accesstoken) {
      this.getCollected()
    }
    if (this.accesstoken !== '') {
      this.login = true
    }
  },
  methods: {
    register () {
      if (this.login === false) {
        // 如果没有输入accesstoken
        if (this.accesstoken === undefined || this.accesstoken === '') {
          this.accWarn = true
          return
        }
        this.accWarn = false
        // post请求登录
        this.$http.post('https://cnodejs.org/api/v1/accesstoken',
          {
            accesstoken: this.accesstoken
          })
        // 成功响应
        .then(function ({data}) {
          alert('登录成功')
          // 清空原有的收藏主题
          this.collTopicList.length = 0
          // 清除上次的localStorage缓存
          localStorage.clear()
          this.login = true
          this.user.loginName = data.loginname
          this.user.imgUrl = data.avatar_url

          // 保存到loca1Storge
          localStorage.loginStatus = true
          localStorage.accesstoken = this.accesstoken
          localStorage.loginName = this.user.loginName
          localStorage.imgUrl = this.user.imgUrl
          this.getCollected()
        },
        // 响应失败
        (result) => console.log(result)
        )
      }
    },
    getCollected () {
      this.$http.get('https://cnodejs.org/api/v1/topic_collect/' + this.user.loginName)
      .then(({data}) => {
        this.user.Topiccal = data.data.length
        this.collTopicList = data.data
        localStorage.collTopicList = JSON.stringify(this.collTopicList)
      },
      (err) => {
        console.log(err)
      }
      )
    },
    signOut () {
      this.login = false
      this.accesstoken = ''
      // 清除上次的localStorage缓存
      localStorage.clear()
      setTimeout(() => {
        alert('成功退出')
      }, 200)
    }
  }
}
</script>

<style lang="scss">
@import "../../css/pxRem.scss";

  //登录居中显示
  // /* 用户登录验证*/
  .login {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width: pxRem(300);
    height: pxRem(120);
    font-size: pxRem(20);
    padding: pxRem(8);

    .reg-title {
      text-align: center;
    }
    .reg-Ipt {
      width: 100%;
      height: pxRem(50);
      font-size: pxRem(20);
      margin-top: pxRem(5);
      border: pxRem(1) solid #DCDCDC;
      border-radius: pxRem(5);
    }
    .reg-button {
      width: 100%;
      height: pxRem(30);
      line-height: pxRem(30);
      margin-top: pxRem(8);
      border-radius: pxRem(5);
      text-align: center;
      background-color: #747474;
    }
    .acc-warn {
      height: pxRem(30);
    }
  }

  // 用户信息
  .userInfo{
    padding: 0 pxRem(8) 0 pxRem(8);
    /*用户头像*/
    .avatar {
      margin-top: pxRem(8);
      line-height: pxRem(50);
      img {
        float: left;
        width: pxRem(50);
        height: pxRem(50);
        border-radius: 50%;
        border: pxRem(1) solid #BCBCBC;
      }
      span {
        margin-left: pxRem(10);
      }
    }
    .avatar:after {
      content: "";
      display: table;
      clear: both;
    }
    //收藏的话题
    .topiccal {
      margin-top: pxRem(10);
      margin-bottom: pxRem(10);
    }
  }


</style>
