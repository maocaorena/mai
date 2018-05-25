<template>
    <div id="register" class="wrapper">
        <div class="content">
            <h3>注册</h3>
            <div class="list flex flex-s">
                <label for="userName" class="border-item flex">
                    <i class="iconfont icon-shoujihao"></i>
                    <input type="text" name="userName" v-model="mobile" placeholder='手机号' id="userName">
                </label>
                <label for="code" class="border-item flex">
                    <i class="iconfont icon-yanzhengma"></i>
                    <input type="text" name="userName" v-model="code" placeholder='短信验证码' id="code">
                    <div v-if="cutdown === '获取验证码'" class="get-code" @click="getCode">{{cutdown}}</div>
                    <div v-else class="get-code get-code-gray">{{cutdown}}</div>
                </label>
                <label for="password" class="border-item flex">
                    <i class="iconfont icon-mima1"></i>
                    <input type="password" name="userName" v-model="pw" placeholder='密码' id="password">
                </label>
            </div>
            <div class="button">
                <button type="button" name="button" class="login" @click="register">注册</button>
            </div>
            <div class="flex fu">
                <div class="item flex flex-sc">
                    <input class="my-choekbox" type="checkbox" v-model="agree">
                    <span class="agrement">我同意《用户协议》</span>
                </div>
                <router-link class="item" to="/login">
                    	已注册去登录
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    export default{
        data(){
            return{
				mobile : '',
				pw : '',
				code : '',
				agree : true,
				cutdown : '获取验证码'
            }
        },
        methods:{
        	getCode(){
        		let that = this;
        		if( !(/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) ){
					this.Util.myAlert("手机号码格式不正确");
				}else{
					Indicator.open();
					// this.api.registerGetCode(this.mobile,1,function(data){
					// 	let res= data.data;
					// 	Indicator.close();
					// 	if(res.returnValue){
					// 		Util.myAlert(res.returnValue);
					// 		let cutTime = 10;
					// 		that.cutdown = cutTime + "秒后重发";
			        // 		var myTime = setInterval(function() {
			        // 			cutTime--;
			        // 			console.log('0000');
					// 			that.cutdown = cutTime + "秒后重发";
					// 			if(cutTime == 0) {
					// 				clearInterval(myTime);
					// 				that.cutdown = "获取验证码";
					// 			}
					// 		}, 1000);
					// 	}else{
					// 		Util.myAlert('发送失败，请稍后重试');
					// 	}
					// })
				}
        	},
			register(){
				console.log('mobile:',this.mobile,'pw:',this.pw,'code:',this.code,'agree:',this.agree)
				if( !(/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) ){
					this.Util.myAlert("手机号码格式不正确");
				}else if( this.code.length === 0 ){
					this.Util.myAlert("请输入验证码");
				}else if( this.pw.length > 16 || this.pw.length<6 ){
					this.Util.myAlert("请输入6-16位密码");
				}else if( !this.agree ){
					this.Util.myAlert("请同意用户协议");
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
    @import './register'
</style>