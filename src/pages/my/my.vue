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