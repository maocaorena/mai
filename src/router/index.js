import Vue from 'vue';
import Router from 'vue-router';
import store from '@/stores';
import { Util } from '@/assets/js/util.js';
import { Storage } from '@/assets/js/storage.js';
import { User } from '@/assets/js/user.js';

import API from '@/api/API.js';
const api = new API();

const layout = () =>
    import ( /* webpackChunkName: "layout" */ '@/pages/layout/layout');

const home = () =>
    import ( /* webpackChunkName: "home" */ '@/pages/home/home'); //首页

const login = () =>
    import ( /* webpackChunkName: "login" */ '@/pages/login/login'); //登录
const register = () =>
    import ( /* webpackChunkName: "register" */ '@/pages/login/register'); //注册

const my = () =>
    import ( /* webpackChunkName: "my" */ '@/pages/my/my'); //我的
const recharge = () =>
    import ( /* webpackChunkName: "recharge" */ '@/pages/recharge/recharge'); //充值

const rechargeResult = () =>
    import ( /* webpackChunkName: "recharge" */ '@/pages/recharge/rechargeResult'); //充值结果

const aliPay = () =>
    import ( /* webpackChunkName: "recharge" */ '@/pages/recharge/aliPay'); //支付宝转账
const getMoney = () =>
    import ( /* webpackChunkName: "getMoney" */ '@/pages/getMoney/getMoney'); //提现
const myOrder = () =>
    import ( /* webpackChunkName: "myOrder" */ '@/pages/myOrder/myOrder'); //我的订单
const myGold = () =>
    import ( /* webpackChunkName: "myGold" */ '@/pages/myGold/myGold'); //我的黄金
const getGold = () =>
    import ( /* webpackChunkName: "myGold" */ '@/pages/myGold/getGold'); //提取黄金
const sureGold = () =>
    import ( /* webpackChunkName: "myGold" */ '@/pages/myGold/sureGold'); //确认黄金订单
const orderDetail = () =>
    import ( /* webpackChunkName: "myOrder" */ '@/pages/myOrder/orderDetail'); //订单详情 
const upRecords = () =>
    import ( /* webpackChunkName: "upRecords" */ '@/pages/upRecords/upRecords'); //当天升级记录
const rechargeRecords = () =>
    import ( /* webpackChunkName: "rechargeRechords" */ '@/pages/rechargeRecords/rechargeRecords'); //资金记录
const receiveAddress = () =>
    import ( /* webpackChunkName: "receiveAddress" */ '@/pages/receiveAddress/receiveAddress'); //我的收货地址
const receiveAddress_add = () =>
    import ( /* webpackChunkName: "receiveAddress" */ '@/pages/receiveAddress_add/receiveAddress_add'); //编辑收货地址
const myCards = () =>
    import ( /* webpackChunkName: "myCards" */ '@/pages/myCards/myCards'); //我的银行卡
const addCard = () =>
    import ( /* webpackChunkName: "myCards" */ '@/pages/myCards/addCard'); //添加银行卡
const safeCenter = () =>
    import ( /* webpackChunkName: "safeCenter" */ '@/pages/safeCenter/safeCenter'); //安全中心
const updatePhone = () =>
    import ( /* webpackChunkName: "safeCenter" */ '@/pages/safeCenter/updatePhone'); //修改手机号
const updatePw = () =>
    import ( /* webpackChunkName: "safeCenter" */ '@/pages/safeCenter/updatePw'); //修改密码
const trueName = () =>
    import ( /* webpackChunkName: "safeCenter" */ '@/pages/safeCenter/trueName'); //实名认证
const share = () =>
    import ( /* webpackChunkName: "share" */ '@/pages/share/share'); //分享
const setting = () =>
    import ( /* webpackChunkName: "setting" */ '@/pages/setting/setting'); //设置
const question = () =>
    import ( /* webpackChunkName: "question" */ '@/pages/question/question'); //常见问题

const shopping = () =>
    import ( /* webpackChunkName: "shopping" */ '@/pages/shopping/shopping'); //商城
