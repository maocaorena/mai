<template>
    <div id="upLvResult" class="wrapper">
        <template v-if="result===2">
            <p class=" color333 pd20 pb0 width100">
                预测选择： <span class="colorRed">{{message.upgradeTrafficLights == 0?'红灯多':'绿灯多'}}</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                游戏结果：<span class="colorRed">{{message.upgradeResult == 0?'红灯多':'绿灯多'}}</span>
            </p>
            <p class="colorRed pd20 largeFont">
                恭喜您，升级成功！
            </p>
            <div class="middTip mb">
                <p class="top">
                    您购买的商品将升级为以下商品
                </p>
                <div class="bottom smallFont">
                    <p class="pd20 width100 colorRed">
                        购买商品：{{message.upProductName}}
                    </p>
                    <p class="pd20 width100 colorRed">
                        单价：{{message.upProductPrice}}元 &nbsp;
                    <span class="color333"> 数量：{{message.orderCount}} </span>
                    </p>
                </div>
            </div>
            <p class="pd20 width100 color333 mb">
                您可以立即提货；如您对升级后的商品不满意，请在24小时内选择退款，过期将自动按提货处理。
            </p>
            <br>
            <div class="buttons flex flex-hsb mb">
                <mt-button type="danger" @click="send">立即提货</mt-button>
                <mt-button type="danger">退款</mt-button>
            </div>
        </template>

        <template v-if="result === 3">
            <p class=" color333 pd20 pb0 width100">
                参与游戏： <span class="color333">超级红绿灯</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                预测选择： <span class="colorRed">{{message.upgradeTrafficLights == 0?'红灯多':'绿灯多'}}</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                游戏结果：<span class="colorRed">{{message.upgradeResult == 0?'红灯多':'绿灯多'}}</span>
            </p>
            <p class="colorRed pd20 largeFont">
                升级失败！
            </p>
            <div class="middTip mb">
                <p class="top">
                    我们会尽快为您购买的商品发货，请注意查收！
                </p>
                <div class="bottom smallFont">
                    <p class="pd20 width100">
                        购买商品：商品名称商品名称商
                    </p>
                    <p class="pd20 width100 colorRed">
                        单价：100.00元 &nbsp;
                    <span class="color333"> 数量：10 </span>
                    </p>
                </div>
            </div>
        </template>
        <br>
        <div class="bottons1 defaultStyle flex flex-hsb mb">
            <p @click="goHome">
                返回首页>
            </p>
            <p @click='goOrder'>
                查看订单>
            </p>
        </div>
        <p class=" color333 pd20 pb0 width100">
            本次游戏结果数据
        </p>
        <div class="flex flex-hlr pd20 pb0">
            <p>{{message.stockIndexVo.stockIndexOneName}}：{{message.stockIndexVo.stockIndexOneValue}}</p>
            <p class="colorRed" >{{message.stockIndexVo.stockIndexThreeValue.slice(-1)%2==1?'奇数亮红灯':'偶数绿灯亮'}}</p>
        </div>
        <div class="flex flex-hlr pd20 pb0">
            <p>{{message.stockIndexVo.stockIndexTowName}}：{{message.stockIndexVo.stockIndexTowValue}}</p>
            <p class="colorRed">{{message.stockIndexVo.stockIndexThreeValue.slice(-1)%2==1?'奇数亮红灯':'偶数绿灯亮'}}</p>
        </div>
        <div class="flex flex-hlr pd20">
            <p>{{message.stockIndexVo.stockIndexThreeName}}：{{message.stockIndexVo.stockIndexThreeValue}}</p>
            <p class="colorRed">{{message.stockIndexVo.stockIndexThreeValue.slice(-1)%2==1?'奇数亮红灯':'偶数绿灯亮'}}</p>
        </div>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                result: 1,
                message: {
                    stockIndexVo: {
                        stockIndexOneValue: '',
                        stockIndexTowValue: '',
                        stockIndexThreeValue: ''
                    }
                }
            }
        },
        created() {
            this.getResult();
        },
        methods: {
            goOrder(){
                this.$router.push({ name: 'myOrder' })
            },
            goHome() {
                this.$router.push({ name: 'home' })
            },
            send(){
                this.$router.push({
                    name: 'sendResult',
                    query: {
                        oid: this.$route.query.oid
                    }
                })
            },
            getResult(){
                Indicator.open();
                this.api.getB({
                    url: 'customerOrder/getOrderUpResult',
                    params: {
                        id: this.$route.query.oid
                    },
                    user: true
                }).then(res=>{
                    Indicator.close();
                    if(res.successed){
                        this.message = res.returnValue;
                        this.result = res.returnValue.upgradeState;
                    }
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import './upLvResult'
</style>