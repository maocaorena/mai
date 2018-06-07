<template>
    <div id="sureOrder" class="wrapper">
        <div class="product flex mb">
            <div class="left">
                <img v-lazy.container="detail.image" />
            </div>
            <div class="right">
                <div class="top color333">
                    {{detail.productName}}
                </div>
                <div class="bottom flex flex-hlr flex-sc">
                    <p class="colorRed defaultFont">￥{{detail.price}}</p>
                    <p class="color333">× {{num}}</p>
                </div>
            </div>
        </div>

        <div class="buyNum flex flex-hlr flex-sc mb">
            <div class="color333 defaultFont">购买数量</div>
            <div class="flex flex-hlr">
                <div class="down" @click="down">-</div>
                <div>
                    <input type="number" @change="handle" v-model="num">
                </div>
                <div class="down" @click="up">+</div>
            </div>
        </div>
        
        <div class="sendType mb" @click="selectAddr">
            <div class="one flex flex-hlr">
                <div class="defaultFont color333">
                    配送方式
                </div>
                <!-- <div class="defaultFont colorRed">
                    快递 ￥10.00
                </div> -->
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
            <div class="jiantou">
                >
            </div>
        </div>

        <div class="getServer color2 mb" @click="openServer">
            联系客服
        </div>

        <div class="allMount">
            <div class="flex flex-hlr">
                <p class="color333 defaultFont">
                    商品金额
                </p>
                <p class="colorRed defaultFont">
                    ￥{{productMoney}}
                </p>
            </div>
            <!-- <div class="flex flex-hlr">
                <p class="color333 defaultFont">
                    运费
                </p>
                <p class="colorRed defaultFont">
                    ￥20
                </p>
            </div> -->
        </div>

        <div class="bottomTab">
            <div class="bottomTabIn flex flex-sc flex-hlr">
                <p>
                    <span class="color666 defaultFont"> 合计： </span> 
                    <span class="colorRed defaultFont">￥{{productMoney+carMoney}}</span>
                </p>
                <div class="buy flex-zhong" @click="createdOrder">
                    提交订单
                </div>
            </div>
        </div>

        <MessageBox v-if="alertState === 1003">
            <slot>
                <p class="alertOne defaultFont color333"> 您的储值账户余额不足，请充值！</p>
                <p class="alertOne defaultFont color333 mb"> 当前余额： <span class="colorRed">{{userInfo.balance}}</span></p>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close">再想想</mt-button>
                    <mt-button type="primary" size="small" @click="goRecharge">去充值</mt-button>
                </div>
            </slot>
        </MessageBox>

        <MessageBox v-if="alertState === 1002">
            <slot>
                <p class="alertOne defaultFont color333"> 应国家政策要求，购买商品前请进行实名认证！</p>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close">再想想</mt-button>
                    <mt-button type="primary" size="small" @click="goTrueName">前去实名</mt-button>
                </div>
            </slot>
        </MessageBox>
        <server-v v-if="serverState" v-on:close="closeServer"></server-v>
    </div>
</template>
<script>
    import server from '@/components/server/server.vue'
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                serverState: false,
                num: 1,
                alertState: 0,
                detail: {},
                productMoney: 0,
                carMoney: 0,
                defaultMessage: {},
                userInfo: {}
            }
        },
        components: {
            'server-v': server  
        },
        created() {
            this.getProductDetail();
            this.getMyInfo();
            if (this.$route.query.addrId) {
                this.getById()
            } else {
                this.getDefault();
            };
        },
        methods: {
            openServer(){
                this.serverState = true;
            },
            closeServer(){
                console.log('ddd')
                this.serverState = false;
            },
            goRecharge(){
                this.$router.push({
                    name: 'recharge'
                })
            },
            goTrueName(){
                this.$router.push({
                    name: 'trueName',
                })
            },
            selectAddr() {
                this.$router.push({
                    name: 'receiveAddress',
                    query: {
                        num: this.num,
                        productId: this.$route.query.productId,
                        isSelect: 1
                    }
                })
            },
            close() {
                this.alertState = 0;
            },
            buy() {
                this.$router.push({
                    name: 'buySuccess'
                })
            },
            up() {
                this.num++;
                this.handle();
            },
            down() {
                this.num--;
                this.handle();
            },
            handle() {
                if (this.num > 99) {
                    this.num = 99;
                };
                if (this.num < 1) {
                    this.num = 1;
                };
                this.allAmount();
            },
            allAmount() {
                this.productMoney = this.detail.price * this.num;
            },
            createdOrder() {
                Indicator.open();
                this.api.postBn({
                    url: 'customerOrder/createOrder',
                    params: {
                        productId: this.$route.query.productId,
                        deliveryAddressId: this.defaultMessage.id,
                        orderCount: this.num
                    },
                    user: true
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.$router.push({
                            name: 'buySuccess',
                            query: {
                                oid: res.returnValue,
                            }
                        })
                    } else {
                        Indicator.close();
                        switch (res.errorCode) {
                            case '500':
                                Util.myAlert('系统异常，请稍后重试');
                                break;
                            case '1001':
                                Util.myAlert(res.errorDesc);
                                this.api.noLogin();
                                break;
                            case '1002':
                                this.alertState = 1002;
                                break;
                            case '1003':
                                this.alertState = 1003;
                                break;
                            default:
                                Util.myAlert(res.errorDesc);
                                break;
                        }
                    }
                })
            },
            getProductDetail() {
                Indicator.open();
                this.api.getB({
                    url: 'product/getDetail',
                    params: {
                        id: this.$route.query.productId
                    },
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.detail = res.returnValue;
                        this.num = this.$route.query.num;
                        this.allAmount();
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
                    if (res.successed) {
                        this.defaultMessage = res.returnValue;
                    }
                })
            },
            getMyInfo() {
                this.api.getB({
                    url: 'customer/getByToken',
                    user: true
                }).then(res=>{
                    if(res.successed){
                        this.userInfo = res.returnValue;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./sureOrder";
</style>