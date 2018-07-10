<template>
    <div id="payCarMonry">
        <div class="sendType mb" @click="selectAddr">
            <div class="one flex flex-hlr">
                <div class="defaultFont color333">
                    配送方式
                </div>
            </div>
            <div class="two flex flex-hlr">
                <div class="defaultFont color333">
                    收货人：{{defaultMessage.consignee}}
                </div>
                <div class="defaultFont color333">
                    {{defaultMessage.mobile}}
                </div>
            </div>
            <div class="three color333 smallFont">
                收货地址：
                {{defaultMessage.province}}
                {{defaultMessage.city}}
                {{defaultMessage.region}}
                {{defaultMessage.address}}
            </div>
            <div class="jiantou flex-zhong">
                <img src="../../assets/img/addr/triangle.png" alt="">
            </div>
        </div>
        <div class="bottomTab">
            <div class="bottomTabIn flex flex-hlr flex-sc">
                <div class="flex flex-s">
                    <p>
                        共 <span class="colorRed"> {{$route.query.oid.split(',').length}} </span>件商品
                        &nbsp;
                        共 <span class="colorRed"> {{freight.freightAmount}} </span>元
                    </p>
                    <p class="smallFont color999">
                        首件商品运费10元，之后每件加5元
                    </p>
                </div>
                <div class="buy flex-zhong" @click="pay">
                    确定支付
                </div>
            </div>
        </div>
        <MessageBox v-if="alertState === 1003" v-on:close="close">
            <slot>
                <p class="alertOne defaultFont color333"> 您的储值账户余额不足，请充值！</p>
                <p class="alertOne defaultFont color333 mb"> 当前余额： <span class="colorRed">{{userInfo.balance}}</span></p>
                <br>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close">再想想</mt-button>
                    <mt-button type="primary" size="small" @click="goRecharge">去充值</mt-button>
                </div>
            </slot>
        </MessageBox>
    </div>
</template>
<script>
import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
            defaultMessage: {
                consignee: ''
            },
            alertState: 0,
            freight: {

            },
            userInfo:{}
        }
    },
    created () {
        if (this.$route.query.addrId) {
            this.getById()
        } else {
            this.getDefault();
        };
    },
    methods: {
        close() {
            this.alertState = 0;
        },
        goRecharge() {
            this.$router.push({
                name: 'recharge'
            })
        },
        pay(){
            if(!this.defaultMessage.id){
                this.Util.myAlert('请选择地址');
                return
            };
            MessageBox.confirm('确定支付？').then(action => {
                Indicator.open();
                this.api.postB({
                    url: 'customerOrder/pickUpGoods',
                    params: {
                        customerOrderIds: this.$route.query.oid,
                        deliveryAddressId: this.defaultMessage.id
                    },
                    user: true
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.Util.myAlert('支付成功');
                        this.$router.replace({
                            name: 'myOrder'
                        })
                    }else{
                        switch (res.errorCode) {
                            case '500':
                                this.Util.myAlert('系统异常，请稍后重试');
                                break;
                            case '1001':
                                this.Util.myAlert(res.errorDesc);
                                this.api.noLogin();
                                break;
                            case '1002':
                                this.alertState = 1002;
                                break;
                            case '1003':
                                this.alertState = 1003;
                                break;
                            default:
                                this.Util.myAlert(res.errorDesc);
                                break;
                        }
                    }
                })
            });
        },
        selectAddr() {
            this.$router.push({
                name: 'receiveAddress',
                query: {
                    oid: this.$route.query.oid,
                    isSelect: 1
                }
            })
        },
        getFreight(){
            this.api.putB({
                url: 'customerOrder/getPickUpGoodsInfo',
                params: {
                    customerOrderIds: this.$route.query.oid,
                    deliveryAddressId: this.defaultMessage.id
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.freight = res.returnValue;
                }
            }).catch(() => {

            })
        },
        getById() {
            Indicator.open();
            this.api.getB({
                url: 'deliveryAddress/getById',
                params: {
                    id: this.$route.query.addrId
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.defaultMessage = res.returnValue;
                    this.getFreight();
                }
            }).catch(() => {

            })
        },
        getDefault() {
            Indicator.open();
            this.api.getB({
                url: 'deliveryAddress/getDefault',
                user: true,
            }).then(res => {
                Indicator.close();
                if (res.successed && res.returnValue) {
                    this.defaultMessage = res.returnValue;
                    this.getFreight();
                }
            })
        },
        getMyInfo() {
            this.api.getB({
                url: 'customer/getByToken',
                user: true
            }).then(res => {
                if (res.successed) {
                    this.userInfo = res.returnValue;
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #payCarMonry{
        .sendType {
            position: relative;
            padding: 0 st(20);
            width: 100%;
            background: #fff;
            .one {
                padding-top: st(20);
                padding-bottom: st(20);
                border-bottom: 1px solid #ccc;
            }
            .two {
                padding-top: st(20);
                padding-bottom: st(20);
                padding-right: st(50);
            }
            .three {
                padding-top: st(20);
                padding-bottom: st(20);
                padding-right: st(50);
            }
            .jiantou {
                position: absolute;
                right: st(20);
                top: st(80);
                width: st(40);
                height: st(200);
                line-height: st(120);
                text-align: center;
                img{
                    width: st(28);
                }
            }
        }
        .bottomTabIn{
            padding: st(20);
            .buy{
                width: st(200);
                height: st(80);
                background: #ff0000;
                color: #fff;
                border-radius: st(80);
            }
        }
        .alertOne{
            width: 100%;
            padding-top: st(30);
            input{
                padding: 0 st(20);
                width: 100%;
                height: st(80);
                border:1px solid #ccc;
                border-radius: st(10);
            }
        }
    }
</style>
