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

const shopping = () => import(/* webpackChunkName: "shopping" */ '@/pages/shopping/shopping');//商城
const productDetail = () => import(/* webpackChunkName: "productDetail" */ '@/pages/productDetail/productDetail');//商品详情
const sureOrder = () => import(/* webpackChunkName: "sureOrder" */ '@/pages/sureOrder/sureOrder');//确认订单
const buySuccess = () => import(/* webpackChunkName: "buySuccess" */ '@/pages/buySuccess/buySuccess');//购买成功
const sendResult = () => import(/* webpackChunkName: "buySuccess" */ '@/pages/buySuccess/sendResult');//提货结果
const redLight = () => import(/* webpackChunkName: "redLight" */ '@/pages/redLight/redLight');//升级红绿灯
const upLvResult = () => import(/* webpackChunkName: "redLight" */ '@/pages/redLight/upLvResult');//升级结果

const notfound = () => import(/* webpackChunkName: "notfound" */ '@/pages/404');//404


Vue.use(Router);

const router = new Router({
    //	mode: 'history',
    routes: [{
        path: '/',
        component: layout,
        redirect: '/home',
        children: [{ //首页
            name: 'home',
            path: '/home',
            component: home,
            meta: {
                showBottomTab: true,
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //登录
            name: 'login',
            path: '/login',
            component: login,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //商城
            name: 'shopping',
            path: '/shopping',
            component: shopping,
            meta: {
                showBottomTab: true,
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //商品详情
            name: 'productDetail',
            path: '/shopping/productDetail',
            component: productDetail,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //确认订单
            name: 'sureOrder',
            path: '/shopping/sureOrder',
            component: sureOrder,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //购买成功
            name: 'buySuccess',
            path: '/shopping/buySuccess',
            component: buySuccess,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //提货结果
            name: 'sendResult',
            path: '/shopping/sendResult',
            component: sendResult,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //升级红绿灯
            name: 'redLight',
            path: '/shopping/redLight',
            component: redLight,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2',
                }
            }
        },
        { //升级红绿灯结果
            name: 'upLvResult',
            path: '/shopping/upLvResult',
            component: upLvResult,
            meta: {
                htmlBg: {
                    'background': '#fff',
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
