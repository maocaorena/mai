<template>
	<div id="account" class="wrapper">
		<div class="content">
			<div class="account-top">
				<div class="account-userhead flex flex-sc flex-hsb">
					<img class="user-pic" src="../../assets/img/productDetail/1.png">
					<p class="userName ellipsis">您好，aaaasd多个</p>
				</div>
			</div>
            <div style="height: 10px"></div>
			<menu-bar :togo="'/my/rechargeRecords'" :icon="'icon-favor_light'" :height="50" :title="'账户余额'">
                <slot>
                    <span>（可用）</span> <span class="color333"> 1000.00</span>
                </slot> 
            </menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-recharge'" :height="50" :title="'充值'"></menu-bar>
			<menu-bar :togo="'/tab/account/receiptAddress'" :icon="'icon-sponsor'" :height="50" :title="'提现'" class="account-menubar" ></menu-bar>

			<menu-bar :togo="'/tab/account/aaaa'" :icon="'icon-dingdan'" :height="50" :title="'我的订单'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-edit'" :height="50" :title="'当天升级记录'"></menu-bar>
			<menu-bar :togo="'/my/receiveAddress'" :icon="'icon-location'" :height="50" :title="'地址管理'" class="account-menubar"></menu-bar>

			<menu-bar :togo="'/home'" :icon="'icon-pay'" :height="50" :title="'我的银行卡'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-lock'" :height="50" :title="'安全中心'" class="account-menubar" ></menu-bar>

			<menu-bar :togo="'/home'" :icon="'icon-share'" :height="50" :title="'分享'"></menu-bar>
			<menu-bar :togo="'/home'" :icon="'icon-settings'" :height="50" :title="'设置'" class="account-menubar"></menu-bar>
		</div>
	</div>
</template>

<script type="text/javascript">
	import menubar from './menubar.vue';//引入菜单跳转
	export default {
		name: "me",
		data () {
			return {
				userInfo : {},
				amount : 0
			}
		},
		components: {
			"menu-bar" : menubar
		},
		computed: {
			
		},
		methods:{
			getMyInfo(){
				console.log(User.getToken());
				let that = this;
				this.api.getUserInfo(User.getToken(),function(data){
					let res = data.data;
					console.log(res);
					if(res.successed){
						that.userInfo = res.returnValue;
						that.api.getAmount(User.getToken(),User.getAppKey(),function(data){
							let _res = data.data;
							if(_res.successed){
								that.amount = _res.returnValue;
							}
						})
					}else{
						Util.myAlert("请登录");
						// that.$router.push("/tab/account/login_account")
					}
				})
			}
		},
		created(){
			// this.getMyInfo();
		}
	}
</script>
<style lang="scss">
	@import './my'
</style>