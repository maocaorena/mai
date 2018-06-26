<template>
    <div id="myGold" class="wrapper">
        <div class="myData pd20 bg1">
            <p class="width100 color333 mb">
                您当前拥有：<span class="colorRed largeFont">{{message.goldBalance}}</span> 克黄金
            </p>
            <div class="flex mb">
                <mt-button size="small" type="primary" @click="open">回购</mt-button>
                <div class="pd20"></div>
                <div class="pd20"></div>
                <mt-button size="small" type="primary" @click="getGold">提取黄金</mt-button>
            </div>
            <p class="width100 color333 mb smallFont">
                注：存黄金最长期限为1个月，到期不提取实体黄金产品则系统自动回购
            </p>
        </div>
        <div class="rooms page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading"
                infinite-scroll-distance="60">
                <li v-for="(item,index) of list" class="item pd20">
                    <p class="flex flex-hlr mb">
                        <span>
                            {{item.streamType | typeHandle}}
                        </span>
                        <span class="add">
                            {{item.streamType | numHandle}}{{item.goldQuantity}}
                        </span>
                    </p>
                    <p class="flex flex-hlr color999">
                        <span>
                            {{item.created}}
                        </span>
                        <span>
                            黄金账户： {{item.balance}}克
                        </span>
                    </p>
                </li>
            </ul>
        </div>
        <p class="noMore flex-zhong" v-show="!noMore">
            <mt-spinner type="snake"></mt-spinner>
        </p>
        <p class="noMore" v-show="noMore">没有更多数据了</p>
        <MessageBox v-if="alertState === 1" v-on:close="close">
            <slot>
                <p class="alertOne defaultFont color333"> 您当前拥有 <span class="colorRed">{{message.goldBalance}}</span> 克黄金！</p>
                <p class="alertOne defaultFont color333"> 
                    <input type="number">
                    <button>
                        全部
                    </button>
                </p>
                <p class="alertOne defaultFont color333"> 折合现金：<span class="colorRed">222</span> 元</p>
                <p class="alertOne defaultFont color333"> 当前金价：{{message.goldPrice}} 元/克</p>
                <br>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="primary" size="small" >确定 </mt-button>
                    <mt-button type="default" size="small" @click="close"> 取消 </mt-button>
                </div>
            </slot>
        </MessageBox>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                loading: false, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
                alertState: 0,
                message: {}
            }
        },
        filters: {
            typeHandle(val){
                let _val = '';
                switch (val) {
                    case 0:
                        _val = '赠送';
                        break;
                    case 1:
                        _val = '提取';
                        break;
                    case 2:
                        _val = '回购';
                        break;
                
                    default:
                        break;
                };
                return _val
            },
            numHandle(val){
                let _val = '';
                switch (val) {
                    case 0:
                        _val = '+';
                        break;
                    case 1:
                        _val = '-';
                        break;
                    case 2:
                        _val = '-';
                        break;
                
                    default:
                        break;
                };
                return _val
            }  
        },
        created () {
            this.getMessage()  
        },
        methods: {
            getGold(){
                this.$router.push({
                    name: 'getGold'
                })
            },
            open(){
                this.alertState = 1;
            },
            close() {
                this.alertState = 0;
            },
            getMessage(){
                this.api.getB({
                    url: 'customerGoldFinance/getGoldAccount',
                    user: true
                }).then((res) => {
                    if (res.successed) {
                        this.message = res.returnValue;
                    }
                }).catch(err=>{
                    this.noMore = true;
                })
            },
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'customerGoldFinance/getPageList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 10,
                    },
                    user: true
                }).then((res) => {
                    if (res.successed) {
                        this.list.push(...res.returnValue.list);
                        if (res.returnValue.list.length < 10) {
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

<style lang="scss" scoped>
    @import './myGold'
</style>