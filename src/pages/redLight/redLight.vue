<template>
    <div id="redLight" class="wrapper">
        <MessageBox v-if="alertState === 1" :hide="true" class="redRule" :instyle="alertStyle1">
            <slot>
                <div class="alertIn1 alertIn width100 pd20">
                    <h2 class="colorRed largeFont row width100"> </h2>
                    <h6 class="row width100"> </h6>
                    <p>
                        游戏将实时读取1个金融指数的真实数据。如数据最后一位数字为奇数，则亮红灯；如数据最后一位数字为偶数，则亮绿灯。
                    </p>
                    <br>
                    <p class="width100" style="color: #ff00e4">
                        游戏开始前玩家预测游戏结束时是哪种颜色的灯，游戏开始后下一个整分钟时间结束（剩余时间不足30秒顺延至下一分钟），如游戏结束时预测准确，则游戏获胜；如预测错误，则游戏失败。
                    </p>
                    <br>
                    <div class="startGame largeFont flex-zhong" @click="startgame(2)">

                    </div>
                </div>
            </slot>
        </MessageBox>
        <MessageBox v-if="alertState === 2" :hide="true" :instyle="alertStyle2">
            <slot>
                <div class="alertIn2 alertIn width100 alertInTwo pd20">
                    <div class="flex flex-hsb width100 mb">
                        <div class="item pd20 red" @click="selectThis(0)">
                            <img src="./../../assets/img/redLight/red1.png" v-show="select == 0" alt="">
                            <img src="./../../assets/img/redLight/red2.png" v-show="select == 1" alt="">
                        </div>
                        <div class="item pd20 green" @click="selectThis(1)">
                            <img src="./../../assets/img/redLight/green1.png" v-show="select == 1" alt="">
                            <img src="./../../assets/img/redLight/green2.png" v-show="select == 0" alt="">
                        </div>
                    </div>
                    <br>
                    <div class="startGame largeFont flex-zhong mb" @click="startgame(3)">
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
        <p class="width100 mb selectLight">
            预测选择：
            <span class="colorRed">{{select==0?'红灯':'绿灯'}}</span>
        </p>
        <div class="lightList1 lightList flex flex-hsb width100">
            <div class="cars">
                <img class="car1" src="../../assets/img/redLight/car1.png" alt="">
                <img class="car2" src="../../assets/img/redLight/car2.png" alt="">
                <img class="car3" src="../../assets/img/redLight/car3.png" alt="">
            </div>
            <div class="item">
                <div class="itemIn">
                    <img v-show="message.dataSourceValue.slice(-1)%2==1" src="../../assets/img/redLight/red.png" alt="">
                    <img v-show="message.dataSourceValue.slice(-1)%2==0" src="../../assets/img/redLight/green.png" alt="">
                </div>
            </div>
        </div>
        <div class="lightList2 lightList flex flex-hsb width100 mb">
            <div class="item">
                <div class="message" :class="{'redColor':message.dataSourceValue.slice(-1)%2==1,'greenColor':message.dataSourceValue.slice(-1)%2==0}">
                    <p class="width100">
                        {{message.dataSourceName}}
                    </p>
                    <p class="width100">
                        {{message.dataSourceValue}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Util } from '@/assets/js/util.js';
