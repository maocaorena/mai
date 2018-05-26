<template>
    <div id="recharge" class="wrapper">
        <mt-field label="金额" placeholder="请输入充值金额，最低2元" type="number" v-model="number"></mt-field>
        <div class="tip pd20">
            注意：请确保充值金额与转账金额一致，否则会造成自动确认失败
        </div>
        <div class="rechargeItem flex flex-sc" @click="selectThis(1)">
            <div class="left">
                <img src="../../assets/img/recharge/alipay.png" alt="">
            </div>
            <div class="middle">
                <div class="top">
                    认证支付（<span class="colorRed">推荐</span>）
                </div>
                <div class="bottom">
                    即时到账
                </div>
            </div>
            <div class="right">
                <img class="haha" v-if="payType == 1" src="../../assets/img/addr/choice_2.png" />
                <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
            </div>
        </div>
        <div class="rechargeItem flex flex-sc" @click="selectThis(2)">
            <div class="left">
                <img src="../../assets/img/recharge/alipay.png" alt="">
            </div>
            <div class="middle">
                <div class="top">
                    支付宝转账
                </div>
                <div class="bottom">
                    安全可靠，转账成功后需要联系客服确认
                </div>
            </div>
            <div class="right">
                <img class="haha" v-if="payType == 2" src="../../assets/img/addr/choice_2.png" />
                <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
            </div>
        </div>
        <br>
        <mt-button class="goCharge" @click.native="goCharge" type="primary">去充值</mt-button>
    </div>
</template>
<script>
export default {
    data () {
        return {
            number: '',
            payType: 1
        }
    },
    created () {
        
    },
    methods: {
        selectThis(type){
            this.payType = type;
        },
        goCharge(){
            if(this.number < 2){
                this.Util.myAlert('充值金额最低为2元')
            }else{
                if(this.payType == 2){
                    this.$router.push({
                        name: 'aliPay',
                        query: {
                            num: this.number
                        }
                    })
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './recharge'
</style>


