import {Storage} from './storage.js'
const Util = {
	myAlert: function(text, time) {
		if(!document.getElementById('alertBg')) {
			let _time = time || 1000;
			let parent = document.createElement('div');
			parent.setAttribute('id', 'alertBg');
			let child = document.createElement('p');
			child.setAttribute('class', 'text');
			let _text = document.createTextNode(text);
			child.appendChild(_text);
			parent.appendChild(child);
			document.body.appendChild(parent);
			setTimeout(() => {
				document.body.removeChild(parent);
			}, _time)
		};
	},
	trim: function(str) { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	st: function(num){
		return num/40 + 'rem'
	},
	rem: function(){
		let clientWidth = document.documentElement.clientWidth || 375;
		clientWidth > 750 ? clientWidth = 750 : clientWidth = clientWidth;
		if(!clientWidth) return;
		return 20 * (clientWidth / 375) + 'px';
	},
	getSearch: function() {
		var args = {};
		var query = location.search.substring(1); //获取查询串
		var len = query.replace(/(^\s*)|(\s*$)/g, "").length;
		if(len < 1) {
			return args;
		};
		var pairs = query.split("&"); //在逗号处断开
		for(var i = 0; i < pairs.length; i++) {
			var pos = pairs[i].indexOf('='); //查找name=value
			if(pos > 0) {
				var argname = pairs[i].substring(0, pos); //提取name
				var value = pairs[i].substring(pos + 1); //提取value
				args[argname] = decodeURI(value); //存为属性
			} else {
				args[pairs[i]] = '';
			}
		};
		return args;
	},
	goSearch: function(url, obj, type) {
		let toGo = url;
		for(let i in obj) {
			if(toGo.indexOf('?') > 0) {
				toGo += ('&' + i + '=' + obj[i])
			} else {
				toGo += ('?' + i + '=' + obj[i])
			}
		};
		if (type === 'n') {
			return toGo;
		} else{
			window.location.href = toGo;
		}
	},
	time: function() { //控制提示框停留时间
		return 2000
	},
	setItem: function(name, content) {
		if(!name) return;
		if(typeof content !== 'string') {
			content = JSON.stringify(content);
		};
		window.localStorage.setItem(name, content);
	},
	getItem: function(name) {
		if(!name) return;
		return JSON.parse(window.localStorage.getItem(name));
	},
	removeItem: function(name) {
		if(!name) return;
		window.localStorage.removeItem(name);
	},
	dateTime(num, type) {
		let str = num;
		if(num) {
			let _num = new Date(num);
			let dateStr = _num.getFullYear() + '-' + this.addZero(_num.getMonth() + 1) + '-' + this.addZero(_num.getDate());
			let timeStr = this.addZero(_num.getHours()) + ':' + this.addZero(_num.getMinutes()) + ':' + this.addZero(_num.getSeconds());
			if(type === 'date') {
				str = dateStr;
			} else if(type === 'time') {
				str = timeStr;
			} else {
				str = dateStr + ' ' + timeStr;
			}
		};
		return str;
	},
	addZero(num) {
		if(num < 10) {
			return '0' + num;
		}
		return num;
	},
	ifWeixinTrue() {
		let isweixin = /MicroMessenger/i.test(navigator.userAgent);
		return isweixin;
	},
	ifUc() {
		if(navigator.userAgent.indexOf('UCBrowser') > -1) {
			return true;
		} else {
			return false;
		};
	},
	ifIos(){
		let u = navigator.userAgent;
		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		return isiOS;
	},
	jm(str) {
		return JSON.parse(JSON.stringify(str))
	},
	cm(str) {
		console.log(JSON.parse(JSON.stringify(str)))
	},
	isTimerOver(str){
		let _time = Storage.getItem(str);
		if(_time.length > 0) {
			_time = new Date(parseFloat(_time));
			let dateNum1 = parseInt(_time.getFullYear() + '' + this.addZero(_time.getMonth() + 1) + '' + this.addZero(_time.getDate()));
			let _nowDate = new Date();
			let dateNum2 = parseInt(_nowDate.getFullYear() + '' + this.addZero(_nowDate.getMonth() + 1) + '' + this.addZero(_nowDate.getDate()));
			if(dateNum2 > dateNum1){
				return true
			}else{
				return false
			}
		} else {
			return true;
		};
	}

}

export {
	Util
}