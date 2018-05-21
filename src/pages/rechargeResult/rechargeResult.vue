<template>
    <div id="rechargeResult">
        <div v-if="payResult.state == 1">
            <div class="rechargeResult-top">
                <img src="../../assets/img/recharge/feedback_success.png" alt="" />
            </div>
            <div class="my-blance">
                我的{{balance.coinName}}：<strong class="colorred">{{balance.balance}} {{balance.coinName}}</strong>
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/recharge">
                    继续充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    {{backUrl | backTo}}
                </button>
            </div>
            <div class="dingzhi flex flex-s flex-sc" v-if="appKey === 'ed4c60fe6fee454ba06db7f09760dd36'">
                <div>
                    <img :src="dingzhi" alt="" />
                </div>
                <p>关注“好哒福利”，随时随地在线抓娃娃</p>
            </div>
            <div class="rechargeResult-bottom">
                <div class="one-row">
                    <div class="left flex flex-hse">
                        <i>订</i>
                        <i>单</i>
                        <i>号</i>
                    </div>
                    <div class="middle">：</div>
                    <div class="right">{{payResult.oid}}</div>
                </div>
                <div class="one-row">
                    <div class="left flex flex-hse">
                        <i>支</i>
                        <i>付</i>
                        <i>金</i>
                        <i>额</i>
                    </div>
                    <div class="middle">：</div>
                    <div class="right">￥{{payResult.amount}}</div>
                </div>
                <div class="one-row">
                    <div class="left flex flex-hse">
                        <i>充</i>
                        <i>值</i>
                        <i v-for="item of coinname">{{item}}</i>
                    </div>
                    <div class="middle">：</div>
                    <div class="right">{{payResult.wabi}}</div>
                </div>
            </div>
        </div>
        <div v-if="payResult.state == 0">
            <div class="rechargeResult-top">
                <img src="../../assets/img/recharge/feedback_fail.png" alt="" />
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/recharge">
                    重新充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    {{backUrl | backTo}}
                </button>
            </div>
            <div class="dingzhi flex flex-s flex-sc" v-if="appKey === 'ed4c60fe6fee454ba06db7f09760dd36'">
                <div>
                    <img :src="dingzhi" alt="" />
                </div>
                <p>关注“好哒福利”，随时随地在线抓娃娃</p>
            </div>
        </div>
        <div class="servers" v-if="payResult.state == 0">
            <p>
                客服热线：
                <a href="tel:400-6305-186">400-6305-186</a>
            </p>
            <p>
                客服QQ：3511735466
            </p>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    var timer;
    export default {
        name: 'rechargeResult',
        data() {
            return {
                orderNum: this.$route.query.orderNum || this.$route.query.mhtOrderNo,
                payResult: {
                    state: -1
                },
                nn: 0,
                backUrl: this.Storage.getItem('tr'),
                balance: {
                    coinName: '',
                    balance: ''
                },
                dingzhi: './static/img/recharge/dingzhi.jpg',
                appKey: this.User.getAppKey(),
            }
        },
        filters: {
            backTo: function (val) {
                let _val = '返回游戏大厅'
                if (_val.length > 0) {
                    if (val.indexOf('roomId') >= 0) {
                        _val = '返回游戏'
                    }
                }
                return _val;
            }
        },
        watch: {
            'payResult.state': function (oldVal, newVal) {
                if (newVal == 1) {
                    this.getWabiBalance()
                }
            }
        },
        computed: {
            coinname() {
                let _val = this.balance.coinName || '';
                return _val.split('')
            }
        },
        methods: {
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
                    }
                })
            },
            getPayResult() {
                Indicator.open('充值结果确认中...');
                this.api.getBn({
                    url: 'recharge/getByOid',
                    params: {
                        userId: this.User.getMemberId(),
                        oid: this.orderNum
                    },
                    headers: {
                        token: this.User.getToken(),
                    }
                }).then((res) => {
                    if (res.data.successed) {
                        Indicator.close();
                        this.payResult = res.data.returnValue;
                        this.getWabiBalance()
                        clearInterval(timer);
                    } else {
                        if (this.nn >= 9) {
                            Indicator.close();
                            clearInterval(timer);
                            this.payResult.state = 0;
                            this.Util.myAlert(res.data.errorDesc)
                        }
                    }
                }).catch((error) => {
                    Indicator.close();
                    this.Util.myAlert("网络错误，请稍后重试!")
                })
            },
            goBack() {
                if (this.backUrl.length > 0) {
                    this.$router.push({
                        path: this.backUrl
                    })
                } else {
                    this.$router.push({
                        path: '/home'
                    })
                }
            }
        },
        created() {
            if (this.orderNum) {
                this.getPayResult();
                timer = setInterval(() => {
                    if (this.nn >= 9) {
                        clearInterval(timer);
                    } else {
                        this.nn++;
                        this.getPayResult();
                    }
                }, 1000)
            } else {
                this.payResult.state = 0;
            };
        },
        beforeDestroy() {
            if (timer) {
                Indicator.close();
                clearInterval(timer);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./rechargeResult";
</style>