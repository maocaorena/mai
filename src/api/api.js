import axios from 'axios';
import config from './config';
import allConfig from '@/config/config';
import store from '@/stores';
import router from '@/router';
import { Util } from '@/assets/js/util.js'; //引入Util
import { User } from '@/assets/js/user.js'; //引入Storage
import { Storage } from '@/assets/js/storage.js'; //引入Storage
import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件

let bxmApiUrl = '/bb';

let commonUrl = '/cc';

let bxmUrl = allConfig.WWJ_TEST_WEB_URL;

let bxmShareUrl = allConfig.WWJ_TEST_WEB_URL;

let bdAppKey = 'a0b11e41e15041929219fc56dcffc597';
let bdClientId = 'hsFTXg9LFqK3HwaIYSGzm5QU';

if (process.env.NODE_ENV == 'production') {
    if (process.env.BUILD_ENV == 't') {//测试环境打包
        bxmUrl = allConfig.WWJ_TEST_WEB_URL;//测试网站地址
        bxmApiUrl = allConfig.WWJ_TEST_URL + '/waji';
        commonUrl = allConfig.WWJ_TEST_URL;
    } else {//线上环境打包
        if (Util.ifWeixinTrue()) {
            bxmUrl = allConfig.WWJ_PROD_WEB_URL;//微信线上网站地址
        } else {
            bxmUrl = allConfig.WWJ_PROD_WEB_UCURL;//uc线上网站地址
        };
        bxmShareUrl = allConfig.WWJ_PROD_WEB_URL;
        bxmApiUrl = allConfig.WWJ_PROD_URL + '/waji';
        commonUrl = allConfig.WWJ_PROD_URL;
        bdAppKey = '38964c5fa95344bb8503b28d643d8fda';
        bdClientId = 'agyAX6GIx9DSRPA6h7W9RGgU';
    };
};
var bxmHeader = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    "Accept": "application/json; charset=utf-8",
};
class API {
    commonUrl() {
        return commonUrl;
    };
    bxmUrl() {
        return bxmUrl;
    };
    bxmShareUrl() {
        return bxmShareUrl;
    };
    //随机数
    allNum() {
        let randomNum1 = parseInt(Math.random() * 10);
        let randomNum2 = parseInt(Math.random() * 1000) + '' + new Date().getTime();
        return {
            num1: randomNum1,
            num2: randomNum2
        };
    };
    // --------------------------------变现猫--------------------------------------
    //变现猫get
    getB(msg) {
        msg.type = 'GET';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                if (!res.data.successed) {
                    Indicator.close();
                    switch (res.data.errorCode) {
                        case '1001':
                            Util.myAlert(res.data.errorDesc);
                            this.noLogin();
                            break;
                        case '500':
                            Util.myAlert('系统异常，请稍后重试');
                            break;
                        default:
                            Util.myAlert(res.data.errorDesc);
                            break;
                    };
                };
                resolve(res);
            }).catch(error => {
                reject(error)
            });
        })
    };
    getBn(msg, type) {
        msg.type = 'GET';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error)
            });
        })
    }
    //变现猫post
    postB(msg) {
        msg.type = 'POST';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                if (!res.data.successed) {
                    Indicator.close();
                    switch (res.data.errorCode) {
                        case '1001':
                            Util.myAlert(res.data.errorDesc);
                            this.noLogin();
                            break;
                        case '500':
                            Util.myAlert('系统异常，请稍后重试');
                            break;
                        default:
                            Util.myAlert(res.data.errorDesc);
                            break;
                    }
                };
                resolve(res)
            }).catch(error => {
                Indicator.close();
                this.errorHandle(error);
                reject(error)
            });
        })
        return
    };
    //变现猫postn
    postBn(msg) {
        msg.type = 'POST';
        return this.ajaxB(msg).then(res => {
            return res;
        }).catch(error => {
            Indicator.close();
            this.errorHandle(error);
        });
    };
    // ----------------------------------公共接口--------------------------------------
    //公共接口get
    getC(msg, callback, error) {
        let _msg = {
            url: url,
            params: msg,
            type: 'GET',
            baseUrl: commonUrl
        };
        return this.ajaxB(_msg).then(res => {
            return res;
        }).catch(error => {
            this.errorHandle(error)
        });
    };
    //公共接口post
    postC(url, msg) {
        let _msg = {
            url: url,
            params: msg,
            type: 'POST',
            baseUrl: commonUrl
        };
        return this.ajaxB(_msg).then(res => {
            return res;
        }).catch(error => {
            this.errorHandle(error)
        });
    };
    ajaxB(msg) { //ajax
        config.baseURL = msg.baseUrl || bxmApiUrl;
        config.url = msg.url;
        config.data = {};
        config.params = {};
        config.headers = {};
        config.method = msg.type;
        if (msg.type == 'GET' || msg.type == 'DELETE') {
            config.params = msg.params;
        } else {
            config.data = msg.params;
        }
        for (let prop in bxmHeader) {
            config.headers[prop] = bxmHeader[prop];
        };
        if (msg.headers) {
            for (let prop in msg.headers) {
                config.headers[prop] = msg.headers[prop];
            }
        };
        return axios(config);
    };
    noLogin() {
        console.log('登录失效');
        store.dispatch('SetLoginState', 2);
        this.goLogin();
    };
    goLogin(){
        let allUrl = JSON.stringify(window.location.href);
        let _idx = allUrl.indexOf('my');
        console.log('bdAppKey', bdAppKey, 'User.getAppKey()',User.getAppKey())
        if (User.getAppKey() === bdAppKey){
            let _reUrl = this.bxmUrl();
            let _wx = "http://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=" + bdClientId + "&display=mobile&redirect_uri=" + _reUrl;
            window.location.href = _wx;
        } else if (User.getAppInfo().appUid) {
            if (User.getAppInfo().redirectLoginUrl == "bianxianmaoAppLogin") {
                console.log('唤起app');
                var isiPad = /iPad/i.test(navigator.userAgent);
                var isiPhone = /iPhone|iPod/i.test(navigator.userAgent);
                var isAndroid = /Android/i.test(navigator.userAgent);
                var isIOS = (isiPad || isiPhone);
                if (isAndroid) {
                    // 唤起app登录框
                    console.log('唤起Android app');
                    window.bianxianmao.onLoginClick('https://wwj.bianxianmao.com/#/home');
                } else {
                    // 唤起app登录框
                    console.log('唤起iOS app');
                    var redirectUrl = 'https://wwj.bianxianmao.com/#/home';
                    window.location.href = 'objc://bianxianmao/login' + ":/" + redirectUrl;
                };
            } else {
                //唤起对方h5登录
                if (User.getAppInfo().redirectLoginUrl) {
                    var href = User.getAppInfo().redirectLoginUrl + '?redirect=' + "https://wwj.bianxianmao.com/#/home";
                    window.location.replace(href);
                } else {
                    if (_idx >= 0) {
                        router.replace({
                            path: '/login'
                        });
                    } else {
                        router.push({
                            path: '/login'
                        });
                    }
                };
            };
        } else {
            if (_idx >= 0) {
                router.replace({
                    path: '/login'
                });
            } else {
                router.push({
                    path: '/login'
                });
            }
        }

    };
    goRecharge() {
        if (store.getters.loginstate != 1){
            this.noLogin()
        }else{
            if (store.getters.isVisit == 1){
                router.push({
                    path: '/ticketList'
                });
            }else{
                if (User.getAppInfo().redirectPayUrl == "bianxianmaoAppPay") {
                    console.log('唤起app');
                    var isiPad = /iPad/i.test(navigator.userAgent);
                    var isiPhone = /iPhone|iPod/i.test(navigator.userAgent);
                    var isAndroid = /Android/i.test(navigator.userAgent);
                    var isIOS = (isiPad || isiPhone);
                    if (isAndroid) {
                        // 唤起Android app 充值
                        console.log('唤起Android app 充值');
                        window.bianxianmao.onRechargeClick('https://wwj.bianxianmao.com/#/home');
                    } else {
                        // 唤起iOS app 充值
                        console.log('唤起iOS app 充值');
                        var redirectUrl = 'https://wwj.bianxianmao.com/#/home';
                        window.location.href = 'objc://bianxianmao/recharge' + ":/" + redirectUrl;
                    };
                } else {
                    //唤起对方h5充值
                    if (User.getAppInfo().redirectPayUrl) {
                        var href = User.getAppInfo().redirectPayUrl + '?redirect=' + "https://wwj.bianxianmao.com/#/home";
                        window.location.replace(href);
                    } else {
                        router.push({
                            path: '/recharge'
                        });
                    };
                };
            };
        }
    };

    // -------------------------------------------------------------------------
    //上传图片
    postUp(url, param, callback, progress) {
        config.baseURL = bxmApiUrl;
        let allUrl = config.baseURL + url;
        let upconfig = {
            onUploadProgress: progress
        };
        return axios.POST(allUrl, param, upconfig).then(callback); //使用post方式
    };

    //请求错误处理
    errorHandle(error) {
        Indicator.close();
        Util.myAlert("网络错误，请稍后重试")
    };

}
export default API;
