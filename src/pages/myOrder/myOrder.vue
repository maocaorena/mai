<template>
    <div id="myOrder" class="wrapper">
        <div class="width100 orders page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="width100 orderList page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                <li class="orderItem mb" v-for="item of list">
                    <template v-if="item.orderState == 1">
                        <div class="item-select flex-zhong" @click="addThis(item.id)" v-show="selectList.indexOf(item.id)<0">
                            <img src="../../assets/img/common/choice_1.png" alt="">
                        </div>
                        <div class="item-select flex-zhong" @click="delThis(item.id)" v-show="selectList.indexOf(item.id)>-1">
                            <img src="../../assets/img/common/choice_2.png" alt="">
                        </div>

                    </template>
                    <div class="top flex mb" @click="goDetail(item)">
                        <div class="img">
                            <img :src="item.productImage" alt="">
                        </div>
                        <div class="name width100">
                            {{item.productName | nameHandle}}
                        </div>
                        <div class="state">
                            <p class="mb colorRed">￥{{item.payAmount}}</p>
                            <p>{{item.orderState | stateHandle}}</p>
                        </div>
                    </div>
                    <div class="row flex flex-hlr mb" @click="goDetail(item)">
                        <p>共{{item.orderCount}}件商品</p>
                        <p>
                            合计:<span class="colorRed">￥{{item.orderAmount}}</span>(含运费<span class="colorRed">￥{{item.freightAmount}}</span>)
                        </p>
                    </div>
                    <p class="mb orderNum">
                        订单号：{{item.oid}}
                    </p>
                    <p class="mb orderNum" v-if="item.upgradeState == 1">
                        升级时间：{{item.upgradeTime}}
                    </p>
                    <p class="mb orderNum">

                        <template v-if="item.orderState == 0">
                            创建时间：{{item.created}}
                        </template>

                        <template v-if="item.orderState == 1 || item.orderState == 2 || item.orderState == 4">
                            支付时间：{{item.payTime}}
                        </template>

                        <template v-if="item.orderState == 4">
                            收货时间：{{item.deliveryTime}}
                        </template>

                        <template v-if="item.orderState == 6">
                            退款时间：{{item.refundTime}}
                        </template>
                    </p>
                    <div class="width100 colorRed defaultFont tc" v-if="item.gameState == 2">
                        恭喜中奖！获得价值 {{item.giveGoldQuantity}} 元的黄金
                    </div>
                    <div class="buttons flex flex-hc" v-if="item.isGiveGold == 1 && item.gameState == 0">
                        <button @click="goUp(item.id)">
                            玩游戏 送黄金
                        </button>
                        <!-- <template v-if="item.orderState == 0">
                            <button @click="backMoney(item)">
                                退款
                            </button>
                        </template>

                        <template v-if="item.orderState == 1 || item.orderState == 2 || item.orderState == 3 || item.orderState == 4">
                            <button v-if="item.orderState == 1" @click="sendProd(item.id)">
                                提货
                            </button>
                            <button v-if="item.upgradeState == 0 && item.upProductId" @click="goUp(item.id)">
                                升级
                            </button>
                            <button @click="backMoney(item)" v-if="item.upgradeState != 3">
                                退款
                            </button>
                        </template> -->
                        
                        
                    </div>
                </li>
            </ul>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="send">支付运费并提货</button>
        </div>
        <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
        <p class="noMore" v-show="noMore">没有更多数据了</p>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                list: [],
                loading: false, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
                selectList: [],
            }
        },
        filters: {
            nameHandle(val) {
                return val.substr(0, 20) + '...'
            },
            stateHandle(val) {
                let _val = '';
                switch (val) {
                    case 0:
                        _val = '待付款';
                        break;
                    case 1:
                        _val = '待提货';
                        break;
                    case 2:
                        _val = '待发货';
                        break;
                    case 3:
                        _val = '已发货';
                        break;
                    case 4:
                        _val = '已收货';
                        break;
                    case 5:
                        _val = '等待退款';
                    case 6:
                        _val = '已退款';
                    case 7:
                        _val = '交易成功';
                    case 7:
                        _val = '交易关闭';
                        break;

                    default:
                        break;
                };
                return _val
            }
        },
        created() {
            
        },
        methods: {
            addThis(id){
                this.selectList.push(id)
            },
            delThis(id){
                this.selectList.splice(this.selectList.indexOf(id), 1)
            },
            send(){
                if(this.selectList.length <= 0){
                    this.Util.myAlert('请选择订单');
                    return;
                };
                this.$router.push({
                    name: 'payCarMonry',
                    query: {
                        oid: this.selectList.join(',')
                    }
                })
            },
            goUp(id){
                this.$router.push({
                    name: 'redLight',
                    query: {
                        oid: id
                    }
                })
            },
            sendProd(id){
                MessageBox.confirm('确定要提货吗？').then(action => {
                    this.$router.push({
                        name: 'sendResult',
                        query: {
                            oid: id
                        }
                    })
                });
            },
            backMoney(item) {
                MessageBox.confirm('确定退款吗？').then(action => {
                    Indicator.open();
                    this.api.putB({
                        url: 'customerOrder/refund',
                        user: true,
                        params: {
                            id: item.id
                        }
                    }).then(res=>{
                        Indicator.close();
                        if(res.successed){
                            this.Util.myAlert('退款成功');
                            this.reset()
                        }else{
                            this.Util.myAlert('退款失败')
                        }
                    })
                });
                
            },
            goDetail(item) {
                this.$router.push({
                    name: 'orderDetail',
                    query: {
                        oid: item.id
                    }
                })
            },
            reset(){
                this.pageNum = 1;
                this.noMore = false;
                this.list = [];
                this.getList()
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
                    url: 'customerOrder/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 6
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
                    };
                }).catch(() => {
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import './myOrder'
</style>