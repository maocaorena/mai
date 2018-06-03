<template>
    <div id="getMoney" class="wrapper">
        <div class="item">
            <p class="top green">
                可用余额（元）
            </p>
            <div class="bottom">
                {{balance}}
            </div>
        </div>

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
                提现金额
            </p>
            <div class="bottom flex">
                <input type="number" v-model="getNum">
                <button @click="getAll">
                    全额
                </button>
            </div>
        </div>

        <div class="item">
            <p class="top">
                短信验证码
            </p>
            <div class="bottom flex">
                <input type="number" v-model="code">
                <button disabled="disabled" v-if="cutTime != '获取验证码'">
                    {{cutTime}}
                </button>
                <button @click="sendCode" v-if="cutTime == '获取验证码'" >
                    {{cutTime}}
                </button>
            </div>
        </div>

        <br>

        <mt-button class="goCharge" @click.native="getMoney" type="primary">确定提现</mt-button>

        <MessageBox v-show="alertSate === 1" :tit="'提现说明'" :remark="'x'" v-on:close="close">
            <slot>
                <ul class="alertIn">
                    <li class="alertOne defaultFont color333"> ●提现金额：收益单笔汇出金额需为10元的整数倍，单日累计汇出最高金限额5万元</li>
                    <li class="alertOne defaultFont color333"> ●提现手续费：汇出单笔金额5000元以下，按5元/笔收取汇款手续费，大等于5000元为汇出金额千分之一，2019年1月1日前执行优惠政策2元/笔，不论金额大小</li>
                    <li class="alertOne defaultFont color333"> ●提取到账时间：申请后3个工作日内到账，一般在1个工作日内</li>
                    <li class="alertOne defaultFont color333"> ●提现行为请自觉遵守国家相关法规，如发现有套现等违法行为，平台将封锁账户并向相关监管部门举报</li>
                </ul>
            </slot>
        </MessageBox>
    </div>  
</template>
<script>
    import { md } from '@/assets/js/md5.js'
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                alertSate: 0,
                defaultMessage: {},
                balance: '加载中...',
                getNum: 0,
                code: '',
                item: {
                    openBank: 'XXXX',
                    cardNumber: '****'
                },
                cutTime: '获取验证码'
            }
        },
        created() {
            this.getMyInfo();
            if (this.$route.query.id) {
                this.getById()
            } else {
                this.getDefault();
            };
            let _this = this;
            this.$store.commit('setRightBar', function() {
                _this.open()
            });
        },
        methods: {
            sendCode(){
                Indicator.open();
                this.api.postB({
                    url: 'customer/sendCustomerMsgValidateCode',
                    user: true
                }).then(res=>{
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
            goSelect() {
                this.$router.push({
                    name: 'myCards',
                    query: {
                        isSelect: 1
                    }
                })
            },
            getAll() {
                if (this.balance != '加载中...') {
                    this.getNum = this.balance;
                }
            },
            getMoney() {
                if((this.defaultMessage.id+'') == 'undefined'){
                    this.Util.myAlert('请选择银行卡')
                    return;
                };

                if(this.Util.trim(this.code+'').length<1){
                    this.Util.myAlert('请填写验证码')
                    return;
                };

                this.api.postB({
                    url: 'customerCashRecord/cashApply',
                    params: {
                        customerBankCardId: this.defaultMessage.id,
                        amount: this.getNum
                    },
                    headers:{
                        msgValidateCode: md.md5(this.Util.trim(this.code+''))
                    },
                    user: true
                }).then(res=>{
                    if(res.successed){
                        this.Util.myAlert('提现成功')
                    }
                })
            },
            close() {
                this.alertSate = 0
            },
            open() {
                this.alertSate = 1
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
                    if (res.successed) {
                        this.defaultMessage = res.returnValue;
                        this.defaultMessage.cardNumber = this.defaultMessage.cardNumber.substr(-4,4);
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
                    if (res.successed) {
                        this.defaultMessage = res.returnValue;
                        this.defaultMessage.cardNumber = this.defaultMessage.cardNumber.substr(-4,4);
                    } else {

                    }
                })
            },
            getMyInfo() {
                this.api.getB({
                    url: 'customer/getByToken',
                    user: true
                }).then(res => {
                    if (res.successed) {
                        this.balance = res.returnValue.balance;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import './getMoney'
</style>