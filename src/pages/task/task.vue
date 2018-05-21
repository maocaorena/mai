<template>
    <div id="task" :data="loginstate" class="wrapper">
        <div class="task-top">
            <p class="active-degree">
                今日活跃度 {{activeDegree}}
            </p>
            <div class="plan">
                <div class="plan-line">
                    <div class="plan-in" :style="{ 'width' : planWidth +'%'}">

                    </div>
                </div>
                <div class="plan-box flex">
                    <div v-for="(item, index) of boxList" class="plan-box-item" :style="{ 'left' : item.activeDegree+'%'}">
                        <p>{{item.activeDegree}}</p>
                        <img @click="getThisBox(item)" :src="'./static/img/task/task_treasure_' + (index+1) + item.state + '.png'" alt="">
                    </div>
                </div>
            </div>
            <div class="tasks">
                <div class="row head">
                    <div class="coll coll1">
                        任务
                    </div>
                    <div class="coll coll2">
                        活跃度
                    </div>
                    <div class="coll coll3">
                        状态
                    </div>
                </div>
                <div class="row">
                    <div class="coll coll1">
                        每日登录奖励
                    </div>
                    <div class="coll coll2">
                        +5
                    </div>
                    <div class="coll coll3 flex-zhong">
                        <img class="complate" src="../../assets/img/task/task_complete.png" alt="">
                    </div>
                </div>
                <template v-if="visitMode == 0">
                    <div class="row" v-for="item of taskList" v-if="!isOtherRecharge || (item.type!=1 && item.type!=0)">
                        <div class="coll coll1">
                            {{item.type | handleTask}}{{item.num}}{{item.type | handleTaskPrice}}
                        </div>
                        <div class="coll coll2">
                            +{{item.activeDegree}}
                        </div>
                        <div class="coll coll3 flex-zhong">
                            <img v-if="item.success == 1" class="complate" src="../../assets/img/task/task_complete.png" alt="">
                            <div class="goTask" v-if="item.success == 0" @click="goDoTask(item.type)">
                                前往
                            </div>
                        </div>
                    </div>
                </template>
                <template v-if="visitMode == 1">
                    <div class="row" v-for="item of taskList" v-if="item.type!=1 && item.type!=0">
                        <div class="coll coll1">
                            {{item.type | handleTask}}{{item.num}}{{item.type | handleTaskPrice}}
                        </div>
                        <div class="coll coll2">
                            +{{item.activeDegree}}
                        </div>
                        <div class="coll coll3 flex-zhong">
                            <img v-if="item.success == 1" class="complate" src="../../assets/img/task/task_complete.png" alt="">
                            <div class="goTask" v-if="item.success == 0" @click="goDoTask(item.type)">
                                前往
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <homepopup v-if="boxAlertState" :upAlertStyle='alertStyle' v-on:close="closeAlert()"></homepopup>
    </div>
</template>

<script>
    import homepopup from '../popup/homePopup/homePopup.vue';
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                activeDegree: '',
                planWidth: 0,
                boxList: [],
                taskList: [],
                boxAlertState: false,
                alertStyle: '',
                isOtherRecharge: this.User.getAppInfo().redirectPayUrl ? true : false
            }
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {

                };
                return this.$store.getters.loginstate;
            },
            visitMode() {
                console.log(this.$store.getters.visitMode)
                return this.$store.getters.visitMode;
            }
        },
        filters: {
            handleTask(val) {
                let txt = '';
                switch (val) {
                    case 0:
                        txt = '累计充值'
                        break;
                    case 1:
                        txt = '累计充值'
                        break;
                    case 2:
                        txt = '完成游戏'
                        break;
                    case 3:
                        txt = '抓中娃娃'
                        break;

                    default:
                        break;
                }
                return txt;
            },
            handleTaskPrice(val) {
                let txt = '';
                switch (val) {
                    case 0:
                        txt = '次'
                        break;
                    case 1:
                        txt = '元'
                        break;
                    case 2:
                        txt = '局'
                        break;
                    case 3:
                        txt = '个'
                        break;

                    default:
                        break;
                }
                return txt;
            }
        },
        components: {
            'homepopup': homepopup
        },
        methods: {
            closeAlert() {
                this.boxAlertState = false;
            },
            getThisBox(item) {
                if (item.state === 0) {
                    this.api.getB({
                        url: 'task/receiveAward',
                        headers: {
                            token: this.User.getToken()
                        },
                        params: {
                            userId: this.User.getMemberId(),
                            level: item.level,
                            appKey: this.User.getAppKey()
                        }
                    }).then(res => {
                        if (res.data.successed) {
                            this.alertStyle = {
                                titImg: './static/img/task/pop_test' + item.level + '.png',
                                btnTxt: '快去抓娃娃',
                                clickType: 2,
                                goUrl: '/home',
                                html: '<p style="font-size: 30px;color: #ff5b88;"><i style="font-size: 30px;" class="iconfont icon-jinbi"></i> +' + res.data.returnValue + '</p>',
                            };
                            this.boxAlertState = true;
                            this.getTaskList();
                        }
                    })
                }
            },
            planWidthHandle(val) {
                if (val >= 0 && val < this.boxList[0].activeDegree) {
                    return 0
                } else if (val >= this.boxList[0].activeDegree && val < this.boxList[1].activeDegree) {
                    return this.boxList[0].activeDegree
                } else if (val >= this.boxList[1].activeDegree && val < this.boxList[2].activeDegree) {
                    return this.boxList[1].activeDegree
                } else if (val >= this.boxList[2].activeDegree && val < this.boxList[3].activeDegree) {
                    return this.boxList[2].activeDegree
                } else if (val >= this.boxList[3].activeDegree && val < this.boxList[4].activeDegree) {
                    return this.boxList[3].activeDegree
                } else if (val == this.boxList[4].activeDegree) {
                    return this.boxList[4].activeDegree
                }
            },
            goDoTask(type) {
                switch (type) {
                    case 0:
                        this.$router.push('/recharge')
                        break;
                    case 1:
                        this.$router.push('/recharge')
                        break;
                    case 2:
                        this.$router.push('/home')
                        break;
                    case 3:
                        this.$router.push('/home')
                        break;

                    default:
                        break;
                }
            },
            getTaskList() {
                this.api.getB({
                    url: 'task/getTaskDetail',
                    params: {
                        userId: this.User.getMemberId()
                    },
                    headers: {
                        token: this.User.getToken()
                    }
                }).then(res => {
                    Indicator.close()
                    if (res.data.successed) {
                        this.activeDegree = res.data.returnValue.activeDegree;
                        this.taskList = res.data.returnValue.taskList;
                        res.data.returnValue.taskAwardList.sort(function (x, y) {
                            if (x.activeDegree < y.activeDegree) {
                                return -1;
                            }
                            if (x.activeDegree > y.activeDegree) {
                                return 1;
                            }
                            return 0;
                        });
                        this.boxList = res.data.returnValue.taskAwardList;
                        this.planWidth = this.planWidthHandle(res.data.returnValue.activeDegree);
                    }
                })
            }
        },
        created() {
            console.log(this.isOtherRecharge)
            Indicator.open();
            this.getTaskList();
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import "./task";
</style>