const productDetail = () =>
    import ( /* webpackChunkName: "productDetail" */ '@/pages/productDetail/productDetail'); //商品详情
const sureOrder = () =>
    import ( /* webpackChunkName: "sureOrder" */ '@/pages/sureOrder/sureOrder'); //确认订单
const buySuccess = () =>
    import ( /* webpackChunkName: "buySuccess" */ '@/pages/buySuccess/buySuccess'); //购买成功

const payCarMonry = () =>
    import ( /* webpackChunkName: "buySuccess" */ '@/pages/myOrder/payCarMonry'); //合并提货

const sendResult = () =>
    import ( /* webpackChunkName: "buySuccess" */ '@/pages/buySuccess/sendResult'); //提货结果
const redLight = () =>
    import ( /* webpackChunkName: "redLight" */ '@/pages/redLight/redLight'); //升级红绿灯
const upLvResult = () =>
    import ( /* webpackChunkName: "redLight" */ '@/pages/redLight/upLvResult'); //升级结果

const notfound = () =>
    import ( /* webpackChunkName: "notfound" */ '@/pages/404'); //404


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
                    name: '首页',
                    showBottomTab: true,
                    hideHeader: true,
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
                    name: '登录',
                    hideHeader: true,
                    htmlBg: {
                        'background': '#f2f2f2',
                    }
                }
            },
            { //注册
                name: 'register',
                path: '/register',
                component: register,
                meta: {
                    name: '注册',
                    showBack: true,
                    hideHeader: true,
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
                    name: '商城',
                    showBottomTab: true,
                    hideHeader: true,
                    keep: true,
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
                    showBack: true,
                    name: '商品详情',
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
                    name: '确认订单',
                    showBack: true,
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
                    name: '购买成功',
                    showBack: true,
                    htmlBg: {
                        'background': '#fff',
                    }
                }
            },
            { //提货结果
                name: 'sendResult',
                path: '/shopping/sendResult',
                component: sendResult,
                meta: {
                    name: '提货结果',
                    showBack: true,
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
                    name: '升级红绿灯',
                    showBack: true,
                    htmlBg: {
                        'background': '#bff4ff',
                    }
                }
            },
            { //升级红绿灯结果
                name: 'upLvResult',
                path: '/shopping/upLvResult',
                component: upLvResult,
                meta: {
                    name: '升级红绿灯结果',
                    showBack: true,
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
                    name: '我的',
                    showBottomTab: true,
                    hideHeader: true,
                    htmlBg: {
                        'background': '#fff'
                    }
                },
            },
            { //资金记录
                name: 'rechargeRecords',
                path: '/my/rechargeRecords',
                component: rechargeRecords,
                meta: {
                    name: '资金记录',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#fff'
                    }
                },
            },
            { //充值
                name: 'recharge',
                path: '/my/recharge',
                component: recharge,
                meta: {
                    name: '充值',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //充值结果
                name: 'rechargeResult',
                path: '/recharge/rechargeResult',
                component: rechargeResult,
                meta: {
                    name: '充值结果',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //支付宝转账
                name: 'aliPay',
                path: '/my/recharge/aliPay',
                component: aliPay,
                meta: {
                    name: '支付宝充值',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //提现
                name: 'getMoney',
                path: '/my/getMoney',
                component: getMoney,
                meta: {
                    name: '提现',
                    showBack: true,
                    login: true,
                    tabRight: '提现说明',
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //我的订单
                name: 'myOrder',
                path: '/my/myOrder',
                component: myOrder,
                meta: {
                    name: '我的订单',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //和并提货
                name: 'payCarMonry',
                path: '/my/payCarMonry',
                component: payCarMonry,
                meta: {
                    name: '支付运费',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //订单详情
                name: 'orderDetail',
                path: '/my/orderDetail',
                component: orderDetail,
                meta: {
                    name: '订单详情',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //我的黄金
                name: 'myGold',
                path: '/my/myGold',
                component: myGold,
                meta: {
                    name: '黄金账户',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //提取黄金
                name: 'getGold',
                path: '/my/getGold',
                component: getGold,
                meta: {
                    name: '提取黄金',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //确认黄金订单
                name: 'sureGold',
                path: '/my/sureGold',
                component: sureGold,
                meta: {
                    name: '确认订单',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //当天升级记录
                name: 'upRecords',
                path: '/my/upRecords',
                component: upRecords,
                meta: {
                    name: '幸运记录',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                },
            },
            { //我的收货地址
                name: 'receiveAddress',
                path: '/my/receiveAddress',
                component: receiveAddress,
                meta: {
                    name: '收货地址',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#fff'
                    }
                }
            },
            { //编辑收货地址
                path: '/my/receiveAddress/receiveAddress_add',
                component: receiveAddress_add,
                meta: {
                    name: '编辑收货地址',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#fff'
                    }
                }
            },
            { //我的银行卡
                name: 'myCards',
                path: '/my/myCards',
                component: myCards,
                meta: {
                    name: '我的银行卡',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //添加银行卡
                name: 'addCard',
                path: '/my/myCards/addCard',
                component: addCard,
                meta: {
                    name: '添加银行卡',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //安全中心
                name: 'safeCenter',
                path: '/my/safeCenter',
                component: safeCenter,
                meta: {
                    name: '安全中心',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //修改手机号
                name: 'updatePhone',
                path: '/my/safeCenter/updatePhone',
                component: updatePhone,
                meta: {
                    name: '修改手机号',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //修改密码
                name: 'updatePw',
                path: '/my/safeCenter/updatePw',
                component: updatePw,
                meta: {
                    name: '修改密码',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //实名认证
                name: 'trueName',
                path: '/my/safeCenter/trueName',
                component: trueName,
                meta: {
                    name: '实名认证',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //分享
                name: 'share',
                path: '/my/share',
                component: share,
                meta: {
                    name: '分享',
                    showBack: true,
                    login: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //设置
                name: 'setting',
                path: '/my/setting',
                component: setting,
                meta: {
                    name: '设置',
                    showBack: true,
                    htmlBg: {
                        'background': '#f2f2f2'
                    }
                }
            },
            { //常见问题
                name: 'question',
                path: 'question',
                component: question,
                meta: {
                    name: '常见问题',
                    showBack: true,
                    htmlBg: {
                        'background': '#fff'
                    }
                }
            },
            // { //404
            //     path: '*',
            //     component: notfound,
            // }
        ]
    }]
});

router.beforeEach((to, from, next) => {
    let allUrl = JSON.stringify(window.location.href);
    let wenhaoIdx = allUrl.indexOf("?");
    let jingIdx = allUrl.indexOf('#');
    if (wenhaoIdx < jingIdx && wenhaoIdx > 0) {
        let _url = allUrl.slice(1, wenhaoIdx) + allUrl.slice(jingIdx, -1) + allUrl.slice(wenhaoIdx, jingIdx);
        window.location.href = _url;
        return;
    };
    console.log(from)
    if (to.name === 'login' && from.name) {
        Storage.setItem('loginFrom', from.fullPath)
    };
    if (to.meta.login && !User.getToken()) {
        next({ name: 'login' })
    } else {
        next();
    }
});
router.afterEach((to, from) => {
    let docs = '';
    if (document.getElementById('style')) {
        docs = document.getElementById('style');
    } else {
        docs = document.createElement('style');
        docs.setAttribute('id', 'style')
        document.getElementsByTagName('body')[0].appendChild(docs)
    }
    let _style = '';
    try {
        if (to.meta.htmlBg) {
            for (let dd in to.meta.htmlBg) {
                _style += ([dd] + ':' + to.meta.htmlBg[dd] + ';');
            };
        } else {
            _style = 'background:#f4f6f8;';
        };
        let node = document.createTextNode('html{' + _style + '}');
        docs.innerHTML = 'html{' + _style + '}';
    } catch (e) {
        console.log(e)
    };
});
export default router