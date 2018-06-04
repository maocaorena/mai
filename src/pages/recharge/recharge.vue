<template>
    <div id="recharge" class="wrapper">
        <mt-field label="金额" placeholder="请输入充值金额，最低2元" type="number" v-model="number"></mt-field>
        <div class="tip pd20">
            注意：请确保充值金额与转账金额一致，否则会造成自动确认失败
        </div>
        <div class="rechargeItem flex flex-sc" @click="selectThis(0)">
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
                <img class="haha" v-if="payType == 0" src="../../assets/img/addr/choice_2.png" />
                <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
            </div>
        </div>
        <div class="rechargeItem flex flex-sc" @click="selectThis(1)">
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
                <img class="haha" v-if="payType == 1" src="../../assets/img/addr/choice_2.png" />
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
        this.getInfo();
    },
    methods: {
        getInfo(){
            this.api.getB({
                url: 'customer/getByToken',
                user: true
            }).then(res=>{
                if(res.successed){
                }else{
                }
            })
        },
        selectThis(type){
            this.payType = type;
        },
        goCharge(){
            if(this.number < 2){
                this.Util.myAlert('充值金额最低为2元')
            }else{
                if(this.payType == 1){
                    this.$router.push({
                        name: 'aliPay',
                        query: {
                            num: this.number
                        }
                    })
                }else if(this.payType == 0){
                    this.api.postB({
                        url: 'recharge/createOrder',
                        params: {
                            amount: this.number,
                            rechargeMethod: this.payType,
                            payChannel: 2,
                        },
                        user: true
                    }).then(res=>{
                        if(res.successed){
                            this.pay(res.returnValue)
                        }
                    })
                }
            }
        },
        pay(oid){
            this.api.postB({
                url: 'recharge/launchPay',
                params: {
                    oid: oid,
                    payTitle: '充值',
                    clientType: 'h5',
                },
                user: true
            }).then(res=>{
                if(res.successed){
                   
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './recharge'
</style>


