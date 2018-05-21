<template>
    <div id="myPrize" class="wrapper" :data="loginstate">
        <div class="myPrize-top">
            <tabbars-v v-on:clickThis="isThis" :names='["奖品记录","发货订单"]' :initTab="1"></tabbars-v>
        </div>
        <div class="content" style="bottom: 0;">
            <ul class="sendOrder page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                <li class="flex page-infinite-listitem" v-for="(item,index) of list">
                    <div class="dian">
                        <span></span>
                    </div>
                    <div class="main">
                        <p class="top">
                            <span class="send-state">{{item.orderState | sendState}}</span>
                            <span class="order-num">订单号 {{item.orderId}}</span>
                        </p>
                        <p class="prize-name ellipsis">
                            {{item.awardList[0].product.productName}}
                        </p>
                        <p class="prize-num">
                            等{{item.awardList.length}}件 奖品
                        </p>
                        <p class="prize-num">
                            申请发货时间：{{item.orderPlaceDate | formateDate}}
                        </p>
                        <div class="prize-img">
                            <img v-for="item1 of item.awardList" :src="item1.product.productPictureUrl" alt="" />
                        </div>
                        <button class="look-car color1" v-if="item.orderState!=0" @click="openWuliu(item.orderTrackingNo,item.orderTrackingCode)">查看物流信息</button>
                    </div>
                </li>
            </ul>
            <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
            <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
            <div v-if="list.length < 1 && noMore" class="defaultImg">
                <img src="../../assets/img/default/default6.png" alt="" />
                <p>
                    您还没有发货订单，前去抓娃娃吧~
                </p>
            </div>
        </div>
        <!--物流信息-->
        <MessageBox v-if="wuliuAlert" :tit="'物流信息'" :remark="orderTrackingNo" v-on:close="wuliuclose">
            <div class="wuliu-message">
                <div class="wuliu-message-in">
                    <div v-if="wuliuMessage.length>0" class="wuliu-progress" :class="{'last-progress':index==0,'first-progress':index == wuliuMessage.length-1}"
                        v-for="(item,index) of wuliuMessage">
                        <span class="progress-dian" :class="{'progress-dian-blue':index==0}"></span>
                        <span class="progress-message lineOne">{{item.acceptStation}}
                            <br />
                        </span>
                        <span class="progress-message lineTwo">{{item.acceptTime}}</span>
                    </div>
                    <div v-if="wuliuMessage.length==0" class="wuliu-progress first-progress">
                        <span class="progress-dian"></span>
                        <span class="progress-message lineOne">暂无物流信息
                            <br />
                        </span>
                    </div>
                </div>
            </div>
        </MessageBox>
    </div>
</template>

<script>
    import tabbars from '../../components/tabbars.vue';
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import { Toast } from 'mint-ui';
    import { Util } from '../../assets/js/util.js';
    export default {
        data() {
            return {
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                wuliuAlert: false,
                list: [],
                loading: true,//控制加载，true会停止加载
                noMore: false,//没有更多
                pageNum: 1,
                wuliuMessage: [],
                orderTrackingNo: {
                    num: '',
                    txt: ''
                }
            }
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {
                    this.loading = false;
                };
                return this.$store.getters.loginstate;
            }
        },
        filters: {
            formateDate(val) {
                val = Util.dateTime(parseFloat(val))
                return val
            },
            formateTime(val) {
                return val.split('-')[0] + '月' + val.split('-')[1] + '日'
            },
            sendState(val) {
                let kk = '';
                switch (val) {
                    case 0:
                        kk = '待发货';
                        break;
                    case 1:
                        kk = '已发货';
                        break;
                    case -1:
                        kk = '已签收';
                        break;
                    default:
                        break;
                }
                return kk;
            }
        },
        components: {
            'tabbars-v': tabbars
        },
        methods: {
            //获取发货订单列表
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'deliverOrder/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 6,
                        userId: this.userId,
                    },
                    headers: {
                        token: this.token
                    }
                }).then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 6) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    }
                })
            },
            openWuliu(orderTrackingNo, orderTrackingCode) {
                Indicator.open();
                this.api.getB({
                    url: 'deliverOrder/getLogistics',
                    params: {
                        userId: this.userId,
                        orderTrackingNo: orderTrackingNo,
                    },
                    headers: {
                        token: this.token
                    }
                }).then((res) => {
                    Indicator.close();
                    let _res = res.data;
                    if (_res.successed) {
                        this.orderTrackingNo = '申通,' + orderTrackingNo;
                        this.wuliuMessage = _res.returnValue;
                        this.wuliuAlert = true;
                    }
                })
            },
            wuliuclose() {
                this.wuliuAlert = false;
                this.wuliuMessage = [];
            },
            isThis(nn) {
                if (nn == 0) {
                    this.$router.replace({ path: "/my/myPrize" })
                }
            },
        },
        created() {

        },
        mounted() { }
    };
</script>

<style lang="scss" scoped>
    @import "./myPrize";
</style>