webpackJsonp([24],{"/i2N":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],r={render:a,staticRenderFns:o};t.a=r},0:function(e,t,n){n("5XB1"),e.exports=n("NHnr")},"1Oa9":function(e,t){},"22O3":function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={appInfo:"urlMessage",memberInfo:"uf",id:"id",token:"userToken",noHis:!0,setItem:function(e,t){e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},getItem:function(e){if(e)return window.localStorage.getItem(e)},getItemJson:function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},removeItem:function(e){e&&window.localStorage.removeItem(e)},isNoHis:function(){var e=window.sessionStorage;try{return e.setItem("test","testValue"),e.removeItem("test"),!0}catch(e){return!1}}}},"2OQq":function(e,t,n){"use strict";function a(e){n("qC32")}var o=n("qYB2"),r=n("cEeG"),i=n("Aizv"),u=a,c=i(o.a,r.a,!1,u,null,null);t.a=c.exports},"4fQT":function(e,t){},"6Vda":function(e,t,n){"use strict";var a={rightBarFun:function(e){return e.waji.rightBarFun},roomList:function(e){return e.user.roomList},height:function(e){return e.user.height},homeListState:function(e){return e.user.homeListState},roomPageNum:function(e){return e.user.roomPageNum},roomDetail:function(e){return e.user.roomDetail},tag:function(e){return e.user.tag}};t.a=a},"7FDo":function(e,t,n){"use strict";var a=n("aTTO"),o={install:function(e){e.component("Border",a.a)}};t.a=o},"7NGQ":function(e,t,n){"use strict";var a=(n("LOkV"),n("xKOl"),n("22O3"),n("uWBr")),o=(new a.a,{state:{roomDetail:{},roomList:[],roomPageNum:1,height:0,homeListState:{noMore:!1,loading:!1},tag:""},mutations:{SET_HOMELIST_STATE:function(e,t){e.homeListState=t},SET_HEIGHT:function(e,t){e.height=t},SET_ROOM_LIST:function(e,t){e.roomList=t},SET_ROOM_PAGENUM:function(e,t){e.roomPageNum=t},SET_MESSAGE:function(e,t){e[t.code]=t.message}},actions:{SetMessage:function(e,t){(0,e.commit)("SET_MESSAGE",t)},SetHomeListState:function(e,t){(0,e.commit)("SET_HOMELIST_STATE",t)},SetHeight:function(e,t){(0,e.commit)("SET_HEIGHT",t)},SetRoomList:function(e,t){(0,e.commit)("SET_ROOM_LIST",t)},SetRoomPageNum:function(e,t){(0,e.commit)("SET_ROOM_PAGENUM",t)}}});t.a=o},"7nwM":function(e,t,n){"use strict";var a=n("CjJf"),o={install:function(e){e.component("Shade",a.a)}};t.a=o},"8Cyu":function(e,t,n){"use strict";t.a={data:function(){return{}},props:["color","bg"],computed:{normalColor:function(){return this.color?this.color:"#d8d8d8"},npmalBg:function(){return this.bg?this.bg:"#fff"}},created:function(){},mounted:function(){}}},"9rBe":function(e,t,n){"use strict";function a(e){n("IpBC")}var o=n("kGeQ"),r=n("G07K"),i=n("Aizv"),u=a,c=i(o.a,r.a,!1,u,"data-v-355bfe8f",null);t.a=c.exports},Agq3:function(e,t){},CjJf:function(e,t,n){"use strict";function a(e){n("Agq3")}var o=n("VXk3"),r=n("gyVN"),i=n("Aizv"),u=a,c=i(o.a,r.a,!1,u,"data-v-6a3e4986",null);t.a=c.exports},EDgR:function(e,t){!function(){var e=document.documentElement,t=(window,function(){var t=e.clientWidth||375;(t=t>750?750:t)&&(e.style.fontSize=t/375*20+"px",window.remscale=t/375)});document.addEventListener&&(window.addEventListener("resize",t,!1),document.addEventListener("DOMContentLoaded",t,!1),setTimeout(function(){document.body.style.display="block"},10))}()},G07K:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wj-messageBox"},[a("Shade",[a("div",{staticClass:"wj-messageBox-border",style:e.inWidth},[a("img",{directives:[{name:"show",rawName:"v-show",value:!e.hide,expression:"!hide"}],staticClass:"wj-messageBox-close",attrs:{src:n("QbBX"),alt:""},on:{click:e.close}}),e._v(" "),e.tit?a("h3",{staticClass:"wj-messageBox-tit",on:{click:e.close}},[a("span",{staticClass:"wj-messageBox-tit-left"},[e._v(e._s(e.tit))]),e._v(" "),a("span",{staticClass:"wj-messageBox-tit-right"},[e._v(e._s(e.remark))])]):e._e(),e._v(" "),e._t("default")],2)])],1)},o=[],r={render:a,staticRenderFns:o};t.a=r},GU8S:function(e,t){},GcqQ:function(e,t,n){"use strict";t.a={name:"app",data:function(){return{}},methods:{},created:function(){},mounted:function(){}}},H4Pp:function(e,t){},IpBC:function(e,t){},LOkV:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n("22O3"),o={myAlert:function(e,t){if(!document.getElementById("alertBg")){var n=t||1e3,a=document.createElement("div");a.setAttribute("id","alertBg");var o=document.createElement("p");o.setAttribute("class","text");var r=document.createTextNode(e);o.appendChild(r),a.appendChild(o),document.body.appendChild(a),setTimeout(function(){document.body.removeChild(a)},n)}},trim:function(e){return e.replace(/(^\s*)|(\s*$)/g,"")},st:function(e){return e/40+"rem"},rem:function(){var e=document.documentElement.clientWidth||375;if(e=e>750?750:e)return e/375*20+"px"},getSearch:function(){var e={},t=location.search.substring(1);if(t.replace(/(^\s*)|(\s*$)/g,"").length<1)return e;for(var n=t.split("&"),a=0;a<n.length;a++){var o=n[a].indexOf("=");if(o>0){var r=n[a].substring(0,o),i=n[a].substring(o+1);e[r]=decodeURI(i)}else e[n[a]]=""}return e},goSearch:function(e,t,n){var a=e;for(var o in t)a.indexOf("?")>0?a+="&"+o+"="+t[o]:a+="?"+o+"="+t[o];if("n"===n)return a;window.location.href=a},time:function(){return 2e3},setItem:function(e,t){e&&("string"!=typeof t&&(t=JSON.stringify(t)),window.localStorage.setItem(e,t))},getItem:function(e){if(e)return JSON.parse(window.localStorage.getItem(e))},removeItem:function(e){e&&window.localStorage.removeItem(e)},dateTime:function(e,t){var n=e;if(e){var a=new Date(e),o=a.getFullYear()+"-"+this.addZero(a.getMonth()+1)+"-"+this.addZero(a.getDate()),r=this.addZero(a.getHours())+":"+this.addZero(a.getMinutes())+":"+this.addZero(a.getSeconds());n="date"===t?o:"time"===t?r:o+" "+r}return n},addZero:function(e){return e<10?"0"+e:e},ifWeixinTrue:function(){return/MicroMessenger/i.test(navigator.userAgent)},ifUc:function(){return navigator.userAgent.indexOf("UCBrowser")>-1},ifIos:function(){return!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},jm:function(e){return JSON.parse(JSON.stringify(e))},cm:function(e){console.log(JSON.parse(JSON.stringify(e)))},isTimerOver:function(e){var t=a.a.getItem(e);if(t.length>0){t=new Date(parseFloat(t));var n=parseInt(t.getFullYear()+""+this.addZero(t.getMonth()+1)+this.addZero(t.getDate())),o=new Date;return parseInt(o.getFullYear()+""+this.addZero(o.getMonth()+1)+this.addZero(o.getDate()))>n}return!0}}},M93x:function(e,t,n){"use strict";var a=n("GcqQ"),o=n("/i2N"),r=n("Aizv"),i=r(a.a,o.a,!1,null,null,null);t.a=i.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("FevL"),o=n("M93x"),r=n("YaEn"),i=n("wy+4"),u=n("NtYf"),c=n.n(u),s=n("uWBr"),l=n("LOkV"),m=n("xKOl"),f=n("22O3"),d=n("1Oa9"),g=(n.n(d),n("EDgR")),h=(n.n(g),n("H4Pp")),p=(n.n(h),n("x5vq")),v=(n.n(p),n("GU8S")),y=(n.n(v),n("7FDo")),B=n("7nwM"),b=n("O5Uq"),w=n("o8IH");a.default.use(c.a),a.default.use(y.a),a.default.use(B.a),a.default.use(b.a),a.default.use(w.a),a.default.config.productionTip=!1;var k=new s.a;a.default.prototype.api=k,a.default.prototype.Util=l.a,a.default.prototype.User=m.a,a.default.prototype.Storage=f.a,new a.default({el:"#app",router:r.a,store:i.a,template:"<App/>",components:{App:o.a}})},O5Uq:function(e,t,n){"use strict";var a=n("9rBe"),o={install:function(e){e.component("MessageBox",a.a)}};t.a=o},QbBX:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABMCAMAAAAV12R1AAAABGdBTUEAALGPC/xhBQAAAZVQTFRF////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAA////Tzi/nAAAAIZ0Uk5T4EXb1u+so8x4dqU2Tyyca+eRSjPCuyv5TsRAP9WWMLgoC0SVqZqmoVbhDBY6sioOz/6kaBzRh8seJQXH8okdIPri5dIT1IJ9uoT7zcP9qEkII2bm6rQKxn4EGBQan4iXFykxV/BQVM5wH2qA6Ow49jfzAwJHBvT4CW/xASTkDxXJLdPrEACaenjeAAADGUlEQVRIx+3WVXviQBQG4Nltu3V3d9u6u7sL1AUqUENKoWgFQuf73RvStIVkBnq5Fz1XYTIv82SSOecQqo4Kz8meyQk4TXsnngqfegJRDljKg4iIYLklOrIbO8Vpzsr9pvOJt7eJ86b9SnFFdBrtfNTaB1gbHI/hY4+OBivQ18pB1fXAZf+R+hGO+i+B+moWKigDGlsoM1oagbICNSrxwlRDuVFjgrdEiYoKUXxIo8RhMQqLIlGpCzu7NGrs7sBVGo6qvNh5oDHiYQfeqi/kFrC3S2PG7h4E9yfSQXtMvxHHWug+0H0XHPLwX/bsj2EHuu7fkW8A3fLgqfDKMq/CqXzVjQGfhAxw6uVX/wyWehXwLH8oeicMEvLj43/oE0uFzNPHj1P4QygXLj2NoiIM1buQK6Js1IVNUalIQ2kdskWUhRzKV0pDc5BFSTqsEecnUqkMfbQinWQiX/HgT5pPJRrNk+J2PjJJBvaV2xUIyko0wYDy7j4ySB4uKEcxDb1AHtHgnLIV29BzaIgNN5Sp4uKYht7ARoA31ucWMANmlqFvAA+9CIDwwkNW9LKMH/Hx8LNUL6xEizOmCQbE52KpM2hJItLYRtoNhkpDIvmDZI7hqGT8IUlI4Bm2SkASscBs5xmWspthIQc2WLiGoSywHRCaglq+UatapIiH0AGzm2+Uym0W0x2hD83whBlvqnK7Ur1hyoPmh1A26sGUvFSHaO7Vr/NeVB3yQlPokVKYexrz8lFuY5mQapNTwjym3e9p+QIu+VN6bGen5XbZnLmkIysVgEUIm98pAJsCFj+rxnEQJ77YxneC4PFXUdtYw1JstIS1jfDyeQvcxTJ3wG1koV4AdMPRyLAOWFC2BNfAyCDfDI4A1+rmw2jD5a2dTey3l7AZWW3O0BVwZWDsos8QujPEbqgOrkeBGY+yPnlmgNHrA27rdjgmdmrLq3eOG2lB343jbnVZ7OXGDqM2ibOeFak1dAXJb5NLulzxzMbqLCnd2l6fm3zvKifn1re3vtGOyi3NOPArMM5pfQjvxXDS9Q/6QT/oB/1H6B+F0LKsEeq+twAAAABJRU5ErkJggg=="},T452:function(e,t,n){"use strict";var a=n("mQOt");n.n(a),"function"==typeof Symbol&&Symbol.iterator},VXk3:function(e,t,n){"use strict";t.a={data:function(){return{}},props:[],computed:{},created:function(){document.getElementsByTagName("body")[0].style.overflow="hidden"},mounted:function(){},destroyed:function(){document.getElementsByTagName("body")[0].style.overflowY="auto",document.getElementsByTagName("body")[0].style.overflowX="hidden"}}},YaEn:function(e,t,n){"use strict";var a=n("FevL"),o=n("dNqC"),r=(n("wy+4"),n("LOkV"),n("22O3")),i=n("xKOl"),u=n("uWBr"),c=(new u.a,function(){return n.e(21).then(n.bind(null,"IYAG"))}),s=function(){return n.e(8).then(n.bind(null,"nU8l"))},l=function(){return n.e(13).then(n.bind(null,"QlWu"))},m=function(){return n.e(18).then(n.bind(null,"8zp9"))},f=function(){return n.e(11).then(n.bind(null,"XJOZ"))},d=function(){return n.e(2).then(n.bind(null,"wcku"))},g=function(){return n.e(2).then(n.bind(null,"4XW6"))},h=function(){return n.e(2).then(n.bind(null,"cI88"))},p=function(){return n.e(14).then(n.bind(null,"J5UW"))},v=function(){return n.e(7).then(n.bind(null,"D7sX"))},y=function(){return n.e(3).then(n.bind(null,"H/9t"))},B=function(){return n.e(3).then(n.bind(null,"T6vt"))},b=function(){return n.e(3).then(n.bind(null,"EJju"))},w=function(){return n.e(7).then(n.bind(null,"MZQ2"))},k=function(){return n.e(17).then(n.bind(null,"FHp+"))},I=function(){return n.e(19).then(n.bind(null,"uZQp"))},A=function(){return n.e(5).then(n.bind(null,"4F/1"))},S=function(){return n.e(5).then(n.bind(null,"UCDg"))},E=function(){return n.e(6).then(n.bind(null,"B9C6"))},O=function(){return n.e(6).then(n.bind(null,"3Gfg"))},T=function(){return n.e(0).then(n.bind(null,"h1l6"))},C=function(){return n.e(0).then(n.bind(null,"jt04"))},x=function(){return n.e(0).then(n.bind(null,"H/0B"))},N=function(){return n.e(0).then(n.bind(null,"pPvx"))},L=function(){return n.e(16).then(n.bind(null,"kBmG"))},j=function(){return n.e(20).then(n.bind(null,"7w8z"))},G=function(){return n.e(15).then(n.bind(null,"5lXG"))},H=function(){return n.e(9).then(n.bind(null,"PqIK"))},M=function(){return n.e(10).then(n.bind(null,"T9Ns"))},Q=function(){return n.e(12).then(n.bind(null,"Y3Ax"))},D=function(){return n.e(1).then(n.bind(null,"s7us"))},J=function(){return n.e(1).then(n.bind(null,"vdCt"))},P=function(){return n.e(1).then(n.bind(null,"HaQX"))},_=function(){return n.e(4).then(n.bind(null,"BYVo"))},q=function(){return n.e(4).then(n.bind(null,"Hv68"))};a.default.use(o.a);var R=new o.a({routes:[{path:"/",component:c,redirect:"/home",children:[{name:"home",path:"/home",component:s,meta:{name:"首页",showBottomTab:!0,hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"login",path:"/login",component:l,meta:{name:"登录",hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"register",path:"/register",component:m,meta:{name:"注册",showBack:!0,hideHeader:!0,htmlBg:{background:"#f2f2f2"}}},{name:"shopping",path:"/shopping",component:H,meta:{name:"商城",showBottomTab:!0,hideHeader:!0,keep:!0,htmlBg:{background:"#f2f2f2"}}},{name:"productDetail",path:"/shopping/productDetail",component:M,meta:{showBack:!0,name:"商品详情",htmlBg:{background:"#f2f2f2"}}},{name:"sureOrder",path:"/shopping/sureOrder",component:Q,meta:{name:"确认订单",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"buySuccess",path:"/shopping/buySuccess",component:D,meta:{name:"购买成功",showBack:!0,htmlBg:{background:"#fff"}}},{name:"sendResult",path:"/shopping/sendResult",component:P,meta:{name:"提货结果",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"redLight",path:"/shopping/redLight",component:_,meta:{name:"升级红绿灯",showBack:!0,htmlBg:{background:"#bff4ff"}}},{name:"upLvResult",path:"/shopping/upLvResult",component:q,meta:{name:"升级红绿灯结果",showBack:!0,htmlBg:{background:"#fff"}}},{name:"my",path:"/my",component:f,meta:{name:"我的",showBottomTab:!0,hideHeader:!0,htmlBg:{background:"#fff"}}},{name:"rechargeRecords",path:"/my/rechargeRecords",component:I,meta:{name:"资金记录",showBack:!0,login:!0,htmlBg:{background:"#fff"}}},{name:"recharge",path:"/my/recharge",component:d,meta:{name:"充值",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"rechargeResult",path:"/recharge/rechargeResult",component:g,meta:{name:"充值结果",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"aliPay",path:"/my/recharge/aliPay",component:h,meta:{name:"支付宝充值",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"getMoney",path:"/my/getMoney",component:p,meta:{name:"提现",showBack:!0,login:!0,tabRight:"提现说明",htmlBg:{background:"#f2f2f2"}}},{name:"myOrder",path:"/my/myOrder",component:v,meta:{name:"我的订单",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"payCarMonry",path:"/my/payCarMonry",component:J,meta:{name:"支付运费",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"orderDetail",path:"/my/orderDetail",component:w,meta:{name:"订单详情",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"myGold",path:"/my/myGold",component:y,meta:{name:"黄金账户",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"getGold",path:"/my/getGold",component:B,meta:{name:"提取黄金",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"sureGold",path:"/my/sureGold",component:b,meta:{name:"确认订单",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"upRecords",path:"/my/upRecords",component:k,meta:{name:"当天升级记录",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"receiveAddress",path:"/my/receiveAddress",component:A,meta:{name:"收货地址",showBack:!0,login:!0,htmlBg:{background:"#fff"}}},{path:"/my/receiveAddress/receiveAddress_add",component:S,meta:{name:"编辑收货地址",showBack:!0,login:!0,htmlBg:{background:"#fff"}}},{name:"myCards",path:"/my/myCards",component:E,meta:{name:"我的银行卡",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"addCard",path:"/my/myCards/addCard",component:O,meta:{name:"添加银行卡",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"safeCenter",path:"/my/safeCenter",component:T,meta:{name:"安全中心",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"updatePhone",path:"/my/safeCenter/updatePhone",component:C,meta:{name:"修改手机号",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"updatePw",path:"/my/safeCenter/updatePw",component:x,meta:{name:"修改密码",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"trueName",path:"/my/safeCenter/trueName",component:N,meta:{name:"实名认证",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"share",path:"/my/share",component:L,meta:{name:"分享",showBack:!0,login:!0,htmlBg:{background:"#f2f2f2"}}},{name:"setting",path:"/my/setting",component:j,meta:{name:"设置",showBack:!0,htmlBg:{background:"#f2f2f2"}}},{name:"question",path:"question",component:G,meta:{name:"常见问题",showBack:!0,htmlBg:{background:"#fff"}}}]}]});R.beforeEach(function(e,t,n){var a=JSON.stringify(window.location.href),o=a.indexOf("?"),u=a.indexOf("#");if(o<u&&o>0){var c=a.slice(1,o)+a.slice(u,-1)+a.slice(o,u);return void(window.location.href=c)}console.log(t),"login"===e.name&&t.name&&r.a.setItem("loginFrom",t.fullPath),e.meta.login&&!i.a.getToken()?n({name:"login"}):n()}),R.afterEach(function(e,t){var n="";document.getElementById("style")?n=document.getElementById("style"):(n=document.createElement("style"),n.setAttribute("id","style"),document.getElementsByTagName("body")[0].appendChild(n));var a="";try{if(e.meta.htmlBg)for(var o in e.meta.htmlBg)a+=[o]+":"+e.meta.htmlBg[o]+";";else a="background:#f4f6f8;";document.createTextNode("html{"+a+"}");n.innerHTML="html{"+a+"}"}catch(e){console.log(e)}}),t.a=R},YtgB:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wj-border",style:{"border-color":e.normalColor,background:e.npmalBg}},[e._t("default")],2)},o=[],r={render:a,staticRenderFns:o};t.a=r},aTTO:function(e,t,n){"use strict";function a(e){n("4fQT")}var o=n("8Cyu"),r=n("YtgB"),i=n("Aizv"),u=a,c=i(o.a,r.a,!1,u,"data-v-3438a44a",null);t.a=c.exports},cEeG:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("Shade",[n("div",{staticClass:"wj-alert-wrapper",style:e.allStyles},[n("div",{staticClass:"wj-alert-border"},[n("div",{staticClass:"wj-alert-border-in"})]),e._v(" "),n("div",{staticClass:"wj-alert",style:e.styles},[n("div",{staticClass:"wj-alert-close",on:{click:e.close}},[e._t("closeImg")],2),e._v(" "),n("div",{staticClass:"wj-alert-title flex-zhong"},[e._t("title")],2),e._v(" "),n("div",{staticClass:"wj-alert-main"},[e._t("main")],2),e._v(" "),n("div",{staticClass:"wj-alert-btns flex-zhong"},[e._t("btns")],2)])])])},o=[],r={render:a,staticRenderFns:o};t.a=r},d2gY:function(e,t,n){"use strict"},gyVN:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wj-shade"},[e._t("default")],2)},o=[],r={render:a,staticRenderFns:o};t.a=r},kGeQ:function(e,t,n){"use strict";t.a={data:function(){return{}},props:["tit","remark","instyle","hide"],methods:{close:function(){this.$emit("close","")}},computed:{inWidth:function(){return this.instyle||{}}},created:function(){},mounted:function(){}}},o8IH:function(e,t,n){"use strict";var a=n("2OQq"),o={install:function(e){e.component("Alert",a.a)}};t.a=o},qC32:function(e,t){},qYB2:function(e,t,n){"use strict";t.a={data:function(){return{}},props:{styles:{type:Object,required:!1},allStyles:{type:Object,required:!1}},methods:{close:function(){this.$emit("close","")}},computed:{},created:function(){},mounted:function(){}}},"sL+B":function(e,t,n){"use strict";var a=n("uWBr"),o=(new a.a,{state:{rightBarFun:null},mutations:{setRightBar:function(e,t){e.rightBarFun=t}}});t.a=o},uWBr:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=n("xY2u"),r=n.n(o),i=n("mQOt"),u=n.n(i),c=(n("T452"),n("d2gY"),n("wy+4"),n("YaEn")),s=n("LOkV"),l=n("xKOl"),m=n("22O3"),f=n("NtYf"),d=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}());r.a.interceptors.response.use(function(e){return e.data},function(e){return Promise.reject(e)});var g=function(){function e(){a(this,e)}return d(e,[{key:"noShowNum",value:function(){return["PDkQH40JlQJZDdrN4OyqjKodKxl7EkJl"]}},{key:"allNum",value:function(){return{num1:parseInt(10*Math.random()),num2:parseInt(1e3*Math.random())+""+(new Date).getTime()}}},{key:"getB",value:function(e){var t=this;return e.type="GET",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(f.Indicator.close(),e.errorCode){case"1001":t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){a(e)})})}},{key:"getBn",value:function(e,t){var n=this;return e.type="GET",new Promise(function(t,a){n.ajaxB(e).then(function(e){t(e)}).catch(function(e){a(e)})})}},{key:"putB",value:function(e){var t=this;return e.type="PUT",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(f.Indicator.close(),e.errorCode){case"1001":s.a.myAlert(e.errorDesc),t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){f.Indicator.close(),t.errorHandle(e),a(e)})})}},{key:"postB",value:function(e){var t=this;return e.type="POST",new Promise(function(n,a){t.ajaxB(e).then(function(e){if(!e.successed)switch(f.Indicator.close(),e.errorCode){case"1001":s.a.myAlert(e.errorDesc),t.noLogin();break;case"500":s.a.myAlert("系统异常，请稍后重试");break;default:s.a.myAlert(e.errorDesc)}n(e)}).catch(function(e){f.Indicator.close(),t.errorHandle(e),a(e)})})}},{key:"postBn",value:function(e){var t=this;return e.type="POST",this.ajaxB(e).then(function(e){return e}).catch(function(e){f.Indicator.close(),t.errorHandle(e)})}},{key:"ajaxB",value:function(e){var t={"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",Accept:"application/json; charset=utf-8"};Object.assign(t,e.headers);var n={};return e.params+""!="undefined"&&(n=e.params),e.user&&(t.token=l.a.getToken(),n.customerId=l.a.getUserId()),r()({method:e.type,baseURL:e.baseUrl||"http://116.62.63.100:16889",url:e.url,params:"GET"===e.type||"DELETE"===e.type?n:null,data:"GET"!==e.type&&"DELETE"!==e.type?u.a.stringify(n):null,timeout:6e5,headers:t})}},{key:"noLogin",value:function(){m.a.removeItem("uf"),c.a.replace({name:"login"})}},{key:"goLogin",value:function(){}},{key:"goRecharge",value:function(){}},{key:"postUp",value:function(e,t,n,a,o){var i="http://116.62.63.100:16889/"+e,u={onUploadProgress:a,headers:{token:l.a.getToken()}};return r.a.post(i,t,u).then(n).catch(function(e){o&&o()})}},{key:"errorHandle",value:function(e){f.Indicator.close(),s.a.myAlert("网络错误，请稍后重试")}}]),e}();t.a=g},"wy+4":function(e,t,n){"use strict";var a=n("FevL"),o=n("EcfS"),r=n("7NGQ"),i=n("sL+B"),u=n("6Vda");a.default.use(o.a);var c=new o.a.Store({modules:{user:r.a,waji:i.a},getters:u.a});t.a=c},x5vq:function(e,t){},xKOl:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=n("22O3"),o={getToken:function(){var e=null;if(a.a.getItemJson(a.a.memberInfo)){e=a.a.getItemJson(a.a.memberInfo).token}return e},getUserInfo:function(){return a.a.getItemJson(a.a.memberInfo)},getUserId:function(){var e=null;if(a.a.getItemJson(a.a.memberInfo)){e=a.a.getItemJson(a.a.memberInfo).id}return e},getAppInfo:function(){var e="";return a.a.getItemJson(a.a.appInfo)&&(e=a.a.getItemJson(a.a.appInfo)),e},getShareCode:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){var t=a.a.getItemJson(a.a.appInfo);console.log(t),e=t.shareCode}return e},getAgentId:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){e=a.a.getItemJson(a.a.appInfo).agentId}return e},getSaleId:function(){var e=null;if(a.a.getItemJson(a.a.appInfo)){e=a.a.getItemJson(a.a.appInfo).saleId}return e}}}},[0]);