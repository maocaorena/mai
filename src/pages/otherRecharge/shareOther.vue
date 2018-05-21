<template>
    <div id="shareOther" class="wrapper">
        <div class="content flex flex-s flex-sc">
            <h1 class="share-tit">{{this.$route.query.nn}}的代充邀请</h1>
            <div class="banner">
                <img class="user-head" :src="face" alt="" />
                <img class="banner-img" src="../../assets/img/recharge/beg2.png" />
            </div>
            <div class="share-code-in">
                <div class="share-code-bottom">

                </div>
                <div class="share-code-top">
                    <div class="img-wrapper flex-zhong" id="qrcode">

                    </div>
                    <p class="txt">
                        {{item.txt}}
                    </p>
                </div>
            </div>
            <!--<div class="img-finger">
				<img src="../../assets/img/recharge/beg_press.png" alt="" />
			</div>-->
            <div class="tip">
                长按识别二维码，助我抓娃娃
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import code from 'qrcodejs2'
    export default {
        data() {
            return {
                face: this.User.getMemberInfo().face,
            }
        },
        computed: {
            list() {
                return this.$store.getters.otherRechargeList
            },
            item() {
                let _list = this.$store.getters.otherRechargeList;
                for (let i = 0; i < _list.length; i++) {
                    if (_list[i].id == this.$route.query.itemId) {
                        return _list[i];
                    }
                }
            }
        },
        methods: {},
        created() {

        },
        mounted() {
            Toast({
                message: '请截屏后分享给朋友哦！',
                duration: 3000,
                className: 'shareToast'
            });
            let that = this;
            try {
                let _redicUrl = this.api.bxmShareUrl() + '/#/replaceRecharge';
                let _search = this.$route.query;
                _search.appKey = this.User.getAppKey();
                let shareUrl = this.Util.goSearch(_redicUrl, _search, 'n')
                console.log(shareUrl)
                let code1 = new code('qrcode');
                code1.makeCode(shareUrl);
            } catch (e) {
                if (typeof (e) == 'object') {
                    alert(JSON.stringify(e))
                } else {
                    alert(e)
                }
                let _redicUrl = this.api.bxmShareUrl() + '/#/replaceRecharge';
                let _search = this.$route.query;
                let shareUrl = this.Util.goSearch(_redicUrl, _search, 'n')
                alert(shareUrl);
                let code2 = new code('qrcode');
                code2.makeCode('shareUrl');
            }
        }
    }
</script>

<style lang="scss">
    @import "./shareOther";
</style>