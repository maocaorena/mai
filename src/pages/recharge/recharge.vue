<template>
    <div id="recharge" class="wrapper">
        <!-- <mt-field label="金额" placeholder="请输入充值金额，最低2元" type="number" v-model="number"></mt-field> -->
        <ul class="money-list">
            <li class="money-item flex flex-hc flex-sc" :class="{'select': number == index}" v-for="(item, index) of list" @click="selectThisItem(index)">
                <span class="big"> 
                    充值 {{item}} 元
                </span>
                <!-- <span class="small">
                    消耗1000猫币
                </span> -->
            </li>
            <li class="money-item flex flex-hc flex-sc" :class="{'select': number == list.length}" @click="selectThisItem(list.length)">
                <input style="border: none;height:100%;padding: 5px" type="number" v-model="amount">
            </li>
            <li class="clear"></li>
        </ul>
        <!-- <div class="tip pd20">
            注意：请确保充值金额与转账金额一致，否则会造成自动确认失败
        </div> -->
        <div class="item">
            <p class="top green">
                选择银行卡
            </p>
            <div class="card" @click="goSelect">
                <p class="name-num color333">
                    <span class="name">{{defaultMessage.openBank}}</span>
                    <span class="tel">（尾号{{defaultMessage.cardNumber}}）</span>
                </p>
                <div class="right flex-zhong">
                    <img src="../../assets/img/addr/triangle.png" alt="">
                </div>
            </div>
        </div>

        <div class="item">
            <p class="top">
                短信验证码
            </p>
            <div class="bottom flex">
                <input type="number" v-model="code" :disabled="isDisable">
                <button disabled="disabled" v-if="cutTime != '获取验证码'">
                    {{cutTime}}
                </button>
                <button @click="goCharge(1)" v-if="cutTime == '获取验证码'">
                    {{cutTime}}
                </button>
            </div>
        </div>

        <div class="rechargeItem flex flex-sc" @click="selectThis(4)">
            <div class="left">
                <img src="../../assets/img/recharge/alipay.png" alt="">
            </div>
            <div class="middle">
                <div class="top">
                    银行卡支付（
                    <span class="colorRed">推荐</span>）
                </div>
                <div class="bottom">
                    即时到账
                </div>
            </div>
            <div class="right">
                <img class="haha" v-if="payType == 4" src="../../assets/img/addr/choice_2.png" />
                <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
            </div>
        </div>
        <!-- <div class="rechargeItem flex flex-sc" @click="selectThis(1)">
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
        </div> -->
        <br>
        <mt-button class="goCharge" @click.native="goCharge" type="primary">去充值</mt-button>
        <div id="aliSub"></div>
    </div>
</template>
<script>
import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
export default {
    data() {
        return {
            number: 0,
            payType: 4,
            defaultMessage: {
                openBank: '',
                cardNumber: ''
            },
            cutTime: '获取验证码',
            code: '',
            isDisable: true,
            list:[

            ],
            num: 0,
            isThis: '',
            amount: 0
        }
    },
    created() {
        this.getInfo();
        this.getList();
        if (this.$route.query.id) {
            this.getById()
        } else {
            this.getDefault();
        };
    },
    methods: {
        selectThisItem(item){
            this.number = item;
        },
        goSelect() {
            this.$router.push({
                name: 'myCards',
                query: {
                    isSelect: 1
                }
            })
        },
        getInfo() {
            this.api.getB({
                url: 'customer/getByToken',
                user: true
            }).then(res => {
                if (res.successed) {
                } else {
                }
            })
        },
        getList() {
            this.api.getB({
                url: 'recharge/getRechargeAmount',
                user: true
            }).then(res => {
                if (res.successed) {
                    this.list = res.returnValue;
                    this.num = this.list[this.number]
                } else {
                }
            })
        },
        selectThis(type) {
            this.payType = type;
        },
        sendCode(oid){
            this.api.postB({
                url: 'recharge/launchPay',
                params: {
                    oid: oid,
                    payTitle: '充值',
                    clientType: 0,//客户端类型，0：h5，1：app，2：微信，3：QQ，4：其他，默认0
                    customerBankCardId: this.defaultMessage.id,
                    msgValidateCode: this.Util.trim(this.code)
                },
                user: true
            }).then(res => {
                Indicator.close();
                if(res.successed){
                    this.Util.myAlert("发送成功");
                    let cutTime = 60;
                    this.cutdown = cutTime + "秒后重发";
                    var myTime = setInterval(()=>{
                        cutTime--;
                        this.cutTime = cutTime + "秒后重发";
                        if(cutTime == 0) {
                            clearInterval(myTime);
                            this.cutTime = "获取验证码";
                        }
                    }, 1000);
                }
            })
        },
        goCharge(type) {
            if(this.isDisable){
                this.Util.myAlert("请选择银行卡");
                return;
            };

            if(type!=1 && this.Util.trim(this.code).length < 1){
                this.Util.myAlert("请填写验证码");
                return;
            };
            let _amonut = '';
            if(this.number ==  this.list.length){
                _amonut = this.amount;
            }else{
                _amonut = this.list[this.number]
            }
            if (_amonut < 2) {
                this.Util.myAlert('充值金额最低为2元')
            } else {
                if (this.payType == 1) {
                    this.$router.push({
                        name: 'aliPay',
                        query: {
                            num: _amonut
                        }
                    })
                } else if (this.payType == 4) {
                    Indicator.open()
                    this.api.postB({
                        url: 'recharge/createOrder',
                        params: {
                            amount: _amonut,
                            rechargeMethod: 0,
                            payChannel: this.payType,
                        },
                        user: true
                    }).then(res => {
                        if (res.successed) {
                            if(type === 1){
                                this.sendCode(res.returnValue)
                            }else{
                                this.pay(res.returnValue)
                            }
                        }
                    })
                }
            }
        },
        pay(oid) {
            this.api.postB({
                url: 'recharge/launchPay',
                params: {
                    oid: oid,
                    payTitle: '充值',
                    clientType: 0,//客户端类型，0：h5，1：app，2：微信，3：QQ，4：其他，默认0
                    customerBankCardId: this.defaultMessage.id,
                    msgValidateCode: this.Util.trim(this.code)
                },
                user: true
            }).then(res => {
                Indicator.close()
                if (res.successed) {
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

                }else{
                    this.code = ''
                }
            })
        },
        getById() {
            Indicator.open();
            this.api.getB({
                url: 'customerBankCard/getById',
                params: {
                    id: this.$route.query.id
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (!res.returnValue) {
                    this.isDisable = true;
                } else {
                    this.isDisable = false;
                };
                if (res.successed) {
                    this.defaultMessage = res.returnValue;
                    this.defaultMessage.cardNumber = this.defaultMessage.cardNumber.substr(-4, 4);
                }
            }).catch(() => {

            })
        },
        getDefault() {
            Indicator.open();
            this.api.getB({
                url: 'customerBankCard/getDefault',
                user: true,
            }).then(res => {
                Indicator.close();
                if (!res.returnValue) {
                    this.isDisable = true;
                } else {
                    this.isDisable = false;
                };
                if (res.successed && res.returnValue) {
                    this.defaultMessage = res.returnValue;
                    this.defaultMessage.cardNumber = this.defaultMessage.cardNumber.substr(-4, 4);
                } else {

                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import "./recharge";
</style>


