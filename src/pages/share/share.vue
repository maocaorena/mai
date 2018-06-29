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
            推荐码：{{message.shareCode}}
        </p>
    </div>
</template>
<script>
import code from 'qrcodejs2';
import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
export default {
    data () {
        return {
            message: {
                
            }
        }
    },
    created () {
    },
    mounted() {
        this.getCode()
        // Toast({
        //     message: '请截屏后分享给朋友哦！',
        //     duration: 3000,
        //     className: 'shareToast'
        // });
        
    },
    methods: {
        getCode(){
            Indicator.open();
            this.api.getB({
                url: 'customer/getChannelInfo',
                user: true
            }).then(res => {
                Indicator.close();
                if (res.successed) {
                    this.message = res.returnValue;
                    let code1 = new code('qrcode');
                    code1.makeCode(this.message.shareLink);
                }
            }).catch(error=>{
                console.log('sss',error)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #share{

    }
</style>

