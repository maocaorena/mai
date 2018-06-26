<template>
    <div id="getGold" class="wrapper">
        <div class="sendType mb" @click="selectAddr">
            <div class="one flex flex-hlr">
                <div class="defaultFont color333">
                    配送方式
                </div>
            </div>
            <div class="two flex flex-hlr">
                <div class="defaultFont color333">
                    收货人：{{defaultMessage.consignee}}
                </div>
                <div class="defaultFont color333">
                    {{defaultMessage.mobile}}
                </div>
            </div>
            <div class="three color333 smallFont">
                收货地址：
                {{defaultMessage.province}}
                {{defaultMessage.city}}
                {{defaultMessage.region}}
                {{defaultMessage.address}}
            </div>
            <div class="jiantou flex-zhong">
                <img src="../../assets/img/addr/triangle.png" alt="">
            </div>
        </div>
        <div class="rooms page-infinite-wrapper" ref="wrapper">
            <ul ref="roolist" class="list page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading"
                infinite-scroll-distance="60">
                <li v-for="(item,index) of list" class="item pd20 flex" @click="isThis(item.id)">
                    <div class="left">
                        <img :src="item.image" alt="">
                    </div>
                    <div class="middle">
                        <p class="mb width100 ellipsis">{{item.productName}}</p>
                        <p class="colorRed">{{item.costGoldQuantity}} 克</p>
                    </div>
                    <div class="right flex-zhong">
                        <img src="../../assets/img/common/choice_1.png" v-show="selectList.indexOf(item.id) <= -1" alt="">
                        <img src="../../assets/img/common/choice_2.png" v-show="selectList.indexOf(item.id) > -1" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <p class="noMore flex-zhong" v-show="!noMore">
            <mt-spinner type="snake"></mt-spinner>
        </p>
        <p class="noMore" v-show="noMore">没有更多数据了</p>
        <div class="bottomTab">
            <div class="bottomTabIn flex flex-sc flex-hlr">
                <p>
                    已选 {{selectList.length}} 件，
                    重 {{allMoney}} 克
                </p>
                <div class="buy flex-zhong" @click="getGold">
                    确定提取
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
import { MessageBox } from 'mint-ui';
export default {
    data () {
        return {
            list: [],
            loading: false, //控制加载，true会停止加载
            noMore: false, //没有更多
            pageNum: 1,
            defaultMessage: {
                consignee: ''
            },
            selectList: [],
            allMoney: 0
        }
    },
    created () {
        if (this.$route.query.addrId) {
            this.getById();
            this.selectList = this.$route.query.ids.split(',').map(res=>{
                return parseFloat(res)
            });
        } else {
            this.getDefault();
        };
    },
    methods: {
        getGold(){
            if(this.selectList.length == 0){
                this.Util.myAlert('请选择商品');
                return;
            };
             MessageBox.confirm('确定提取？').then(action => {
                    Indicator.open();
                    this.api.postBn({
                        url: 'customerGoldFinance/pickUp',
                        params: {
                            goldProductId: this.selectList.join(','),
                            deliveryAddressId: this.defaultMessage.id,
                            orderCount: this.selectList.length
                        },
                        user: true
                    }).then(res => {
                        Indicator.close();
                        if (res.successed) {
                            this.Util.myAlert('提取成功！');
                            setTimeout(() => {
                                this.$router.replace({
                                    name: 'myGold'
                                })
                            }, 800);
                        }
                    })
                });
        },
        isThis(id){
            this.selectList = [];
            this.selectList.push(id)
            // if(this.selectList.indexOf(id) > -1){
            //     this.selectList.splice(this.selectList.indexOf(id),1)
            // }else{
            //      this.selectList.push(id)
            // };
            this.getAllMoney();
        },
        getAllMoney(){
            this.allMoney = 0;
            let _list = [];
            _list = this.list.filter(val=>{
                return this.selectList.indexOf(val.id)>-1
            })
            console.log(_list)
            _list.forEach(element => {
                this.allMoney += element.costGoldQuantity;
            });
        },
        getList() {
            this.loading = true;
            this.api.getB({
                url: 'customerGoldFinance/getGoldProductPageList',
                params: {
                    pageNum: this.pageNum,
                    pageSize: 6,
                },
                user: true
            }).then((res) => {
                let _res = res;
                if (_res.successed) {
                    this.list.push(..._res.returnValue.list);
                    this.getAllMoney();
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
        },
        selectAddr() {
            this.$router.push({
                name: 'receiveAddress',
                query: {
                    ids: this.selectList.join(','),
                    isSelect: 1,
                    from: 'gold'
                }
            })
        },
        getById() {
            Indicator.open();
            this.api.getB({
                url: 'deliveryAddress/getById',
                params: {
                    id: this.$route.query.addrId
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.defaultMessage = res.returnValue;
                }
            }).catch(() => {

            })
        },
        getDefault() {
            Indicator.open();
            this.api.getB({
                url: 'deliveryAddress/getDefault',
                user: true,
            }).then(res => {
                Indicator.close();
                if (res.successed && res.returnValue) {
                    this.defaultMessage = res.returnValue;
                }
            })
        },
        getMyInfo() {
            this.api.getB({
                url: 'customer/getByToken',
                user: true
            }).then(res => {
                if (res.successed) {
                    this.userInfo = res.returnValue;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './getGold'
</style>

