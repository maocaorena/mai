<template>
    <div id="updatePw" class="wrapper">
        <mt-cell title="18336077777"></mt-cell>
        <div class="line"></div>
        <div class="item flex flex-hlr">
            <input class="width60" placeholder="请输入短信验证码" type="number">
            <button>发送验证码</button>
        </div>
        <div class="line"></div>
        <div class="item flex flex-hlr">
            <input class="width100" type="password" placeholder="请输入新密码">
        </div>
        <div class="line"></div>
        <div class="item flex flex-hlr">
            <input class="width100" type="password" placeholder="请再次输入新密码">
        </div>
        <br>
        <mt-button class="goCharge" @click.native="sure" type="primary">确定</mt-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {

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
    #updatePw{
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