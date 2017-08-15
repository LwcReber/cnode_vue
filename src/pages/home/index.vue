<template lang="html">
  <div class="">
    <div class="header">
      <span class="nav-item" v-bind:class="{ activeNav: item.isActive}" v-on:click="changeTab(item)" v-for="item in headerTab">
        {{item.name}}
      </span>
    </div>
    <div class="container" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
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
    <scale-loader class="loading-bar" :loading="loading" :color="color"></scale-loader>
    <!-- <a class="top" href="javascript:scroll(0,0)" ng-show='toTop'>顶部</a> -->
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
      currentTab: '',
      page: 1,
      topicList: [],
      busy: false, // false 触发滑动加载，true禁止滑动加载 初始为false自调一次获取主页的内容
      loading: true,
      color: '#2195F2'
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
      this.currentTab = tab.tab
      // 切换tab清空content的内容
      this.topicList.length = 0
      // 页数请求置0
      this.page = 0
      tab.isActive = true
      this.getDatas(tab.tab)
    },
    getDatas (tab) {
      var vm = this
      // 运行滚动加载
      vm.$http.get('https://cnodejs.org/api/v1/topics?page=' + vm.page + '&tab=' + tab + '&limit=20', {'timeout': 3000})
      .then(
      // 响应成功
      (respone) => {
        vm.topicList = vm.topicList.concat(respone.data.data)
        // 开启滚动加载
        vm.busy = false
        vm.page++
        // 关闭loading-bar
        vm.loading = false
      },
      // 响应失败
      (result) => {
        // 开启滚动加载
        vm.busy = false
        console.log(result)
      }
      )
    },
    loadMore () {
      // 禁止滑动加载
      this.busy = true
      // 打开loading-bar
      this.loading = true
      setTimeout(() => {
        this.getDatas(this.currentTab)
      }, 100)
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
  height: 90%; // 设置高度才能触发loadMore函数
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
      margin-left: .1rem;
      img {
        width: .5rem;
        height: .5rem;
        margin-top: .15rem;
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
// loading-bar的居中
.v-spinner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.6rem;
  // z-index: 100;
  margin-top: 0.6rem;
  .v-bounce {
    margin: auto;
  }
}

//返回顶部
.top {
  position: fixed;
  right: 0;
  bottom: .8rem;
  width: .3rem;
  text-align: center;
  background-color: blue;
  border-radius: .05rem;
  color: white;
  font-size: .16rem;
}
.top:hover {
  text-decoration: none;
}
</style>
