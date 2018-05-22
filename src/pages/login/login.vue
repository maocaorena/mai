<template>
    <div id="login" class="wrapper">
        <div class="content">
            <div class="top flex-zhong">
            </div>
            <p class="txt color1 flex-zhong">手机号快速登录</p>
            <div class="login-border flex flex-hc">
                <Border class="login-border-in">
                    <div class="tel flex-zhong">
                        <input type="tel" v-model="mobile" placeholder="填写手机号" />
                    </div>
                    <div class="code flex-zhong">
                        <input type="tel" v-model="msgValidateCode" placeholder="填写验证码" />
                        <div class="send-code flex flex-sc" @click="sendCode">
                            {{codeTxt}}
                        </div>
                    </div>
                </Border>
            </div>
            <button class="login login1" @click="loginn">登录</button>
            <button class="login login2" @click="goHome">返回首页</button>
            <div class="thirdBottom" v-if="isUC||isWX">
                <div class="third-top">
                    <p>第三方登录</p>
                </div>
                <div class="third-list flex-zhong">
                    <div class="third-item flex flex-s flex-sc flex-hc" @click="wxLogin" v-if="isWX">
                    </div>
                    <div class="third-item flex flex-s flex-sc flex-hc" @click="ucLogin" v-if="isUC">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { md } from '@/assets/js/md5.js';
    export default {
        data() {
            return {
                codeTxt: '发送验证码',
                codeSwitch: true,
                mobile: '',
                msgValidateCode: '',
                timer: null,
                isWX: this.Util.ifWeixinTrue(),
                isUC: this.Util.ifUc()
            }
        },
        computed:{
            userType() {
                return this.$store.getters.userType;
            },
        },
        methods: {
            goHome() {
                this.$router.replace({ path: '/home' })
            },
            sendCode() {

                if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.Util.trim(this.mobile)))) {
                    this.Util.myAlert("手机号码格式不正确");
                } else {
                    if (this.codeSwitch) {
                        this.codeSwitch = false;
                        this.api.postC('user/sendMsgValidateCode', {
                            mobile: this.mobile
                        }).then((res) => {
                            if (res.data.successed) {
                                this.Util.myAlert('发送成功');
                                let num = 60;
                                this.codeTxt = num + 's后重发';
                                this.timer = setInterval(() => {
                                    num--;
                                    this.codeTxt = num + 's后重发';
                                    if (num === 0) {
                                        this.codeTxt = '发送验证码';
                                        clearInterval(this.timer);
                                        this.codeSwitch = true;
                                    }
                                }, 1000);
                            } else {
                                this.codeSwitch = true;
                                this.Util.myAlert(res.data.errorCode);
                            };
                        }).catch((error) => {
                            this.codeSwitch = true;
                        })
                    }
                }
            },
            loginn() {
                if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.mobile))) {
                    this.Util.myAlert("手机号码格式不正确");
                } else if (this.Util.trim(this.msgValidateCode).length < 1) {
                    this.Util.myAlert("请填写验证码");
                } else {
                    let _params = {
                        mobile: this.Util.trim(this.mobile),
                        appKey: this.User.getAppKey(),
                        appEntrance: this.User.getAppEntrance(),
                        pattern: this.Storage.pattern,
                        msgValidateCode: md.md5(this.Util.trim(this.msgValidateCode)),
                        appType: this.User.getAppType(),
                        idfa: this.Util.ifIos() ? this.User.getDeviceId() : '',
                        imei: this.Util.ifIos() ? '' : this.User.getDeviceId(),
                    };
                    this.api.postC('user/msgValidateCodeLogin', _params).then((res) => {
                        if (res.data.successed) {
                            clearInterval(this.timer);
                            if(this.userType === 2){
                                this.$store.dispatch('SetMessage',{
                                    code: 'userType',
                                    message: 1
                                });
                                let appInfo = this.User.getAppInfo();
                                appInfo.userType = 1;
                                this.Storage.setItem('urlMessage', appInfo)
                            }
                            this.Storage.setItem('uf', res.data.returnValue);
                            this.Util.myAlert("登录成功！");
                            this.$store.dispatch('SetLoginState', 1);
                            setTimeout(() => {
                                this.$router.replace({ path: '/home' });
                            }, 800)
                        } else {
                            this.Util.myAlert(res.data.errorCode);
                        };
                    })
                }
            },
            wxLogin() {
                let _reUrl = this.api.bxmUrl();
                let _wx = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx94336d8837243832&redirect_uri=" +
                    _reUrl + "&response_type=code&state=weixin&scope=snsapi_login#wechat_redirect";
                window.location.href = _wx;
            },
            ucLogin() {
                let _reUrl = this.api.bxmUrl();
                let _uc = 'https://activity.uc.cn/openaccount/authorize?response_type=code&app_id=502312&state=uc&redirect_uri=' + _reUrl;
                window.location.href = _uc;
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "./login";
</style>