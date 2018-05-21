<template>
    <div id="my" :data="loginstate" class="wrapper">
        <router-link to="/home" tag="div" class="goHome">
        </router-link>
        <div class="my-top flex">
            <div class="top-left">
                <img :src="userInfo.face" alt="" />
            </div>
            <div class="top-right">
                <div class="first">
                    {{userInfo.nickname}}
                </div>
                <div class="second">
                    <p class="balance" @click="goRecharge">
                        {{userInfo.balance}} {{userInfo.coinName}}
                        <span class="goRecharge">
                            {{visitMode === 1? '领券':'充值'}}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <router-link tag="div" class="main border-wrapper flex flex-sc main1" to="/my/task">
            <div class="left">
                <img src="../../assets/img/my/bag_task.png" alt="">
                <span v-if="showDian" class="dian"></span>
            </div>
            <div class="right">
                <p class="line1">今日活跃度：{{activeDegree}}</p>
                <p class="line2">提升活跃度，赢取奖励</p>
            </div>
            <div class="togo">
                <i class="iconfont icon-bofangqianwang"></i>
            </div>
        </router-link>
        <div class="line-border flex flex-hlr">
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/my/playRechods">
                <div class="top">
                    <img src="../../assets/img/my/bag_record.png" alt="">
                </div>
                <p>
                    游戏记录
                </p>
            </router-link>
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/my/myPrize">
                <div class="top">
                    <img src="../../assets/img/my/bag_prize.png" alt="">
                </div>
                <p>
                    我获得的奖品
                </p>
            </router-link>
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/my/appealRechords">
                <div class="top">
                    <img src="../../assets/img/my/bag_appeal.png" alt="">
                </div>
                <p>
                    申诉记录
                </p>
            </router-link>
        </div>
        <div class="line-border flex flex-hlr">
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/my/getAward">
                <div class="top">
                    <img src="../../assets/img/my/bag_coupon.png" alt="">
                </div>
                <p>
                    优惠兑换中心
                </p>
            </router-link>
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/my/receiveAddress">
                <div class="top">
                    <img src="../../assets/img/my/bag_add.png" alt="">
                </div>
                <p>
                    我的收货地址
                </p>
            </router-link>
            <router-link tag="div" class="main main2 border-wrapper flex flex-s flex-sc" to="/home/playRule">
                <div class="top">
                    <img src="../../assets/img/my/bag_help.png" alt="">
                </div>
                <p>
                    玩法说明
                </p>
            </router-link>
        </div>
        <div class="line-border flex flex-hlr">
            <div class="main main2 border-wrapper flex flex-s flex-sc" @click="changeServerAlert(2)">
                <div class="top">
                    <img src="../../assets/img/my/bag_service.png" alt="">
                </div>
                <p>
                    客服热线
                </p>
            </div>
        </div>
        <MessageBox v-if="serverAlert===2" :tit="'客服'" v-on:close="changeServerAlert(1)">
            <div class="server-alert-in flex flex-s flex-hc flex-sc">
                <div class="server-alert-in-item">
                    <border class="flex-zhong">
                        <span>客服热线：</span>
                        <span class="rexian">
                            <a href="tel:400-6305-186">400-6305-186</a>
                        </span>
                    </border>
                </div>
                <div class="server-alert-in-item">
                    <border class="flex-zhong">
                        <span>客服QQ：</span>
                        <span>3511735466</span>
                    </border>
                </div>
            </div>
        </MessageBox>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                serverAlert: 1,
                balance: '',
                userInfo: '',
                activeDegree: '-',
                showDian: false
            }
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {
                    this.getUserinfo();
                    this.getTaskList();
                };
                return this.$store.getters.loginstate;
            },
            visitMode() {
                return this.$store.getters.visitMode;
            },
        },
        methods: {
            goRecharge() {
                if (this.visitMode === 0) {
                    this.Storage.setItem('tr', '/home')
                    this.api.goRecharge();
                } else {
                    this.$router.push({ name: 'ticketList' })
                };
            },
            getTaskList() {//获取活跃度
                this.api.getB({
                    url: 'task/getTaskDetail',
                    params: {
                        userId: this.User.getMemberId()
                    },
                    headers: {
                        token: this.User.getToken()
                    }
                }).then(res => {
                    if (res.data.successed) {
                        this.activeDegree = res.data.returnValue.activeDegree;
                        for (let i = 0; i < res.data.returnValue.taskAwardList.length; i++) {
                            let _item = res.data.returnValue.taskAwardList[i];
                            if (_item.state === 0) {
                                this.showDian = true;
                                return;
                            }
                        }
                    }
                })
            },
            // 获取用户信息
            getUserinfo() {
                this.api.getB({
                    url: 'user/getUserInfo',
                    params: {
                        userId: this.User.getMemberId(),
                    },
                    headers: {
                        token: this.User.getToken(),
                    }
                }).then((res) => {
                    if (res.data.successed) {
                        this.userInfo = res.data.returnValue;
                        this.$store.dispatch('SetLoginState', 1);
                    }
                })
            },
            changeServerAlert(state) {
                this.serverAlert = state;
            },
            goLogin() {
                this.$router.push({ path: '/login' })
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "./my";
</style>