<template>
    <div id="getMoney" class="wrapper">
        <div class="item">
            <p class="top green">
                可用余额（元）
            </p>
            <div class="bottom">
                1000.00
            </div>
        </div>

        <div class="item">
            <p class="top">
                到账银行
            </p>
            <div class="bottom">
                <input type="text">
            </div>
        </div>

        <div class="item">
            <p class="top">
                到账银行卡（姓名：王小二）
            </p>
            <div class="bottom">
                <input type="text">
            </div>
        </div>

        <div class="item">
            <p class="top">
                提现金额
            </p>
            <div class="bottom flex">
                <input type="number">
                <button>
                    全额
                </button>
            </div>
        </div>

        <div class="item">
            <p class="top">
                短信验证码
            </p>
            <div class="bottom">
                <input type="number">
            </div>
        </div>

        <br>

        <mt-button class="goCharge" @click.native="getMoney" type="primary">确定提现</mt-button>

        <MessageBox v-show="alertSate === 1" :tit="'提现说明'" :remark="'x'" v-on:close="close">
            <slot>
                <ul class="alertIn">
                    <li class="alertOne defaultFont color333"> ●提现金额：收益单笔汇出金额需为10元的整数倍，单日累计汇出最高金限额5万元</li>
                    <li class="alertOne defaultFont color333"> ●提现手续费：汇出单笔金额5000元以下，按5元/笔收取汇款手续费，大等于5000元为汇出金额千分之一，2019年1月1日前执行优惠政策2元/笔，不论金额大小</li>
                    <li class="alertOne defaultFont color333"> ●提取到账时间：申请后3个工作日内到账，一般在1个工作日内</li>
                    <li class="alertOne defaultFont color333"> ●提现行为请自觉遵守国家相关法规，如发现有套现等违法行为，平台将封锁账户并向相关监管部门举报</li>
                </ul>
            </slot>
        </MessageBox>
    </div>  
</template>
<script>
export default {
    data () {
        return {
            alertSate: 0
        }
    },
    created () {
        let _this = this;
        this.$store.commit('setRightBar',function(){
            _this.open()
        });
    },
    methods: {
        getMoney(){

        },
        close(){
            this.alertSate = 0
        },
        open(){
            this.alertSate = 1
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './getMoney'
</style>

