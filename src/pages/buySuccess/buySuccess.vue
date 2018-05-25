<template>
    <div id="buySuccess" class="wrapper">
        <h1 class="titile colorRed">恭喜您获得商品免费升级福利！</h1>
    
        <p class="productTit color333 defaultStyle">当前商品</p>
        <div class="product defaultStyle flex mb">
            <div class="left">
                <img src="../../assets/img/productDetail/1.png" />
            </div>
            <div class="right">
                <div class="top color333">
                    商品名称商品名称商品名称商品名称商品名称商品名称
                </div>
                <div class="bottom flex flex-hlr flex-sc">
                    <p class="smallFont">￥333</p>
                    <p class="color333">× {{num}}</p>
                </div>
            </div>
        </div>

        <p class="productTit defaultStyle colorRed defaultFont">升级后</p>
        <div class="product defaultStyle flex mb">
            <div class="left">
                <img src="../../assets/img/productDetail/1.png" />
            </div>
            <div class="right">
                <div class="top color333">
                    商品名称商品名称商品名称商品名称商品名称商品名称
                </div>
                <div class="bottom flex flex-hlr flex-sc">
                    <p class="colorRed defaultFont">￥333</p>
                    <p class="color333">× {{num}}</p>
                </div>
            </div>
        </div>

        <div class="upLev defaultStyle flex flex-hsb mb">
            <div class="upLevItem flex flex-s flex-sc"  @click="upLev">
                <img src="../../assets/img/productDetail/1.png" />
                <p class="color2 largeFont">
                    立即升级
                </p>
            </div>
            <div class="upLevItem flex flex-s flex-sc"  @click="sendProd()">
                <img src="../../assets/img/productDetail/1.png" />
                <p class="color2 largeFont">
                    直接提货
                </p>
            </div>
        </div>
        
        <div class="tip defaultStyle colorRed smallFont">
            注意：如升级失败，已购商品不可退货。请注意升级风险。
        </div>

        <div class="bottons defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p>
                查看订单>
            </p>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import shoppingItem from '../shopping/shoppingItem.vue'
    export default {
        data() {
            return {
                num: 10,
            }
        },
        components: {
            'shoppingItem': shoppingItem
        },
        created() {

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
                    this.$router.push({
                        name: 'sendResult'
                    })
                });
            },
            close() {
                this.alertState = 0;
            },
            goHome() {
                this.$router.push({ name: 'home' })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./buySuccess"
</style>