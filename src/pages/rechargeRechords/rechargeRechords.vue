<template>
    <div id="rechargeRechords" class="wrapper" :data="loginstate">
        <ul class="rechargeRechords-list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
            <li class="rechargeRechords-item flex page-infinite-listitem" v-for="(item,index) of list" @click="showVideo(item.gameVideoUrl,item.productPictureUrl)">
                <div class="left">
                    <p :class="{color22:item.state == 1,color11:item.state == 0}" v-if="item.welfareCardName.length > 0">{{item.welfareCardName}}</p>
                    <p :class="{color22:item.state == 1,color11:item.state == 0}" v-if="item.welfareCardName.length === 0">+{{item.wabi}}{{item.coinName}}</p>
                    <p :class="{color22:item.state == 1,color11:item.state == 0}">{{item.created}}</p>
                </div>
                <div class="right">
                    <p :class="{color22:item.state == 1,color11:item.state == 0}">￥{{item.amount}}</p>
                    <p :class="{color22:item.state == 1,color11:item.state == 0}">{{item.payChannel | payChannelHandle}}支付{{item.state === 0?'失败':'成功'}}</p>
                </div>
            </li>
        </ul>
        <p class="noMore flex-zhong" v-show="!noMore">
            <mt-spinner type="snake"></mt-spinner>
        </p>
        <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
        <div v-if="list.length < 1 && noMore" class="defaultImg">
            <img src="../../assets/img/default/default4.png" alt="" />
            <p>
                您还没有充值记录，去充值吧~
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
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
            payChannelHandle: function (val) {
                let _val = '';
                switch (val) {
                    case 1:
                        _val = '支付宝'
                        break;
                    case 2:
                        _val = '微信'
                        break;
                    default:
                        break;
                }
                return _val
            }
        },
        methods: {
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'recharge/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 10,
                        userId: this.userId,
                    },
                    headers: {
                        appKey: this.User.getAppKey(),
                        token: this.token
                    }
                }).then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 10) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./rechargeRechords";
</style>