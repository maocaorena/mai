<template>
    <div id="waja" :data="loginstate">
        <w-room v-if="isShow" :user-id="userId" :token="token" :im-accid="imAccid" :im-token="imToken" :room-id="roomId" :user-name="userName"
            :user-pic-url="userPicUrl" :newNum="newNum" v-on:goRecharge='goRecharge()' v-on:noLogin='noLogin()' ref="wajiroom"></w-room>
        <shade v-if="goLogin">
            <div class="login-alert">
                <p>
                    登录之后才可以哦~~
                </p>
                <div class="buttons flex flex-hc">
                    <button class="no" @click="isLogin(1)">我再看看</button>
                    <button class="yes" @click="isLogin(2)">去登录</button>
                </div>
            </div>
        </shade>
        <bxmloading v-if="allLoading"></bxmloading>
    </div>
</template>

<script>
    import WRoom from '@/waji/components/wajiRoom.vue';
    import bxmloading from '@/components/loading.vue';
    export default {
        data() {
            return {
                userId: '',
                token: '',
                imAccid: '',
                imToken: '',
                roomId: this.$route.query.roomId + '',
                userName: '',
                userPicUrl: '',
                newNum: 0,
                isShow: false,
                goLogin: false,
                allLoading: false
            }
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {
                    this.goDetail();
                };
                return this.$store.getters.loginstate;
            },
            visitMode() {
                return this.$store.getters.visitMode;
            }
        },
        components: { WRoom, bxmloading },
        watch: {
            '$route.query.roomId': function () {
                this.roomId = this.$route.query.roomId;
                this.isShow = false;
                setTimeout(() => {
                    this.isShow = true;
                }, 300)
            }
        },
        methods: {
            goRecharge() {
                if (this.token.length < 1) {
                    this.noLogin()
                } else if( this.visitMode == 1 ){
                    this.$router.push({
                        name: 'ticketList'
                    })
                } else {
                    this.Storage.setItem('tr', this.$route.fullPath)
                    this.api.goRecharge();
                };
            },
            //进入房间
            goDetail() {
                this.allLoading = true;
                // 获取用户信息
                this.api.getBn({
                    url: 'user/getUserInfo',
                    params: {
                        userId: this.User.getMemberId(),
                    },
                    headers: {
                        token: this.User.getToken(),
                    }
                }).then((res) => {
                    this.allLoading = false;
                    if (res.data.successed) {
                        this.imAccid = res.data.returnValue.imAccid + '';
                        this.imToken = res.data.returnValue.imToken + '';
                        this.userId = this.User.getMemberId() + '';
                        this.token = this.User.getToken() + '',
                            this.userName = this.User.getMemberInfo().nickname,
                            this.userPicUrl = this.User.getMemberInfo().face,
                            this.isShow = true;
                        this.$store.dispatch('SetFreeCount', res.data.returnValue.userFreeCount)
                        this.$store.dispatch('AddPvUv', 1)
                    } else {
                        this.isShow = true;
                    }
                })
            },
            noLogin() {
                this.goLogin = true;
            },
            isLogin(type) {
                switch (type) {
                    case 1:
                        this.goLogin = false;
                        break;
                    case 2:
                        this.api.noLogin();
                        break;
                    default:
                        break;
                }
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #waja {
        width: st(750);
        overflow: hidden;
        .login-alert {
            padding-top: st(102);
            padding-bottom: st(40);
            width: st(606);
            background: #fff;
            border-radius: st(20);
            p {
                width: 100%;
                height: st(150);
                padding: 0 st(52);
                font-size: st(28);
                span {
                    color: #ff5b88;
                }
            }
            .buttons {
                width: 100%;
                height: st(90);
                button {
                    width: st(234);
                    height: st(82);
                    border: 0;
                    color: #fff;
                    border-radius: st(10);
                }
                .no {
                    background: #c1cbda;
                    margin-right: st(32);
                }
                .yes {
                    background: #ff5b88;
                }
            }
        }
    }
</style>