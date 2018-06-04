<template>
    <div id="buySuccess" class="wrapper">

        <h1 class="titile colorRed mb" v-if="productDetail.upProductId">恭喜您获得商品免费升级福利！</h1>
        <h1 class="titile colorRed mb" v-if="!productDetail.upProductId">购买成功！</h1>
    
        <p class="productTit color333 defaultStyle">当前商品</p>
        <div class="product defaultStyle flex mb">
            <div class="left">
                <img :src="productDetail.productImage" />
            </div>
            <div class="right">
                <div class="top color333">
                    {{productDetail.productName}}
                </div>
                <div class="bottom flex flex-hlr flex-sc">
                    <p class="smallFont">￥{{productDetail.productPrice}}</p>
                    <p class="color333">× {{productDetail.orderCount}}</p>
                </div>
            </div>
        </div>
        <template v-if="productDetail.upProductId">
            <p class="productTit defaultStyle colorRed defaultFont">升级后</p>
            <div class="product defaultStyle flex mb">
                <div class="left">
                    <img :src="productDetail.upProductImage" />
                </div>
                <div class="right">
                    <div class="top color333">
                        {{productDetail.upProductName}}
                    </div>
                    <div class="bottom flex flex-hlr flex-sc">
                        <p class="colorRed defaultFont">￥{{productDetail.upProductPrice}}</p>
                        <p class="color333">× {{num}}</p>
                    </div>
                </div>
            </div>
        </template>

        <div class="upLev defaultStyle flex flex-hsb mb">
            <div class="upLevItem flex flex-s flex-sc"  @click="upLev" v-if="productDetail.upProductId">
                <img :src="productDetail.productImage" />
                <p class="color2 largeFont">
                    立即升级
                </p>
            </div>
            <div class="upLevItem flex flex-s flex-sc"  @click="sendProd()">
                <img :src="productDetail.upProductImage" />
                <p class="color2 largeFont">
                    直接提货
                </p>
            </div>
        </div>
        
        <div class="tip defaultStyle colorRed smallFont" v-if="productDetail.upProductId">
            注意：如升级失败，已购商品不可退货。请注意升级风险。
        </div>

        <div class="bottons defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p @click="goOrder">
                查看订单>
            </p>
        </div>
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
                }
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
            upLev() {
                this.$router.push({
                    name: 'redLight'
                })
            },
            sendProd() {
                MessageBox.confirm('选择提货后本次商品不可再参加升级活动！确定要提货吗？').then(action => {
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
                        name: 'sendResult',
                        query: {
                            oid: this.$route.query.oid
                        }
                    })
                });
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