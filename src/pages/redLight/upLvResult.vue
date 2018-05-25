<template>
    <div id="upLvResult" class="wrapper">
        <template v-if="result===1">
            <p class=" color333 pd20 pb0 width100">
                预测选择： <span class="colorRed">红灯多</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                游戏结果：红灯2 绿灯1 <span class="colorRed">红灯多</span>
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
                        购买商品：商品名称商品名称商
                    </p>
                    <p class="pd20 width100 colorRed">
                        单价：100.00元 &nbsp;
                    <span class="color333"> 数量：10 </span>
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

        <template v-if="result === 2">
            <p class=" color333 pd20 pb0 width100">
                参与游戏： <span class="color333">超级红绿灯</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                预测选择： <span class="colorRed">红灯多</span>
            </p>
            <p class=" color333 pd20 pb0 width100">
                游戏结果：红灯2 绿灯1 <span class="colorRed">红灯多</span>
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
            <p>
                查看订单>
            </p>
        </div>
        <p class=" color333 pd20 pb0 width100">
            本次游戏结果数据
        </p>
        <div class="flex flex-hlr pd20 pb0">
            <p>上证指数：3111.11</p>
            <p class="colorRed">奇数亮红灯</p>
        </div>
        <div class="flex flex-hlr pd20 pb0">
            <p>上证指数：3111.11</p>
            <p class="colorRed">奇数亮红灯</p>
        </div>
        <div class="flex flex-hlr pd20">
            <p>上证指数：3111.11</p>
            <p class="colorRed">奇数亮红灯</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                result: 2
            }
        },
        methods: {
            goHome() {
                this.$router.push({ name: 'home' })
            },
            send(){
                this.$router.push({
                    name: 'sendResult'
                })
            }
        },
        created() {

        }
    }
</script>
<style lang="scss" scoped>
    @import './upLvResult'
</style>