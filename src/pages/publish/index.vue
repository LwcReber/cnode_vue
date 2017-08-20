<template lang="html">
  <div class="">
    <div class="header">
      <v-goback></v-goback>
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
      // 内容为空不发送请求
      if (this.getIpt === '' || this.getPubType === 'none' || this.getMarkdown === '') {
        alert('内容为空')
        return
      }
      this.$http.post('https://cnodejs.org/api/v1/topics',
        {
          accesstoken: '32794b15-c1e8-4d80-8170-fdfb52d65a70',
          title: this.getIpt,
          tab: this.getPubType,
          content: this.getMarkdown
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
@import "../../css/pxRem.scss";

  .v-content {
    padding: 0 pxRem(10) 0 pxRem(10);
    font-size: pxRem(16);
  }
  .publish {
    margin-top: pxRem(10);
    .publishSel {
      width: pxRem(150);
      height: pxRem(30);
      margin-left: pxRem(10);
      border-radius: pxRem(2);
    }

    .ask , .job {
      margin-top: pxRem(5);
      text-indent: 2em;
    }
  }
  .title {
    margin-top: pxRem(20);
    margin-bottom: pxRem(20);
    width: 100%;
    height: pxRem(40);
    border: pxRem(1) solid #DCDCDC;
    border-radius: pxRem(5);
    outline: none;
  }
  // 提交按钮
  .commit {
    float: left;
    width: pxRem(50);
    height: pxRem(30);
    margin-top: pxRem(10);
    background-color: rgb(37, 135, 215);
    color: white;
    text-align: center;
    line-height: pxRem(30);
    border-radius: pxRem(5);
  }

  /*主题编辑框*/
  .markdown {
    width: 100%;
    height: pxRem(200);
    padding: 0;
    border-radius: pxRem(5);
  }
</style>
