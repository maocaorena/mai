<template>
    <div id="getAward" class="wrapper">
        <div class="banner" @click="ticketList">
            <img src="../../../assets/img/gzh/exchange_title.png" alt="">
        </div>
        <div class="ticket">
            <div class="ticket-name">
                券码兑换
            </div>
            <div class="ticket-code">
                <input type="text" v-model="redeemCode" placeholder="请输入兑换码，区分大小写">
            </div>
            <button class="btn ticket-btn" @click="getAward">
                兑换
            </button>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                redeemCode: '',
            }
        },
        methods: {
            ticketList(){
                this.$router.push('/ticketList')
            },
            getAward() {
                let _code = this.Util.trim(this.redeemCode)
                if(_code.length < 1){
                    Toast({
                        message: '请输入兑换码',
                        position: 'bottom',
                        duration: 2000
                    });
                }else{
                    this.api.getBn({
                        url: 'redeemCode/receiveRedeemCode',
                        params: {
                            appKey: this.User.getAppKey(),
                            userId: this.User.getMemberId(),
                            redeemCode: _code,
                        },
                        headers:{
                            token: this.User.getToken()
                        }
                    }).then(res => {
                        if (res.data.successed) {
                            switch (res.data.returnValue.state) {
                                case 0:
                                    this.$router.push({
                                        path:'/my/getAwardResult',
                                        query: {
                                            name: res.data.returnValue.description
                                        }
                                    })
                                    break;
                                case 1:
                                    Toast({
                                        message: res.data.returnValue.description,
                                        position: 'bottom',
                                        duration: 2000
                                    });
                                    break;
                                default:
                                    break;
                            };
                        } else {
                            Toast(res.data.errorDesc);
                        };
                    });
                };
            }
        },
        created() {

        }
    }
</script>
<style lang="scss">
    @import "./getAward"
</style>