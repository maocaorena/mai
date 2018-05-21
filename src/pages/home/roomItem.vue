<template>
	<div class="roomItem flex flex-hlr">
		<div class="roomItem-in" v-for="(item,index) of message" @click="goDetail(item)">
			<div class="img">
				<img v-lazy.container="item.product.productPictureUrl" alt="">
			</div>
			<div class="name ellipsis">
				{{item.product.productName}}
			</div>
			<div v-if="item.device.deviceState==1" class="room-state kongxian flex-zhong">
				<i class="iconfont icon-kongxianzhong"></i>&nbsp;空闲中
			</div>
			<div v-if="item.device.deviceState==0" class="room-state playing flex-zhong">
				<i class="iconfont icon-youxizhong"></i> 游戏中
			</div>
			<div v-if="item.device.deviceState==-1" class="room-state weixiu flex-zhong">
				<i class="iconfont icon-weixiuzhong"></i> 维修中
			</div>
			<div class="price">
				{{item.product.productCurrentPrice}}{{item.coinName}}/次
			</div>
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
		methods:{
			//进入房间
			goDetail(item) {
				this.$router.push({
					path: '/home/waji',
					query: {
						roomId: item.roomId,
					}
				})
			},
		},
		created() {
		},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "./roomItem";
</style>