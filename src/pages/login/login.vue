<template>
    <div id="register" class="wrapper">
        <div class="content">
            <h3>手机号登录</h3>
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
            </div>
            <div class="button">
                <button type="button" name="button" class="login" @click="login">登录</button>
            </div>
            <div class="flex fu">
                <div class="item flex flex-sc">
                    <input class="my-choekbox" type="checkbox" v-model="agree">
                    <span class="agrement">我同意《用户协议》</span>
                </div>
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
					this.api.postB({
                        url: 'customer/sendMsgValidateCode',
                        params: {
                            mobile: this.mobile
                        }
                    }).then(res=>{
                        Indicator.close();
                        if(res.successed){
                            this.Util.myAlert("发送成功");
                            let cutTime = 60;
							that.cutdown = cutTime + "秒后重发";
			        		var myTime = setInterval(function() {
			        			cutTime--;
								that.cutdown = cutTime + "秒后重发";
								if(cutTime == 0) {
									clearInterval(myTime);
									that.cutdown = "获取验证码";
								}
							}, 1000);
                        }
                    })
				}
        	},
			login(){
				console.log('mobile:',this.mobile,'pw:',this.pw,'code:',this.code,'agree:',this.agree)
				if( !(/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) ){
					this.Util.myAlert("手机号码格式不正确");
				}else if( this.code.length === 0 ){
					this.Util.myAlert("请输入验证码");
				}else if( !this.agree ){
					this.Util.myAlert("请同意用户协议");
				}else{
					Indicator.open();
					this.api.postB({
                        url: 'customer/login',
                        params: {
                            mobile: this.mobile,
                            agentId: this.User.getAgentId(),
                            saleId: this.User.getSaleId(),
                        },
                        headers:{
                            msgValidateCode: this.code,
                        }
                    }).then(res=>{
                        Indicator.close();
						if(res.returnValue){
                            this.Util.myAlert("登录成功！");
                            this.Storage.setItem('uf', res.returnValue);
                            let loginFrom = this.Storage.getItem('loginFrom');
                            if(loginFrom){
                                this.Storage.removeItem('loginFrom')
                                this.$router.push({
                                    name: loginFrom
                                })
                            }else{
                                this.$router.push({
                                    name: 'home'
                                })
                            }
						}else{
							this.Util.myAlert(res.returnValue);
						}
                    })
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