<template>
    <div id="result">
        <div class="content flex flex-s flex-sc success" v-if="payResult.state == 1">
            <div class="img-wrapper">
                <img src="../../assets/img/recharge/success.png" />
            </div>
            <p class="pay-result">
                代充成功！
            </p>
            <div class="message flex-zhong">
                <img class="user-head" :src="replaceRecharge.face" alt="" />
                <img class="inin" src="../../assets/img/recharge/success_circle_font.png" />
            </div>
            <div class="btn" @click="goHome">
                一起抓娃娃
            </div>
        </div>

        <div class="content flex flex-s fail flex-sc" v-if="payResult.state == 0">
            <div class="img-wrapper">
                <img src="../../assets/img/recharge/fail.png" />
            </div>
            <p class="pay-result">
                代充失败
            </p>
            <div class="btn" @click="again()">
                继续代充
            </div>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    var timer;
    export default {
        data() {
            return {
                payResult: {
                    state: -1
                },
                nn: 0,
                orderNum: this.$route.query.orderNum || this.$route.query.mhtOrderNo,
                replaceRecharge: this.Storage.getItemJson('replaceRecharge')
            }
        },
        methods: {
            goHome() {
                this.Util.setItem('urlMessage', {
                    appKey: this.replaceRecharge.appKey
                });
                this.$router.push({
                    path: '/home'
                });
            },
            again() {
                this.$router.push({
                    path: '/replaceRecharge',
                    query: this.replaceRecharge
                });
            },
            getPayResult() {
                Indicator.open('充值结果确认中...');
                this.api.getBn({
                    url: 'recharge/getOrderByOid',
                    params: {
                        oid: this.orderNum
                    }
                }).then((res) => {
                    if (res.data.successed && res.data.returnValue) {
                        Indicator.close();
                        this.payResult.state = 1;
                        clearInterval(timer);
                    } else {
                        if (this.nn >= 9) {
                            Indicator.close();
                            clearInterval(timer);
                            this.payResult.state = 0;
                        };
                    };
                }).catch((error) => {
                    Indicator.close();
                    this.Util.myAlert("网络错误，请稍后重试!")
                });
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
                    };
                }, 1000);
            } else {
                this.payResult.state = 0;
            };
        }
    }
</script>

<style lang='scss'>
    @import './replaceRechargeResult'
</style>