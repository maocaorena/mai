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

const waji = () => import(/* webpackChunkName: "waji" */ '@/pages/waji/waji');//哇机详情页

const recharge = () => import(/* webpackChunkName: "recharge" */ '@/pages/recharge/recharge');//充值
const rechargeRechords = () => import(/* webpackChunkName: "recharge" */ '@/pages/rechargeRechords/rechargeRechords');//充值明细
const rechargeResult = () => import(/* webpackChunkName: "rechargeResult" */ '@/pages/rechargeResult/rechargeResult');//充值结果
const rechargeNew = () => import(/* webpackChunkName: "rechargeNew" */ '@/pages/rechargeNew/rechargeNew');//春节新充值

const otherRecharge = () => import(/* webpackChunkName: "otherRecharge" */ '@/pages/otherRecharge/otherRecharge');//代充值
const shareOther = () => import(/* webpackChunkName: "otherRecharge" */ '@/pages/otherRecharge/shareOther');//分享其他人代充
const replaceRecharge = () => import(/* webpackChunkName: "replaceRecharge" */ '@/pages/otherRecharge/replaceRecharge');//他人代充
const replaceRechargeResult = () => import(/* webpackChunkName: "replaceRechargeResult" */ '@/pages/otherRecharge/replaceRechargeResult');//他人代充结果

const my = () => import(/* webpackChunkName: "my" */ '@/pages/my/my');//我的

const myPrize = () => import(/* webpackChunkName: "myPrize" */ '@/pages/myPrize/myPrize');//奖品记录
const send = () => import(/* webpackChunkName: "myPrize" */ '@/pages/myPrize/send');//奖品记录

const wantSend = () => import(/* webpackChunkName: "wantSend" */ '@/pages/wantSend/wantSend');//申请发货

const playRechods = () => import(/* webpackChunkName: "playRechods" */ '@/pages/playRechods/playRechods'); //我的游戏记录
const appeal = () => import(/* webpackChunkName: "playRechods" */ '@/pages/appeal/appeal');//申诉理由
const goAppeal = () => import(/* webpackChunkName: "playRechods" */ '@/pages/goAppeal/goAppeal');//申诉

const receiveAddress = () => import(/* webpackChunkName: "receiveAddress" */ '@/pages/receiveAddress/receiveAddress');//我的收货地址
const receiveAddress_add = () => import(/* webpackChunkName: "receiveAddress" */ '@/pages/receiveAddress_add/receiveAddress_add');//编辑收货地址

const sign = () => import(/* webpackChunkName: "sign" */ '@/pages/sign/sign');//签到

const playRule = () => import(/* webpackChunkName: "playRule" */ '@/pages/playRule/playRule');//玩法说明

const task = () => import(/* webpackChunkName: "task" */ '@/pages/task/task');//任务中心

const ticketList = () => import(/* webpackChunkName: "ticketList" */ '@/pages/gzh/aticketList/ticketList');//券列表
const focus = () => import(/* webpackChunkName: "focus" */ '@/pages/gzh/bfocus/focus');//关注公众号
const getTicket = () => import(/* webpackChunkName: "getTicket" */ '@/pages/gzh/cgetTicket/getTicket');//公众号内领取券码
const getAward = () => import(/* webpackChunkName: "getAward" */ '@/pages/gzh/dgetAward/getAward');//领取奖励
const getAwardResult = () => import(/* webpackChunkName: "getAward" */ '@/pages/gzh/egetAwardResult/getAwardResult');//领取奖励结果

const appealRechords = () => import(/* webpackChunkName: "appealRechords" */ '@/pages/appealRechords/appealRechords');//申诉记录

const login = () => import(/* webpackChunkName: "login" */ '@/pages/login/login');//登录

const outLink = () => import(/* webpackChunkName: "outLink" */ '@/pages/outLink/outLink');//外部链接

const imgText = () => import(/* webpackChunkName: "outLink" */ '@/pages/outLink/imgText');//图文页

const active = () => import(/* webpackChunkName: "active" */ '@/pages/active/active');//活动页
const subAdd = () => import(/* webpackChunkName: "active" */ '@/pages/active/subAdd');//提交信息页

const springNotice = () => import(/* webpackChunkName: "springNotice" */ '@/pages/springNotice/springNotice');//春节公告

const springActive = () => import(/* webpackChunkName: "springActive" */ '@/pages/springActive/springActive');//春节活动页