import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
var timer = null;
var timer1 = null;
var timer2 = null;
export default {
    data() {
        return {
            alertStyle1: {
                'padding': 0,
                'background': 'url(./static/img/redLight/redBg.png) no-repeat left top',
                'background-size': '100% 100%'
            },
            alertStyle2: {
                'padding': 0,
                'background': 'url(./static/img/redLight/selectBg.png) no-repeat left top',
                'background-size': '100% 100%'
            },
            alertState: 0,
            select: 0,
            message: {
                dataSourceName: '',
                dataSourceValue: ''
            },
            time: 0,
            nowTime: this.Util.dateTime(Date.parse(new Date()), 'time'),
            result: 0,
            resultMessage: {}
        }
    },
    filters: {
        times: function (val) {
            if (val > 60) {
                return '00:' + Util.addZero(parseInt(val / 60)) + ':' + Util.addZero((val - 60))
            } else {
                return '00:00:' + Util.addZero(val)
            }
        }
    },
    created() {
        this.getNowTime();
    },
    methods: {
        startThisGame() {
            this.getMessage();
            let date = new Date();
            if (date.getSeconds() > 30) {
                this.time = 60 + (60 - (date.getSeconds()));
            } else {
                this.time = 60 - (date.getSeconds());
            };
            timer = setInterval(() => {
                this.time--;
                if (this.time % 5 == 0) {
                    this.getMessage();
                }
                if (this.time == 0) {
                    // this.$router.push({
                    //     name: 'upLvResult',
                    //     query: {
                    //         oid: this.$route.query.oid
                    //     }
                    // });
                    timer2 = setInterval(() => {
                        this.getResult();
                    }, 1000);
                    clearInterval(timer);
                }
            }, 1000)
        },
        selectThis(type) {
            this.select = type;
        },
        getResult() {
            Indicator.open();
            this.api.getB({
                url: 'customerOrder/getOrderGameResult',
                params: {
                    id: this.$route.query.oid
                },
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.resultMessage = res.returnValue;
                    this.result = res.returnValue.gameState;
                    if (this.result == 2 || this.result == 3) {
                        console.log('eee', res)
                        clearInterval(timer2)
                        if (this.result == 2) {
                            this.gameSuccess(res.returnValue)
                        };
                        if (this.result == 3) {
                            this.gameFail()
                        };
                    }
                    console.log(res);
                }
            }).catch(error=>{
                console.log('sss',error)
            })
        },
        gameSuccess(val) {
            console.log(val)
            MessageBox({
                title: '游戏成功！',
                message: '您获得了' + val.giveGoldQuantity +'克黄金',
                showCancelButton: true,
                cancelButtonText: '厂商回购',
                confirmButtonText: '委托代存',
            }).then((state) => {
                if (state == 'cancel') {
                    Indicator.open();
                    this.api.postB({
                        url: 'customerGoldFinance/buyBack',
                        params: {
                            buyBackGoldQuantity: val.giveGoldQuantity,
                        },
                        user: true
                    }).then(res => {
                        Indicator.close();
                        if (res.successed) {
                            this.Util.myAlert('回购成功');
                            MessageBox({
                                title: '  ',
                                message: '您的黄金由厂商回购，获得现金'+res.returnValue+'元',
                                showCancelButton: true,
                                cancelButtonText: '继续购物',
                                confirmButtonText: '查看账户',
                            }).then((status) => {
                                if (status == 'cancel') {
                                    this.goShopping();
                                } else {
                                    this.$router.push({
                                        name: 'my'
                                    })
                                }
                            });
                        }
                    })
                } else {
                    MessageBox({
                        title: '您的' + val.giveGoldQuantity +'克黄金将由商城代存。',
                        message: '注：委托存金的黄金，商城代为保存的到下个月末，到期如不提取实体黄金产品系统将自动委托厂商回购',
                        showCancelButton: true,
                        cancelButtonText: '继续购物',
                        confirmButtonText: '查看黄金',
                    }).then((status) => {
                        if(status === 'cancel'){
                            this.goShopping()
                        }else{
                            this.$router.push({
                                name: 'myGold'
                            })
                        }
                    });
                }
                console.log('ccc', state)

            }).catch(error=>{
                console.log('sss',error)
            });
        },
        goShopping() {
            this.$router.push({
                name: 'shopping'
            })
        },
        gameFail() {
            MessageBox({
                title: '游戏失败！',
                message: ' ',
                showCancelButton: true,
                cancelButtonText: '继续购物',
                confirmButtonText: '查看已买商品',
            }).then(state=>{
                if (state == 'cancel') {
                    this.goShopping();
                } else {
                    this.$router.push({
                        name: 'myOrder'
                    })
                };
            }).catch(error=>{
                console.log('sss',error)
            });
        },
        startgame(type) {
            console.log(type)
            if (type == 3) {
                this.api.putB({
                    url: 'customerOrder/startGame',
                    user: true,
                    params: {
                        id: this.$route.query.oid,
                        customerSelect: this.select //0 红灯 奇数  1绿灯 偶数
                    }
                }).then(res => {
                    if (res.successed) {
                        this.alertState = 0;
                        this.startThisGame();
                    }
                })
            } else {
                this.alertState = 0;
                this.$nextTick(() => {
                    this.alertState = type;
                })
            }
        },
        getMessage() {
            this.api.getBn({
                url: 'gameDataSource/getInfo',
                user: true
            }).then(res => {
                if (res.successed) {
                    this.message = res.returnValue;
                }
            })
        },
        showRule() {
            this.alertState = 0;
            this.$nextTick(() => {
                this.alertState = 1;
            })
        },
        getNowTime() {
            timer1 = setInterval(() => {
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
                if (action === 'confirm') {
                    this.$router.push({
                        name: 'home'
                    })
                } else {
                    console.log('查看结果')
                    this.$router.push({
                        name: 'upLvResult'
                    })
                }
            }).catch(err => { });
        }
    },
    beforeDestroy() {
        if (timer) {
            clearInterval(timer)
        };
        if (timer1) {
            clearInterval(timer1)
        };
        if (timer2) {
            clearInterval(timer2)
        };
    }
}
</script>

<style lang="scss" scoped>
@import "./redLight";
</style>