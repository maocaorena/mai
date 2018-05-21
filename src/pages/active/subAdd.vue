<template>
	<div id="subAdd" class="wrapper">
		<div class="content">
			<p class="sub-tit">
				恭喜中奖，请尽快提交相关信息，以便工作人员联系您！提交后无法修改，请确认！
			</p>
			<div class="sendOrder">
				<div class="subAddr flex" @click="selectAddr">
					<div class="main">
						<p class="prize-name">
							<span>{{defaultAddr.consignee}}</span><span>{{defaultAddr.mobile}}</span>
						</p>
						<p class="prize-num">
							<span>{{defaultAddr.province}}{{defaultAddr.city}}{{defaultAddr.region}}</span>
							&nbsp;
							<span>{{defaultAddr.address}}</span>
						</p>
					</div>
					<div class="right flex-zhong">
						<img src="../../assets/img/addr/triangle.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<div class="receiveAddress-bottom flex-zhong bottom-bar">
			<button @click="save">确认提交</button>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				userId: this.User.getMemberId(),
				token: this.User.getToken(),
				appKey: this.User.getAppKey(),
				defaultAddr: {
					consignee: '',
					mobile: '',
					province: '',
					city: '',
					region: '',
					address: ''
				},//收货地址
				deliveryId: this.$route.query.addrid || '',//地址id
			}
		},
		methods: {
			selectAddr(){
				this.$router.push({
					path:'/my/receiveAddress',
					query:{
						isSelect:2,
						id: this.$route.query.id,
						wwjid: this.$route.query.wwjid
					}
				})
			},
			//获取默认地址
			getDefaultAddr(){
				Indicator.open();
				this.api.getB({
					url: 'deliveryAddress/getDefault',
					params: {
						userId: this.userId
					},
					headers:{
						token: this.token
					},
				}).then(res=>{
					Indicator.close();
					if(res.data.successed){
						if(res.data.returnValue){
							this.defaultAddr = res.data.returnValue;
							this.deliveryId = res.data.returnValue.id;
						}
					}
				})
			},
			//根据id获取地址详情
			getAddrById(){
				Indicator.open();
				this.api.getB({
					url: 'deliveryAddress/getById',
					params: {
						userId: this.userId,
						id: this.$route.query.addrid
					},
					headers:{
						token: this.token
					}
				}).then(res=>{
					Indicator.close();
					if(res.data.successed && res.data.returnValue){
						this.defaultAddr = res.data.returnValue;
						this.deliveryId = res.data.returnValue.id;
					}
				}).catch(()=>{
					Indicator.close();
				})
			},
			save(){
				if(this.deliveryId.length<=0){
					this.Util.myAlert('请选择地址')
				}else{
					Indicator.open();
					this.api.ajaxB({
						url: 'wwjContest/submitWinMessage',
						type: 'put',
						params: {
							id: this.$route.query.id,
							userId: this.userId,
							deliveryAddressId: this.deliveryId,
							wwjContestId: this.$route.query.wwjid,
						},
						headers: {
							token: this.token
						}
					}).then(res=>{
						Indicator.close();
						if(res.data.successed){
							Toast({
								message: '提交信息成功',
								position: 'bottom',
								duration: 1000
							});
							setTimeout(()=>{
								this.$router.go(-1);
							},800)
						}else{
							Toast({
								message: res.data.errorDesc,
								position: 'bottom',
								duration: 1000
							});
						}
					}).catch(()=>{
						Indicator.close();
					})
				}
			}
		},
		created() {
			if(this.$route.query.addrid){
				this.getAddrById();
			}else{
				this.getDefaultAddr();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/rem";
	#subAdd {
		width: 100%;
		height: 100%;
		background: #fff;
		.sub-tit {
			padding: st(36) st(32);
			color: #7e8b9e;
		}
		.sendOrder {
			padding-left: st(38);
			padding-right: st(26);
			width: 100%;
			height: auto;
			.subAddr {
				position: relative;
				padding-top: st(36);
				padding-bottom: st(30);
				width: 100%;
				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					border-bottom: 1px solid #d8d8d8;
					border-top: 1px solid #d8d8d8;
					width: 200%;
					height: 200%;
					-webkit-transform: scale(0.5);
					-ms-transform: scale(0.5);
					-o-transform: scale(0.5);
					transform: scale(0.5);
					-webkit-transform-origin: left top;
					-moz-transform-origin: left top;
					-ms-transform-origin: left top;
					transform-origin: left top;
				}
			}
			.main {
				width: st(642);
				height: auto;
				position: relative;
				.top {
					width: 100%;
					height: st(56);
					font-size: st(24);
					color: #999999;
				}
			}
			.right {
				position: absolute;
				right: 0;
				top: 0;
				width: st(100);
				height: 100%;
				img {
					width: st(18);
				}
			}
			.prize-name {
				width: 100%;
				//          height: st(62);
				padding-bottom: st(40);
				font-size: st(30);
				span {
					margin-right: st(74);
				}
			}
			.prize-num {
				width: 100%;
				font-size: st(26);
			}
		}
		.receiveAddress-bottom {
			width: 100%;
			height: st(100);
			button {
				position: relative;
				z-index: 10;
				width: st(672);
				height: st(84);
				background: #ff5b88;
				border-radius: st(20);
				text-align: center;
				font-size: st(28);
				border: 0;
				color: #FFF;
			}
		}
	}
</style>