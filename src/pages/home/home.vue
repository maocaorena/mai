<template>
    <div id="home" :data="loginstate" class="wrapper">
        <div class="content" ref="content">
            <div class="login-tip flex-zhong">
                <template v-if="loginstate === 1">
                    <div class="inin left">
                        <img class="glod" src="../../assets/img/home/home_glod.png" />
                        <p class="balance ellipsis">
                            {{balance.balance}}
                        </p>
                        <img class="recharge" src="../../assets/img/home/home_recharge.png" @click="goRecharge" alt="" />
                    </div>
                    <sign></sign>
                    <div class="inin right" @click="goWhere">
                        <img class="glod" src="../../assets/img/home/home_bag.png" />
                        <p class="balance ellipsis">
                            {{userType === 1?userName:'游客模式'}}
                            <i class="iconfont icon-bofangqianwang"></i>
                        </p>
                    </div>
                </template>
                <template v-if="loginstate === 2">
                    <p class="noLogin" @click="goLogin"> 立即登录，享受在线娃娃机的乐趣
                        <i class="iconfont icon-bofangqianwang"></i>
                    </p>
                </template>
            </div>
            <banner></banner>
            <hometab v-on:selectThis="selectTag"></hometab>
            <div class="rooms flex flex-hc page-infinite-wrapper" ref="wrapper">
                <ul ref="roolist" class="room-list page-infinite-list" v-infinite-scroll="getRoomList" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="60">
                    <li class="room-item page-infinite-listitem" v-for="(item,index) of listHandle">
                        <roomItem :message="item"></roomItem>
                    </li>
                    <li style="clear: both;"></li>
                </ul>
            </div>
            <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
            <p class="noMore" v-show="noMore">亲，没有更多了呦~</p>
        </div>
        <qipao></qipao>
        <homepopup v-if="alertState" :upAlertStyle='alertItem' v-on:close="closeAlert(alertItem)"></homepopup>
    </div>
</template>

