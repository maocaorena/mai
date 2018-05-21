import axios from 'axios'
import allConfig from '@/config/config';
import API from '@/api/API.js';
import { Util } from '@/assets/js/util.js'; //引入Util
import { Storage } from '@/assets/js/storage.js'; //引入Storage
const api = new API();
let API_ROOT = 'https://api-bxm-t.wajiwaji.net'

if(process.env.NODE_ENV == 'production') {
	if(process.env.BUILD_ENV == 't') { //测试环境打包
		API_ROOT = allConfig.WJ_TEST
	} else { //线上环境打包
		API_ROOT = allConfig.WJ_PROD
	}
}
const SUCCESS = '200'
// const ERROR = 40000
const AUTH_FAIL = '40001'

let token = ''

axios.interceptors.request.use(
	config => {
		// loading
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		return Promise.resolve(error.response)
	}
)

function checkStatus(response) {

	if(response && (response.status === 200 || response.status === 304)) {
		const code = response.data.code
		if(code === SUCCESS) {
			return response.data
		} else if(code === AUTH_FAIL) {
			// alert('登录超时，请重新登录！')
			console.error('调用哇叽服务器接口认证失败')
			api.noLogin();
			Util.myAlert('用户信息失效，请重新登录');
			Storage.setItem('uf',{});
			return;
		} else {
			return {
				code,
				message: response.data.message
			};
		};
	};
	return {
		code: -404,
		message: '网络异常'
	};
}

function checkCode(res) {
	if(res.code === SUCCESS) {
		return Promise.resolve(res)
	} else {
		return Promise.reject(res)
	}
}

function http(method, url, data) {
	return axios({
			method,
			baseURL: API_ROOT,
			url,
			params: method === 'get' ? data : null,
			data: method !== 'get' ? data : null,
			timeout: 10000,
			withCredentials: false,
			headers: {
				Platform: 3,
				// Authorization: 'USERTOKEN_&&_fba03354c00b4e3faeb646fc9e82826e_&&_862e95e2a30a410abfd7d6f223f9d206'
				Authorization: token,
				ChannelId: 1
			}
		})
		.then(response => {
			return checkStatus(response)
		})
		.then(res => {
			return checkCode(res)
		})
}

export default {
	setToken(_token) {
		token = _token
	},
	get(...params) {
		return http('get', ...params)
	},
	post(...params) {
		return http('post', ...params)
	},
	put(...params) {
		return http('put', ...params)
	},
	delete(...params) {
		return http('delete', ...params)
	}
}
