webpackJsonp([1],{108:function(t,e,n){e=t.exports=n(68)(!0),e.push([t.i,'.login{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:3rem;height:1.2rem;font-size:.2rem;padding:.08rem}.login .reg-title{text-align:center}.login .reg-Ipt{height:.5rem;font-size:.2rem;margin-top:.05rem;border:.01rem solid #dcdcdc;border-radius:.05rem}.login .reg-button,.login .reg-Ipt{width:100%;-webkit-border-radius:.05rem}.login .reg-button{height:.3rem;line-height:.3rem;margin-top:.08rem;border-radius:.05rem;text-align:center;background-color:#747474}.login .acc-warn{height:.3rem}.userInfo{padding:0 .08rem}.userInfo .avatar{margin-top:.08rem;line-height:.5rem}.userInfo .avatar img{float:left;width:.5rem;height:.5rem;-webkit-border-radius:50%;border-radius:50%;border:.01rem solid #bcbcbc}.userInfo .avatar span{margin-left:.1rem}.userInfo .avatar:after{content:"";display:table;clear:both}.userInfo .topiccal{margin-top:.1rem;margin-bottom:.1rem}',"",{version:3,sources:["G:/git_project/cnode_vue/src/pages/user/index.vue"],names:[],mappings:"AAEA,OACE,kBAAmB,AACnB,QAAS,AACT,SAAU,AACV,uCAAyC,AACrC,mCAAqC,AACjC,+BAAiC,AACzC,WAAY,AACZ,cAAe,AACf,gBAAkB,AAClB,cAAiB,CAClB,AACD,kBACI,iBAAmB,CACtB,AACD,gBAEI,aAAe,AACf,gBAAkB,AAClB,kBAAoB,AACpB,4BAA8B,AAEtB,oBAAuB,CAClC,AACD,mCARI,WAAY,AAKZ,4BAA+B,CAYlC,AATD,mBAEI,aAAe,AACf,kBAAoB,AACpB,kBAAoB,AAEZ,qBAAuB,AAC/B,kBAAmB,AACnB,wBAA0B,CAC7B,AACD,iBACI,YAAe,CAClB,AACD,UACE,gBAA6B,CAE9B,AACD,kBACI,kBAAoB,AACpB,iBAAoB,CACvB,AACD,sBACM,WAAY,AACZ,YAAc,AACd,aAAe,AACf,0BAA2B,AACnB,kBAAmB,AAC3B,2BAA8B,CACnC,AACD,uBACM,iBAAoB,CACzB,AACD,wBACI,WAAY,AACZ,cAAe,AACf,UAAY,CACf,AACD,oBACI,iBAAmB,AACnB,mBAAsB,CACzB",file:"index.vue",sourcesContent:['\n@charset "UTF-8";\n.login {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 3rem;\n  height: 1.2rem;\n  font-size: 0.2rem;\n  padding: 0.08rem;\n}\n.login .reg-title {\n    text-align: center;\n}\n.login .reg-Ipt {\n    width: 100%;\n    height: 0.5rem;\n    font-size: 0.2rem;\n    margin-top: 0.05rem;\n    border: 0.01rem solid #DCDCDC;\n    -webkit-border-radius: 0.05rem;\n            border-radius: 0.05rem;\n}\n.login .reg-button {\n    width: 100%;\n    height: 0.3rem;\n    line-height: 0.3rem;\n    margin-top: 0.08rem;\n    -webkit-border-radius: 0.05rem;\n            border-radius: 0.05rem;\n    text-align: center;\n    background-color: #747474;\n}\n.login .acc-warn {\n    height: 0.3rem;\n}\n.userInfo {\n  padding: 0 0.08rem 0 0.08rem;\n  /*用户头像*/\n}\n.userInfo .avatar {\n    margin-top: 0.08rem;\n    line-height: 0.5rem;\n}\n.userInfo .avatar img {\n      float: left;\n      width: 0.5rem;\n      height: 0.5rem;\n      -webkit-border-radius: 50%;\n              border-radius: 50%;\n      border: 0.01rem solid #BCBCBC;\n}\n.userInfo .avatar span {\n      margin-left: 0.1rem;\n}\n.userInfo .avatar:after {\n    content: "";\n    display: table;\n    clear: both;\n}\n.userInfo .topiccal {\n    margin-top: 0.1rem;\n    margin-bottom: 0.1rem;\n}\n'],sourceRoot:""}])},113:function(t,e,n){var r=n(108);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(69)("625ef466",r,!0)},118:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("div",{staticClass:"header"},[n("v-goback"),t._v(" "),t.login?n("span",{staticClass:"signOut",on:{click:t.signOut}},[t._v("退出")]):t._e()],1),t._v(" "),n("div",{staticClass:"v-content"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.login,expression:"!login"}],staticClass:"login"},[n("div",{staticClass:"reg-title"},[t._v("\n        请输入您的accesstoken\n      ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.accesstoken,expression:"accesstoken"}],staticClass:"reg-Ipt ",attrs:{type:"text",placeholder:"accesstoken"},domProps:{value:t.accesstoken},on:{input:function(e){e.target.composing||(t.accesstoken=e.target.value)}}}),t._v(" "),n("div",{staticClass:"reg-button",on:{click:t.register}},[t._v("登录")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.accWarn,expression:"accWarn"}],staticClass:"alert-danger acc-warn"},[t._v("\n        请输入accesstoken!!!\n      ")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.login,expression:"login"}],staticClass:"userInfo"},[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:t.user.imgUrl,alt:"用户头像"}}),t._v(" "),n("span",[t._v(t._s(t.user.loginName))])]),t._v(" "),n("div",{staticClass:"topiccal"},[t._v("收藏话题"+t._s(t.user.Topiccal)+"个")]),t._v(" "),t._l(t.collTopicList,function(e){return n("div",{staticClass:"topic-item"},[n("router-link",{staticClass:"link",attrs:{to:{path:"detail",query:{id:e.id}}}}),t._v(" "),n("div",{staticClass:"topicImg"},[n("img",{attrs:{src:e.author.avatar_url,alt:""}})]),t._v(" "),n("div",{staticClass:"topicCont"},[n("div",{staticClass:"topichead"},[n("span",{staticClass:"tabtype",class:{true:"active",false:""}},[t._v(t._s(e.top?"置顶":e.good?"精华":"ask"==e.tabtype?"问答":"分享"))]),t._v(" "),n("span",{staticClass:"topicAtr"},[t._v("发表人： "+t._s(e.author.loginname))])]),t._v(" "),n("h4",[t._v(t._s(e.title))])])],1)})],2)])])},staticRenderFns:[]}},73:function(t,e,n){function r(t){n(113)}var a=n(0)(n(81),n(118),r,null,null);t.exports=a.exports},81:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(83),a=n.n(r);e.default={data:function(){return{login:!1,accesstoken:localStorage.accesstoken||"",accWarn:!1,collTopicList:[],user:{loginName:localStorage.loginName||"",imgUrl:localStorage.imgUrl||"",Topiccal:"0"}}},mounted:function(){localStorage.accesstoken&&this.getCollected(),""!==this.accesstoken&&(this.login=!0)},methods:{register:function(){if(!1===this.login){if(void 0===this.accesstoken||""===this.accesstoken)return void(this.accWarn=!0);this.accWarn=!1,this.$http.post("https://cnodejs.org/api/v1/accesstoken",{accesstoken:this.accesstoken}).then(function(t){var e=t.data;alert("登录成功"),this.collTopicList.length=0,localStorage.clear(),this.login=!0,this.user.loginName=e.loginname,this.user.imgUrl=e.avatar_url,localStorage.loginStatus=!0,localStorage.accesstoken=this.accesstoken,localStorage.loginName=this.user.loginName,localStorage.imgUrl=this.user.imgUrl,this.getCollected()},function(t){return console.log(t)})}},getCollected:function(){var t=this;this.$http.get("https://cnodejs.org/api/v1/topic_collect/"+this.user.loginName).then(function(e){var n=e.data;t.user.Topiccal=n.data.length,t.collTopicList=n.data,localStorage.collTopicList=a()(t.collTopicList)},function(t){console.log(t)})},signOut:function(){this.login=!1,this.accesstoken="",localStorage.clear(),setTimeout(function(){alert("成功退出")},200)}}}},83:function(t,e,n){t.exports={default:n(86),__esModule:!0}},86:function(t,e,n){var r=n(1),a=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return a.stringify.apply(a,arguments)}}});
//# sourceMappingURL=1.bd3a03e9cff3d46d682e.js.map