<script>
    import roomItem from './roomItem.vue';
    import hometab from './homeTab.vue';
    import banner from './banner.vue';
    import qipao from './qipao.vue';
    import sign from './sign.vue';
    import homepopup from '../popup/homePopup/homePopup.vue';
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                alertStyles: {},
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,

                balance: {
                    balance: '加载中'
                },
                userName: '',
                alertList: [],
                selectedTagId: '',
                alertItem: {},
                alertState: false,

            }
        },
        components: {
            'homepopup': homepopup,
            'roomItem': roomItem,
            'hometab': hometab,
            'banner': banner,
            'qipao': qipao,
            'sign': sign
        },
        computed: {
            loginstate() {
                let _loginstate = this.$store.getters.loginstate;
                this.tantan(_loginstate);
                if (_loginstate === 1) {
                    this.userName = this.User.getMemberInfo().nickname;
                };
                return this.$store.getters.loginstate;
            },
            userType() {
                return this.$store.getters.userType;
            },
            visitMode() {
                return this.$store.getters.visitMode;
            },
            roomPageNum() {
                return this.$store.getters.roomPageNum;
            },
            roomList() {
                return this.$store.getters.roomList;
            },
            height() {
                return this.$store.getters.height;
            },
            homeListState() {
                return this.$store.getters.homeListState;
            },
            listHandle() {
                let _list = this.Util.jm(this.list);
                let len = Math.ceil(_list.length / 2);
                let _list1 = [];
                for (let i = 0; i < len; i++) {
                    let _item = [];
                    _item.push(_list[i * 2]);
                    if (_list[i * 2 + 1]) {
                        _item.push(_list[i * 2 + 1]);
                    };
                    _list1.push(_item);
                };
                return _list1;
            }
        },
        watch: {
            'alertList.length': function (val, old) {
                if (val > 0) {
                    this.alertItem = JSON.parse(JSON.stringify(this.alertList[0]));
                    this.alertState = true;
                } else {
                    this.alertState = false;
                }
            }
        },
        methods: {
            goWhere() {
                this.$router.push({ name: 'my' })
            },
            alertRule({ userInfo, systemSet, otherRechargeState, cardMessage, ticketState }) {
                if (userInfo.userFreeCount > 0) { //如果用户的免费次数 > 0  新用户送免费次数或者金额

                    if (this.Util.isTimerOver('newUser')) { // 如果是第二天  弹窗
                        this.showAlert({
                            titImg: './static/img/pop_new_title.png',
                            alertBg: './static/img/pop_new.png',
                            btnTxt: 'GO',
                            type: 'newUser',
                            clickType: 1,
                        });
                        this.Storage.setItem('newUser', Date.parse(new Date()));
                    };

                } else if (this.Storage.getItem('amountAlert').length === 0) { // 如果没有弹过赠送金额  弹窗

                    if (systemSet.amount || systemSet.count) { // 如果用户的免费次数没有了 但是  后台设置了 免费金额 或者 免费次数
                        this.showAlert({
                            titImg: './static/img/pop_new_title.png',
                            alertBg: './static/img/pop_new.png',
                            btnTxt: 'GO',
                            type: 'newUser',
                            clickType: 1,
                        });
                        this.Storage.setItem('amountAlert', 'y');
                    };

                };

                if (otherRechargeState) { //代充弹窗
                    this.showAlert({
                        titImg: './static/img/pop_beg_title.png',
                        btnTxt: '查看记录',
                        clickType: 2,
                        goUrl: '/rechargeRechords',
                        html: '<p style="font-size: 16px;font-weight: 600;color: #895d11;">TA为你充值咯~</p>',
                    });
                };

                if (this.Util.isTimerOver('cardAlert')) { // 如果今天没有弹过   月卡周卡

                    if (cardMessage.wabiSum > 0) {
                        this.showAlert({
                            titImg: './static/img/pop_receive_title.png',
                            btnTxt: '快去抓娃娃',
                            clickType: 1,
                            html: '<p style="font-size: 30px;color: #ff5b88;">' + cardMessage.wabiSum + cardMessage.coinName + '</p><br /><p style="font-size: 14px; color: #895d11;">每日返送</p>',
                        });
                        this.getWabiBalance();
                        this.Storage.setItem('cardAlert', Date.parse(new Date()))
                    }

                };

                if (ticketState && this.Util.isTimerOver('ticketAlert')) { //符合条件 弹出引流弹窗

                    this.showAlert({
                        titImg: './static/img/pop_follow.png',
                        alertBg: './static/img/pop_coupon.png',
                        btnTxt: '马上领取',
                        type: 'newUser',
                        clickType: 2,
                        goUrl: '/ticketList',
                        btnSz: this.Util.st(42)
                    });
                    this.Storage.setItem('ticketAlert', Date.parse(new Date()))

                }

                if (this.Util.isTimerOver('loginDay')) { // 如果今天没有登录过 弹出任务中心

                    this.showAlert({
                        titImg: './static/img/task/pop_goin.png',
                        btnTxt: '去做任务',
                        clickType: 2,
                        goUrl: '/my/task',
                        html: '<p style="font-size: 22px;color: #ff5b88;">登录成功，活跃度+5</p><br /><p style="font-size: 14px; color: #895d11;">做任务赢取更多奖励！</p>',
                    });
                    this.Storage.setItem('loginDay', Date.parse(new Date()))

                };
            },
            //弹窗逻辑
            tantan(loginState) {

                if (loginState > 0) {
                    if (loginState === 1) { // 登录成功

                        //获取用户信息
                        let state1 = false;
                        let _userInfo = null;
                        this.getUserinfo().then(userInfo => {
                            state1 = true;
                            _userInfo = userInfo;
                            alertRule();
                        });

                        if (this.userType === 2) {
                            return;
                        };

                        //获取系统配置
                        let state2 = false;
                        let _systemSet = null;
                        this.$store.dispatch('GetSystemSet').then(systemSet => {
                            state2 = true;
                            _systemSet = systemSet;
                            alertRule();
                        });

                        //代充弹窗
                        let state3 = false;
                        let _otherRechargeState = null;
                        this.getAdviceState().then(otherRechargeState => {
                            state3 = true;
                            _otherRechargeState = otherRechargeState;
                            alertRule();
                        });

                        //月卡周卡
                        let state4 = false;
                        let _cardMessage = null;
                        this.wabiAdd().then(cardMessage => {
                            state4 = true;
                            _cardMessage = cardMessage;
                            alertRule();
                        });

                        //引流弹窗
                        let state5 = false;
                        let _ticketState = null;
                        this.getTicketList().then(ticketState => {
                            state5 = true;
                            _ticketState = ticketState;
                            alertRule();
                        });

                        let _this = this;
                        function alertRule() {
                            if (state1 && state2 && state3 && state4 && state5) {
                                _this.alertRule({
                                    userInfo: _userInfo,
                                    systemSet: _systemSet,
                                    otherRechargeState: _otherRechargeState,
                                    cardMessage: _cardMessage,
                                    ticketState: _ticketState
                                })
                            }
                        }

                    } else if (loginState === 2) {
                        // 登录失败
                        this.$store.dispatch('GetSystemSet').then(systemSet => { // 如果 后台设置了 免费金额 或者  免费次数

                            if (systemSet.amount || systemSet.count) {
                                this.showAlert({
                                    titImg: './static/img/pop_new_title.png',
                                    alertBg: './static/img/pop_new.png',
                                    btnTxt: 'GO',
                                    type: 'newUser',
                                    clickType: 1,
                                });
                                this.Storage.setItem('amountAlert', 'y');
                            };

                        });
                    };
                };
            },
            closeAlert() {
                this.alertList.splice(0, 1);
            },
            showAlert(alertStyles) {
                let _appKey = this.User.getAppKey();
                if (_appKey != '69eea368bea14ecdbfaf4e8efa58f7ac' && _appKey != 'b13bc869a04b49e69f3d0e66682c48f1') {
                    this.alertList.push(alertStyles);
                };
            },
            selectTag(item) {
                Indicator.open();
                this.selectedTagId = item.tagId;
                this.list = [];
                this.pageNum = 1;
                this.loading = true, //控制加载，true会停止加载
                    this.noMore = false, //没有更多
                    this.getRoomList();
            },
            // 获取代充状态
            getAdviceState() {
                return new Promise((resolve, reject) => {
                    this.api.getBn({
                        url: 'replaceRecharge/getAdviceState',
                        params: {
                            userId: this.User.getMemberId()
                        },
                        headers: {
                            token: this.User.getToken(),
                        }
                    }).then((res) => {
                        if (res.data.successed) {
                            resolve(res.data.returnValue);
                        } else {
                            reject();
                        };
                    }).catch(error => {
                        reject();
                    })
                })
            },
            //获取周卡
            wabiAdd() {
                return new Promise((resolve, reject) => {
                    this.api.postBn({
                        url: 'welfareOrder/wabiAdd',
                        params: {
                            userId: this.User.getMemberId()
                        },
                        headers: {
                            token: this.User.getToken()
                        }
                    }).then((res) => {
                        if (res.data.returnValue) {
                            resolve(res.data.returnValue);
                        } else {
                            reject();
                        };
                    });
                });
            },
            // 获取用户信息
            getUserinfo() {
                return new Promise((resolve, reject) => {
                    setTimeout(()=>{
                        this.api.getBn({
                            url: 'user/getUserInfo',
                            params: {
                                userId: this.User.getMemberId(),
                            },
                            headers: {
                                token: this.User.getToken(),
                            }
                        }).then((res) => {
                            let _res = res.data;
                            if (_res.successed) {
                                this.balance.balance = _res.returnValue.balance;
                                this.balance.coinName = _res.returnValue.coinName;
                                resolve(_res.returnValue);
                            } else {
                                reject();
                            };
                        });
                    }, 300)
                });

            },
            //获取券列表
            getTicketList() {
                return new Promise((resolve, reject) => {
                    this.api.getBn({
                        url: 'coupon/getList',
                        params: {
                            userId: this.User.getMemberId(),
                            pageSize: 50,
                            pageNum: 1
                        },
                        headers: {
                            token: this.User.getToken()
                        }
                    }).then(res => {
                        if (res.data.successed) {
                            let bb = false;
                            for (let i = 0; i < res.data.returnValue.list.length; i++) {
                                if (res.data.returnValue.list[i].status == 0) {
                                    bb = true;
                                    break;
                                };
                            };
                            resolve(bb);
                        } else {
                            reject();
                        }
                    })
                });
            },
            goLogin() {
                this.api.noLogin();
            },
            goRecharge() {
                if (this.visitMode === 0) {
                    this.Storage.setItem('tr', '/home');
                    this.api.goRecharge();
                } else {
                    this.$router.push({ name: 'ticketList' })
                }
            },
            // 获取余额
            getWabiBalance() {
                this.balance = {
                    balance: '加载中...'
                };
                this.api.getBn({
                    url: 'user/getWabiBalance',
                    params: {
                        userId: this.User.getMemberId()
                    },
                    headers: {
                        token: this.User.getToken(),
                    }
                }).then((res) => {
                    if (res.data.successed) {
                        this.balance = res.data.returnValue;
                    } else {
                        this.balance = {
                            balance: -1
                        };
                    };
                })
            },
            // 获取房间列表
            getRoomList() {
                this.loading = true;
                let _params = {};
                if (this.selectedTagId.length === 0) {
                    _params = {
                        pageNum: this.pageNum,
                        pageSize: 6,
                    };
                } else {
                    _params = {
                        pageNum: this.pageNum,
                        pageSize: 6,
                        tagId: this.selectedTagId
                    };
                };

                this.api.getB({
                    url: 'room/getRoomList',
                    params: _params,
                    headers: {
                        appKey: this.User.getAppKey(),
                    }
                }).then((res) => {
                    Indicator.close()
                    let _res = res.data;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 6) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    } else {
                        this.Util.myAlert('获取列表失败，请稍后重试');
                    };
                }).catch(() => {
                    Indicator.close()
                })
            },

            //发起pv
            addPv() {
                this.api.ajaxB({
                    baseUrl: this.api.commonUrl(),
                    type: 'POST',
                    url: 'pvuv',
                    params: {
                        appKey: this.User.getAppKey(),
                        userId: this.User.getMemberId(),
                        appEntranceId: this.User.getAppEntrance(),
                        position: 1,
                        token: this.User.getToken(),
                        pattern: this.Storage.pattern
                    }
                });
            },
        },
        created() {
            this.addPv();
            if (this.roomList.length > 0) {
                this.list = this.roomList;
                this.pageNum = this.roomPageNum;
                this.loading = this.homeListState.loading;
                this.noMore = this.homeListState.noMore;
            } else {
                this.getRoomList();
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.content.scrollTop = this.height;
            });
        },
        beforeRouteLeave(to, from, next) {
            if (to.path != '/home/waji') {
                this.$store.dispatch("SetRoomList", []);
                this.$store.dispatch("SetRoomPageNum", 1);
                this.$store.dispatch("SetHeight", 0);
                this.$store.dispatch("SetHomeListState", {
                    noMore: false,
                    loading: false
                });
            } else {
                this.$store.dispatch("SetRoomList", JSON.parse(JSON.stringify(this.list)));
                this.$store.dispatch("SetRoomPageNum", this.pageNum);
                this.$store.dispatch("SetHeight", this.$refs.content.scrollTop);
                this.$store.dispatch("SetHomeListState", {
                    noMore: this.noMore,
                    loading: this.loading
                });
            }
            next();
        }
    }
</script>

<style lang="scss">
    @import "./home";
</style>