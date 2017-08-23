<template lang="html">
  <div class="">
    <div class="header">
      <span class="nav-item" v-bind:class="{ activeNav: item.isActive}" v-on:click="changeTab(item)" v-for="item in headerTab">
        {{item.name}}
      </span>
    </div>
    <div class="container">
      <div class="topic-item" v-for="topic in topicList">
        <router-link class="link" :to="{path: 'detail', query: {id: topic.id}}"></router-link>
        <div class="topicImg">
          <img :src="topic.author.avatar_url" alt="" >
        </div>
        <div class="topicCont">
          <div class="topichead">
            <div class="tabtype" v-show="tabtypeShow">{{topic.top?'置顶' : topic.good? '精华' : topic.tab=='ask' ? '问答' :'分享'}}</div>
            <span class="topicAtr">发表人： {{topic.author.loginname}}</span>
          </div>
          <h4>{{topic.title}}</h4>
        </div>
      </div>
      <sync-loader class="loading-bar" :loading="loading" :color="color"></sync-loader>
    </div>
    <v-go-top></v-go-top>
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
      topicList: '',
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
      for (let i = 0; i < this.headerTab.length; i++) {
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
      // 在全部和精华中显示 tabtype
      if (tab === '' || tab === 'good') {
        this.tabtypeShow = true
      } else {
        this.tabtypeShow = false
      }
      // 运行滚动加载
      this.$http.get('https://cnodejs.org/api/v1/topics?page=' + this.page + '&tab=' + tab + '&limit=20', {'timeout': 3000})
      .then(
      // 响应成功
      ({data}) => {
        this.topicList = [...this.topicList, ...data.data]
        // 开启滚动加载
        this.busy = true
        this.page++
        // 关闭loading-bar
        this.loading = false
      },
      // 响应失败
      ({body}) => {
        // 开启滚动加载
        this.busy = true
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
@import "../../css/pxRem.scss";

.nav-item {
  width: 20%;
  height: pxRem(60);
  line-height: pxRem(60);
  color: #fff;
  cursor: pointer;
  text-align:center;
  display: inline-block;
  &.activeNav {
    background-color: #0287D0;
    animation: bounce 0.5s;
  }
}

// active的动画效果
@keyframes bounce {
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
}

.container {
  background-color: #ECEFF1;
  padding: pxRem(10) pxRem(8) pxRem(120) pxRem(8);
}
// loading-bar的居中
.v-spinner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: pxRem(75);
  text-align: center;
}
</style>
