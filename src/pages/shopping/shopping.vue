<template>
    <div id="shopping" class="wrapper">
        <tabbars-v class="tab" v-on:clickThis="isThis" :names = '["选项1","选项2"]'></tabbars-v>
        <div class="qipao">
            <qipao></qipao>
        </div>
        <div class="rooms page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading"
                infinite-scroll-distance="60">
                <template v-for="(item,index) of list">
                    <shoppingItem :message="item"> </shoppingItem>
                </template>
                <li style="clear: both;"></li>
            </ul>
        </div>
        <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
        <p class="noMore" v-show="noMore">没有更多数据了</p>

    </div>
</template>

<script>
    import qipao from '@/components/qipao/qipao.vue';
    import shoppingItem from './shoppingItem.vue'
    import tabbars from './tabbars.vue';//引入选项卡组件
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                list: [],
                loading: false, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,

            };
        },
        components: {
            "tabbars-v" : tabbars,
            'qipao': qipao,
            'shoppingItem': shoppingItem
        },
        created() {},
        methods: {
            isThis(index){
				console.log("fu",index);
            },
            // 获取列表
            getList() {
                this.loading = true;
                let _params = {};
                _params = {
                    pageNum: this.pageNum,
                    pageSize: 6,
                };

                this.api.getB({
                    url: 'product/getPageList',
                    params: _params,
                }).then((res) => {
                    Indicator.close()
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
            },

        },
        mounted() {}
    };
</script>

<style lang="scss">
    @import "./shopping";
</style>