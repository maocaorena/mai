<template>
    <div id="getAwardResult" class="wrapper flex flex-s flex-sc">
        <img src="../../../assets/img/recharge/success.png" alt="">
        <p class="success-tip">兑换成功！</p>
        <div class="ticket-item flex flex-hlr flex-sc nouse">
            <p class="ticket-name">{{$route.query.name}}</p>
            <div class="now-btn">已兑换</div>
        </div>
        <p class="bottom-tip">相关福利已存进您账户~</p>
        <button class="ticket-btn" @click="goBack()">
            继续兑换
        </button>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            goBack(){
                this.$router.push('/ticketList')
            }
        },
        created() {

        }
    }
</script>
<style lang="scss">
    @import "./getAwardResult"
</style>