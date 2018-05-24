<template>
    <div id="buySuccess" class="wrapper">
        <template v-if="sendState === 1">
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
        </template>

        <template v-if="sendState === 2">
            <h1 class="titile colorRed">提货成功！</h1>
            <p class="flex-zhong defaultStyle tip1">我们会尽快为您购买的商品发货，请注意查收！</p>
        </template>

        <div class="bottons defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p>
                查看订单>
            </p>
        </div>
        <template v-if="sendState === 2">
            <p class="productTit color333 defaultStyle">看看其他商品</p>
            <ul class="list">
                <li v-for="(item, index) of 5" class="item" :class="{'mr0':index%2 === 1}">
                    <shoppingItem> </shoppingItem>
                </li>
                <li class="clear"></li>
            </ul>
        </template>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import shoppingItem from '../shopping/shoppingItem.vue'
    export default {
        data() {
            return {
                num: 10,
                sendState: 1
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
            upLev(){

            },
            sendProd(){
                MessageBox.confirm('选择提货后本次商品不可再参加升级活动！确定要提货吗？').then(action => {
                    this.sendState = 2;
                });
            },
            close(){
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