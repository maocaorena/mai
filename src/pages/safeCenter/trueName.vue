<template>
    <div id="trueName" class="wrapper">
        <mt-field label="姓名" placeholder="请输入您的姓名" v-model="username"></mt-field>
        <div class="line"></div>
        <mt-field label="身份证" placeholder="请输入您的身份证号码" type="number" v-model="cardNum"></mt-field>
        <div class="line"></div>
        <br>
        <mt-button class="goCharge" @click.native="sure" type="primary">提交认证</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                cardNum: ''
            }
        },
        created() {

        },
        methods: {
            sure(){

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #trueName{
        .item{
            background: #fff;
            padding: st(20);
            input{
                padding: st(10);
                border: 1px solid #ccc;
            }
            .width60{
                width: 60%;
            }
            button{
                width: 30%;
                border: none;
                background: #409eff;
                color: #fff;
                border-radius: st(8);
            }
        }
        .goCharge{
            display: block;
            width: 90%;
            margin: 0 auto;
        }
    }
</style>