import Qs from 'qs';
export default {
	// 请求方法同上
	transformRequest: [function(data) {
		// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
		 return Qs.stringify(data)
	}],

	transformResponse: [function(data) {
		// 这里提前处理返回的数据
		let dataType = typeof(data);
		if( dataType == "string"){
			data = JSON.parse(data);
			return data;
		}else{
			return data;
		};

	}],
	paramsSerializer: function(params) {
	    return Qs.stringify(params)
	},
	// 请求头信息
	headers: {
//		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//		"Accept": "application/json; charset=utf-8",
	},
	//设置超时时间
	timeout: 10000,
	//返回数据类型
	responseType: 'json', // default
	withCredentials: false, // default

	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	maxContentLength: 2000,

	validateStatus: function (status) {
		return status >= 200 && status < 300; // default
	},
}
