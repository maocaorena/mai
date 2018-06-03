<template>
    <div id="rechargeResult">
        <div v-if="payResult.state == 1">
            <div class="rechargeResult-top">
                <h1 class="largeFont colorRed"> 充值成功 </h1>
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/recharge">
                    继续充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    {{backUrl}}
                </button>
            </div>
        </div>
        <div v-if="payResult.state == 0">
            <div class="rechargeResult-top">
                <h1 class="largeFont colorRed"> 充值失败 </h1>
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/recharge">
                    重新充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    {{backUrl}}
                </button>
            </div>
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
            }
        },
        watch: {
            'payResult.state': function (oldVal, newVal) {
                if (newVal == 1) {
                    this.getWabiBalance()
                }
            }
        },
        methods: {
            getPayResult() {
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
                Indicator.open('充值结果确认中...');
                setTimeout(() => {
                    this.getPayResult();
                    timer = setInterval(() => {
                        if (this.nn >= 9) {
                            clearInterval(timer);
                        } else {
                            this.nn++;
                            this.getPayResult();
                        }
                    }, 1000);
                }, 2000);
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
