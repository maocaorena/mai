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
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="pay">确定支付</button>
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
export default {
    data () {
        return {
            defaultMessage: {
                consignee: ''
            },
            alertState: 0
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
        pay(){

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
        .receiveAddress-bottom{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 10;
            margin: auto;
            width: 100%;
            height: st(100);
            background: #fff;
            border-top: 1px solid #d8d8d8;
            button{
                width: st(672);
                height: st(84);
                background: #ff5b88;
                border-radius: st(20);
                text-align: center;
                font-size: st(28);
                border: 0;
                color: #FFF;
            }
        }
    }
</style>
