<template>
    <div id="buySuccess" class="wrapper">
            <h1 class="titile colorRed" v-if="sendState == 1">提货成功！</h1>
            <p class="flex-zhong defaultStyle tip1" v-if="sendState == 1">我们会尽快为您购买的商品发货，请注意查收！</p>
            <h1 class="titile colorRed" v-if="sendState == 0">提货失败！</h1>
            <p class="flex-zhong defaultStyle tip1" v-if="sendState == 0">{{errCode}}</p>

        <div class="bottons defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p @click="goOrder">
                查看订单>
            </p>
        </div>
        <p class="productTit color333 defaultStyle">看看其他商品</p>
        <ul class="list">
            <template v-for="(item,index) of list">
                <shoppingItem :message="item"> </shoppingItem>
            </template>
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
                sendState: -1,
                errCode: '',
                list: []
            }
        },
        components: {
            'shoppingItem': shoppingItem
        },
        created() {
            this.sendProd();
            this.getList()
        },
        mounted() {

        },
        methods: {
            upLev() {
                this.$router.push({
                    name: 'redLight'
                })
            },
            // 获取列表
            getList() {

                this.api.getB({
                    url: 'product/getListOfRandom'
                }).then((res) => {
                    if (res.successed) {
                        this.list.push(...res.returnValue);
                    } else {

                    };
                })
            },
            sendProd() {
                this.api.putB({
                    url: 'customerOrder/pickUpGoods',
                    user: true,
                    params: {
                        id: this.$route.query.oid
                    }
                }).then(res=>{
                    if(res.successed){
                        this.sendState = 1;
                    }else{
                        this.sendState = 0;
                        this.errCode = res.errorDesc
                    }
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./buySuccess"
</style>