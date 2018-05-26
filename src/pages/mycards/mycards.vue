<template>
    <div id="myCards" class="wrapper">
        <div class="list width100">
            <div class="item width100 pd20 bg1 flex mb" v-for="item of 6">
                <div class="img">
                    <img src="../../assets/img/productDetail/1.png" alt="">
                </div>
                <div class="rigth">
                    <div class="one pd20">
                        中国邮政储蓄银行（尾号 8888）
                    </div>
                    <div class="one pd20 color999">
                        借记卡
                    </div>
                </div>
            </div>
        </div>
        <p class="width100 tc pd20 color999">
            银行卡为提现使用
        </p>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    created () {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    @import './myCards'
</style>
