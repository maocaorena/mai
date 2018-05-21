/**
 * Storage\
    urlMessage   免登录链接信息
    uf  用户信息
 */
 const Storage = {
     //本地存储字段
    appInfo: 'urlMessage',//app信息
 	memberInfo: 'uf', //用户信息
 	id: 'id', //用户id
 	token: 'userToken', //用户token值,
 	redirectLoginUrl: 'redirectLoginUrl', //免登陆唤醒登陆地址，对方登陆页面
 	appEntrance: 'appEntrance', //入口id
 	noHis : true,
    pattern: 6,
	setItem : function(name, content){
		if (!name) return;
		if (typeof content !== 'string') {
			 content = JSON.stringify(content);
		};
		window.localStorage.setItem(name, content);
	},
	getItem : function(name){
		if (!name) return;
		return window.localStorage.getItem(name) || '';
	},
	getItemJson : function(name){
		if (!name) return;
		return JSON.parse(window.localStorage.getItem(name)) || '';
	},
	removeItem : function(name){
		if (!name) return;
		window.localStorage.removeItem(name);
	},
	isNoHis: function () {
		let testKey = 'test',
			storage = window.sessionStorage;
		try {
			storage.setItem(testKey, 'testValue');
			storage.removeItem(testKey);
			return true;
		} catch(error) {
			return false;
		}
	}
}
export { Storage };
