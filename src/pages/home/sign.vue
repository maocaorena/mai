<template>
    <div class="middle" @click="goSign">
        签到
        <img v-if="signState === 0" src="../../assets/img/room_recharge_dot.png" alt="">
    </div>
</template>
<script>
    export default{
        data (){
            return{
                signState: 1,
            }
        },
        methods: {
            getSignDetail() {
                this.api.getB({
                    url: 'signIn/getSignDetail',
                    params: {
                        userId: this.User.getMemberId()
                    },
                    headers: {
                        token: this.User.getToken(),
                        appKey: this.User.getAppKey()
                    }
                }).then(res => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.signState = _res.returnValue.signedIn;
                    }
                })
            },
            goSign(){
                this.$router.push({
                    name: 'sign'
                })
            }
        },
        created () {
            this.getSignDetail();
        }
    }
</script>