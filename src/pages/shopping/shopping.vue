<template>
    <div id="shopping" class="wrapper">
        <tabbars-v class="tab" v-on:clickThis="isThis" :names = 'tabList' v-if="tabList.length > 0"></tabbars-v>
        <div class="qipao">
            <qipao></qipao>
        </div>
        <div class="rooms page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading"
                infinite-scroll-distance="60">
                <template v-for="(item,index) of listHandle">
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
    import tabbars from './tabbars.vue'; //引入选项卡组件
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                tabList: [],
                classList: [],
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
                productClassId: ''

            };
        },
        computed: {
            listHandle() {
                let _list = this.Util.jm(this.list);
                console.log(_list)
                if (_list.length > 0 && _list[0].upProductId) {
                    return _list;
                };
                let len = Math.ceil(_list.length / 2);
                let _list1 = [];
                for (let i = 0; i < len; i++) {
                    let _item = [];
                    _item.push(_list[i * 2]);
                    if (_list[i * 2 + 1]) {
                        _item.push(_list[i * 2 + 1]);
                    };
                    _list1.push(_item);
                };
                return _list1;
            }

        },
        components: {
            "tabbars-v": tabbars,
            'qipao': qipao,
            'shoppingItem': shoppingItem
        },
        created() {
            this.getTabList();
        },
        methods: {
            isThis(index) {
                if (this.productClassId != this.classList[index].id) {
                    this.productClassId = this.classList[index].id;
                    this.pageNum = 1;
                    this.list = [];
                    this.loading = false;
                    this.getList();
                }
            },
            // 获取商品分类
            getTabList() {
                this.api.getB({
                    url: 'productClass/getList '
                }).then((res) => {
                    if (res.successed) {
                        let _tabList = [];
                        res.returnValue.forEach(element => {
                            _tabList.push(element.productClassName)
                        });
                        this.classList = res.returnValue;
                        this.tabList = _tabList;
                        this.productClassId = res.returnValue[0].id;
                        this.loading = false;
                    } else {
                        this.Util.myAlert('获取分类列表失败，请稍后重试');
                    };
                }).catch(() => {
                    Indicator.close()
                })
            },
            // 获取列表
            getList() {
                let _productClassId = this.productClassId;
                let pageNum = this.pageNum;
                this.loading = true;
                let _params = {};
                _params = {
                    pageNum: this.pageNum,
                    pageSize: 6,
                    productClassId: this.productClassId
                };

                this.api.getB({
                    url: 'product/getPageList',
                    params: _params,
                }).then((res) => {
                    Indicator.close()
                    if (res.successed) {
                        let _res = res.returnValue.list;

                        if (_productClassId == this.productClassId) {
                            if(_res.length == 0){
                                this.noMore = true;
                            }else{
                                let len = this.list.filter(v => {
                                    return _res[0].id == v.id
                                }).length;
                                
                                if(len == 0){
                                    this.list.push(..._res);
                                    if (_res.length < 6) {
                                        this.noMore = true;
                                    } else {
                                        this.pageNum++;
                                        this.loading = false;
                                    };
                                }
                            }
                        }
                    } else {
                        this.Util.myAlert('获取列表失败，请稍后重试');
                    };
                }).catch((err) => {
                    console.log(err)
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