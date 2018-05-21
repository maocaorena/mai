<template>
    <div id="myPrize" class="wrapper" :data="loginstate">
        <div class="myPrize-top">
            <tabbars-v v-on:clickThis="isThis" :names='["奖品记录","发货订单"]' :initTab="0"></tabbars-v>
        </div>
        <!-- 奖品记录 -->
        <div class="content">
            <p class="prize-tip color1">
                奖品寄存时间为抓取成功之后的5天，如果5天后未申请发货，您将失去该奖品
            </p>
            <ul class="prizeRecords page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                <li class="flex page-infinite-listitem" v-for="(item,index) of list" :class="{'selectThis': selectList.indexOf(item.id)>-1}">
                    <div class="left">
                        <div class="left-in">
                            <img :src="item.product.productPictureUrl" alt="" />
                            <p class="prize-date">
                                {{item.awardGainTime | formateTime}}
                            </p>
                        </div>
                    </div>

                    <div class="middle">
                        <p class="top">{{item.product.productName}}</p>

                        <template v-if="item.awardDeliverState == 0&&item.awardDeliverAble">
                            <p class="mp-row color1">申请发货剩余时间: {{item.awardDeliverExpireTimeStr}}</p>
                        </template>

                        <template v-else-if="item.awardDeliverState == -1">
                            <p class="mp-row color1">已签收: 请到发货订单中查看</p>
                            <p class="mp-row color1">{{item.awardDeliverTime}}</p>
                        </template>

                        <template v-else-if="!item.awardDeliverAble && item.awardDeliverState == 0 && item.awardDeliverTime">
                            <p class="mp-row color1">待发货</p>
                        </template>

                        <template v-else-if="item.awardDeliverState == 1">
                            <p class="mp-row color1">已发货，请到发货订单中查看</p>
                            <p class="mp-row color1">{{item.awardDeliverTime}}</p>
                        </template>

                        <template v-else-if="parseFloat(item.awardDeliverExpireTime)<=0">
                            <p class="mp-row color1">超出申请发货时间</p>
                        </template>
                        <p class="mp-row color1">奖品ID: {{item.awardId}}</p>
                    </div>

                    <div class="right" @click="slectThis(index,item)" v-show="item.awardDeliverAble">
                        <transition name="fade">
                            <img v-show="selectList.indexOf(index)>-1" src="../../assets/img/myprize/choice_2.png" alt="" />
                        </transition>
                        <transition name="fade">
                            <img v-show="selectList.indexOf(index)<0" src="../../assets/img/myprize/choice_1.png" alt="" />
                        </transition>
                    </div>
                </li>
            </ul>
            <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
            <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
            <div v-if="list.length < 1 && noMore" class="defaultImg">
                <img src="../../assets/img/default/default2.png" alt="" />
                <p>
                    你还没有奖品记录，前去抓娃娃吧~
                </p>
            </div>
        </div>
        <div class="prizeRecords-bottom flex-zhong bottom-bar">
            <button class="prizeRecords-bottom-btn fahuo" @click="fahuo">申请发货</button>
        </div>
        <!--兑换哇币-->
        <shade v-if="duihuanAlert==1">
            <div class="duihuan-alert">
                <p>
                    该娃娃可兑换：
                    <span>350.00</span>哇币，是否兑换？
                </p>
                <div class="buttons flex flex-hc">
                    <button class="no" @click="duihuan(2)">我在想想</button>
                    <button class="yes" @click="duihuan(2)">确定</button>
                </div>
            </div>
        </shade>
    </div>
</template>

<script>
    import tabbars from '../../components/tabbars.vue';
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                duihuanAlert: false,
                selectList: [],
                list: [],
                loading: true,//控制加载，true会停止加载
                noMore: false,//没有更多
                pageNum: 1,
                productType: 0
            }
        },
        watch:{
            'selectList': function(val){
                if(val.length == 0){
                    this.productType = 0;
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
            formateTime(val) {
                return val.split('-')[0] + '月' + val.split('-')[1] + '日'
            }
        },
        components: {
            'tabbars-v': tabbars
        },
        methods: {
            //获取奖品记录列表
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'awards/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 6,
                        userId: this.userId,
                    },
                    headers: {
                        token: this.token
                    }
                }, '获取列表失败，请稍后重试').then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 6) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    };
                })
            },
            isThis(nn) {
                if (nn == 1) {
                    this.$router.replace({ path: "/my/send" })
                }
            },
            slectThis(idxx, item) {
                if(this.productType != item.product.productType && this.productType != 0){
                    this.Util.myAlert('虚拟商品和实物商品不能同时发货')
                }else{
                    this.productType = item.product.productType;
                    let idx = this.selectList.indexOf(idxx);
                    if (idx > -1) {
                        this.selectList.splice(idx, 1)
                    } else {
                        this.selectList.push(idxx)
                    }
                }
            },
            fahuo() {
                if (this.selectList.length < 1) {
                    this.Util.myAlert('请选择要发货的商品')
                } else {
                    let productList = [];
                    let nn = this.selectList.length;
                    for (let dd = 0; dd < nn; dd++) {
                        productList[dd] = {};
                        productList[dd].product = {};
                        productList[dd].awardId = this.list[this.selectList[dd]].awardId;
                        productList[dd].productType = this.list[this.selectList[dd]].product.productType;
                        productList[dd].product.productId = this.list[this.selectList[dd]].product.productId;
                        productList[dd].product.productName = this.list[this.selectList[dd]].product.productName;
                        productList[dd].product.productPictureUrl = this.list[this.selectList[dd]].product.productPictureUrl;
                    };
                    this.Storage.setItem('send', productList)
                    this.$router.push({ path: '/my/myPrize/wantSend' })
                }
            }
        },
        created() {
        },
        mounted() { }
    };
</script>

<style lang="scss" scoped>
    @import "./myPrize";
</style>