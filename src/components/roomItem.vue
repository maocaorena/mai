<template>
	<div class="roomItem">
		<div class="img">
			<img v-lazy.container="message.product.productPictureUrl" alt="">
			<!--<img :src="message.product.productPictureUrl" alt="">-->
		</div>
		<div class="name ellipsis">
			{{message.product.productName}}
		</div>
		<div class="price">
			{{message.product.productCurrentPrice}}{{message.coinName}}/次
		</div>
		<div v-if="message.device.deviceState==1" class="room-state kongxian flex-zhong">
			<img src="../assets/img/home/home_free.png" alt="" /> 空闲中
		</div>
		<div v-if="message.device.deviceState==0" class="room-state playing flex-zhong">
			<img src="../assets/img/home/home_play.png" alt="" /> 游戏中
		</div>
		<div v-if="message.device.deviceState==-1" class="room-state weixiu flex-zhong">
			<img src="../assets/img/home/home_repair.png" alt="" /> 维修中
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: [
			'message'
		],
		created() {
			// this.Util.cm(this.message)
		},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "../assets/scss/rem";
	.roomItem {
		width: 100%;
		height: 100%;
		padding: 0 st(38);
		position: relative;
		z-index: 10;
		.img {
			padding-top: 1px;
			width: st(254);
			height: st(290);
			img {
				width: st(250);
				height: st(250);
			}
		}
		.name {
			width: st(254);
			height: st(50);
			font-size: st(26);
			color: #7e8b9e;
			font-weight: 600;
		}
		.price {
			width: st(254);
			height: st(48);
			/*border-bottom: 1px solid #e2e2e2;*/
			font-size: st(26);
			color: #ff5b88;
			font-weight: 900;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				border-bottom: 1px solid #e2e2e2;
				;
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
		.room-state {
			width: st(254);
			height: st(70);
			text-align: center;
			font-size: st(24);
			img {
				width: st(30);
			}
		}
		.kongxian {
			color: #5dd57d;
		}
		.weixiu {
			color: #b7b7b7;
		}
		.playing {
			color: #39c8fa;
		}
	}
</style>