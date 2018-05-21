import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import waji from './modules/waji';
import getters from './getter';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        waji
    },
    getters
});

export default store
