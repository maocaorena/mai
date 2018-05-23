<template>
    <div id="sureOrder" class="wrapper">
        <div class="product flex">
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
        <div class="buyNUm flex flex-hlr flex-sc">
            <div class="color333 defaultFont">购买数量</div>
            <div class="flex flex-hlr">
                <div class="down" @click="down">-</div>
                <div>
                    <input type="number" @change="handle" v-model="num">
                </div>
                <div class="down" @click="up">+</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                num: 1
            }
        },
        created () {
            
        },
        methods: {
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

