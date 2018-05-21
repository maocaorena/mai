<template>
    <div id="ticketList" class="wrapper" :data="loginstate">
        <div class="banner">
            <img src="../../../assets/img/gzh/receive_title.png" alt="">
        </div>
        <div class="ticket-list">
            <div v-for="item of list" class="ticket-item flex flex-hlr flex-sc" :class="{'nouse':item.status == 0,'used':item.status == 1}">
                <p class="ticket-name">
                    <span class="top">{{item.viewName}}</span>
                    <span class="bottom">由 {{item.publicNumberName}} 提供</span>
                </p>
                <div class="now-btn" @click="goGet(item)"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {
                    this.getList();
                    this.getFirst();
                };
                return this.$store.getters.loginstate;
            }
        },
        methods: {
            goGet(key) {
                if(key.status == 0){
                    if(key.keyword){
                        this.$router.push({
                            path: '/focus',
                            query: {
                                key: key.publicNumberKey,
                                keyword: key.keyword,
                                name: key.publicNumberName,
                                qrCode: this.Util.ifWeixinTrue()? key.codeUrl: null
                            }
                        })
                    }else{
                        this.$router.push({
                            path: '/focus',
                            query: {
                                key: key.publicNumberKey
                            }
                        })
                    }
                }
            },
            getFirst(){
                this.api.getBn({
                    url: 'coupon/getCoupon',
                    params: {
                        userId: this.User.getMemberId(),
                    },
                    headers: {
                        token: this.User.getToken()
                    }
                }).then(res => {
                    if (res.data.successed) {
                        this.list.unshift({
                            viewName: '娃娃机兑换券',
                            status: 0,
                            publicNumberName: res.data.returnValue.ghname,
                            keyword: res.data.returnValue.keyword,
                            codeUrl: decodeURI(res.data.returnValue.qrcode_url)
                        });
                    }
                })
            },
            getList() {
                this.api.getBn({
                    url: 'coupon/getList',
                    params: {
                        userId: this.User.getMemberId(),
                        pageSize: 50,
                        pageNum: 1
                    },
                    headers: {
                        token: this.User.getToken()
                    }
                }).then(res => {
                    if (res.data.successed) {
                        this.list = res.data.returnValue.list
                    }
                })
            }
        },
        created() {

        }
    }
</script>
<style lang="scss">
    @import "./ticketList"
</style>