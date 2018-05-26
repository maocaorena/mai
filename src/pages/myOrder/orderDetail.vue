<template>
    <div id="orderDetail" class="wrapper">
        <div class="payState width100 pd20 largeFont">
            交易状态：已支付
        </div>
        <div class="peopleMessage bg1 pd20 mb">
            <div class="one flex flex-hlr mb color333">
                <p>收货人：老王</p>
                <p>12345678901</p>
            </div>
            <div class="one color333">
                收货地址：浙江省杭州市西湖区文一西路999号 西溪大厦 2号楼1801
            </div>
        </div>
        .
        <div class="top flex mb pd20 bg1">
            <div class="img">
                <img src="../../assets/img/productDetail/1.png" alt="">
            </div>
            <div class="name width100">
                红糖酥饼
            </div>
            <div class="state">
                <p class="mb colorRed">￥1000.00</p>
                <p>x 1</p>
            </div>
        </div>

        <div class="payMessage pd20 bg1 mb">
            <div class="mb flex flex-hlr">
                <p> 商品总价 </p>
                <p> ￥1000.00 </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 运费(快递) </p>
                <p> ￥1000.00 </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 订单总价 </p>
                <p> ￥1000.00 </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 实际付款 </p>
                <p> ￥1000.00 </p>
            </div>
        </div>

        <div class="orderMessage pd20 bg1 width100">
            <p class="mb"> 订单号：20180101333666888</p>
            <p class="mb"> 创建时间：2018-01-01 11:22:33</p>
            <p class="mb"> 支付时间：2018-01-01 11:22:33</p>
            <p class="mb"> 提货时间：2018-01-01 11:22:33</p>
            <p class="mb"> 升级时间：2018-01-01 11:22:33</p>
            <p class="mb"> 退款时间：2018-01-01 11:22:33</p>
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

        }
    }
</script>

<style lang="scss" scoped>
    @import './orderDetail'
</style>