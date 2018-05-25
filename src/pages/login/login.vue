<template>
    <div id="login" class="wrapper">
        <div class="content">
            <h3>手机账号登录</h3>
            <div class="list flex flex-s">
                <label for="userName" class="border-item flex">
                    <i class="iconfont icon-shoujihao"></i>
                    <input type="text" name="userName" v-model="mobile" value="" placeholder='手机号' id="userName">
                </label>
                <label for="password" class="border-item flex">
                    <i class="iconfont icon-mima1"></i>
                    <input type="passWord" name="userName" v-model="pw" value="" placeholder='密码' id="password">
                </label>
            </div>
            <div class="button">
                <button @click="login()" class="login">登录</button>
            </div>
            <div class="flex fu">
                <router-link to="/register">
                    忘记密码？
                </router-link>
                <router-link to="/register">
                    注册新用户
                </router-link>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { Toast } from 'mint-ui';
    export default{
        data(){
            return{
                mobile: '',
                pw: ''
            }
        },
        methods:{
            tan(){
                console.log(1111);
            },
            login(){
                console.log("qq",this.mobile,this.pw);
                if( !(/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) ){
					this.Util.myAlert("手机号码格式不正确");
				}else if( this.pw.length > 16 || this.pw.length<6 ){
					this.Util.myAlert("请输入6-16位密码");
				}else{
					// Indicator.open();
					// this.api.register(User.getAppKey(),this.mobile,this.pw,this.code,function(data){
					// 	Indicator.close();
					// 	let res= data.data;
					// 	if(res.returnValue){
					// 		Util.myAlert("注册成功！");
					// 	}else{
					// 		Util.myAlert(res.returnValue);
					// 	}
					// })
				};
            }
        },
        created(){
        },
        mounted(){
        }
    }
</script>
<style lang='scss' scoped>
    @import './login'
</style>