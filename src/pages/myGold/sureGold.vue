<template>
    <div id="sureGold" class="wrapper">
        <div class="item pd20 flex">
            <div class="left">
                <img :src="item.image" alt="">
            </div>
            <div class="middle">
                <p class="mb width100 ellipsis">{{item.productName}}</p>
                <p class="colorRed">{{item.costGoldQuantity}} 克</p>
            </div>
        </div>
        <div class="sendType mb" @click="selectAddr">
            <div class="one flex flex-hlr">
                <div class="defaultFont color333">
                    配送方式
                </div>
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
            <div class="jiantou flex-zhong">
                <img src="../../assets/img/addr/triangle.png" alt="">
            </div>
        </div>
        <div class="bottomTab">
            <div class="bottomTabIn flex-zhong">
                <div class="buy flex-zhong" @click="getGold">
                    确定提取
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
            defaultMessage: {
                consignee: ''
            },
            item: {}
        }
    },
    created () {
        if (this.$route.query.addrId) {
            this.getById();
        } else {
            this.getDefault();
        };
        this.getDetailById();
    },
    mounted () {
        
    },
    methods: {
        getGold(){
            MessageBox.confirm('确定提取？').then(action => {
                Indicator.open();
                this.api.postB({
                    url: 'customerGoldFinance/pickUp',
                    params: {
                        goldProductId: this.$route.query.id,
                        deliveryAddressId: this.defaultMessage.id,
                        orderCount: 1
                    },
                    user: true
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        MessageBox.alert('黄金将由商城合作的黄金厂家生产并发货，预计3-5工作日内发出，请留意黄金厂家发货的物流信息，如有疑问请联系客服。', '提取成功！').then(()=>{
                            this.$router.replace({
                                name: 'getGold'
                            })
                        });
                    }
                })
            });
        },
        selectAddr() {
            this.$router.push({
                name: 'receiveAddress',
                query: {
                    id: this.$route.query.id,
                    isSelect: 1,
                    from: 'gold'
                }
            })
        },
        getDetailById(){
            Indicator.open();
            this.api.getB({
                url: 'customerGoldFinance/getGoldProductDetail',
                params: {
                    id: this.$route.query.id
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.item = res.returnValue;
                }
            }).catch(() => {

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
                if (res.successed && res.returnValue) {
                    this.defaultMessage = res.returnValue;
                }
            })
        },
        getMyInfo() {
            this.api.getB({
                url: 'customer/getByToken',
                user: true
            }).then(res => {
                if (res.successed) {
                    this.userInfo = res.returnValue;
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #sureGold{
        .item{
            position: relative;
            background: #fff;
            margin-bottom: 5px;
            .left{
                margin-right: st(30);
                width: st(150);
                height: st(150);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .middle{
                width: st(400);
                .colorRed{
                    padding: st(20);
                    border: 1px solid yellowgreen;
                    border-radius: st(20);
                    text-align: center
                }
            }
            .right{
                position: absolute;
                top: 0;
                right: 0;
                width: st(150);
                height: 100%;
                img{
                    width: st(48);
                    height: st(48);
                }
            }
        }
        .sendType {
            position: relative;
            padding: 0 st(20);
            width: 100%;
            background: #fff;
            .one {
                padding-top: st(20);
                padding-bottom: st(20);
                border-bottom: 1px solid #ccc;
            }
            .two {
                padding-top: st(20);
                padding-bottom: st(20);
                padding-right: st(50);
            }
            .three {
                padding-top: st(20);
                padding-bottom: st(20);
                padding-right: st(50);
            }
            .jiantou {
                position: absolute;
                right: st(20);
                top: st(80);
                width: st(40);
                height: st(160);
                line-height: st(120);
                text-align: center;
                img{
                    width: st(28);
                }
            }
        }
        .bottomTabIn{
            padding: st(20);
            .buy{
                width: st(600);
                height: st(80);
                background: #ff0000;
                color: #fff;
                border-radius: st(80);
            }
        }
    }
</style>
