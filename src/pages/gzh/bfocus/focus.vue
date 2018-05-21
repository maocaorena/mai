<template>
    <div id="focus" class="wrapper">
        <div class="banner" @click="goList">
            <img src="../../../assets/img/gzh/guide_title.png" alt="">
        </div>
        <div class="main">
            <template v-if="isWX">
                <div class="step flex flex-s flex-sc">
                    <div class="tit">
                        Step1 打开微信 点击添加朋友
                    </div>
                    <div class="step-main flex-zhong">
                        <div class="left">
                            <img :src="qrCode" alt="">
                            <p>长摁识别二维码</p>
                        </div>
                        <div class="middle">
                            或
                        </div>
                        <div class="right">
                            <p>{{publicNumberName}}</p>
                            <button class="btn ticket-btn" :data-clipboard-text="publicNumberName">
                            </button>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <div class="step flex flex-s flex-sc">
                    <div class="tit">
                        Step1 打开微信 点击添加朋友
                    </div>
                    <div class="step-main">
                        <img class="img1" src="../../../assets/img/gzh/guide_1.png" alt="">
                    </div>
                </div>
                <div class="step flex flex-s flex-sc">
                    <div class="tit">
                        Step2 点击公众号 搜索添加“{{publicNumberName}}”
                    </div>
                    <div class="step-main">
                        <img class="img2" src="../../../assets/img/gzh/guide_2.png" alt="">
                    </div>
                </div>
            </template>

            <div class="step flex flex-s flex-sc step3">
                <div class="tit">
                    Step{{isWX?'2':'3'}} 
                    <span v-if="$route.query.keyword">公众号底部回复“{{$route.query.keyword}}”领取</span>
                    <span v-else>在公众号底部菜单栏中领取</span>
                </div>
                <div class="step-main">
                    <img class="img3" src="../../../assets/img/gzh/guide_3.png" alt="">
                </div>
            </div>
            <div class="search" v-if="!isWX">
                <button class="btn" :data-clipboard-text="publicNumberName">
                     一键复制名称 “ {{publicNumberName}} ”
                </button>
            </div>
        </div>
        <homepopup v-if="alertState" :upAlertStyle='alertItem' v-on:close="closeAlert()"></homepopup>
    </div>
</template>
<script>
    import homepopup from '../../popup/homePopup/homePopup.vue';
    import Clipboard from 'clipboard';
    import { Toast } from 'mint-ui';
    var clipboard = null;
    export default {
        data() {
            return {
                key: this.$route.query.key || '',
                publicNumberName: '',
                qrCode: '',
                isWX: this.Util.ifWeixinTrue(),
                alertState: false,
                alertItem: {
                    titImg: './static/img/pop_copy.png',
                    alertBg: './static/img/pop_new.png',
                    btnTxt: '好的',
                    clickType: 3,
                    isFun: this.openWx,
                    html: '<p style="font-size: 16px;font-weight: 600;color: #ff5a83;">快去关注公众号，<br/>  赢取免费游戏币吧！</p>',
                }
            }
        },
        components: {
            'homepopup': homepopup
        },
        methods: {
            openWx(){
                window.location.href = 'weixin://'
            },
            closeAlert(alertItem){
                this.alertState = false;
            },
            goList() {
                this.$router.push('/ticketList')
            },
            getGzh() {
                this.api.getBn({
                    url: 'publicNumber/getByKey',
                    params: {
                        key: this.key,
                    },
                }).then(res => {
                    if (res.data.successed) {
                        this.publicNumberName = res.data.returnValue.publicNumberName;
                        this.qrCode = res.data.returnValue.qrCode;
                    }
                })
            }
        },
        created() {
            if(this.$route.query.keyword){
                let _data = this.$route.query;
                this.publicNumberName = _data.name;
                this.qrCode = _data.qrCode;
            }else{
                this.getGzh();
            };
        },
        mounted() {
            this.$nextTick(() => {
                clipboard = new Clipboard('.btn');
                let _this = this;
                clipboard.on('success', function (e) {
                    e.clearSelection();
                    _this.alertState = true;
                });
                clipboard.on('error', function (e) {
                    Toast({
                        message: '复制失败，请长摁复制',
                        position: 'bottom',
                        duration: 2000
                    });
                });
            })
        },
        beforeDestroy() {
            clipboard.destroy();
        }
    }
</script>
<style lang="scss">
    @import "./focus"
</style>