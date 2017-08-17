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
            <span class="tabtype" v-show="tabtypeShow" v-bind:class="{true:'active' ,false:''}">{{topic.top?'置顶' : topic.good? '精华' : topic.tab=='ask' ? '问答' :'分享'}}</span>
            <span class="topicAtr">{{topic.author.loginname}}</span>
          </div>
          <h4>{{topic.title}}</h4>
        </div>
      </div>
      <sync-loader class="loading-bar" :loading="loading" :color="color"></sync-loader>
    </div>
    <v-goTop></v-goTop>
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
      busy: true, // true 触发滑动加载，false禁止滑动加载
      loading: true,
      color: '#2195F2',
      tabtypeShow: true
    }
  },
  mounted () {
    // 初始化获取home的内容
    this.getDatas('')
    window.addEventListener('scroll', this.loadMore, false)
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
      // 在全部和精华中显示 tabtype
      if (tab === '' || tab === 'good') {
        vm.tabtypeShow = true
      } else {
        vm.tabtypeShow = false
      }
      // 运行滚动加载
      vm.$http.get('https://cnodejs.org/api/v1/topics?page=' + vm.page + '&tab=' + tab + '&limit=20', {'timeout': 3000})
      .then(
      // 响应成功
      (respone) => {
        vm.topicList = vm.topicList.concat(respone.data.data)
        // 开启滚动加载
        vm.busy = true
        vm.page++
        // 关闭loading-bar
        vm.loading = false
      },
      // 响应失败
      (result) => {
        // 开启滚动加载
        vm.busy = true
        console.log(result)
      }
      )
    },
    loadMore () {
      if (this.busy) {
        // document.body.scrollHeight: container正文全文高：
        // document.body.scrollTop: 滚动条滚动距离
        // window.innerHeight: 浏览器窗口高度
        let totalHeight = document.body.scrollTop + window.innerHeight
        if (totalHeight >= document.body.scrollHeight) {
          // 禁止滑动加载
          this.busy = false
          // 打开loading-bar
          this.loading = true
          setTimeout(() => {
            this.getDatas(this.currentTab)
          }, 300)
        }
      }
    }
  },
  destroy () {
    window.removeEventListener('scroll', this.loadMore, false)
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
  padding: .1rem 0.08rem 1.2rem 0.08rem;
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
        line-height: .2rem;
        background-color: #4BAE4F;
        color: white;
        text-align: center;
        border-radius: .05rem;
        &.active {
          background-color: green;
        }
      }
      .topicAtr {
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
  bottom: 0.75rem;
  text-align: center;
}
</style>
