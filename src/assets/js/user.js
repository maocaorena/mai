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
    getUserInfo : function(){
        let memberInfo = Storage.getItemJson(Storage.memberInfo);
        return memberInfo;
    },
	getUserId : function(){
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
	getAgentId : function(){
		let appInfo = Storage.getItemJson(Storage.appInfo);
		let agentId = '';
		if(appInfo.agentId){
			agentId = appInfo.agentId;
		};
		return agentId;
    },
    getSaleId: function () {
        let appInfo = Storage.getItemJson(Storage.appInfo);
        let saleId = '';
        if (appInfo.saleId) {
            saleId = appInfo.saleId;
        };
        return saleId;
    },
}
export { User };
