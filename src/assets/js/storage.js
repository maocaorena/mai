/**
 * Storage\
    urlMessage   免登录链接信息
    uf  用户信息
 */
 const Storage = {
     //本地存储字段
    appInfo: 'urlMessage',//渠道信息
 	memberInfo: 'uf', //用户信息
 	id: 'id', //用户id
 	token: 'userToken', //用户token值,
 	noHis : true,
	setItem : function(name, content){
		if (!name) return;
		if (typeof content !== 'string') {
			 content = JSON.stringify(content);
		};
		window.localStorage.setItem(name, content);
	},
	getItem : function(name){
		if (!name) return;
		return window.localStorage.getItem(name);
	},
	getItemJson : function(name){
		if (!name) return;
		return JSON.parse(window.localStorage.getItem(name));
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
