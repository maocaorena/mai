/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
	getToken : function(){
		let memberInfo = Storage.getItemJson(Storage.memberInfo);
		let token = '';
		if(memberInfo.userToken||memberInfo.token){
	    	token = memberInfo.userToken || memberInfo.token;
	    };
	    return token;
	},
	getMemberId : function(){
		let memberInfo = Storage.getItemJson(Storage.memberInfo);
		let id = '';
		if(memberInfo.id){
	    	id = memberInfo.id;
	    };
	    return id;
	},
	getAppInfo: function(){
		let appInfo = '';
		if(Storage.getItemJson(Storage.appInfo)){
			appInfo = Storage.getItemJson(Storage.appInfo);
		};
		return appInfo;
	},
	getAppKey : function(){
		let appInfo = Storage.getItemJson(Storage.appInfo);
		let appKey = '';
		if(appInfo.appKey){
			appKey = appInfo.appKey;
		};
		if(appKey.length < 1){
			appKey = '64745fa3bd8c428ba7896efdc7286334';
		};
		return appKey;
    },
    getDeviceId: function () {
        let appInfo = Storage.getItemJson(Storage.appInfo);
        let deviceId = '';
        if (appInfo.deviceId) {
            deviceId = appInfo.deviceId;
        };
        return deviceId;
    },
	getAppEntrance : function(){
		let appInfo = Storage.getItemJson(Storage.appInfo);
		let appEntrance = '';
		if(appInfo.appEntrance){
			appEntrance = appInfo.appEntrance;
		};
		return appEntrance;
	},
	getAppType : function(){
		let appInfo = Storage.getItemJson(Storage.appInfo);
		let appType = 'app';
		if(appInfo.appType){
			appType = appInfo.appType;
		};
		return appType;
	},
	getMemberInfo : function(){
		let memberInfo = Storage.getItemJson(Storage.memberInfo);
	    return memberInfo;
	},
}
export { User };
