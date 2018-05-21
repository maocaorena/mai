<template>
    <div id="recharge" class="wrapper flex flex-s flex-sc">
        <div class="banner" @click="goOtherRecharge">
            <img src="../../assets/img/recharge/recharge_beg.png" alt="" />
        </div>
        <div class="top-tip flex flex-sc flex-hlr">
            <div class="left ellipsis">
                {{balance.balance}}
            </div>
            <router-link class="right" tag="div" to="/rechargeRechords">
                充值明细
            </router-link>
        </div>

        <div class="recharge-wrapper">

            <div class="recharge-list">
                <div class="recharge-item recharge-card-item" v-for="(item,index) of rechorgeMessage.welfareCardList" :class="{mr0: (index+1)%2 == 0,selected: selected.idx+ selected.type == index+'card'}"
                    @click="selectThisNum(item,index,'card')">
                    <div class="recharge-item-bottom">

                    </div>
                    <div class="recharge-item-top flex flex-s flex-sc">
                        <div class="top">
                            <p>￥{{item.amount}}</p>
                            <p>{{item.cardName}}</p>
                        </div>
                        <div class="bottom-one">
                            购买立返
                            <span class="yellow1">{{item.returnImmediatelyWabi}}</span>
                            {{item.coinName}}
                        </div>
                        <div class="bottom-one">
                            {{item.returnCycle}}天每日可领
                            <span class="yellow1">{{item.returnDayWabi}}</span>
                            {{item.coinName}}
                        </div>
                        <div class="select-tip">
                            <img src="../../assets/img/spring/recharge/recharge_high.png" alt="" />
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

            <div class="recharge-list recharge-other-list">
                <div class="recharge-item recharge-other-item" v-for="(item,index) of rechorgeMessage.rechargeAmountList" :class="{mr0: (index+1)%3 == 0,selected: selected.idx+ selected.type == index+'other'}"
                    @click="selectThisNum(item,index,'other')">
                    <div class="recharge-item-bottom">

                    </div>
                    <div class="recharge-item-top flex flex-s flex-sc">
                        <p class="top">
                            <i class="iconfont icon-jinbi"></i> {{item.wabi}}
                        </p>
                        <p class="middle">
                            <template v-if="item.initialRecharge == 1 && item.giveWabi > 0">
                                首充再送
                                <span class="yellow1">{{item.giveWabi}}</span>
                            </template>
                            <template v-if="item.initialRecharge == 0 && item.giveWabi > 0">
                                额外再送
                                <span class="yellow1">{{item.giveWabi}}</span>
                            </template>
                        </p>
                        <p class="bottom">
                            ￥{{item.amount}}
                        </p>
                        <div class="select-tip">
                            <img src="../../assets/img/recharge/recharge_high.png" alt="" />
                        </div>
                    </div>
                </div>
                <div class="recharge-item recharge-other-item mr0" :class="{selected: selected.idx+ selected.type == rechorgeMessage.rechargeAmountList.length+'other'}"
                    @click="selectThisNum(1,rechorgeMessage.rechargeAmountList.length,'other')" v-if="rechorgeMessage.rechargeAmountList.length < 6">
                    <div class="recharge-item-bottom">

                    </div>
                    <div class="recharge-item-top flex flex-s flex-sc">
                        <p class="top other">
                            其它
                        </p>
                        <p class="middle">
                        </p>
                        <div class="bottom flex-zhong">
                            <span style="display: block;">￥</span>
                            <input style="display: block;" type="number" name="tt" v-model="otherPrice" class="right" @focus="totop" placeholder="金额"
                            />
                        </div>
                        <div class="select-tip">
                            <img src="../../assets/img/recharge/recharge_high.png" alt="" />
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <p class="bottom-tip">
            <strong>温馨提示：</strong>充值的{{balance.coinName}}仅用于娃娃机内使用，充值账款不作退回处理，客服电话：400-6305-186
        </p>
        <div class="bottom-btns flex flex-hlr">
            <button class="btn wx-btn flex-zhong" v-for="(item,index) of payList" :class="{'wx-btn': item.payChannelCode===2,'ali-btn': item.payChannelCode===1}"
                @click="selectThisType(item.payChannelCode)" v-if="item.show">
                <img v-if="item.payChannelCode==1" src="../../assets/img/recharge/recharge_alipay.png" alt="" />
                <img v-if="item.payChannelCode==2" src="../../assets/img/recharge/recharge_wx.png" alt="" />
                <span>{{item.payChannelCode==2?'微信支付':'支付宝支付'}}</span>
            </button>
        </div>
        <div id="aliSub"></div>
        <a id="kk" style="display: none;" :href="wxtijiao"></a>
        <loading-v v-if="allLoading"></loading-v>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    import bxmloading from '@/components/loading.vue';
    export default {
        data() {
            return {
                allLoading: false,
                rechorgeMessage: {
                    rechargeAmountList: [{
                        coinName: ''
                    }]
                },
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                appKey: this.User.getAppKey(),
                payType: 1,
                selectPrice: {}, //选择的充值金额
                otherPrice: '', //其他
                otherOr: false, //是否是其他
                selected: {
                    
                },
                systemCode: 1, //1阿里  2腾讯  3其他
                payList: [],
                wxtijiao: '',
                balance: {
                    balance: '加载中',
                    coinName: ''
                }
            }
        },
        components: {
            'loading-v': bxmloading
        },
        methods: {
            goOtherRecharge() {
                this.$router.push('/otherRecharge')
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
                    }
                })
            },
            selectThisNum(item, idx, type) {
                this.selected = {
                    idx: idx,
                    type: type
                };
                if (idx + type == this.rechorgeMessage.rechargeAmountList.length + 'other') {
                    document.all.tt.focus();
                    this.otherOr = true;
                } else {
                    this.selectPrice = item;
                    this.otherOr = false;
                }
            },
            selectThisType(type) {
                this.payType = type;
                this.recharge()
            },
            getList() { //获取充值选项列表
                this.allLoading = true;
                this.api.getB({
                    url: 'recharge/configInfo',
                    params: {
                        userId: this.userId
                    },
                    headers: {
                        appKey: this.appKey
                    }
                }).then(res => {
                    this.allLoading = false;
                    if (res.data.successed) {
                        this.rechorgeMessage = res.data.returnValue;
                        if (res.data.returnValue.welfareCardList.length > 0) {
                            this.selectPrice = res.data.returnValue.welfareCardList[0];
                            this.selected = {
                                idx: 0,
                                type: 'card'
                            };
                        } else {
                            this.selectPrice = res.data.returnValue.rechargeAmountList[0];
                            this.selected = {
                                idx: 0,
                                type: 'other'
                            };
                        };
                        this.getSystem(res.data.returnValue);
                        if (this.payList[0].show) {
                            this.payType = this.payList[0].payChannelCode;
                        } else {
                            this.payType = this.payList[1].payChannelCode;
                        }
                    } else {
                        this.Util.myAlert('请求失败，请稍后重试');
                    }
                }).catch(() => {
                    this.allLoading = false;
                })
            },
            isPositiveInteger(s) { //是否为正整数
                let re = /^[0-9]+$/;
                return re.test(s)
            },
            recharge() { //创建充值订单
                let params = {
                    userId: this.userId,
                    payChannel: this.payType
                };
                if (this.selected.type === 'card') {
                    params.isWelfareCard = 1
                } else {
                    params.isWelfareCard = 0
                }
                if (this.otherOr) {
                    if (!this.isPositiveInteger(this.otherPrice)) {
                        this.Util.myAlert('请输入大于0的整数');
                        return;
                    }
                    if (this.otherPrice > 3000) {
                        this.Util.myAlert('请输入小于3000的整数');
                        return;
                    } else {
                        params.amount = this.otherPrice;
                    }
                } else {
                    params.amount = this.selectPrice.amount;
                };
                if (this.selectPrice.id) {
                    params.rechargeConfigId = this.selectPrice.id
                };
                this.allLoading = true;
                this.api.postB({
                    url: 'recharge/add',
                    params: params,
                    headers: {
                        token: this.token
                    }
                }).then(res => {
                    this.allLoading = false;
                    let _res = res.data;
                    if (_res.successed) {
                        switch (this.payType) {
                            case 1:
                                this.goPay(_res.returnValue, this.payType);
                                break;
                            default:
                                this.goPay(_res.returnValue, this.payType);
                                break;
                        }
                    } else {
                        this.Util.myAlert(res.data.errorDesc);
                    }
                }).catch(() => {
                    this.allLoading = false;
                });
            },
            goPay(orderNum, type) { //1支付宝支付 2 微信支付
                let _params = {
                    pattern: this.Storage.pattern,
                    orderNum: orderNum,
                    payType: type,
                    payTitle: '娃娃机充值',
                };
                if (this.Util.ifWeixinTrue() && type == 2) {
                    _params.clientType = 2;
                };
                this.api.postC(
                    'pay/launchPay',
                    _params
                ).then((res) => {
                    this.allLoading = false;
                    if (res.data.successed) {
                        if (type == 2 && !this.Util.ifWeixinTrue()) {
                            this.wxtijiao = res.data.returnValue.payUrl;
                            document.getElementById('kk').click();
                        } else {
                            var html = res.data.returnValue.submitFormStr;
                            var cont = document.getElementById('aliSub');
                            cont.innerHTML = html;
                            var oldScript = cont.getElementsByTagName('script')[0];
                            cont.removeChild(oldScript);
                            var newScript = document.createElement('script');
                            newScript.type = 'text/javascript';
                            newScript.innerHTML = oldScript.innerHTML;
                            cont.appendChild(newScript);
                        }
                    } else {
                        this.Util.myAlert(res.data.errorDesc);
                    };
                }).catch((error) => {
                    this.allLoading = false;
                })
            },
            totop() { //Android键盘挡住input解决
                let that = this;
                setTimeout(function () {
                    if (/Android [4-8]/.test(navigator.appVersion)) {
                        window.addEventListener("resize", function () {
                            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                                window.setTimeout(function () {
                                    document.activeElement.scrollIntoViewIfNeeded();
                                }, 10);
                            }
                        })
                    };
                }, 10)
            },
            getSystem(item) {
                if (this.Util.ifWeixinTrue()) {
                    console.log('weixin')
                    this.systemCode = 2;
                    this.payList = item.tencentEnvChannel;
                } else if (this.Util.ifUc()) {
                    console.log('uc')
                    this.systemCode = 1;
                    this.payList = item.aliEnvChannel;
                } else {
                    console.log('qita')
                    this.systemCode = 3;
                    this.payList = item.otherEnvChannel;
                };
            }
        },
        created() {
            this.getWabiBalance();
            this.getList();
        },
        mounted() { }
    }
</script>

<style lang="scss">
    @import "./recharge";
</style>