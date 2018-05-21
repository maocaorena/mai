import API from '@/api/API.js';
const api = new API();

const waji = {
    state: {
        wajiFreeCount: 0,//免费次数
        systemSet: null,//系统设置
        logState: false,//是否开始收集游戏日志
        gameId: '',
        fpsLogArray: [],//fps日志数组
        networkDelayLogArray: [],//网络延迟日志数组
        operationLogArray: [],//操控点击日志数组
    },
    mutations: {
        SET_FREE_COUNT: (state, data) => {
            state.wajiFreeCount = data;
        },
        SET_SYSTEMSET: (state, data) => {
            state.systemSet = data;
        },
        SET_DATA: (state, data) => {
            state[data.code] = data.message;
        },
    },
    actions: {
        SetData({ commit }, data) {//存入数据
            commit('SET_DATA', data);
        },
        SetFreeCount({ commit }, data) {//存入免费次数
            commit('SET_FREE_COUNT', data);
        },
        SetSystemSet({ commit }, data) {//系统设置
            commit('SET_SYSTEMSET', data);
        },
        GetSystemSet({ commit, state }) {//获取系统设置
            return new Promise((resolve, reject) => {
                api.getBn({
                    url: 'systemSet/getSystemSet',
                }).then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        commit('SET_SYSTEMSET', _res.returnValue);
                        resolve(_res.returnValue)
                    } else {
                        reject('successed false')
                    };
                }).catch(error => {
                    reject(error)
                });
            })
        },
    }
};

export default waji;
