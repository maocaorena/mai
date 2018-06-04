<template>
	<div id="account" class="wrapper">
		<div class="content">
			<div class="account-top">
				<div class="account-userhead flex flex-sc flex-hsb">
                    <label class="smallHandle" for="upbanner">
					    <img class="user-pic" :src="userInfo.face">
                    </label>
                    <input type="file" id="upbanner" name="fileToUpload" class="fileToUpload" @change="upImg" accept="image/jpg,image/jpeg,image/png" />
					<p class="userName ellipsis">您好！{{userInfo.nickname || '请登录'}}</p>
				</div>
			</div>
            <div style="height: 10px"></div>
			<menu-bar :togo="'/my/rechargeRecords'" :icon="'icon-favor_light'" :height="50" :title="'账户余额'">
                <slot>  
                    <span>（可用）</span> <span class="color333"> {{userInfo.balance}}</span>
                </slot> 
            </menu-bar>
			<menu-bar :togo="'/my/recharge'" :icon="'icon-recharge'" :height="50" :title="'充值'"></menu-bar>
			<menu-bar :togo="'/my/getMoney'" :icon="'icon-sponsor'" :height="50" :title="'提现'" class="account-menubar" ></menu-bar>

			<menu-bar :togo="'/my/myOrder'" :icon="'icon-dingdan'" :height="50" :title="'我的订单'"></menu-bar>
			<menu-bar :togo="'/my/upRecords'" :icon="'icon-edit'" :height="50" :title="'当天升级记录'"></menu-bar>
			<menu-bar :togo="'/my/receiveAddress'" :icon="'icon-location'" :height="50" :title="'地址管理'" class="account-menubar"></menu-bar>

			<menu-bar :togo="'/my/myCards'" :icon="'icon-pay'" :height="50" :title="'我的银行卡'"></menu-bar>
			<menu-bar :togo="'/my/safeCenter'" :icon="'icon-lock'" :height="50" :title="'安全中心'" class="account-menubar" ></menu-bar>

			<menu-bar :togo="'/my/share'" :icon="'icon-share'" :height="50" :title="'分享'"></menu-bar>
			<menu-bar :togo="'/my/setting'" :icon="'icon-settings'" :height="50" :title="'设置'" class="account-menubar"></menu-bar>
		</div>
	</div>
</template>

<script type="text/javascript">
    import menubar from './menubar.vue'; //引入菜单跳转
    export default {
        name: "me",
        data() {
            return {
                userInfo: {
                    balance: '请登录'
                },
            }
        },
        components: {
            "menu-bar": menubar
        },
        computed: {

        },
        created() {
            this.getMyInfo();
        },
        mounted() {
        },
        methods: {
            
            upImg() { //上传banner
				let that = this;
				let reader = new FileReader();
				let input = document.getElementById("upbanner");
				let files = input.files;
				if(/image\/\w+/.test(files[0].type)) {
					reader.readAsDataURL(files[0]);
					reader.onload = function() {
						if(files[0].size > 512000) {
                            that.Util.myAlert('请选择小于500k的图片')
							input.value = '';
						} else {

							let param = new FormData();
							param.append('file', files[0], files[0].name);
							param.append('customerId', that.User.getUserId());
							param.append('userId', that.User.getUserId());
							//						param.get('file')
							that.api.postUp('customer/updateFace', param, function(res) {
								if(res.data.successed) {
									let _res = res.data.returnValue[0];
									// that.form.img = _res;
								} else {
                                    // that.form.img = '';
                                    that.Util.myAlert('上传失败，请重试')
								}
							}, function(res) {
								console.log('上传中...');
							}), function(err){
                                console.log(err)
                            };
						}
					};
				};
			},
            getMyInfo() {
                this.api.getBn({
                    url: 'customer/getByToken',
                    user: true
                }).then(res=>{
                    if(res.successed){
                        this.userInfo = res.returnValue;
                    }
                })
            }
        },
    }
</script>
<style lang="scss">
    @import './my'
</style>