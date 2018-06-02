/**
 * User
 */
import { Storage } from './storage.js'; //引入Storage
const User = {
	getToken : function(){
        let id = null;
        if(Storage.getItemJson(Storage.memberInfo)){
            let memberInfo = Storage.getItemJson(Storage.memberInfo);
            id = memberInfo.token;
        }
        return id;
	},
    getUserInfo : function(){
        let memberInfo = Storage.getItemJson(Storage.memberInfo);
        return memberInfo;
    },
	getUserId : function(){
        let id = null;
        if(Storage.getItemJson(Storage.memberInfo)){
            let memberInfo = Storage.getItemJson(Storage.memberInfo);
            id = memberInfo.id;
        }
	    return id;
	},
	getAppInfo: function(){
		let appInfo = '';
		if(Storage.getItemJson(Storage.appInfo)){
			appInfo = Storage.getItemJson(Storage.appInfo);
		};
		return appInfo;
    },
    getShareCode : function(){
        let id = null;
        if(Storage.getItemJson(Storage.appInfo)){
            let memberInfo = Storage.getItemJson(Storage.appInfo);
            console.log(memberInfo)
            id = memberInfo.shareCode;
        }
	    return id;
    },
	getAgentId : function(){
        let id = null;
        if(Storage.getItemJson(Storage.appInfo)){
            let memberInfo = Storage.getItemJson(Storage.appInfo);
            id = memberInfo.agentId;
        }
	    return id;
    },
    getSaleId: function () {
        let id = null;
        if(Storage.getItemJson(Storage.appInfo)){
            let memberInfo = Storage.getItemJson(Storage.appInfo);
            id = memberInfo.saleId;
        }
        return id;
    },
}
export { User };
