<template>
    <div id="buySuccess" class="wrapper">

        <h1 class="titile colorRed">
            购买成功！
            <br>
            <span v-if="productDetail.isGiveGold == 1">恭喜您获得消费送黄金福利！</span>
        </h1>
        <div class="item" @click="upLev" v-if="productDetail.isGiveGold == 1">
            <div class="img">
                <img src="../../assets/img/common/game.png" alt="">
            </div>
            <div class="one-tit defaultStyle color333 largeFont">
                玩游戏送黄金
            </div>
            <p class="pd20 colorRed pt0">
                成功可获得价值 {{productDetail.giveGoldQuantity}} 元黄金
            </p>
        </div>
        <div class="item" @click="sendProd()">
            <div class="img">
                <img src="../../assets/img/common/send.png" alt="">
            </div>
            <div class="one-tit defaultStyle color333 largeFont">
                直接提货
            </div>
        </div>
        <div class="bottons defaultStyle flex flex-sc flex-hsb">
            <p @click="goHome">
                返回首页>
            </p>
            <p @click="goOrder">
                查看订单>
            </p>
        </div>
        <MessageBox v-if="alertState1 === 1002" v-on:close="close1">
            <slot>
                <p class="alertOne defaultFont color333"> 应国家政策要求，购买商品前请进行实名认证！</p>
                <br>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close1">再想想</mt-button>
                    <mt-button type="primary" size="small" @click="goTrueName">前去实名</mt-button>
                </div>
            </slot>
        </MessageBox>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    import { MessageBox } from 'mint-ui';
    import shoppingItem from '../shopping/shoppingItem.vue'
    export default {
        data() {
            return {
                num: 10,
                productDetail: {
                    orderCount: '',
                    productName: ''
                },
                alertState1: 0
            }
        },
        components: {
            'shoppingItem': shoppingItem
        },
        created() {
            this.getByOid()
        },
        mounted() {

        },
        methods: {
            goTrueName() {
                this.$router.push({
                    name: 'trueName',
                })
            },
            close1() {
                console.log('ddd')
                this.alertState1 = 0;
            },
            upLev() {
                this.api.getB({
                    url: 'customer/getByToken',
                    user: true
                }).then(res=>{
                    if(res.successed){
                        if(res.returnValue.identityState == 1){
                            this.$router.push({
                                name: 'redLight',
                                query: {
                                    oid: this.$route.query.oid
                                }
                            })
                        }else{
                            this.alertState1 = 1002;
                        }
                    }
                })
            },
            sendProd() {
                    // this.api.putB({
                    //     url: 'customerOrder/pickUpGoods',
                    //     user: true,
                    //     params: {
                    //         id: this.$route.query.oid
                    //     }
                    // }).then(res=>{
                    //     if(res.successed){
                            
                    //     }
                    // })
                    this.$router.push({
                        name: 'myOrder'
                    })
            },
            close() {
                this.alertState = 0;
            },
            goHome() {
                this.$router.push({ name: 'home' })
            },
            goOrder(){
                this.$router.push({ name: 'myOrder' })
            },
            getByOid(){
                Indicator.open();
                this.api.getB({
                    url: 'customerOrder/getOrderDetail',
                    params: {
                        id: this.$route.query.oid
                    },
                    user: true
                }).then(res=>{
                    Indicator.close();
                    if(res.successed){
                        this.productDetail = res.returnValue;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./buySuccess"
</style>