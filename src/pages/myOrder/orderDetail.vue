<template>
    <div id="orderDetail" class="wrapper">
        <div class="payState width100 pd20 largeFont">
            交易状态：{{productDetail.orderState | stateHandle}}
        </div>
        <div class="peopleMessage bg1 pd20 mb">
            <div class="one flex flex-hlr mb color333">
                <p>收货人：{{productDetail.deliveryAddress.consignee}}</p>
                <p>{{productDetail.deliveryAddress.mobile}}</p>
            </div>
            <div class="one color333">
                收货地址：
                {{productDetail.deliveryAddress.province}}
                {{productDetail.deliveryAddress.city}}
                {{productDetail.deliveryAddress.region}}
                {{productDetail.deliveryAddress.address}}
            </div>
        </div>
        .
        <div class="top flex mb pd20 bg1">
            <div class="img">
                <img :src="productDetail.productImage" alt="">
            </div>
            <div class="name width100">
                {{productDetail.productName}}
            </div>
            <div class="state">
                <p class="mb colorRed">￥{{productDetail.productPrice}}</p>
                <p>x 1</p>
            </div>
        </div>

        <div class="payMessage pd20 bg1 mb">
            <div class="mb flex flex-hlr">
                <p> 商品总价 </p>
                <p> ￥{{productDetail.orderCount*productDetail.productPrice}} </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 运费(快递) </p>
                <p> ￥{{productDetail.freightAmount}} </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 订单总价 </p>
                <p> ￥{{productDetail.orderAmount}} </p>
            </div>
            <div class="mb flex flex-hlr">
                <p> 实际付款 </p>
                <p> ￥{{productDetail.payAmount}} </p>
            </div>
        </div>

        <div class="orderMessage pd20 bg1 width100">
            <p class="mb" v-if="productDetail.oid"> 订单号：{{productDetail.oid}}</p>
            <p class="mb" v-if="productDetail.created"> 创建时间：{{productDetail.created}}</p>
            <p class="mb" v-if="productDetail.payTime"> 支付时间：{{productDetail.payTime}}</p>
            <p class="mb" v-if="productDetail.deliveryTime"> 发货时间：{{productDetail.deliveryTime}}</p>
            <p class="mb" v-if="productDetail.upgradeTime"> 升级时间：{{productDetail.upgradeTime}}</p>
            <p class="mb" v-if="productDetail.refundTime"> 退款时间：{{productDetail.refundTime}}</p>
        </div>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                productDetail: {
                    deliveryAddress: {

                    }
                }
            }
        },
        filters: {
            stateHandle(val) {
                let _val = '';
                console.log(_val)
                switch (val) {
                    case 0:
                        _val = '待付款';
                        break;
                    case 1:
                        _val = '待提货';
                        break;
                    case 2:
                        _val = '待发货';
                        break;
                    case 3:
                        _val = '已发货';
                        break;
                    case 4:
                        _val = '已收货';
                        break;
                    case 5:
                        _val = '等待退款';
                    case 6:
                        _val = '已退款';
                    case 7:
                        _val = '交易成功';
                    case 7:
                        _val = '交易关闭';
                        break;

                    default:
                        break;
                };
                return _val
            }
        },
        created() {
            this.getByOid()
        },
        methods: {
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
    @import './orderDetail'
</style>