webpackJsonp([22],{0:function(e,t,n){n("briU"),e.exports=n("NHnr")},"22O3":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={appInfo:"urlMessage",memberInfo:"uf",id:"id",token:"userToken",noHis:!0,setItem:function(e,t){e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},getItem:function(e){if(e)return window.localStorage.getItem(e)},getItemJson:function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},removeItem:function(e){e&&window.localStorage.removeItem(e)},isNoHis:function(){var e=window.sessionStorage;try{return e.setItem("test","testValue"),e.removeItem("test"),!0}catch(e){return!1}}}},"2OQq":function(e,t,n){"use strict";function a(e){n("sTfn")}var r=n("3EhW"),o=n("QKXg"),i=n("Z0/y"),u=a,c=i(r.a,o.a,!1,u,null,null);t.a=c.exports},"32GW":function(e,t,n){"use strict";t.a={data:function(){return{}},props:["tit","remark","width"],methods:{close:function(){this.$emit("close","")}},computed:{inWidth:function(){return this.width||""}},created:function(){},mounted:function(){}}},"3EhW":function(e,t,n){"use strict";t.a={data:function(){return{}},props:{styles:{type:Object,required:!1},allStyles:{type:Object,required:!1}},methods:{close:function(){this.$emit("close","")}},computed:{},created:function(){},mounted:function(){}}},"5KRq":function(e,t,n){"use strict";t.a={name:"app",data:function(){return{}},methods:{},created:function(){},mounted:function(){}}},"5OHe":function(e,t){},"6MMG":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wj-messageBox"},[n("Shade",[n("div",{staticClass:"wj-messageBox-border",style:{width:e.inWidth}},[e.tit?n("h3",{staticClass:"wj-messageBox-tit",on:{click:e.close}},[n("span",{staticClass:"wj-messageBox-tit-left"},[e._v(e._s(e.tit))]),e._v(" "),n("span",{staticClass:"wj-messageBox-tit-right"},[e._v(e._s(e.remark))])]):e._e(),e._v(" "),e._t("default")],2)])],1)},r=[],o={render:a,staticRenderFns:r};t.a=o},"6Vda":function(e,t,n){"use strict";var a={rightBarFun:function(e){return e.waji.rightBarFun}};t.a=a},"7DMm":function(e,t){},"7FDo":function(e,t,n){"use strict";var a=n("aTTO"),r={install:function(e){e.component("Border",a.a)}};t.a=r},"7NGQ":function(e,t,n){"use strict";var a=(n("LOkV"),n("xKOl"),n("22O3"),n("uWBr")),r=(new a.a,{state:{},mutations:{}});t.a=r},"7nwM":function(e,t,n){"use strict";var a=n("CjJf"),r={install:function(e){e.component("Shade",a.a)}};t.a=r},"9rBe":function(e,t,n){"use strict";function a(e){n("gHCW")}var r=n("32GW"),o=n("6MMG"),i=n("Z0/y"),u=a,c=i(r.a,o.a,!1,u,"data-v-876ff044",null);t.a=c.exports},CjJf:function(e,t,n){"use strict";function a(e){n("7DMm")}var r=n("PUNs"),o=n("GK32"),i=n("Z0/y"),u=a,c=i(r.a,o.a,!1,u,"data-v-6069215d",null);t.a=c.exports},EDgR:function(e,t){!function(){var e=document.documentElement,t=(window,function(){var t=e.clientWidth||375;(t=t>750?750:t)&&(e.style.fontSize=t/375*20+"px",window.remscale=t/375)});document.addEventListener&&(window.addEventListener("resize",t,!1),document.addEventListener("DOMContentLoaded",t,!1),setTimeout(function(){document.body.style.display="block"},10))}()},GK32:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wj-shade"},[e._t("default")],2)},r=[],o={render:a,staticRenderFns:r};t.a=o},GU8S:function(e,t){},H4Pp:function(e,t){},LOkV:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n("22O3"),r={myAlert:function(e,t){if(!document.getElementById("alertBg")){var n=t||1e3,a=document.createElement("div");a.setAttribute("id","alertBg");var r=document.createElement("p");r.setAttribute("class","text");var o=document.createTextNode(e);r.appendChild(o),a.appendChild(r),document.body.appendChild(a),setTimeout(function(){document.body.removeChild(a)},n)}},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},st:function(e){return e/40+"rem"},rem:function(){var e=document.documentElement.clientWidth||375;if(e=e>750?750:e)return e/375*20+"px"},getSearch:function(){var e={},t=location.search.substring(1);if(t.replace(/(^\s*)|(\s*$)/g,"").length<1)return e;for(var n=t.split("&"),a=0;a<n.length;a++){var r=n[a].indexOf("=");if(r>0){var o=n[a].substring(0,r),i=n[a].substring(r+1);e[o]=decodeURI(i)}else e[n[a]]=""}return e},goSearch:function(e,t,n){var a=e;for(var r in t)a.indexOf("?")>0?a+="&"+r+"="+t[r]:a+="?"+r+"="+t[r];if("n"===n)return a;window.location.href=a},time:function(){return 2e3},setItem:function(e,t){e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},getItem:function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},removeItem:function(e){e&&window.localStorage.removeItem(e)},dateTime:function(e,t){var n=e;if(e){var a=new Date(e),r=a.getFullYear()+"-"+this.addZero(a.getMonth()+1)+"-"+this.addZero(a.getDate()),o=this.addZero(a.getHours())+":"+this.addZero(a.getMinutes())+":"+this.addZero(a.getSeconds());n="date"===t?r:"time"===t?o:r+" "+o}return n},addZero:function(e){return e<10?"0"+e:e},ifWeixinTrue:function(){return/MicroMessenger/i.test(navigator.userAgent)},ifUc:function(){return navigator.userAgent.indexOf("UCBrowser")>-1},ifIos:function(){return!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},jm:function(e){return JSON.parse(JSON.stringify(e))},cm:function(e){console.log(JSON.parse(JSON.stringify(e)))},isTimerOver:function(e){var t=a.a.getItem(e);if(t.length>0){t=new Date(parseFloat(t));var n=parseInt(t.getFullYear()+""+this.addZero(t.getMonth()+1)+this.addZero(t.getDate())),r=new Date;return parseInt(r.getFullYear()+""+this.addZero(r.getMonth()+1)+this.addZero(r.getDate()))>n}return!0}}},M93x:function(e,t,n){"use strict";var a=n("5KRq"),r=n("iqa9"),o=n("Z0/y"),i=o(a.a,r.a,!1,null,null,null);t.a=i.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("MVMM"),r=n("M93x"),o=n("YaEn"),i=n("wy+4"),u=n("wSez"),c=n.n(u),s=n("uWBr"),f=n("LOkV"),l=n("xKOl"),m=n("22O3"),d=n("5OHe"),h=(n.n(d),n("EDgR")),g=(n.n(h),n("H4Pp")),p=(n.n(g),n("x5vq")),v=(n.n(p),n("GU8S")),y=(n.n(v),n("7FDo")),w=n("7nwM"),b=n("O5Uq"),B=n("o8IH");a.default.use(c.a),a.default.use(y.a),a.default.use(w.a),a.default.use(b.a),a.default.use(B.a),a.default.config.productionTip=!1;var k=new s.a;a.default.prototype.api=k,a.default.prototype.Util=f.a,a.default.prototype.User=l.a,a.default.prototype.Storage=m.a,new a.default({el:"#app",router:o.a,store:i.a,template:"<App/>",components:{App:r.a}})},O5Uq:function(e,t,n){"use strict";var a=n("9rBe"),r={install:function(e){e.component("MessageBox",a.a)}};t.a=r},PUNs:function(e,t,n){"use strict";t.a={data:function(){return{}},props:[],computed:{},created:function(){document.getElementsByTagName("body")[0].style.overflow="hidden"},mounted:function(){},destroyed:function(){document.getElementsByTagName("body")[0].style.overflowY="auto",document.getElementsByTagName("body")[0].style.overflowX="hidden"}}},QKXg:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Shade",[n("div",{staticClass:"wj-alert-wrapper",style:e.allStyles},[n("div",{staticClass:"wj-alert-border"},[n("div",{staticClass:"wj-alert-border-in"})]),e._v(" "),n("div",{staticClass:"wj-alert",style:e.styles},[n("div",{staticClass:"wj-alert-close",on:{click:e.close}},[e._t("closeImg")],2),e._v(" "),n("div",{staticClass:"wj-alert-title flex-zhong"},[e._t("title")],2),e._v(" "),n("div",{staticClass:"wj-alert-main"},[e._t("main")],2),e._v(" "),n("div",{staticClass:"wj-alert-btns flex-zhong"},[e._t("btns")],2)])])])},r=[],o={render:a,staticRenderFns:r};t.a=o},T452:function(e,t,n){"use strict";var a=n("6iV/");n.n(a),"function"==typeof Symbol&&Symbol.iterator},WEBo:function(e,t){},YaEn:function(e,t,n){"use strict";var a=n("MVMM"),r=n("cigS"),o=(n("wy+4"),n("LOkV"),n("22O3")),i=(n("xKOl"),n("uWBr")),u=(new i.a,function(){return n.e(19).then(n.bind(null,"IYAG"))}),c=function(){return n.e(8).then(n.bind(null,"nU8l"))},s=function(){return n.e(13).then(n.bind(null,"QlWu"))},f=function(){return n.e(18).then(n.bind(null,"8zp9"))},l=function(){return n.e(9).then(n.bind(null,"XJOZ"))},m=function(){return n.e(1).then(n.bind(null,"wcku"))},d=function(){return n.e(1).then(n.bind(null,"4XW6"))},h=function(){return n.e(1).then(n.bind(null,"cI88"))},g=function(){return n.e(11).then(n.bind(null,"J5UW"))},p=function(){return n.e(5).then(n.bind(null,"D7sX"))},v=function(){return n.e(5).then(n.bind(null,"MZQ2"))},y=function(){return n.e(14).then(n.bind(null,"FHp+"))},w=function(){return n.e(17).then(n.bind(null,"uZQp"))},b=function(){return n.e(2).then(n.bind(null,"4F/1"))},B=function(){return n.e(2).then(n.bind(null,"UCDg"))},k=function(){return n.e(3).then(n.bind(null,"B9C6"))},I=function(){return n.e(3).then(n.bind(null,"3Gfg"))},O=function(){return n.e(0).then(n.bind(null,"h1l6"))},C=function(){return n.e(0).then(n.bind(null,"jt04"))},x=function(){return n.e(0).then(n.bind(null,"H/0B"))},S=function(){return n.e(0).then(n.bind(null,"pPvx"))},T=function(){return n.e(12).then(n.bind(null,"kBmG"))},E=function(){return n.e(16).then(n.bind(null,"7w8z"))},M=function(){return n.e(7).then(n.bind(null,"PqIK"))},j=function(){return n.e(10).then(n.bind(null,"T9Ns"))},_=function(){return n.e(15).then(n.bind(null,"Y3Ax"))},A=function(){return n.e(4).then(n.bind(null,"s7us"))},D=function(){return n.e(4).then(n.bind(null,"HaQX"))},J=function(){return n.e(6).then(n.bind(null,"BYVo"))},H=function(){return n.e(6).then(n.bind(null,"Hv68"))};a.default.use(r.a);var N=new r.a({routes:[{path:"/",component:u,redirect:"/home",children:[{name:"home",path:"/home",component:c,meta:{name:"首页",showBottomTab:!0,hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"login",path:"/login",component:s,meta:{name:"登录",hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"register",path:"/register",component:f,meta:{name:"注册",showBack:!0,hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"shopping",path:"/shopping",component:M,meta:{name:"商城",showBottomTab:!0,hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"productDetail",path:"/shopping/productDetail",component:j,meta:{showBack:!0,name:"商品详情",htmlBg:{background:"#f2f2f2"}}},{name:"sureOrder",path:"/shopping/sureOrder",component:_,meta:{name:"确认订单",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"buySuccess",path:"/shopping/buySuccess",component:A,meta:{name:"购买成功",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"sendResult",path:"/shopping/sendResult",component:D,meta:{name:"提货结果",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"redLight",path:"/shopping/redLight",component:J,meta:{name:"升级红绿灯",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"upLvResult",path:"/shopping/upLvResult",component:H,meta:{name:"升级红绿灯结果",showBack:!0,htmlBg:{background:"#fff"}}},{name:"my",path:"/my",component:l,meta:{name:"我的",showBottomTab:!0,hideHeader:!0,htmlBg:{background:"#fff"}}},{name:"rechargeRecords",path:"/my/rechargeRecords",component:w,meta:{name:"资金记录",showBack:!0,htmlBg:{background:"#fff"}}},{name:"recharge",path:"/my/recharge",component:m,meta:{name:"充值",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"rechargeResult",path:"/recharge/rechargeResult",component:d,meta:{name:"充值结果",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"aliPay",path:"/my/recharge/aliPay",component:h,meta:{name:"支付宝充值",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"getMoney",path:"/my/getMoney",component:g,meta:{name:"提现",showBack:!0,tabRight:"提现说明",htmlBg:{background:"#f2f2f2"}}},{name:"myOrder",path:"/my/myOrder",component:p,meta:{name:"我的订单",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"orderDetail",path:"/my/orderDetail",component:v,meta:{name:"订单详情",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"upRecords",path:"/my/upRecords",component:y,meta:{name:"当天升级记录",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"receiveAddress",path:"/my/receiveAddress",component:b,meta:{name:"收货地址",showBack:!0,htmlBg:{background:"#fff"}}},{path:"/my/receiveAddress/receiveAddress_add",component:B,meta:{name:"编辑收货地址",showBack:!0,htmlBg:{background:"#fff"}}},{name:"myCards",path:"/my/myCards",component:k,meta:{name:"我的银行卡",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"addCard",path:"/my/myCards/addCard",component:I,meta:{name:"添加银行卡",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"safeCenter",path:"/my/safeCenter",component:O,meta:{name:"安全中心",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"updatePhone",path:"/my/safeCenter/updatePhone",component:C,meta:{name:"修改手机号",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"updatePw",path:"/my/safeCenter/updatePw",component:x,meta:{name:"修改密码",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"trueName",path:"/my/safeCenter/trueName",component:S,meta:{name:"实名认证",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"share",path:"/my/share",component:T,meta:{name:"分享",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"setting",path:"/my/setting",component:E,meta:{name:"设置",showBack:!0,htmlBg:{background:"#f2f2f2"}}}]}]});N.beforeEach(function(e,t,n){var a=JSON.stringify(window.location.href),r=a.indexOf("?"),i=a.indexOf("#");if(r<i&&r>0){var u=a.slice(1,r)+a.slice(i,-1)+a.slice(r,i);return void(window.location.href=u)}console.log(e,t),"login"===e.name&&t.name&&o.a.setItem("loginFrom",t.name),n()}),N.afterEach(function(e,t){var n=document.createElement("style"),a="";try{if(e.meta.htmlBg)for(var r in e.meta.htmlBg)a+=[r]+":"+e.meta.htmlBg[r]+";";else a="background:#f4f6f8;";var o=document.createTextNode("html{"+a+"}");n.appendChild(o),document.getElementsByTagName("body")[0].appendChild(n)}catch(e){console.log(e)}}),t.a=N},ZdXQ:function(e,t,n){"use strict";t.a={data:function(){return{}},props:["color","bg"],computed:{normalColor:function(){return this.color?this.color:"#d8d8d8"},npmalBg:function(){return this.bg?this.bg:"#fff"}},created:function(){},mounted:function(){}}},aTTO:function(e,t,n){"use strict";function a(e){n("WEBo")}var r=n("ZdXQ"),o=n("jC89"),i=n("Z0/y"),u=a,c=i(r.a,o.a,!1,u,"data-v-3438a44a",null);t.a=c.exports},d2gY:function(e,t,n){"use strict"},gHCW:function(e,t){},iqa9:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],o={render:a,staticRenderFns:r};t.a=o},jC89:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wj-border",style:{"border-color":e.normalColor,background:e.npmalBg}},[e._t("default")],2)},r=[],o={render:a,staticRenderFns:r};t.a=o},o8IH:function(e,t,n){"use strict";var a=n("2OQq"),r={install:function(e){e.component("Alert",a.a)}};t.a=r},"sL+B":function(e,t,n){"use strict";var a=n("uWBr"),r=(new a.a,{state:{rightBarFun:null},mutations:{setRightBar:function(e,t){e.rightBarFun=t}}});t.a=r},sTfn:function(e,t){},uWBr:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=n("BMa3"),o=n.n(r),i=n("6iV/"),u=n.n(i),c=(n("T452"),n("d2gY"),n("wy+4"),n("YaEn")),s=n("LOkV"),f=n("xKOl"),l=n("22O3"),m=n("wSez"),d=(n.n(m),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}());o.a.interceptors.response.use(function(e){return e.data},function(e){return Promise.reject(e)});var h=function(){function e(){a(this,e)}return d(e,[{key:"allNum",value:function(){return{num1:parseInt(10*Math.random()),num2:parseInt(1e3*Math.random())+""+(new Date).getTime()}}},{key:"getB",value:function(e){var t=this;return e.type="GET",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(m.Indicator.close(),e.errorCode){case"1001":s.a.myAlert(e.errorDesc),t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){a(e)})})}},{key:"getBn",value:function(e,t){var n=this;return e.type="GET",new Promise(function(t,a){n.ajaxB(e).then(function(e){t(e)}).catch(function(e){a(e)})})}},{key:"putB",value:function(e){var t=this;return e.type="PUT",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(m.Indicator.close(),e.errorCode){case"1001":s.a.myAlert(e.errorDesc),t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){m.Indicator.close(),t.errorHandle(e),a(e)})})}},{key:"postB",value:function(e){var t=this;return e.type="POST",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(m.Indicator.close(),e.errorCode){case"1001":s.a.myAlert(e.errorDesc),t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){m.Indicator.close(),t.errorHandle(e),a(e)})})}},{key:"postBn",value:function(e){var t=this;return e.type="POST",this.ajaxB(e).then(function(e){return e}).catch(function(e){m.Indicator.close(),t.errorHandle(e)})}},{key:"ajaxB",value:function(e){var t={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",Accept:"application/json; charset=utf-8"};Object.assign(t,e.headers);var n={};return e.params+""!="undefined"&&(n=e.params),e.user&&(t.token=f.a.getToken(),n.customerId=f.a.getUserId()),o()({method:e.type,baseURL:e.baseUrl||"http://116.62.63.100:16889",url:e.url,params:"GET"===e.type||"DELETE"===e.type?n:null,data:"GET"!==e.type&&"DELETE"!==e.type?u.a.stringify(n):null,timeout:6e5,headers:t})}},{key:"noLogin",value:function(){l.a.removeItem("uf"),c.a.replace({name:"login"})}},{key:"goLogin",value:function(){}},{key:"goRecharge",value:function(){}},{key:"postUp",value:function(e,t,n,a,r){var i="http://116.62.63.100:16889"+e,u={onUploadProgress:a,headers:{token:f.a.getToken()}};return console.log("ddd",t),o.a.post(i,t,u).then(n).catch(function(e){r&&r()})}},{key:"errorHandle",value:function(e){m.Indicator.close(),s.a.myAlert("网络错误，请稍后重试")}}]),e}();t.a=h},"wy+4":function(e,t,n){"use strict";var a=n("MVMM"),r=n("9rMa"),o=n("7NGQ"),i=n("sL+B"),u=n("6Vda");a.default.use(r.a);var c=new r.a.Store({modules:{user:o.a,waji:i.a},getters:u.a});t.a=c},x5vq:function(e,t){},xKOl:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n("22O3"),r={getToken:function(){var e=null;if(a.a.getItemJson(a.a.memberInfo)){e=a.a.getItemJson(a.a.memberInfo).token}return e},getUserInfo:function(){return a.a.getItemJson(a.a.memberInfo)},getUserId:function(){var e=null;if(a.a.getItemJson(a.a.memberInfo)){e=a.a.getItemJson(a.a.memberInfo).id}return e},getAppInfo:function(){var e="";return a.a.getItemJson(a.a.appInfo)&&(e=a.a.getItemJson(a.a.appInfo)),e},getShareCode:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){var t=a.a.getItemJson(a.a.appInfo);console.log(t),e=t.shareCode}return e},getAgentId:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){e=a.a.getItemJson(a.a.appInfo).agentId}return e},getSaleId:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){e=a.a.getItemJson(a.a.appInfo).saleId}return e}}}},[0]);