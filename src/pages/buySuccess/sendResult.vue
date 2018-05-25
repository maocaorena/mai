<template>
    <div id="buySuccess" class="wrapper">
            <h1 class="titile colorRed">提货成功！</h1>
            <p class="flex-zhong defaultStyle tip1">我们会尽快为您购买的商品发货，请注意查收！</p>

        <div class="bottons defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p>
                查看订单>
            </p>
        </div>
        <p class="productTit color333 defaultStyle">看看其他商品</p>
        <ul class="list">
            <li v-for="(item, index) of 5" class="item" :class="{'mr0':index%2 === 1}">
                <shoppingItem> </shoppingItem>
            </li>
            <li class="clear"></li>
        </ul>
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
            upLev() {
                this.$router.push({
                    name: 'redLight'
                })
            },
            sendProd() {
                MessageBox.confirm('选择提货后本次商品不可再参加升级活动！确定要提货吗？').then(action => {
                    this.sendState = 2;
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