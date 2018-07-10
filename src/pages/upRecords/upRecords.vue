<template>
    <div id="upRecords" class="wrapper">
        <div class="lists width100 page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="list width100 page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading"
                infinite-scroll-distance="60">
                <li class="row flex tit">
                    <div class="one">
                        参与时间
                    </div>  
                    <div class="two">
                        订单数量
                    </div>
                    <div class="three">
                        商品名称
                    </div>
                    <div class="four">
                        状态
                    </div>
                </li>
                <li class="row flex" v-for="item of list">
                    <div class="one">
                        {{item.gameTime}}
                    </div>
                    <div class="two">
                        {{item.orderCount}}
                    </div>
                    <div class="three">
                        {{item.productName}}
                    </div>
                    <div class="four">
                        {{item.gameState == 2?'成功':item.gameState==1?'参与中':'失败'}}
                    </div>
                </li>
            </ul>
        </div>
        <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
        <p class="noMore" v-show="noMore">没有更多数据了</p>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                list: [],
                loading: false, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
            }
        },
        created() {

        },
        methods: {
            // 获取列表
            getList() {
                this.loading = true;
                this.api.getBn({
                    url: 'customerOrder/getGameOrderList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 6,
                    },
                    user: true
                }).then((res) => {
                    if (res.successed) {
                        this.list.push(...res.returnValue.list);
                        if (res.returnValue.list.length < 6) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    } else {
                        this.Util.myAlert('获取列表失败，请稍后重试');
                    };
                }).catch(() => {
                    Indicator.close()
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import './upRecords'
</style>