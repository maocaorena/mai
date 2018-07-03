import axios from 'axios';
import qs from 'qs';
import config from './config';
import allConfig from '@/config/config';
import store from '@/stores';
import router from '@/router';
import { Util } from '@/assets/js/util.js'; //引入Util
import { User } from '@/assets/js/user.js'; //引入Storage
import { Storage } from '@/assets/js/storage.js'; //引入Storage
import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件

let bxmApiUrl = 'http://116.62.63.100:16889';

if (process.env.NODE_ENV == 'production') {
    if (process.env.BUILD_ENV == 't') {
        //测试环境打包

    } else {
        //线上环境打包

    };
};
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
class API {
    noShowNum(){
        return [
            'PDkQH40JlQJZDdrN4OyqjKodKxl7EkJl'
        ]
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
    //get
    getB(msg) {
        msg.type = 'GET';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                if (!res.successed) {
                    Indicator.close();
                    switch (res.errorCode) {
                        case '1001':
                            // Util.myAlert(res.errorDesc);
                            this.noLogin();
                            break;
                        case '500':
                            Util.myAlert('系统异常，请稍后重试');
                            break;
                        default:
                            Util.myAlert(res.errorDesc);
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

    //put
    putB(msg) {
        msg.type = 'PUT';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                if (!res.successed) {
                    Indicator.close();
                    switch (res.errorCode) {
                        case '1001':
                            Util.myAlert(res.errorDesc);
                            this.noLogin();
                            break;
                        case '500':
                            Util.myAlert('系统异常，请稍后重试');
                            break;
                        default:
                            Util.myAlert(res.errorDesc);
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
    //post
    postB(msg) {
        msg.type = 'POST';
        return new Promise((resolve, reject) => {
            this.ajaxB(msg).then(res => {
                if (!res.successed) {
                    Indicator.close();
                    switch (res.errorCode) {
                        case '1001':
                            Util.myAlert(res.errorDesc);
                            this.noLogin();
                            break;
                        case '500':
                            Util.myAlert('系统异常，请稍后重试');
                            break;
                        default:
                            Util.myAlert(res.errorDesc);
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
    //postn
    postBn(msg) {
        msg.type = 'POST';
        return this.ajaxB(msg).then(res => {
            return res;
        }).catch(error => {
            Indicator.close();
            this.errorHandle(error);
        });
    };
    ajaxB(msg) { //ajax
        let _headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "Accept": "application/json; charset=utf-8",
        };
        Object.assign(_headers, msg.headers);
        let _params = {};
        if((msg.params+'') != 'undefined'){
            _params = msg.params;
        };
        if(msg.user){
            _headers.token = User.getToken();
            _params.customerId = User.getUserId();
        }

        return axios({
            method: msg.type,
            baseURL: msg.baseUrl || bxmApiUrl,
            url: msg.url,
            params: msg.type === 'GET' || msg.type === 'DELETE' ? _params : null,
            data: msg.type !== 'GET' && msg.type !== 'DELETE' ? qs.stringify(_params) : null,
            timeout: 600000,
            headers: _headers,
        })
    };
    noLogin() {
        Storage.removeItem('uf');
        router.replace({
            name: 'login'
        })
        /* {
            "token":"f17638f5dadd4e9dbeb0c1b24b8eee9e",
            "customerId":"43"
        } */
    };
    goLogin() {

    };
    goRecharge() {

    };

    // -------------------------------------------------------------------------
    //上传图片
    postUp(url, param, callback, progress, err) {
        let allUrl = bxmApiUrl + '/' + url;
		let upconfig = {
			onUploadProgress: progress,
			headers:{
				"token": User.getToken()
			}
        };
		return axios.post(allUrl, param, upconfig).then(callback).catch(error=>{
			if(err){
				err()
			}
		}); //使用post方式

    };

    //请求错误处理
    errorHandle(error) {
        Indicator.close();
        Util.myAlert("网络错误，请稍后重试")
    };

}
export default API;