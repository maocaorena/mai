<template>
    <div id="aliPay" class="wrapper">
        <div class="banner width100">
            <img src="../../assets/img/recharge/u1297.png" alt="">
        </div>
        <br>
        <mt-field label="支付宝昵称" placeholder="支付宝昵称" type="text" v-model="nickName"></mt-field>
        <br>
        <mt-field label="充值金额" placeholder="充值金额" type="number" v-model="number"></mt-field>
        <br>
        <mt-button class="goCharge" @click.native="goCharge" type="primary">确定充值</mt-button>
        <br>
        <p class="tip colorRed mb">
            如需马上到账或长时间未到账，请联系客服：
        </p>
        <br>
        <div class="buttons flex flex-hsb">
            <mt-button type="default" size="small" @click.native="qqServer" plain>QQ客服</mt-button>
            <mt-button type="default" size="small" @click.native="phoneServer" plain>客服电话</mt-button>
        </div> 
        <div id="aliSub"></div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
export default {
    data () {
        return {
            nickName: '',
            number: this.$route.query.num
        }
    },
    created () {
    },
    methods: {
        goCharge(){
            if(this.Util.trim(this.nickName).length < 1){
                this.Util.myAlert('请输入支付宝昵称');
                return;
            }
            this.api.postB({
                url: 'recharge/createOrder',
                params: {
                    amount: this.number,
                    rechargeMethod: 1,
                    payChannel: 2,
                    payAccount: this.nickName
                },
                user: true
            }).then(res=>{
                if(res.successed){
                    this.pay(res.returnValue)
                }
            })
        },
        pay(oid){
            this.api.postB({
                url: 'recharge/launchPay',
                params: {
                    oid: oid,
                    payTitle: '充值',
                    clientType: 0,
                },
                user: true
            }).then(res=>{
                if(res.successed){
                   var html = res.returnValue.submitFormStr;
                    var cont = document.getElementById("aliSub");
                    cont.innerHTML = html;
                    var oldScript = cont.getElementsByTagName(
                        "script"
                    )[0];
                    cont.removeChild(oldScript);
                    var newScript = document.createElement(
                        "script"
                    );
                    newScript.type = "text/javascript";
                    newScript.innerHTML = oldScript.innerHTML;
                    cont.appendChild(newScript);

                }
            })
        },
        qqServer(){
            var kefu101 = "http://wpa.qq.com/msgrd?v=3&uin=5446833281&site=oicqzone.com&menu=yes";
            var kefu102 = "mqqwpa://im/chat?chat_type=wpa&uin=5446833281&version=1&src_type=web&web_src=oicqzone.com";
            if (/(|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(|Android|)/i.test(navigator.userAgent)) {
                window.open(kefu102);
            } else {
                window.open(kefu101);
            }
        },
        phoneServer(){
            window.location.href="tel:123456789"
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './aliPay'
</style>

