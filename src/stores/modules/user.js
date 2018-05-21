import { Util } from '@/assets/js/util.js';
import { User } from '@/assets/js/user.js';
import { Storage } from '@/assets/js/storage.js';
import API from '@/api/API.js';
const api = new API();

const user = {
    state: {
        loginstate: -1,//-1初始状态  1 登录成功，2登录失效,
        userInfo: {},
        visitMode: 0, // 0 不开启游客模式， 1开启游客模式
        userType: 1,// 1,正常登录用户， 2，游客 （此参数只在游客模式下使用）
        roomDetail: {},
        roomList: [],
        roomPageNum: 1,
        height: 0,
        homeListState: {
            noMore: false,
            loading: false
        },
        otherRechargeList: [
            {
                id: 1,
                txt: '求打赏',
                amount: 10,
                img: './static/img/otherRecharge/beg_a.png'
            },
            {
                id: 2,
                txt: '求安慰',
                amount: 28,
                img: './static/img/otherRecharge/beg_b.png'
            },
            {
                id: 3,
                txt: '求温暖',
                amount: 88,
                img: './static/img/otherRecharge/beg_c.png'
            },
            {
                id: 4,
                txt: '求包养',
                amount: 520,
                img: './static/img/otherRecharge/beg_d.png'
            }
        ]
    },
    mutations: {
        SET_HOMELIST_STATE: (state, data) => {
            state.homeListState = data;
        },
        SET_HEIGHT: (state, data) => {
            state.height = data;
        },
        SET_ROOM_LIST: (state, data) => {
            state.roomList = data;
        },
        SET_ROOM_PAGENUM: (state, data) => {
            state.roomPageNum = data;
        },
        SET_LOGINSTATE: (state, data) => {
            state.loginstate = data;
        },
        SET_USERINFO: (state, data) => {
            state.userInfo = data;
        },
        SET_ROOMDETAIL: (state, data) => {
            state.roomDetail = data;
        },
        SET_MESSAGE: (state, data) => {
            state[data.code] = data.message;
        },
    },
    actions: {
        SetMessage({ commit }, data) {//存入数据
            commit('SET_MESSAGE', data);
        },
        SetRechargeButtonState({ commit }, data) {
            commit('SET_RECHARGEBUTTON_STATE', data);
        },
        SetHomeListState({ commit }, data) {
            commit('SET_HOMELIST_STATE', data);
        },
        SetHeight({ commit }, data) {
            commit('SET_HEIGHT', data);
        },
        SetRoomList({ commit }, data) {
            commit('SET_ROOM_LIST', data);
        },
        SetRoomPageNum({ commit }, data) {
            commit('SET_ROOM_PAGENUM', data);
        },
        SetLoginState({ commit }, data) {
            commit('SET_LOGINSTATE', data);
        },
        SetUserinfo({ commit }, data) {
            commit('SET_USERINFO', data);
        },
        SetRoomDetail({ commit }, data) {
            commit('SET_ROOMDETAIL', data);
        },
        AutoLogin({ commit, state }) {
            let urlMessage = User.getAppInfo();
            urlMessage.pattern = Storage.pattern;
            return new Promise((resolve, reject) => {
                api.postC('user/autoLogin', {
                    appKey: urlMessage.appKey,
                    appUid: urlMessage.appUid,
                    appType: urlMessage.appType,
                    appEntrance: urlMessage.appEntrance,
                    appHomeUrl: urlMessage.appHomeUrl,
                    face: urlMessage.face,
                    mobile: urlMessage.mobile,
                    nickName: urlMessage.nickName,
                    redirect: urlMessage.redirect,
                    redirectLoginUrl: urlMessage.redirectLoginUrl,
                    sex: urlMessage.sex,
                    timestamp: urlMessage.timestamp,
                    sign: urlMessage.sign,
                    pattern: urlMessage.pattern,
                    idfa: Util.ifIos() ? urlMessage.deviceId : '',
                    imei: Util.ifIos() ? '': urlMessage.deviceId
                }).then(response => {
                    const data = response.data;
                    if (data.successed) {
                        console.log(1)
                        resolve(response);
                    } else {
                        console.log(1)
                        reject(1);
                    }
                }).catch(error => {
                    reject(2);
                })
            })
        },
        VisitorLogin({commit, state}, data){
            let urlMessage = User.getAppInfo();
            let _params = {
                idfa: Util.ifIos() ? urlMessage.deviceId : '',
                imei: Util.ifIos() ? '' : urlMessage.deviceId,
                appKey: User.getAppKey(),
                pattern: Storage.pattern
            };
            return new Promise((resolve, reject) => {
                api.postC('user/visitorWaji', _params).then(response => {
                    const data = response.data;
                    if (data.successed) {
                        resolve(response);
                    } else {
                        reject(1);
                    }
                }).catch(error => {
                    console.log(error);
                    reject(2);
                })
            })
        },
        WxLogin({ commit, state }, data) {
            let _params = {
                code: data.code,
                appKey: User.getAppKey(),
                appEntrance: User.getAppEntrance(),
                pattern: Storage.pattern,
            };
            return new Promise((resolve, reject) => {
                api.postC('user/wxLogin', _params).then(response => {
                    const data = response.data;
                    if (data.successed) {
                        resolve(response);
                    } else {
                        reject(1);
                    }
                }).catch(error => {
                    reject(2);
                })
            })
        },
        BdLogin({ commit, state }, data) {
            let urlMessage = User.getAppInfo();
            let _params = {
                code: data.code,
                appKey: User.getAppKey(),
                appEntrance: User.getAppEntrance(),
                pattern: Storage.pattern,
                idfa: Util.ifIos() ? urlMessage.deviceId : '',
                imei: Util.ifIos() ? '' : urlMessage.deviceId
            };
            return new Promise((resolve, reject) => {
                api.postC('user/baiduLogin', _params).then(response => {
                    const data = response.data;
                    if (data.successed) {
                        resolve(response);
                    } else {
                        reject(1);
                    }
                }).catch(error => {
                    reject(2);
                })
            })
        },
        UcLogin({ commit, state }, data) {
            let _params = {
                code: data.code,
                appKey: User.getAppKey(),
                appEntrance: User.getAppEntrance(),
                pattern: Storage.pattern,
            };
            return new Promise((resolve, reject) => {
                api.postC('user/ucLogin', _params).then(response => {
                    const data = response.data;
                    if (data.successed) {
                        resolve(response);
                    } else {
                        reject(1);
                    }
                }).catch(error => {
                    reject(2);
                })
            })
        },
        GetUserInfo({ commit, state }) {
            let urlMessage = User.getAppInfo();
            return new Promise((resolve, reject) => {
                api.getBn({
                    url: 'user/getUserInfo',
                    params: {
                        userId: User.getMemberId(),
                    },
                    headers: {
                        token: User.getToken(),
                    }
                }).then(response => {
                    const data1 = response.data;
                    if (data1.successed) {
                        resolve(response);
                    } else {
                        reject(1);
                    }
                }).catch(error => {
                    reject(2);
                })
            })
        },
        AddAllPv({ commit, state }) {
            return new Promise((resolve, reject) => {
                api.ajaxB({
                    url: 'pvuv/addAllPv',
                    type: 'POST',
                    headers: {
                        appKey: User.getAppKey()
                    }
                });
            });
        },
        AddPvUv({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                api.ajaxB({
                    url: 'pvuv/addPvUv',
                    type: 'POST',
                    headers: {
                        appKey: User.getAppKey()
                    },
                    params: {
                        userId: User.getMemberId(),
                        type: data
                    },
                });
            });
        },

    }
};

export default user;