const noticeSend = () => import(/* webpackChunkName: "noticeSend" */ '@/pages/noticeSend/noticeSend');//发货公告

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
                htmlBg: {
                    'background': 'url(./static/img/home/home_bg.png) repeat-y left top',
                    '-webkit-background-size': '100% ' + Util.st(20),
                    'background-size': '100% ' + Util.st(20)
                }
            }
        },
        { //房间
            path: '/home/waji',
            component: waji,
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
        { //春节新充值
            path: '/rechargeNew',
            component: rechargeNew,
            meta: {
                htmlBg: {
                    'background': '#ff3f31',
                }
            }
        },
        { //充值
            path: '/recharge',
            component: recharge,
            meta: {
                htmlBg: {
                    'background': '#ffd9a4 url(./static/img/recharge/recharge_bg2.png) repeat-x left top',
                    '-webkit-background-size': Util.st(44) + ' ' + Util.st(480),
                    'background-size': Util.st(44) + ' ' + Util.st(480)
                }
            }
        },
        { //代充值
            path: '/otherRecharge',
            component: otherRecharge,
            meta: {
                htmlBg: {
                    'background': '#8411ba url(./static/img/recharge/beg_bg.jpg) no-repeat left bottom',
                    '-webkit-background-size': 'contain',
                    'background-size': 'contain'
                }
            },
        },
        { //分享其他人代充
            path: '/shareOther',
            component: shareOther,
            meta: {
                htmlBg: {
                    'background': '#8411ba url(./static/img/recharge/beg_bg.jpg) no-repeat left bottom',
                    '-webkit-background-size': 'contain',
                    'background-size': 'contain'
                }
            },
        },
        { //其他人代充
            path: '/replaceRecharge',
            component: replaceRecharge,
            meta: {
                htmlBg: {
                    'background': '#8411ba url(./static/img/recharge/recharge_bg2.png) repeat-x left top',
                    '-webkit-background-size': Util.st(44) + ' ' + Util.st(480),
                    'background-size': Util.st(44) + ' ' + Util.st(480)
                }
            },
        },
        { //其他人代充结果
            path: '/replaceRechargeResult',
            component: replaceRechargeResult,
            meta: {
                htmlBg: {
                    'background': '#8411ba url(./static/img/recharge/recharge_bg2.png) repeat-x left top',
                    '-webkit-background-size': Util.st(44) + ' ' + Util.st(480),
                    'background-size': Util.st(44) + ' ' + Util.st(480)
                }
            },
        },
        { //充值明细
            path: '/rechargeRechords',
            component: rechargeRechords,
            meta: {
                htmlBg: {
                    'background': '#ffd9a4 url(./static/img/recharge/recharge_bg2.png) repeat-x left top',
                    '-webkit-background-size': Util.st(44) + ' ' + Util.st(480),
                    'background-size': Util.st(44) + ' ' + Util.st(480)
                }
            }
        },
        { //充值结果
            path: '/recharge/rechargeResult',
            component: rechargeResult,
        },
        { //我的
            name: 'my',
            path: '/my',
            component: my,
            meta: {
                htmlBg: {
                    'background': '#ffdfc0'
                }
            },
        },
        { //任务中心
            path: '/my/task',
            component: task,
            meta: {
                htmlBg: {
                    'background': '#ffdfc0'
                }
            }
        },
        { //奖品记录
            path: '/my/myPrize',
            component: myPrize,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2'
                }
            }
        },
        { //发货订单
            path: '/my/send',
            component: send,
            meta: {
                htmlBg: {
                    'background': '#f2f2f2'
                }
            }
        },
        { //申请发货
            path: '/my/myPrize/wantSend',
            component: wantSend,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //我的游戏记录
            path: '/my/playRechods',
            component: playRechods,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //我的收货地址
            path: '/my/receiveAddress',
            component: receiveAddress,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //编辑收货地址
            path: '/my/receiveAddress/receiveAddress_add',
            component: receiveAddress_add,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //玩法说明
            path: '/home/playRule',
            component: playRule,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //申诉
            path: '/my/goAppeal',
            component: goAppeal,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //申诉理由
            path: '/my/appeal',
            component: appeal,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //申诉记录
            path: '/my/appealRechords',
            component: appealRechords,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //签到
            name: 'sign',
            path: '/my/sign',
            component: sign,
            meta: {
                htmlBg: {
                    'background': '#fff7e6'
                }
            }
        },
        { //券列表
            name: 'ticketList',
            path: '/ticketList',
            component: ticketList,
            meta: {
                htmlBg: {
                    'background': '#f9ffe6'
                }
            }
        },
        { //关注公众号
            path: '/focus',
            component: focus,
            meta: {
                htmlBg: {
                    'background': '#ffebe4'
                }
            }
        },
        { //公众号内领取券码
            path: '/getTicket',
            component: getTicket,
            meta: {
                htmlBg: {
                    'background': '#ffeee8'
                }
            }
        },
        { //领取奖励
            path: '/my/getAward',
            component: getAward,
            meta: {
                htmlBg: {
                    'background': '#ffebe4'
                }
            }
        },
        { //领取奖励结果
            path: '/my/getAwardResult',
            component: getAwardResult,
            meta: {
                htmlBg: {
                    'background': '#ffeee8'
                }
            }
        },
        { //外部链接
            path: '/outLink',
            component: outLink,
        },
        { //图文页
            path: '/imgText',
            component: imgText,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //活动页
            path: '/active',
            component: active,
            meta: {
                htmlBg: {
                    'background': '#fcedea'
                }
            }
        },
        { //活动提交信息页
            path: '/active/subAdd',
            component: subAdd,
            meta: {
                htmlBg: {
                    'background': '#fff'
                }
            }
        },
        { //春节活动页
            path: '/springActive',
            component: springActive,
            meta: {
                htmlBg: {
                    'background': 'url(./static/img/springActive/activity_bg.png) repeat left top',
                    '-webkit-background-size': Util.st(750) + ' ' + Util.st(82),
                    'background-size': Util.st(750) + ' ' + Util.st(82)
                }
            }
        },
        { //春节活动页
            path: '/springNotice',
            component: springNotice,
            meta: {
                htmlBg: {
                    'background': '#ffefe7',
                }
            }
        },
        { //发货公告
            path: '/noticeSend',
            component: noticeSend,
            meta: {
                htmlBg: {
                    'background': '#fffceb',
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
    if (to.path.indexOf('my') > -1 && store.getters.userType === 2) {
        api.goLogin();
    } else {
        next()
    };
    if (to.path.indexOf('recharge') > -1 && store.getters.visitMode === 1) {
        next({
            name:'ticketList',
            replace: true
        })
    } else {
        next()
    };
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
