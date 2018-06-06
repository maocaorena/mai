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
                        <div class="item pd20 red" :class="{'select': select == 0}" @click="selectThis(0)">
                            <div class="top mb">

                            </div>
                            <div class="bottom width100">
                                红灯多
                            </div>
                        </div>
                        <div class="item pd20 green" :class="{'select': select == 1}" @click="selectThis(1)">
                            <div class="top mb">

                            </div>
                            <div class="bottom width100">
                                绿灯多
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="start largeFont flex-zhong mb" @click="startgame(3)">
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
            距离结束：{{time | times}}
        </div>
        <p class="width100 pd20 mb">
            预测选择：<span class="colorRed">{{select==0?'红灯多':'绿灯多'}}</span>
        </p>
        <div class="lightList flex flex-hsb width100 mb">
            <div class="item red">
                <div class="itemIn">
                    <div class="top" :class="message.stockIndexOneValue.slice(-1)%2==1?'red':'yellow'">
                    </div>
                    <div class="top" :class="message.stockIndexOneValue.slice(-1)%2==0?'green':'yellow'">

                    </div>

                </div>
                <p class="width100 colorRed">
                    {{message.stockIndexOneName}}
                </p>
                <p class="width100 colorRed">
                    {{message.stockIndexOneValue}}
                </p>
            </div>
            <div class="item green">
                <div class="itemIn">
                    <div class="top" :class="message.stockIndexTowValue.slice(-1)%2==1?'red':'yellow'">
                    </div>
                    <div class="top" :class="message.stockIndexTowValue.slice(-1)%2==0?'green':'yellow'">

                    </div>

                </div>
                <p class="width100 colorRed">
                    {{message.stockIndexTowName}}
                </p>
                <p class="width100 colorRed">
                    {{message.stockIndexTowValue}}
                </p>
            </div>
            <div class="item green">
                <div class="itemIn">
                   <div class="top" :class="message.stockIndexThreeValue.slice(-1)%2==1?'red':'yellow'">
                    </div>
                    <div class="top" :class="message.stockIndexThreeValue.slice(-1)%2==0?'green':'yellow'">

                    </div>

                </div>
                <p class="width100 colorRed">
                    {{message.stockIndexThreeName}}
                </p>
                <p class="width100 colorRed">
                    {{message.stockIndexThreeValue}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import { Util } from '@/assets/js/util.js'
    var timer = null;
    export default {
        data() {
            return {
                alertState: 1,
                select: 0,
                message: {
                    stockIndexOneValue: '',
                    stockIndexTowValue: '',
                    stockIndexThreeValue: ''
                },
                time: 0,
                nowTime: this.Util.dateTime(Date.parse(new Date()), 'time'),
            }
        },
        filters: {
            times: function(val){
                if (val> 60){
                    return '00:' + Util.addZero(parseInt(val/60)) + ':' + Util.addZero((val-60))
                }else{
                    return '00:00:' + Util.addZero(val)
                }
            }
        },
        created() {
            this.getNowTime();
        },
        methods: {
            startThisGame(){
                this.getMessage();
                let date=new Date();
                if( date.getSeconds() > 30){
                    this.time = 60 + ( 60 - (date.getSeconds()));
                }else{
                    this.time = 60 - (date.getSeconds());
                };
                timer = setInterval(()=>{
                    this.time--;
                    if(this.time%5 == 0){
                        this.getMessage();
                    }
                    if(this.time == 0){
                        this.$router.push({
                            name: 'upLvResult',
                            query: {
                                oid: this.$route.query.oid
                            }
                        });
                        clearInterval(timer)
                    }
                }, 1000)
            },
            selectThis(type) {
                this.select = type;
            },
            startgame(type) {
                
                if(type == 3){
                    this.api.putB({
                        url: 'customerOrder/upgradeGoods',
                        user: true,
                        params: {
                            id: this.$route.query.oid,
                            upgradeTrafficLights: this.select//0 红灯多  1绿灯多
                        }
                    }).then(res=>{
                        if(res.successed){
                            this.alertState = 0;
                            this.startThisGame();
                        }
                    })
                }else{
                    this.alertState = type;
                }
            },
            getMessage(){
                this.api.getBn({
                    url: 'stockIndex/getInfo',
                }).then(res=>{
                    if(res.successed){
                        this.message = res.returnValue;
                    }
                })
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
        },
        beforeDestroy () {
            if(timer){
                clearInterval(timer)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './redLight'
</style>