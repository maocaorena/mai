<template>
    <div id="trueName" class="wrapper">
        <mt-field label="姓名" :disabled="disabled" placeholder="请输入您的姓名" v-model="username"></mt-field>
        <div class="line"></div>
        <mt-field label="身份证" :disabled="disabled" placeholder="请输入您的身份证号码" type="number" v-model="cardNum"></mt-field>
        <div class="line"></div>
        <br>
        <mt-button class="goCharge" @click.native="sure" type="primary">提交认证</mt-button>
    </div>
</template>
<script>
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                username: '',
                cardNum: '',
                disabled: false
            }
        },
        created() {
            this.getTrueName();
        },
        methods: {
            getTrueName(){
                Indicator.open();
                this.api.getB({
                    url: 'customer/getIdentityInfo',
                    user: true
                }).then(res=>{
                    Indicator.close();
                    if(res.successed){
                        if(res.returnValue.identityState == 1){
                            this.username = res.returnValue.name;
                            this.cardNum = res.returnValue.identityNumber;
                            this.disabled = true;
                        }
                    }
                })
            },
            sure(){
                if(this.Util.trim(this.username).length == 0){
                    this.Util.myAlert('请填写姓名')
                }else if(this.Util.trim(this.cardNum).length < 15){
                    this.Util.myAlert('请填写身份证号')
                }else{
                    this.api.postB({
                        url: 'customer/identityAuth',
                        params: {
                            name: this.Util.trim(this.username),
                            identityNumber: this.Util.trim(this.cardNum),
                        },
                        user: true
                    }).then(res=>{
                        if(res.successed){
                            this.Util.myAlert('认证成功！');
                            this.$router.go(-1)
                        }else{
                            this.Util.myAlert(res.errorDesc)
                        }
                    })
                }
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