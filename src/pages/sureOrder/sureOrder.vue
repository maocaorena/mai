<template>
    <div id="sureOrder" class="wrapper">
        <div class="product flex mb">
            <div class="left">
                <img src="../../assets/img/productDetail/1.png" />
            </div>
            <div class="right">
                <div class="top color333">
                    商品名称商品名称商品名称商品名称商品名称商品名称
                </div>
                <div class="bottom flex flex-hlr flex-sc">
                    <p class="colorRed defaultFont">￥333</p>
                    <p class="color333">× {{num}}</p>
                </div>
            </div>
        </div>

        <div class="buyNum flex flex-hlr flex-sc mb">
            <div class="color333 defaultFont">购买数量</div>
            <div class="flex flex-hlr">
                <div class="down" @click="down">-</div>
                <div>
                    <input type="number" @change="handle" v-model="num">
                </div>
                <div class="down" @click="up">+</div>
            </div>
        </div>
        
        <div class="sendType mb">
            <div class="one flex flex-hlr">
                <div class="defaultFont color333">
                    配送方式
                </div>
                <div class="defaultFont colorRed">
                    快递 ￥10.00
                </div>
            </div>
            <div class="two flex flex-hlr">
                <div class="defaultFont color333">
                    收货人：张三
                </div>
                <div class="defaultFont color333">
                    1888888888888
                </div>
            </div>
            <div class="three color333 smallFont">
                收货地址：收货地址收货地址收货地址收货地址收货地址收货地址收货地址收货地址
            </div>
            <div class="jiantou">
                >
            </div>
        </div>

        <div class="getServer color2 mb">
            联系客服
        </div>

        <div class="allMount">
            <div class="flex flex-hlr mb">
                <p class="color333 defaultFont">
                    商品金额
                </p>
                <p class="colorRed defaultFont">
                    ￥2000
                </p>
            </div>
            <div class="flex flex-hlr">
                <p class="color333 defaultFont">
                    运费
                </p>
                <p class="colorRed defaultFont">
                    ￥20
                </p>
            </div>
        </div>

        <div class="bottom">
            <div class="bottomIn flex flex-sc flex-hlr">
                <p>
                    <span class="color666 defaultFont"> 合计： </span> 
                    <span class="colorRed defaultFont">￥3200.00</span>
                </p>
                <div class="buy flex-zhong" @click="buy">
                    提交订单
                </div>
            </div>
        </div>

        <MessageBox v-if="alertState === 1">
            <slot>
                <p class="alertOne defaultFont color333"> 您的储值账户余额不足，请充值！</p>
                <p class="alertOne defaultFont color333 mb"> 当前余额： <span class="colorRed">222222</span></p>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close">再想想</mt-button>
                    <mt-button type="primary" size="small">去充值</mt-button>
                </div>
            </slot>
        </MessageBox>

        <MessageBox v-if="alertState === 2">
            <slot>
                <p class="alertOne defaultFont color333"> 应国家政策要求，购买商品前请进行实名认证！</p>
                <p class="alertOne defaultFont color333">
                    <input type="text" placeholder="您的真实姓名">
                </p>
                <p class="alertOne defaultFont color333 mb">
                    <input type="number" placeholder="您的身份证号">
                </p>
                <br>
                <div class="buttons flex flex-hsb">
                    <mt-button type="default" size="small" @click="close">再想想</mt-button>
                    <mt-button type="primary" size="small">提交并完成购买</mt-button>
                </div>
            </slot>
        </MessageBox>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                num: 1,
                alertState: 2,
            }
        },
        created () {
            
        },
        methods: {
            close(){
                this.alertState = 0;
            },
            buy(){
                this.$router.push({
                    name: 'buySuccess'
                })
            },
            up() {
                this.num++;
                this.handle();
            },
            down() {
                this.num--;
                this.handle();
            },
            handle(){
                if(this.num > 99){
                    this.num = 99;
                };
                if(this.num < 1){
                    this.num = 1;
                };
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./sureOrder";
</style>

