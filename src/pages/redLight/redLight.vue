<template>
    <div id="redLight" class="wrapper">
        <MessageBox v-if="alertState === 1">
            <slot>
                <div class="alertIn width100">
                    <h2 class="colorRed largeFont row width100">超级红绿灯</h2>
                    <h6 class="row width100">游戏规则</h6>
                    <p>
                        游戏将实时读取3个金融指数的真实数据，每个数据对应一个红绿灯。如数据最后一位数字为奇数，则亮红灯；如数据最后一位数字为偶数，则亮绿灯。
                    </p>
                    <br>
                    <p class="colorRed width100">
                        游戏开始前玩家预测游戏结束时哪种颜色的灯更多，游戏开始后下一个整分钟时间结束（剩余时间不足30秒顺延至下一分钟），如游戏结束时预测准确，则游戏获胜；如预测错误，则游戏失败。
                    </p>
                    <br>
                    <div class="startGame largeFont flex-zhong" @click="startgame(2)">
                        开始游戏
                    </div>
                </div>
            </slot>
        </MessageBox>
        <MessageBox v-if="alertState === 2">
            <slot>
                <div class="alertIn width100 alertInTwo">
                    <h2 class="colorRed largeFont row width100">超级红绿灯</h2>
                    <h6 class="row width100 mb">请选择预测结果</h6>
                    <br>
                    <div class="flex flex-hlr width100 mb">
                        <div class="item pd20 red" :class="{'select': select == 'red'}" @click="selectThis('red')">
                            <div class="top mb">

                            </div>
                            <div class="bottom width100">
                                红灯多
                            </div>
                        </div>
                        <div class="item pd20 green" :class="{'select': select == 'green'}" @click="selectThis('green')">
                            <div class="top mb">

                            </div>
                            <div class="bottom width100">
                                绿灯多
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="start largeFont flex-zhong mb" @click="startgame(0)">
                        开始
                    </div>

                    <div class="gameRule" @click="showRule">
                        游戏规则>
                    </div>
                </div>
            </slot>
        </MessageBox>

        <div class="nowTime width100">
            当前时间：{{nowTime}}
        </div>
        <div class="endTime width100 colorRed largeFont">
            距离结束：00:00:23
        </div>
        <p class="width100 pd20 mb">
            预测选择：<span class="colorRed">红灯多</span>
        </p>
        <div class="lightList flex flex-hsb width100 mb">
            <div class="item red">
                <div class="itemIn">
                    <div class="top red">

                    </div>
                    <div class="top yellow">

                    </div>

                </div>
                <p class="width100 colorRed">
                    上证指数
                </p>
                <p class="width100 colorRed">
                    333333
                </p>
            </div>
            <div class="item green">
                <div class="itemIn">
                    <div class="top red">

                    </div>
                    <div class="top yellow">

                    </div>

                </div>
                <p class="width100 colorRed">
                    上证指数
                </p>
                <p class="width100 colorRed">
                    333333
                </p>
            </div>
            <div class="item green">
                <div class="itemIn">
                    <div class="top red">

                    </div>
                    <div class="top yellow">

                    </div>

                </div>
                <p class="width100 colorRed">
                    上证指数
                </p>
                <p class="width100 colorRed">
                    333333
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                alertState: 0,
                select: 'red',
                nowTime: this.Util.dateTime(Date.parse(new Date()), 'time'),
            }
        },
        created() {
            this.getNowTime();
            this.showBack();
        },
        methods: {
            selectThis(type) {
                this.select = type;
            },
            startgame(type) {
                this.alertState = type;
            },
            showRule() {
                this.alertState = 1;
            },
            getNowTime() {
                setInterval(() => {
                    this.nowTime = this.Util.dateTime(Date.parse(new Date()), 'time');
                }, 1000)
            },
            showBack() {
                MessageBox({
                    title: ' 提示 ',
                    message: '本次游戏已完成，谢谢参与！',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: '返回首页',
                    cancelButtonText: '查看结果'
                }).then(action => {
                    console.log(action)
                    if(action === 'confirm'){
                        this.$router.push({
                            name: 'home'
                        })
                    }else{
                        console.log('查看结果')
                        this.$router.push({
                            name: 'upLvResult'
                        })
                    }
                }).catch(err=>{
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './redLight'
</style>