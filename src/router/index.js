import Vue from 'vue';
import Router from 'vue-router';
import store from '@/stores';
import { Util } from '@/assets/js/util.js';
import { Storage } from '@/assets/js/storage.js';
import { User } from '@/assets/js/user.js';

import API from '@/api/API.js';
const api = new API();

const layout = () => import(/* webpackChunkName: "layout" */ '@/pages/layout/layout');

const home = () => import(/* webpackChunkName: "home" */ '@/pages/home/home');//首页

const login = () => import(/* webpackChunkName: "login" */ '@/pages/login/login');//登录

const my = () => import(/* webpackChunkName: "my" */ '@/pages/my/my');//我的

const recharge = () => import(/* webpackChunkName: "recharge" */ '@/pages/recharge/recharge');//充值

const notfound = () => import(/* webpackChunkName: "notfound" */ '@/pages/404');//404


Vue.use(Router);

const router = new Router({
    //	mode: 'history',
    routes: [{
        path: '/',
        component: layout,
        redirect: '/home',
        children: [{ //首页
            path: '/home',
            component: home,
            meta: {
                showBottomTab: true,
                htmlBg: {
                    'background': 'url(./static/img/home/home_bg.png) repeat-y left top',
                    '-webkit-background-size': '100% ' + Util.st(20),
                    'background-size': '100% ' + Util.st(20)
                }
            }
        },
        { //登录
            path: '/login',
            component: login,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //充值
            path: '/recharge',
            component: recharge,
            meta: {
                showBottomTab: true,
                htmlBg: {
                    'background': '#ffd9a4 url(./static/img/recharge/recharge_bg2.png) repeat-x left top',
                    '-webkit-background-size': Util.st(44) + ' ' + Util.st(480),
                    'background-size': Util.st(44) + ' ' + Util.st(480)
                }
            }
        },
        { //我的
            name: 'my',
            path: '/my',
            component: my,
            meta: {
                showBottomTab: true,
                htmlBg: {
                    'background': '#ffdfc0'
                }
            },
        },
        // { //我的收货地址
        //     path: '/my/receiveAddress',
        //     component: receiveAddress,
        //     meta: {
        //         htmlBg: {
        //             'background': '#fff'
        //         }
        //     }
        // },
        // { //编辑收货地址
        //     path: '/my/receiveAddress/receiveAddress_add',
        //     component: receiveAddress_add,
        //     meta: {
        //         htmlBg: {
        //             'background': '#fff'
        //         }
        //     }
        // },
        ]
    }]
});

router.beforeEach((to, from, next) => {
    let _url = to.path;
    if (_url.indexOf('access_token') > -1) {
        let start = _url.indexOf('access_token');
        let str = _url.slice(start)
        console.log(str)
        let _str = str.slice(str.indexOf('=') + 1, str.indexOf('&'))
        console.log(start, _str, typeof (_str))
        let allUrl = JSON.stringify(window.location.href);
        let _redicUrl = allUrl.slice(1, allUrl.indexOf(':')) + '://' + window.location.host;
        let endUrl = _redicUrl + '?state=bd&code=' + _str;
        location.replace(endUrl);
    };
    
    let allUrl = JSON.stringify(window.location.href);
    let wenhaoIdx = allUrl.indexOf("?");
    let jingIdx = allUrl.indexOf('#');
    if (wenhaoIdx < jingIdx && wenhaoIdx > 0) {
        let _url = allUrl.slice(1, wenhaoIdx) + allUrl.slice(jingIdx, -1) + allUrl.slice(wenhaoIdx, jingIdx);
        window.location.href = _url;
        return;
    };
    next();
});
router.afterEach((to, from) => {
    let doc = document.getElementsByTagName('html')[0];
    let _style = '';
    try {
        doc.setAttribute('style', 'background: #000;')
        _style = 'font-size:' + Util.rem() + ';';
        if (to.meta.htmlBg) {
            for (let dd in to.meta.htmlBg) {
                _style += ([dd] + ':' + to.meta.htmlBg[dd] + ';');
            };
        } else {
            doc.style.backgroundColor = '#f4f6f8';
        };
        doc.setAttribute('style', _style)
    } catch (e) {
        alert(e)
    };
    store.dispatch('AddAllPv');
});
export default router
