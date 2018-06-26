<template>
	<div id="upLvResult" class="wrapper">
		<!--成功-->
		<template v-if="result=== 2">
			<p class=" color333 pd20 pb0 width100">
				预测选择： <span class="colorRed">{{message.customerSelect  == 0?'红灯':'绿灯'}}</span>
			</p>
			<p class=" color333 pd20 pb0 width100">
				游戏结果：<span class="colorRed">{{message.gameResult == 0?'红灯':'绿灯'}}</span>
			</p>
			<p class="colorRed pd20 largeFont tc">
				恭喜您中奖！
			</p>
			<br>
			<div class="buttons flex flex-hsb mb">
				<mt-button type="danger" @click="send">存黄金</mt-button>
				<mt-button type="danger">厂商回购</mt-button>
			</div>
		</template>
		<!--失败-->
		<template v-if="result === 3">
			<p class=" color333 pd20 pb0 width100">
				参与游戏： <span class="color333">超级红绿灯</span>
			</p>
			<p class=" color333 pd20 pb0 width100">
				预测选择： <span class="colorRed">{{message.customerSelect == 0?'红灯':'绿灯'}}</span>
			</p>
			<p class=" color333 pd20 pb0 width100">
				游戏结果：<span class="colorRed">{{message.gameResult == 0?'红灯':'绿灯'}}</span>
			</p>
			<p class="colorRed pd20 largeFont">
				升级失败！
			</p>
			<div class="middTip mb">
				<p class="top">
					我们会尽快为您购买的商品发货，请注意查收！
				</p>
				<div class="bottom smallFont">
					<p class="pd20 width100">
						购买商品：{{message.productName}}
					</p>
					<p class="pd20 width100 colorRed">
						单价：{{message.productPrice}}元 &nbsp;
						<span class="color333"> 数量：{{message.orderCount}} </span>
					</p>
				</div>
			</div>
			<br>
			<div class="bottons1 defaultStyle flex flex-hsb mb">
				<p @click="goHome">
					返回首页>
				</p>
				<p @click='goOrder'>
					查看订单>
				</p>
			</div>
		</template>
		<p class=" color333 pd20 pb0 width100">
            本次游戏结果数据
        </p>
        <div class="flex flex-hlr pd20 pb0">
            <p>{{message.gameData.dataSourceName}}：{{message.gameData.dataSourceValue}}</p>
            <p class="colorRed" >{{message.gameData.dataSourceValue.slice(-1)%2==1?'奇数亮红灯':'偶数绿灯亮'}}</p>
        </div>
	</div>
</template>
<script>
	import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
	export default {
		data() {
			return {
				result: 1,
				message: {
					stockIndexVo: {
						stockIndexOneValue: '',
						stockIndexTowValue: '',
						stockIndexThreeValue: ''
					}
				}
			}
		},
		created() {
			this.getResult();
		},
		methods: {
			goOrder() {
				this.$router.push({
					name: 'myOrder'
				})
			},
			goHome() {
				this.$router.push({
					name: 'home'
				})
			},
			send() {
				this.$router.push({
					name: 'sendResult',
					query: {
						oid: this.$route.query.oid
					}
				})
			},
			getResult() {
				Indicator.open();
				this.api.getB({
					url: 'customerOrder/getOrderGameResult',
					params: {
						id: this.$route.query.oid
					},
					user: true
				}).then(res => {
					Indicator.close();
					if(res.successed) {
						this.message = res.returnValue;
						this.result = res.returnValue.gameState;
					}
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import './upLvResult'
</style>