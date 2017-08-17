<template lang="html">
  <div class="">
    <div class="header">
      <a href="#home">返回</a>
    </div>
    <div class="v-content">
      <div class="publish">
        选择板块<b>:</b>
        <select class="publishSel" v-model="getPubType">
          <option value="none">请选择</option>
          <option value="share">分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
        </select>
        <div class="ask" v-show="getPubType=='ask'">
          提问时，请遵循 《提问的智慧》中提及的要点，以便您更接收到高质量回复。
        </div>
        <div class="job" v-show="getPubType=='job'">
          为避免被管理员删帖，发帖时请好好阅读《招聘帖规范》
        </div>
      </div>
      <div class="">
        <input type="text" class="title" v-model="getIpt" placeholder="标题字数10字以上">
      </div>
      <div>
        <textarea  class='markdown' v-model='getMarkdown'></textarea>
      </div>
      <div class="commit" @click="submit">
        <span>提交</span>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getPubType: 'none', // 获取选择发表的话题类型
      getIpt: '', // 获取输入框的内容
      getMarkdown: '' // 获取编辑框的内容
    }
  },
  methods: {
    submit () {
      var vm = this
      // 内容为空不发送请求
      if (this.getIpt === '' || this.getPubType === 'none' || this.getMarkdown === '') {
        alert('内容为空')
        return
      }
      this.$http.post('https://cnodejs.org/api/v1/topics',
        {
          accesstoken: '32794b15-c1e8-4d80-8170-fdfb52d65a70',
          title: vm.getIpt,
          tab: vm.getPubType,
          content: vm.getMarkdown
        })
      .then((respone) => {
        if (respone.success === true) {
          alert('发表成功')
        } else {
          alert('发表失败')
        }
      },
      (result) => {
        console.log(result)
      }
      )
    }
  }
}
</script>

<style lang="scss">
  .v-content {
    padding: 0 .1rem 0 .1rem;
  }
  .publish {
    margin-top: .1rem;
    font-size: 16px;
    .publishSel {
      width:1.5rem;
      margin-left: .1rem;
      border-radius: 0.03rem;
    }

    .ask , .job {
      margin-top: 0.05rem;
      text-indent:2em;
    }
  }
  .title {
    margin-top: .2rem;
    margin-bottom: .2rem;
    width: 100%;
    height: .4rem;
    border: 1px solid #DCDCDC;
    border-radius: 0.05rem;
    outline: none;
    font-size: 16px;
  }
  // 提交按钮
  .commit {
    float: left;
    width: .5rem;
    height: .3rem;
    margin-top: .1rem;
    background-color: rgb(37, 135, 215);
    color: white;
    text-align: center;
    line-height: .3rem;
    border-radius: 0.05rem;
    font-size: 16px;
  }

  /*主题编辑框*/
  .markdown {
    width: 100%;
    height: 2rem;
    padding: 0;
    border-radius: .05rem;
  }
</style>
