<template>
    <div id="share" class="wrapper">
        <p class="pd20 width100 tc">
            可以让其他人扫描下列二维码
            <br>
            也可以保存后发送给其他人
        </p>
        <div class="img-wrapper flex-zhong" id="qrcode">

        </div>
        <p class="pd20 width100 tc">
            推荐码：66668888
        </p>
    </div>
</template>
<script>
import code from 'qrcodejs2'
export default {
    data () {
        return {
            
        }
    },
    created () {
        this.api.getB({
            url: 'customer/getByToken',
            user: true
        }).then(res=>{
            if(res.successed){
            }else{
            }
        })
    },
    mounted() {
        // Toast({
        //     message: '请截屏后分享给朋友哦！',
        //     duration: 3000,
        //     className: 'shareToast'
        // });
        let allUrl = JSON.stringify(window.location.href);
        let _redicUrl = allUrl.slice(1, allUrl.indexOf("#")-1);
        let shareUrl = this.Util.goSearch(_redicUrl, {
            shareCode: this.User.getShareCode()
        }, 'n')
        console.log(shareUrl)
        let code1 = new code('qrcode');
        code1.makeCode(shareUrl);
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #share{

    }
</style>

