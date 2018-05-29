<template>
    <div id="rechargeRechords" class="wrapper">
        <ul class="rechargeRechords-list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
            <li class="rechargeRechords-item flex page-infinite-listitem" v-for="(item,index) of list" @click="showVideo(item.gameVideoUrl,item.productPictureUrl)">
                <div class="left">
                    <p class="colors2 mb">{{item.streamType | payChannelHandle}}成功</p>
                    <p class="colors2">{{item.created}}</p>
                </div>
                <div class="right">
                    <p :class="'colors'+item.streamType" class="mb">{{item.amount}}</p>
                    <p class="colors2" >余额：{{item.balance}}</p>
                </div>
            </li>
        </ul>
        <p class="noMore flex-zhong" v-show="!noMore">
            <mt-spinner type="snake"></mt-spinner>
        </p>
        <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
        <div v-if="list.length < 1 && noMore" class="defaultImg">
            <p class="tc width100 pd20">
                您还没有记录
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userId: this.User.getUserId(),
                token: this.User.getToken(),
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
            }
        },
        filters: {
            payChannelHandle: function (val) {
                let _val = '';
                switch (val) {
                    case 0:
                        _val = '充值'
                        break;
                    case 1:
                        _val = '提现'
                        break;
                    case 2:
                        _val = '购买'
                        break;
                    case 3:
                        _val = '升级'
                        break;
                    case 4:
                        _val = '运费'
                        break;
                    case 5:
                        _val = '退款'
                        break;
                    default:
                        break;
                }
                return _val
            }
        },
        created(){
             this.loading = false;
        },
        methods: {
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'customerFinance/getPageList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 10,
                        customerId: this.userId,
                    },
                    headers: {
                        token: this.token
                    }
                }).then((res) => {
                    let _res = res;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 10) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    }
                }).catch(err=>{
                    this.noMore = true;
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./rechargeRecords";
</style>
