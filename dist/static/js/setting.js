webpackJsonp([18],{"1bl5":function(t,e,i){"use strict";e.a={data:function(){return{isLogin:!1}},created:function(){this.getInfo()},methods:{outLogin:function(){this.Storage.removeItem("uf"),this.$router.push({name:"home"})},getInfo:function(){var t=this;this.api.getBn({url:"customer/getByToken",user:!0}).then(function(e){e.successed?t.isLogin=!0:t.isLogin=!1})}}}},"7w8z":function(t,e,i){"use strict";function n(t){i("8qF0")}Object.defineProperty(e,"__esModule",{value:!0});var s=i("1bl5"),a=i("AOVL"),o=i("Z0/y"),r=n,u=o(s.a,a.a,!1,r,"data-v-1ad0faa0",null);e.default=u.exports},"8qF0":function(t,e,i){var n=i("KAsw");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("FIqI")("59240903",n,!0,{})},AOVL:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"wrapper",attrs:{id:"setting"}},[i("mt-cell",{attrs:{title:"常见问题",to:{name:"question"},"is-link":""}}),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("mt-cell",{attrs:{title:"关于我们",to:{name:"question"},"is-link":""}}),t._v(" "),i("div",{staticClass:"line"}),t._v(" "),i("br"),t._v(" "),i("br"),t._v(" "),t.isLogin?i("mt-button",{staticClass:"goCharge",attrs:{type:"danger"},nativeOn:{click:function(e){return t.outLogin(e)}}},[t._v("退出登录")]):t._e()],1)},s=[],a={render:n,staticRenderFns:s};e.a=a},KAsw:function(t,e,i){e=t.exports=i("UTlt")(!1),e.push([t.i,"#setting .goCharge[data-v-1ad0faa0]{position:fixed;left:0;right:0;bottom:40px;margin:auto;display:block;width:90%}",""])}});