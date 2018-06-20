import { Util } from '@/assets/js/util.js';
import { User } from '@/assets/js/user.js';
import { Storage } from '@/assets/js/storage.js';
import API from '@/api/API.js';
const api = new API();

const user = {
    state: {
        roomDetail: {},
        roomList: [],
        roomPageNum: 1,
        height: 0,
        homeListState: {
            noMore: false,
            loading: false
        },
        tag: ''
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
        SET_MESSAGE: (state, data) => {//存入数据
            state[data.code] = data.message;
        }
    },
    actions: {
        SetMessage({ commit }, data) {//存入数据
            commit('SET_MESSAGE', data);
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
        }
    }
};

export default user;
