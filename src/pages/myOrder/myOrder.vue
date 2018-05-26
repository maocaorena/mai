<template>
    <div id="myOrder" class="wrapper">
        <div class="width100 orders page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="width100 orderList">
                <li class="orderItem mb" v-for="item of 3" @click="goDetail(item)">
                    <div class="top flex mb">
                        <div class="img">
                            <img src="../../assets/img/productDetail/1.png" alt="">
                        </div>
                        <div class="name width100">
                            红糖酥饼
                        </div>
                        <div class="state">
                            <p class="mb colorRed">￥1000.00</p>
                            <p>已支付</p>
                        </div>
                    </div>
                    <div class="row flex flex-hlr mb">
                        <p>共1件商品</p>
                        <p>
                            合计:<span class="colorRed">￥1000.00</span>(含运费<span class="colorRed">￥0.00</span>)
                        </p>
                    </div>
                    <p class="mb orderNum">
                        订单号：20180101333666888
                    </p>
                    <p class="mb orderNum">
                        支付时间：2018-01-01 11:22:33
                    </p>
                    <div class="buttons flex flex-hlr">
                        <button>
                            退款
                        </button>
                        <button>
                            提货
                        </button>
                        <button>
                            升级
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        methods: {
            goDetail(item){
                this.$router.push({
                    name: 'orderDetail'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './myOrder'
</style>