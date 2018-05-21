<template>
	<div id="appeal" class="wrapper">
		<div class="content">
			<ul class="prizeRecords">
				<li class="flex" v-for="(item,index) of list">
					<div class="middle">
						<p class="top ellipsis">{{item.txt}}</p>
					</div>
					<div class="right flex flex-sc" @click="selectThis(index)">
						<transition name="fade">
							<img v-show="index !== selectId" src="../../assets/img/myprize/choice_1.png" alt="" />
						</transition>
						<transition name="fade">
							<img v-show="index === selectId" src="../../assets/img/myprize/choice_2.png" alt="" />
						</transition>
					</div>
				</li>
			</ul>
		</div>
		<div class="playRechods-bottom flex-zhong bottom-bar">
			<button v-if="selectId>=0" class="appeal" @click="goAppeal">
				申诉
			</button>
			<button v-if="selectId<0" class="appeal gray">
				申诉
			</button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
	export default {
		data() {
			return {
				userId: this.User.getMemberId(),
				token: this.User.getToken(),
				list: [
					{
						txt: '网络问题，如联机中断',
						code: 1
					},
					{
						txt: '娃娃机故障（如卡住等）',
						code: 2
					},
					{
						txt: '摄像头故障（如黑屏、花屏等）',
						code: 3
					},
					{
						txt: '抓取成功但判定失败',
						code: 4
					},
					{
						txt: '其他',
						code: 5
					}
				],
				selectId: -1
			}
		},
		methods: {
			selectThis(idx) {
				this.selectId = idx;
			},
			goAppeal() {
				Indicator.open();
				this.api.postB({
					url: 'appealOrder/add',
					params: {
						oid: this.$route.query.gameid,
						userId: this.userId,
						appealReasonId: this.list[this.selectId].code,
					},
					headers:{
						token: this.token
					}
				}).then(res=>{
					Indicator.close();
					let _res = res.data;
                    if(_res.successed){
                    	Toast({
							message: '提交申诉成功',
							position: 'bottom',
							duration: 1000
						});
						setTimeout(()=>{
							this.$router.go(-2);
						},800)
                    }
				}).catch((error)=>{
					Indicator.close();
					Toast({
						message: '提交申诉失败，请稍后重试',
						position: 'bottom',
						duration: 1000
					});
				})
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	@import './appeal';
</style>