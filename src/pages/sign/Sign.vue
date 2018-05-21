<template>
    <div id="sign" :data="loginstate" class="wrapper">
        <div class="banner">
            已连续签到{{signDay}}天
        </div>
        <div class="list-wrapper" v-if="signList.length > 0">
            <div class="list-row flex flex-hlr">
                <div class="sign-item" :class="{'sign-item1':item.id <= signDay,'sign-item3': index===2}" v-for="(item, index) of signList" v-if="index < 3">
                    <p class="day">第 {{item.id}} 天</p>
                    <p class="money flex flex-hc">
                        <i class="iconfont icon-jinbi"></i>+{{item.amount}}</p>
                    <div class="selected">
                        <img src="@/assets/img/sign/signin_get.png" alt="">
                    </div>
                </div>
            </div>

            <div class="list-row flex flex-hlr">
                <div class="sign-item" :class="{'sign-item1':item.id <=signDay} " v-for="(item, index) of signList" v-if="index >= 3 && index < 6">
                    <p class="day">第 {{item.id}} 天</p>
                    <p class="money flex flex-hc">
                        <i class="iconfont icon-jinbi"></i>+{{item.amount}}</p>
                    <div class="selected">
                        <img src="@/assets/img/sign/signin_get.png" alt="">
                    </div>
                </div>
            </div>

            <div class="list-row flex flex-hlr">
                <div class="sign-item sign-item-last" :class="{'sign-item1':signList[6].id <= signDay}">
                    <p class="day">第 {{signList[6].id}} 天</p>
                    <p class="money flex flex-hc">
                        <i class="iconfont icon-jinbi"></i>+{{signList[6].amount}}</p>
                    <div class="selected">
                        <img src="@/assets/img/sign/signin_get.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="btn btn1" @click="signIn" v-if="todyIsSign === 0">
            签到
        </div>
        <div class="btn btn2" v-if="todyIsSign === 1" @click="signIn">
            已签到
        </div>
        <homepopup v-if="alertState" :upAlertStyle='alertConfig' v-on:close="closeAlert()"></homepopup>
    </div>
</template>
<script>
    import homepopup from '../popup/homePopup/homePopup.vue';
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                signDay: '',
                todyIsSign: -1,
                signList: [],
                signState: 0,
                alertConfig: {
                    titImg: './static/img/sign/pop_signin.png',
                    btnTxt: '确定',
                    clickType: 1,
                    html: '',
                },
                alertState: false
            }
        },
        computed: {
            loginstate() {
                let _loginstate = this.$store.getters.loginstate;
                if (_loginstate > 0) {
                    this.getSignDetail()
                };
                return _loginstate;
            }
        },
        components: {
            'homepopup': homepopup
        },
        created() {

        },
        methods: {
            closeAlert(){
                this.alertState = false;
            },
            showAlert(num) {
                this.alertState = true;
                this.alertConfig.html = '<p style="position:relative;top:' + this.Util.st(20) + ';font-size: 26px;color: #ff5b88;">+' + num + ' <i class="iconfont icon-jinbi" style="font-size:22px;"></i></p><br />'
            },
            signIn() {
                if(this.signState == 0){
                    Indicator.open();
                    this.api.postB({
                        url: 'signIn/signIn',
                        params: {
                            userId: this.User.getMemberId()
                        },
                        headers: {
                            token: this.User.getToken(),
                            appKey: this.User.getAppKey()
                        }
                    }).then(res=>{
                        Indicator.close();
                        let _res = res.data;
                        if (_res.successed) {
                            this.showAlert(_res.returnValue);
                            this.getSignDetail();
                        }else{
                            Toast({
                                message: res.data.errorDesc,
                                position: 'bottom',
                                duration: 2000
                            });
                        }
                    })
                }else{
                    Toast({
                        message: '亲，今天已签过了，明天再来吧~',
                        position: 'bottom',
                        duration: 2000
                    });
                }
            },
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
                        this.signDay = _res.returnValue.day;
                        this.signState = _res.returnValue.signedIn;
                        this.signList = _res.returnValue.signInVos;
                        this.todyIsSign = _res.returnValue.signedIn;
                    }
                })
            }
        },
    }
</script>
<style lang="scss">
    @import "./Sign"
</style>