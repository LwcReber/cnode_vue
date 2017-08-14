<template lang="html">
  <div class="">
    <div class="header">
      <span  v-bind:class="{ activeNav: item.isActive}" v-on:click="changeTab(item)" v-for="item in headerTab">
        {{item.name}}
      </span>
    </div>
    <div class="container">
      <div class="topic" v-for="topic in topicList">
        {{topic.title}}
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
      this.$http.get('https://cnodejs.org/api/v1/topics?page=' + vm.page + '&tab=' + tab + '&limit=20', {'timeout': 3000})
      .then(
      // 响应成功
      (respone) => {
        vm.topicList = respone.data.data
        console.log(vm.topicList)
        console.log(respone)
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
.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #03A8F3;
  height: 0.6rem;
  span {
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
}
.topic {
  background-color: #BADDFA;
  height: 10%;

}
</style>
