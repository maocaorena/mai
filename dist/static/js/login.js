webpackJsonp([13],{EOpo:function(t,e,r){var o=r("Qmr+");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("FIqI")("4669daf9",o,!0,{})},EbkF:function(t,e,r){"use strict";var o=r("wSez"),i=(r.n(o),r("r+z8"));e.a={data:function(){return{mobile:"",pw:"",code:"",agree:!0,cutdown:"获取验证码"}},methods:{getCode:function(){var t=this,e=this;/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)?(o.Indicator.open(),this.api.postB({url:"customer/sendMsgValidateCode",params:{mobile:this.mobile}}).then(function(r){if(o.Indicator.close(),r.successed){t.Util.myAlert("发送成功");var i=60;e.cutdown=i+"秒后重发";var a=setInterval(function(){i--,e.cutdown=i+"秒后重发",0==i&&(clearInterval(a),e.cutdown="获取验证码")},1e3)}})):this.Util.myAlert("手机号码格式不正确")},login:function(){var t=this;console.log("mobile:",this.mobile,"pw:",this.pw,"code:",this.code,"agree:",this.agree),/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)?0===this.code.length?this.Util.myAlert("请输入验证码"):this.agree?(o.Indicator.open(),this.api.postB({url:"customer/login",params:{mobile:this.mobile,shareCode:this.User.getShareCode()},headers:{msgValidateCode:i.a.md5(this.code)}}).then(function(e){if(o.Indicator.close(),e.returnValue){t.Util.myAlert("登录成功！"),t.Storage.setItem("uf",e.returnValue);var r=t.Storage.getItem("loginFrom");r?(t.Storage.removeItem("loginFrom"),t.$router.replace({name:r})):t.$router.replace({name:"home"})}else t.Util.myAlert(e.returnValue)})):this.Util.myAlert("请同意用户协议"):this.Util.myAlert("手机号码格式不正确")}},created:function(){console.log(this.User.getShareCode())},mounted:function(){}}},QlWu:function(t,e,r){"use strict";function o(t){r("EOpo")}Object.defineProperty(e,"__esModule",{value:!0});var i=r("EbkF"),a=r("vfF/"),n=r("Z0/y"),s=o,c=n(i.a,a.a,!1,s,"data-v-70b35a83",null);e.default=c.exports},"Qmr+":function(t,e,r){e=t.exports=r("UTlt")(!1),e.push([t.i,'#register[data-v-70b35a83]{background:#efefef}#register .content[data-v-70b35a83]{top:0;bottom:40px}#register .content h3[data-v-70b35a83]{width:100%;height:60px;text-align:center;font-size:20px;color:#666;line-height:60px;font-weight:400}#register .content .list[data-v-70b35a83]{width:100%;padding:0 15px;margin-bottom:27px}#register .content .list .border-item[data-v-70b35a83]{width:100%;padding:9px 0 9px 18px;background:#fff;margin-bottom:1px}#register .content .list .border-item i[data-v-70b35a83]{font-size:25px;color:#ff740d;line-height:34px;margin-right:12px}#register .content .list .border-item input[data-v-70b35a83]{border:0;outline:none;display:block;padding-left:0;height:34px;color:#111;vertical-align:middle;font-size:14px;line-height:34px}#register .content .list .border-item input[data-v-70b35a83]::-webkit-input-placeholder{color:#d2d2d2;font-size:15px}#register .content .list label[data-v-70b35a83]:nth-child(2){position:relative}#register .content .list label:nth-child(2) .get-code[data-v-70b35a83]{position:absolute;top:15px;width:100px;height:25px;right:5px;z-index:2;line-height:25px;text-align:center;border-left:1px solid #ddd;color:#ff740d;font-size:13px;background:#fff}#register .content .list label:nth-child(2) .get-code-gray[data-v-70b35a83]{border-left:1px solid #ddd;color:#cecece}#register .content .button[data-v-70b35a83]{width:100%;padding:0 15px}#register .content .button .login[data-v-70b35a83]{width:100%;height:40px;border:none;font-size:16px;color:#fff;border-radius:5px;background:#e62e36}#register .content .fu[data-v-70b35a83]{margin-top:22px;padding:0 15px;width:100%;height:20px}#register .content .fu .item[data-v-70b35a83]{display:block;width:50%;height:100%;color:#666;font-size:12px}#register .content .fu .item .my-choekbox[data-v-70b35a83]{position:relative;width:20px;height:20px;-webkit-appearance:none;outline:none}#register .content .fu .item .my-choekbox[data-v-70b35a83]:before{content:"";display:block;width:20px;height:20px;border:1px solid #ccc;border-radius:50%;background:#fff}#register .content .fu .item .my-choekbox[data-v-70b35a83]:after{content:"";position:absolute;top:26%;left:26%;display:block;width:14px;height:6px;border-left:1px solid #ff740d;border-bottom:1px solid #ff740d;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}#register .content .fu .item .my-choekbox[data-v-70b35a83]:checked:after{opacity:1}#register .content .fu a[data-v-70b35a83]{text-align:right}',""])},"r+z8":function(t,e,r){"use strict";r.d(e,"a",function(){return o});var o={md5:function(t){function e(t,e){return t<<e|t>>>32-e}function r(t,e){var r,o,i,a,n;return i=2147483648&t,a=2147483648&e,r=1073741824&t,o=1073741824&e,n=(1073741823&t)+(1073741823&e),r&o?2147483648^n^i^a:r|o?1073741824&n?3221225472^n^i^a:1073741824^n^i^a:n^i^a}function o(t,e,r){return t&e|~t&r}function i(t,e,r){return t&r|e&~r}function a(t,e,r){return t^e^r}function n(t,e,r){return e^(t|~r)}function s(t,i,a,n,s,c,l){return t=r(t,r(r(o(i,a,n),s),l)),r(e(t,c),i)}function c(t,o,a,n,s,c,l){return t=r(t,r(r(i(o,a,n),s),l)),r(e(t,c),o)}function l(t,o,i,n,s,c,l){return t=r(t,r(r(a(o,i,n),s),l)),r(e(t,c),o)}function d(t,o,i,a,s,c,l){return t=r(t,r(r(n(o,i,a),s),l)),r(e(t,c),o)}function u(t){var e,r,o="",i="";for(r=0;r<=3;r++)e=t>>>8*r&255,i="0"+e.toString(16),o+=i.substr(i.length-2,2);return o}var g,f,p,h,m,b,v,x,C,y=Array();for(t=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",r=0;r<t.length;r++){var o=t.charCodeAt(r);o<128?e+=String.fromCharCode(o):o>127&&o<2048?(e+=String.fromCharCode(o>>6|192),e+=String.fromCharCode(63&o|128)):(e+=String.fromCharCode(o>>12|224),e+=String.fromCharCode(o>>6&63|128),e+=String.fromCharCode(63&o|128))}return e}(t),y=function(t){for(var e,r=t.length,o=r+8,i=(o-o%64)/64,a=16*(i+1),n=Array(a-1),s=0,c=0;c<r;)e=(c-c%4)/4,s=c%4*8,n[e]=n[e]|t.charCodeAt(c)<<s,c++;return e=(c-c%4)/4,s=c%4*8,n[e]=n[e]|128<<s,n[a-2]=r<<3,n[a-1]=r>>>29,n}(t),b=1732584193,v=4023233417,x=2562383102,C=271733878,g=0;g<y.length;g+=16)f=b,p=v,h=x,m=C,b=s(b,v,x,C,y[g+0],7,3614090360),C=s(C,b,v,x,y[g+1],12,3905402710),x=s(x,C,b,v,y[g+2],17,606105819),v=s(v,x,C,b,y[g+3],22,3250441966),b=s(b,v,x,C,y[g+4],7,4118548399),C=s(C,b,v,x,y[g+5],12,1200080426),x=s(x,C,b,v,y[g+6],17,2821735955),v=s(v,x,C,b,y[g+7],22,4249261313),b=s(b,v,x,C,y[g+8],7,1770035416),C=s(C,b,v,x,y[g+9],12,2336552879),x=s(x,C,b,v,y[g+10],17,4294925233),v=s(v,x,C,b,y[g+11],22,2304563134),b=s(b,v,x,C,y[g+12],7,1804603682),C=s(C,b,v,x,y[g+13],12,4254626195),x=s(x,C,b,v,y[g+14],17,2792965006),v=s(v,x,C,b,y[g+15],22,1236535329),b=c(b,v,x,C,y[g+1],5,4129170786),C=c(C,b,v,x,y[g+6],9,3225465664),x=c(x,C,b,v,y[g+11],14,643717713),v=c(v,x,C,b,y[g+0],20,3921069994),b=c(b,v,x,C,y[g+5],5,3593408605),C=c(C,b,v,x,y[g+10],9,38016083),x=c(x,C,b,v,y[g+15],14,3634488961),v=c(v,x,C,b,y[g+4],20,3889429448),b=c(b,v,x,C,y[g+9],5,568446438),C=c(C,b,v,x,y[g+14],9,3275163606),x=c(x,C,b,v,y[g+3],14,4107603335),v=c(v,x,C,b,y[g+8],20,1163531501),b=c(b,v,x,C,y[g+13],5,2850285829),C=c(C,b,v,x,y[g+2],9,4243563512),x=c(x,C,b,v,y[g+7],14,1735328473),v=c(v,x,C,b,y[g+12],20,2368359562),b=l(b,v,x,C,y[g+5],4,4294588738),C=l(C,b,v,x,y[g+8],11,2272392833),x=l(x,C,b,v,y[g+11],16,1839030562),v=l(v,x,C,b,y[g+14],23,4259657740),b=l(b,v,x,C,y[g+1],4,2763975236),C=l(C,b,v,x,y[g+4],11,1272893353),x=l(x,C,b,v,y[g+7],16,4139469664),v=l(v,x,C,b,y[g+10],23,3200236656),b=l(b,v,x,C,y[g+13],4,681279174),C=l(C,b,v,x,y[g+0],11,3936430074),x=l(x,C,b,v,y[g+3],16,3572445317),v=l(v,x,C,b,y[g+6],23,76029189),b=l(b,v,x,C,y[g+9],4,3654602809),C=l(C,b,v,x,y[g+12],11,3873151461),x=l(x,C,b,v,y[g+15],16,530742520),v=l(v,x,C,b,y[g+2],23,3299628645),b=d(b,v,x,C,y[g+0],6,4096336452),C=d(C,b,v,x,y[g+7],10,1126891415),x=d(x,C,b,v,y[g+14],15,2878612391),v=d(v,x,C,b,y[g+5],21,4237533241),b=d(b,v,x,C,y[g+12],6,1700485571),C=d(C,b,v,x,y[g+3],10,2399980690),x=d(x,C,b,v,y[g+10],15,4293915773),v=d(v,x,C,b,y[g+1],21,2240044497),b=d(b,v,x,C,y[g+8],6,1873313359),C=d(C,b,v,x,y[g+15],10,4264355552),x=d(x,C,b,v,y[g+6],15,2734768916),v=d(v,x,C,b,y[g+13],21,1309151649),b=d(b,v,x,C,y[g+4],6,4149444226),C=d(C,b,v,x,y[g+11],10,3174756917),x=d(x,C,b,v,y[g+2],15,718787259),v=d(v,x,C,b,y[g+9],21,3951481745),b=r(b,f),v=r(v,p),x=r(x,h),C=r(C,m);return(u(b)+u(v)+u(x)+u(C)).toLowerCase()}}},"vfF/":function(t,e,r){"use strict";var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper",attrs:{id:"register"}},[r("div",{staticClass:"content"},[r("h3",[t._v("手机号登录")]),t._v(" "),r("div",{staticClass:"list flex flex-s"},[r("label",{staticClass:"border-item flex",attrs:{for:"userName"}},[r("i",{staticClass:"iconfont icon-shoujihao"}),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.mobile,expression:"mobile"}],attrs:{type:"text",name:"userName",placeholder:"手机号",id:"userName"},domProps:{value:t.mobile},on:{input:function(e){e.target.composing||(t.mobile=e.target.value)}}})]),t._v(" "),r("label",{staticClass:"border-item flex",attrs:{for:"code"}},[r("i",{staticClass:"iconfont icon-yanzhengma"}),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.code,expression:"code"}],attrs:{type:"text",name:"userName",placeholder:"短信验证码",id:"code"},domProps:{value:t.code},on:{input:function(e){e.target.composing||(t.code=e.target.value)}}}),t._v(" "),"获取验证码"===t.cutdown?r("div",{staticClass:"get-code",on:{click:t.getCode}},[t._v(t._s(t.cutdown))]):r("div",{staticClass:"get-code get-code-gray"},[t._v(t._s(t.cutdown))])])]),t._v(" "),r("div",{staticClass:"button"},[r("button",{staticClass:"login",attrs:{type:"button",name:"button"},on:{click:t.login}},[t._v("登录")])]),t._v(" "),r("div",{staticClass:"flex fu"},[r("div",{staticClass:"item flex flex-sc"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.agree,expression:"agree"}],staticClass:"my-choekbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.agree)?t._i(t.agree,null)>-1:t.agree},on:{change:function(e){var r=t.agree,o=e.target,i=!!o.checked;if(Array.isArray(r)){var a=t._i(r,null);o.checked?a<0&&(t.agree=r.concat([null])):a>-1&&(t.agree=r.slice(0,a).concat(r.slice(a+1)))}else t.agree=i}}}),t._v(" "),r("span",{staticClass:"agrement"},[t._v("我同意《用户协议》")])])])])])},i=[],a={render:o,staticRenderFns:i};e.a=a}});