<template>
    <div id="rechargeNew" class="wrapper">
        <div class="rechargeNew-banner">
            <img src="../../assets/img/spring/rechargeNew/activity_recharge_ban.png" />
        </div>
        <div class="myswiper-wrapper">
            <div v-if="swiperState" class="swiper-container" id="rechargeSwiper">
                <div class="swiper-wrapper">
                    <div v-for="item in nameList" class="swiper-slide ellipsis">
                        恭喜 {{item}} 用户成功获赠{{list | otherNum}}猫币！
                    </div>
                </div>
            </div>
        </div>
        <div class="recharge-list" v-if="list.length > 0">
            <div class="recharge-item" :class="{'mr0':index%2 === 1,'recharge-item-select':selectPrice.id === item.id}" v-for="(item, index) of list"
                @click="selectThis(item)">
                <p class="one red-item">
                    <i class="iconfont icon-jinbi"></i> {{item.wabi}}</p>
                <template v-if="item.initialRecharge == 1 && item.giveWabi > 0">
                    <p class="two"> 新春加赠
                        <span class="red-item">{{item.giveWabi}}</span>{{item.coinName}}</p>
                </template>
                <template v-if="item.initialRecharge == 0 && item.giveWabi > 0">
                    <p class="two">福利已领取</p>
                </template>
                <p class="three"> ￥{{item.amount}} </p>
            </div>
            <div style="clear: both;"></div>
        </div>
        <div class="rule">
            <div class="rule-in">
                <div class="rule-tit">
                    活动规则
                </div>
                <ol>
                    <li>
                        活动时间：2018.2.5-2.23
                    </li>
                    <li>
                        充值的金额仅用于娃娃机内使用，充值账款不做退回处理
                    </li>
                    <li>
                        如有问题：请联系400-6305-186
                    </li>
                    <li>
                        本活动最终解释权归平台所有
                    </li>
                </ol>
            </div>
        </div>
        <div class="bottom-btns flex flex-hlr flex-sc">
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
    import '@/lib/swiper/swiper.min.js';
    import '@/lib/swiper/swiper.min.css';
    import { Name } from './name.js'
    import bxmloading from '@/components/loading.vue';
    export default {
        data() {
            return {
                nameList: Name.getNameList(),
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                appKey: this.User.getAppKey(),
                payType: 1,
                systemCode: 1, //1阿里  2腾讯  3其他
                list: [],
                payList: [],
                wxtijiao: '',
                selectPrice: null,
                allLoading: false,
                swiperState: false
            }
        },
        filters: {
            otherNum(val) {
                if (val.length > 0) {
                    return val[Math.floor(Math.random() * val.length)].giveWabi
                } else {
                    return '**'
                }
            }
        },
        components: {
            'loading-v': bxmloading
        },
        methods: {
            selectThis(item) {
                this.selectPrice = item;
            },
            selectThisType(type) {
                this.payType = type;
                this.recharge()
            },
            recharge() { //创建充值订单
                let params = {
                    userId: this.userId,
                    payChannel: this.payType,
                    isWelfareCard: 0,
                    amount: this.selectPrice.amount,
                    rechargeConfigId: this.selectPrice.id
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
            getList() { //获取充值选项列表
                this.allLoading = true;
                this.api.getB({
                    url: 'recharge/configInfo',
                    params: {
                        userId: this.userId,
                        type: 1
                    },
                    headers: {
                        appKey: this.appKey
                    }
                }).then(res => {
                    this.allLoading = false;
                    if (res.data.successed) {
                        this.list = res.data.returnValue.rechargeAmountList;
                        this.swiperState = true;
                        this.$nextTick(() => {
                            let mySwiper = new Swiper('#rechargeSwiper', {
                                direction: 'vertical',
                                speed: 300,
                                loop: true,
                                autoplay: 1500,
                                autoplayDisableOnInteraction: false,
                            });
                        });
                        this.selectPrice = res.data.returnValue.rechargeAmountList[0];
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
            this.getList()
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import './rechargeNew'
</style>