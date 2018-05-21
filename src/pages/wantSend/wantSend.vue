<template>
    <div id="wantSend" class="wrapper">
        <div class="content">
            <ul class="sendOrder">
                <li class="flex" @click="selectAddr">
                    <div class="main">
                        <p class="top">
                            <span class="send-state">收件地址</span>
                        </p>
                        <p class="prize-name">
                            <span>{{defaultAddr.consignee}}</span>
                            <span>{{defaultAddr.mobile}}</span>
                        </p>
                        <p class="prize-num">
                            <span>{{defaultAddr.province}}{{defaultAddr.city}}{{defaultAddr.region}}</span>
                            &nbsp;
                            <span>{{defaultAddr.address}}</span>
                        </p>
                    </div>
                    <div class="right flex-zhong">
                        <img src="../../assets/img/addr/triangle.png" alt="">
                    </div>
                </li>
                <li class="flex">
                    <div class="main">
                        <p class="top">
                            <span class="send-state">商品信息</span>
                        </p>
                        <p class="prize-name">
                            <span>{{orderMessage[0].product.productName}}</span>
                        </p>
                        <p class="prize-num" v-if="orderMessage.length > 1">
                            <span>等{{orderMessage.length}}件</span>
                            <span>奖品</span>
                        </p>
                        <div class="prize-img">
                            <img v-for="item of orderMessage" :src="item.product.productPictureUrl" alt="" />
                        </div>
                    </div>
                </li>
                <li class="flex third">
                    <div class="main">
                        <p class="top">
                            <span>快递费</span>
                        </p>
                        <p class="prize-name">
                            <span>{{freight.freight}} {{freight.coinName}}</span>
                        </p>
                    </div>
                </li>
            </ul>
            <shade v-if="duihuanAlert==1">
                <div class="duihuan-alert">
                    <p>
                        您的哇币不足，请先充值
                    </p>
                    <div class="buttons flex flex-hc">
                        <button class="no" @click="duihuan()">取消</button>
                        <button class="yes" @click="duihuan()">确定</button>
                    </div>
                </div>
            </shade>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="sendAdd">申请提货</button>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    export default {
        data() {
            return {
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                appKey: this.User.getAppKey(),
                duihuanAlert: 2,//
                defaultAddr: '',//收货地址
                delivery: '',//地址id
                orderMessage: this.Storage.getItemJson('send'),//奖品信息
                freight: '',//运费
            }
        },
        watch: {
            "$route": function (to, from) {
                if (this.$route.query.addrid) {
                    this.getAddrById();
                } else {
                    this.getDefaultAddr();
                }
            }
        },
        methods: {
            save() {
                this.duihuanAlert = 1;
            },
            duihuan() {
                this.duihuanAlert = 2;
            },
            selectAddr() {
                this.$router.push({ path: '/my/receiveAddress', query: { isSelect: 1 } })
            },
            //获取默认地址
            getDefaultAddr() {
                Indicator.open();
                this.api.getB({
                    url: 'deliveryAddress/getDefault',
                    params: {
                        userId: this.userId
                    },
                    headers: {
                        token: this.token
                    },
                }).then(res => {
                    Indicator.close();
                    if (res.data.successed) {
                        if (res.data.returnValue) {
                            this.defaultAddr = res.data.returnValue;
                            this.delivery = {
                                deliveryId: res.data.returnValue.id
                            }
                            this.getFreight({ deliveryId: res.data.returnValue.id })
                        }
                    }
                })
            },
            //根据id获取地址详情
            getAddrById() {
                Indicator.open();
                this.api.getB({
                    url: 'deliveryAddress/getById',
                    params: {
                        userId: this.userId,
                        id: this.$route.query.addrid
                    },
                    headers: {
                        token: this.token
                    }
                }).then(res => {
                    Indicator.close();
                    if (res.data.successed) {
                        this.defaultAddr = res.data.returnValue;
                        this.delivery = {
                            deliveryId: this.$route.query.addrid
                        }
                        this.getFreight({ deliveryId: this.$route.query.addrid });
                    }
                }).catch(() => {
                    Indicator.close();
                })
            },
            //获取运费
            getFreight(addid) {
                let aa = {
                    awardList: this.Util.jm(this.orderMessage),
                    delivery: addid,
                }
                this.api.postB({
                    url: 'deliverOrder/getFreight',
                    params: {
                        userId: this.userId,
                        deliverOrder: JSON.stringify(aa)
                    },
                    headers: {
                        appKey: this.appKey,
                        token: this.token
                    }
                }).then(res => {
                    if (res.data.successed) {
                        this.freight = res.data.returnValue;
                    }
                }).catch(() => {

                })
            },
            //申请发货
            sendAdd(addid) {
                if (this.delivery.length < 1) {
                    this.Util.myAlert('请选择收货地址');
                    return;
                };
                let aa = {
                    awardList: this.Util.jm(this.orderMessage),
                    delivery: {
                        deliveryId: this.delivery.deliveryId
                    }
                };
                this.api.postB({
                    url: 'deliverOrder/applyDelivery',
                    params: {
                        userId: this.userId,
                        deliverOrder: JSON.stringify(aa)
                    },
                    headers: {
                        token: this.token
                    }
                }).then(res => {
                    if (res.data.successed) {
                        this.Util.myAlert('申请成功！');
                        this.$router.replace({ path: '/my/myPrize' });
                    }
                }).catch(() => {

                })
            },
        },
        created() {
            if (this.$route.query.addrid) {
                this.getAddrById();
            } else {
                this.getDefaultAddr();
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "./wantSend";
</style>