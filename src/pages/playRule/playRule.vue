<template>
    <div id="playRule" class="wrapper">
        <div class="content">
            <p class="small-tit">Instructions</p>
            <h2 class="big-tit">玩法说明</h2>
            <div class="play-list">
                <div class="play-item" v-for="(item,index) of data">
                    <p class="play-item-tit" @click="changeState(index)">
                        {{index+1}}.{{item.tit}}
                    </p>
                    <p class="play-item-detail" v-show="index==openIdx" v-html="item.message">
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                openIdx: 0,
                data: [
                    {
                        tit: '如何开始游戏',
                        message: '如您选择的是空闲设备：<br />' +
                            '直接点击“开始游戏”，进入游戏<br />' +
                            '如您选择的是游戏中设备：<br />' +
                            '您可以等待等待期间您可观看他人的游玩过程，并可进行弹幕评论。<br />',
                    },
                    {
                        tit: '如何控制娃娃机',
                        message: '和中国大陆目前最流行的娃娃机玩法一致。<br />' +
                            '① 按住画面中的左右与前后键来移动，下爪键来控制爪子。<br />' +
                            '② 您还可以点击切换视角按钮，来切换摄像头画面，显示娃娃机的正面或者侧面，以方便调整爪子的位置。<br />' +
                            '③ 从指定洞口掉落即可获得奖品。<br />',
                    },
                    {
                        tit: '如何获得奖品',
                        message: '① 在“我的收货地址”页面添加物流信息。<br />' +
                            '② 抓中的奖品会显示在“我获得的奖品”页面，选择您想要快递的奖品并点按“申请发货”按钮。<br />' +
                            '③ 在生成的订单页面检查信息无误后点按“确认订单”。<br />' +
                            '④ 静静地等待您的奖品发货吧！<br />',
                    }
                ]
            }
        },
        methods: {
            changeState(item) {
                this.openIdx = item;
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import './playRule';
</style>