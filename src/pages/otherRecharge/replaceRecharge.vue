<template>
    <div id="replaceRecharge" class="wrapper">
        <div class="content flex flex-s flex-sc">
            <h1 class="share-tit">
                {{$route.query.nn}}的代充邀请
            </h1>
            <div class="banner">
                <img class="user-head" :src="face" alt="" />
                <img class="banner-img" src="../../assets/img/recharge/beg2.png" />
            </div>

            <div class="recharge-item">
                <div class="recharge-item-bottom">

                </div>
                <div class="recharge-item-top">
                    <p class="qiu">{{item.txt}}</p>
                    <p class="amount">￥{{item.amount}}</p>
                    <img class="coinImg" :src="item.img" />
                </div>
            </div>
            <div class="bottom-btns flex flex-zhong">
                <button class="btn wx-btn flex-zhong" @click="addOrder(2)" v-if="ifWeixin">
                    <img src="../../assets/img/recharge/recharge_wx.png" alt="" />
                    <span>微信支付</span>
                </button>
                <button class="btn ali-btn flex-zhong" @click="addOrder(1)" v-if="!ifWeixin">
                    <img src="../../assets/img/recharge/recharge_alipay.png" alt="" />
                    <span>支付宝支付</span>
                </button>
            </div>
            <p class="tip">
                本次充值用于为对方娃娃机账户增加账户余额，充值前，请跟发送邀请人当面确认，谨防诈骗
            </p>
        </div>

        <div id="aliSub"></div>
        <a id="wxSub" style="display: none;" :href="wxtijiao"></a>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    export default {
        data() {
            return {
                face: ''
            }
        },
        computed: {
            list() {
                return this.$store.getters.otherRechargeList
            },
            item() {
                let _list = this.$store.getters.otherRechargeList;
                for (let i = 0; i < _list.length; i++) {
                    if (_list[i].id == this.$route.query.itemId) {
                        return _list[i];
                    }
                }
            },
            ifWeixin() {
                return this.Util.ifWeixinTrue()
            }
        },
        methods: {
            addOrder(type) {
                Indicator.open();
                this.api.postB({
                    url: 'recharge/replaceAdd',
                    params: {
                        userId: this.$route.query.userId,
                        amount: this.item.amount,
                        replaceRechargeId: this.$route.query.rId,
                        payChannel: type
                    }
                }).then(res => {
                    Indicator.close()
                    let _res = res.data;
                    if (_res.successed) {
                        this.goPay(_res.returnValue, type)
                    } else {
                        this.Util.myAlert(_res.errorDesc);
                    }
                }).catch(() => {
                    Indicator.close()
                });
            },
            goPay(orderNum, type) {
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
                    Indicator.close()
                    if (res.data.successed) {
                        if (type == 2 && !this.Util.ifWeixinTrue()) {
                            this.wxtijiao = res.data.returnValue.payUrl;
                            document.getElementById('wxSub').click();
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
                    Indicator.close()
                })
            },
            getFace() { //获取头像
                this.api.getB({
                    url: 'user/getUserFace',
                    params: {
                        userId: this.$route.query.userId
                    },
                }).then(res => {
                    if (res.data.successed) {
                        this.face = res.data.returnValue;
                        let replaceRecharge1 = this.$route.query;
                        replaceRecharge1.face = res.data.returnValue;
                        this.Storage.setItem('replaceRecharge', replaceRecharge1)
                    } else {
                    }
                }).catch(() => {
                })
            },
        },
        created() {
            this.getFace();
            let replaceRecharge = this.$route.query;
            this.Storage.setItem('replaceRecharge', replaceRecharge)
        }
    }
</script>

<style lang='scss'>
    @import './replaceRecharge'
</style>