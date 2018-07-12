<template>
    <div id="rechargeResult">
        <div v-if="payResult.state == 1">
            <div class="rechargeResult-top">
                <h1 class="largeFont colorRed"> 充值成功 </h1>
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/my/recharge" replace>
                    继续充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    返回首页
                </button>
            </div>
        </div>
        <div v-if="payResult.state == 0">
            <div class="rechargeResult-top">
                <h1 class="largeFont colorRed"> 充值失败 </h1>
            </div>
            <div class="button-item">
                <router-link class="noborder" tag="button" to="/my/recharge" replace>
                    重新充值
                </router-link>
                <button class="nobg" @click="goBack()">
                    返回首页
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
            }
        },
        methods: {
            getPayResult() {
                this.api.getBn({
                    url: 'recharge/getStateByOid',
                    params: {
                        oid: this.orderNum
                    },
                    user: true
                }).then((res) => {
                    console.log(res)
                    if (res.successed) {
                        Indicator.close();
                        this.payResult.state = res.returnValue;
                        clearInterval(timer);
                    } else {
                        if (this.nn >= 9) {
                            Indicator.close();
                            clearInterval(timer);
                            this.payResult.state = 0;
                            this.Util.myAlert(res.errorDesc)
                        }
                    }
                }).catch((error) => {
                    Indicator.close();
                    console.log(error)
                    this.Util.myAlert("网络错误，请稍后重试!")
                })
            },
            goBack() {
                this.$router.push({
                    name: 'home'
                })
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
                }, 1000);
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
