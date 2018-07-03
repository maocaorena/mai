<template>
    <div id="shopping" class="wrapper">
    	<div class="content" ref="content">
	        <tabbars-v class="tab" :initTab="initTab" v-on:clickThis="isThis" :names='tabList' v-if="tabList.length > 0"></tabbars-v>
	        <div class="qipao" @click="dddd" v-if="!isHide">
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
                productClassId: '',
                initTab: '',
                isHide: this.api.noShowNum().indexOf(this.User.getShareCode()) < 0? false: true,
            };
        },
        computed: {
            tag() {
                return this.$store.getters.tag;
            },
            roomPageNum() {
                return this.$store.getters.roomPageNum;
            },
            roomList() {
                return this.$store.getters.roomList;
            },
            height() {
                return this.$store.getters.height;
            },
            homeListState() {
                return this.$store.getters.homeListState;
            }
        },
        components: {
            "tabbars-v": tabbars,
            'qipao': qipao,
            'shoppingItem': shoppingItem
        },
        created() {
            this.getTabList().then(res=>{
                if (this.roomList.length > 0) {
                    console.log(this.roomList)
                    console.log(this.homeListState.loading)
                   	this.list = this.roomList;
                   	this.pageNum = this.roomPageNum;
                   	this.loading = this.homeListState.loading;
                   	this.noMore = this.homeListState.noMore;
                   	this.productClassId = this.tag;
                   	this.initTab = this.tag;
                } else {
                    this.productClassId = res.returnValue[0].id;
                    this.initTab = res.returnValue[0].id;
                    this.loading = false;
                };
                this.$nextTick(() => {
              		document.documentElement.scrollTop = this.height;
	            });
            });
        },
        mounted() {
            
        },
        beforeRouteLeave(to, from, next) {
            this.$store.dispatch("SetRoomList", JSON.parse(JSON.stringify(this.list)));
            this.$store.dispatch("SetRoomPageNum", this.pageNum);
            this.$store.dispatch("SetHeight", document.documentElement.scrollTop || document.body.scrollTop);
            console.log('height',document.documentElement.scrollTop || document.body.scrollTop)
            this.$store.dispatch("SetHomeListState", {
                noMore: this.noMore,
                loading: this.loading
            });
            this.$store.dispatch("SetMessage", {
                code: 'tag',
                message: this.productClassId
            });
            console.log(this.productClassId)
            console.log('tag', this.tag)
            next();
        },
        methods: {
        	dddd(){
        		console.log('height',this.$refs.content.scrollTop)
        	},
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
                return new Promise((resolve, reject) => {
                    this.api.getB({
                    url: 'productClass/getList '
                    }).then((res) => {
                        if (res.successed) {
                            // let _tabList = [];
                            // res.returnValue.forEach(element => {
                            //     _tabList.push(element.productClassName)
                            // });
                            this.classList = res.returnValue;
                            this.tabList = res.returnValue;
                            resolve(res);
                        } else {
                            reject();
                            this.Util.myAlert('获取分类列表失败，请稍后重试');
                        };
                    }).catch(() => {
                        reject();
                        Indicator.close()
                    })
                });
                
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
                    productClassId: this.productClassId,
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

        }
    };
</script>

<style lang="scss">
    @import "./shopping";
</style>