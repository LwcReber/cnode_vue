<template lang="html">
  <div class="">
    <div class="header">
      <span class="nav-item" v-bind:class="{ activeNav: item.isActive}" v-on:click="changeTab(item)" v-for="item in headerTab">
        {{item.name}}
      </span>
    </div>
    <div class="container">
      <div class="topic-item" v-for="topic in topicList">
        <router-link class="link" :to="{name: 'detail', params: {id: topic.id}}"></router-link>
        <div class="topicImg">
          <img :src="topic.author.avatar_url" alt="" >
        </div>
        <div class="topicCont">
          <div class="topichead">
            <span>{{topic.author.loginname}}</span>
          </div>
          <h4>{{topic.title}}</h4>
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
      headerTab: [
        { tab: '', name: '全部', isActive: true },
        { tab: 'good', name: '精华', isActive: false },
        { tab: 'share', name: '分享', isActive: false },
        { tab: 'ask', name: '问答', isActive: false },
        { tab: 'job', name: '招聘', isActive: false }
      ],
      page: 1,
      topicList: this.getDatas('')
    }
  },
  methods: {
    changeTab (tab) {
      // 清除其他tab的active
      for (var i = 0; i < this.headerTab.length; i++) {
        if (this.headerTab[i] !== tab) {
          this.headerTab[i].isActive = false
        }
      }
      tab.isActive = true
      this.getDatas(tab.tab)
    },
    getDatas (tab) {
      var vm = this
      vm.$http.get('https://cnodejs.org/api/v1/topics?page=' + vm.page + '&tab=' + tab + '&limit=20', {'timeout': 3000})
      .then(
      // 响应成功
      (respone) => {
        vm.topicList = respone.data.data
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
.nav-item {
  width: 20%;
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
.container {
  background-color: #ECEFF1;
  padding: 0 0.08rem 0 0.08rem;
  .topic-item {
    position: relative;
    margin-top: .1rem;
    background-color: #fff;
    height: .8rem;
    cursor: pointer;
    border-radius: 0.05rem;

    .link {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
    }

    .topicImg {
      float: left;
      height: .8rem;
      line-height: .8rem;
      margin-right: .1rem;
      img {
        width: .5rem;
        height: .5rem;
        margin-top: .15rem;
        padding-left: 0.15rem;
        border-radius: 50%;
      }
    }
    .topic-item:after {
      content: "";
      display: table;
      clear: both;
    }
}

  .topicCont {
    height: .8rem;
    padding-top: .05rem;
    padding-bottom: .05rem;
    .topichead {
      height: .2rem;
      .tabtype {
        float: left;
        width: .4rem;
        height: .2rem;
        background-color:#B7B4B4;
        color: white;
        text-align: center;
        border-radius: .05rem;
        &.active{
          background-color: green;
        }
      }
      span {
        float: right;
        padding-right: 0.15rem;
      }
    }
    h4 {
      //限制内容
      width: 3rem;
      margin-top: .05rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

</style>
