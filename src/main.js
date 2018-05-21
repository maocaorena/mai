import Vue from 'vue';
import App from './App';
import router from './router';
import store from './stores';
import MintUI from 'mint-ui';
import API from './api/API.js';

import { Util } from './assets/js/util.js';
import { User } from './assets/js/user.js';
import { Storage } from './assets/js/storage.js';

import platform from '@/waji/utils/platform.js'
import toast from '@/waji/utils/toast.js'

import '@/waji/utils/directives'
import '@/waji/styles/index.scss'

import 'mint-ui/lib/style.css';
//import '@/assets/js/rem.js';
import '@/assets/css/init.css';
import '@/assets/css/like.css';
import '@/assets/css/flex.css';

import Border from './components/border';
import Shade from './components/shade';
import MessageBox from './components/messageBox';
import Alert from './components/alert';

Vue.use(MintUI);
Vue.use(Border);
Vue.use(Shade);
Vue.use(MessageBox);
Vue.use(Alert);

Vue.config.productionTip = false;

const api = new API();
Vue.prototype.api = api;
Vue.prototype.Util = Util;
Vue.prototype.User = User;
Vue.prototype.Storage = Storage;
Vue.prototype.$platform = platform
Vue.prototype.$toast = toast

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
