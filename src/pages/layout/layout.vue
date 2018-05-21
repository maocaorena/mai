<template>
    <div id="layout">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {

            }
        },
        computed: {
            loginstate() {
                return this.$store.getters.loginstate;
            }
        },
        watch: {
            'loginstate': function (now, old) {
            }
        },
        methods: {
            loginSuccess(res) {//登录成功
                this.Storage.setItem('uf', res.data.returnValue);
                this.$store.dispatch('SetLoginState', 1);
            },
            loginFail() {//登录失败
                this.Storage.setItem('uf', {});
                this.Storage.setItem('loginDay', 111);
                this.$store.dispatch('SetLoginState', 2);
            },
            goNext() {
                this.api.getBn({
                    'url': 'appSystemSet/getAppWajiName',
                    params: {
                        appKey: this.User.getAppKey()
                    }
                }).then(res => {
                    if (res.data.successed) {
                        document.getElementsByTagName('title')[0].innerHTML = res.data.returnValue;
                    } else {
                        document.getElementsByTagName('title')[0].innerHTML = '娃娃机';
                    };
                }).catch(() => {
                    document.getElementsByTagName('title')[0].innerHTML = '娃娃机';
                })
            }
        },
        created() {
            let search = this.$route.query;
            console.log(search)
            if (search.appKey) {
                if (search.appKey !== this.User.getAppKey()) {
                    localStorage.clear();
                };
                if (typeof (search.appKey) != 'string') {
                    search.appKey = search.appKey[0]
                };
            };
            if (search.state) {
                this.Storage.setItem('uf', {});
                let allUrl = JSON.stringify(window.location.href);
                let _redicUrl = allUrl.slice(1, allUrl.indexOf(':')) + '://' + window.location.host;
                switch (search.state) {

                    case 'weixin':
                        this.$store.dispatch('WxLogin', {
                            code: search.code
                        }).then(res => { // 微信登录
                            console.log('微信登录成功');
                            this.loginSuccess(res);
                            location.replace(_redicUrl);
                        }).catch((type) => {
                            if (type === 1) {
                                this.loginFail()
                            };
                            console.log('微信登录失败');
                            location.replace(_redicUrl);
                        });
                        break;

                    case 'uc':
                        this.$store.dispatch('UcLogin', {
                            code: search.code
                        }).then(res => { // uc登录
                            console.log('uc登录成功');
                            this.loginSuccess(res);
                            location.replace(_redicUrl);
                        }).catch((type) => {
                            if (type === 1) {
                                this.loginFail()
                            };
                            console.log('uc登录失败');
                            location.replace(_redicUrl);
                        });
                        break;

                    case 'bd':
                        console.log('bd')
                        this.$store.dispatch('BdLogin', {
                            code: search.code
                        }).then(res => { // 百度登录
                            console.log('bd登录成功');
                            this.loginSuccess(res);
                            location.replace(_redicUrl);
                        }).catch((type) => {
                            if (type === 1) {
                                this.loginFail()
                            };
                            console.log('bd登录失败');
                            location.replace(_redicUrl);
                        });
                        break;
                    default:
                        break;
                }
            } else if (search.deviceId || this.Storage.getItemJson('urlMessage').deviceId) {
                // 开启游客模式
                this.$store.dispatch('SetMessage', {
                    code: 'visitMode',
                    message: 1
                });
                if (search.deviceId && search.deviceId != this.Storage.getItemJson('urlMessage').deviceId) {
                    this.Storage.setItem('uf', {});
                    this.Storage.setItem('urlMessage', {});
                    this.Storage.setItem('urlMessage', search);
                };
                if (search.appUid) {
                    /* 
                        进行游客免登录
                    */
                    this.$store.dispatch('AutoLogin').then(res => { // url免登录
                        console.log('游客免登录成功');
                        this.loginSuccess(res);
                        this.$store.dispatch('SetMessage', {
                            code: 'userType',
                            message: 1
                        });
                        this.$router.replace(this.$route.path)
                    }).catch((type) => {
                        console.log('游客免登录失败', );
                        if (type === 1) {
                            this.loginFail()
                        }
                    });
                } else {
                    /* 
                        进行游客登录
                    */
                    this.$store.dispatch('GetUserInfo').then(res => { // 获取用户信息
                        console.log('游客模式获取用户信息成功2', res);

                        if (res.data.returnValue.isVisitor == 1) {//游客
                            this.$store.dispatch('SetMessage', {
                                code: 'userType',
                                message: 2
                            });
                        } else {//正常用户
                            this.$store.dispatch('SetMessage', {
                                code: 'userType',
                                message: 1
                            });
                        }
                        this.loginSuccess(res);

                    }).catch((type) => {
                        if (type === 1) {

                            this.$store.dispatch('VisitorLogin').then(res => {
                                console.log('游客登录成功');
                                this.loginSuccess(res);
                                this.$store.dispatch('SetMessage', {
                                    code: 'userType',
                                    message: 2
                                });
                                this.$router.replace(this.$route.path)
                            }).catch((type) => {
                                if (type === 1) {
                                    this.loginFail()
                                }
                                console.log('游客登录失败');
                            });

                        };
                        console.log('获取用户信息失败2');
                    });
                };

            } else if (search.appUid) {
                this.Storage.setItem('uf', {});
                this.Storage.setItem('urlMessage', {});
                this.Storage.setItem('urlMessage', search);
                this.$store.dispatch('AutoLogin').then(res => { // url免登录
                    console.log('免登录成功');
                    this.loginSuccess(res);
                    console.log(this.$route.path)
                    this.$router.replace(this.$route.path)
                }).catch((type) => {
                    if (type === 1) {
                        this.loginFail()
                    }
                    console.log('免登录失败', );
                });
            } else {
                console.log('没有uid');
                if (search.appKey) {
                    console.log('有appKey');
                    if (search.appKey != this.User.getAppKey()) {
                        this.Storage.setItem('uf', {});
                    };
                    this.Storage.setItem('urlMessage', {});
                    this.Storage.setItem('urlMessage', search);
                };
                this.$store.dispatch('GetUserInfo').then(res => { // 获取用户信息
                    console.log('获取用户信息成功1');
                    this.loginSuccess(res);
                }).catch((type) => {
                    if (type === 1) {
                        this.loginFail()
                    }
                    console.log('获取用户信息失败1', );
                });
            };

            this.goNext();
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "./layout";
</style>