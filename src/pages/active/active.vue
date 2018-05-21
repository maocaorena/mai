<template>
	<div id="active" class="wrapper">
		<img class="allbg" :src="gameBanner" alt="" />
		<div class="content">
			<div class="active-top">
				<div class="active-txt">
					{{gameIllustrate}}
				</div>
			</div>
			<div class="active-tit" v-if="state === 0 || state === 1 || state === 2">
				<div class="active-tit-top active-tit-top0">
					<router-link tag="p" to="/home" v-if="state === 0">
						即将开始,先热个身吧！
					</router-link>
					<router-link tag="p" to="/home" class="activeIng" v-if="state === 1">
						抓娃娃,抢大奖！
					</router-link>
					<router-link tag="p" to="/home" v-if="state === 2">
						前往娃娃机大厅
					</router-link>
					<img src="../../assets/img/active/btngif.gif" alt="" />
				</div>
			</div>
			<div class="active-tit" v-if="state === 3">
				<div class="active-tit-top active-tit-top1">
				</div>
			</div>

			<div class="active-main active-main3" v-if="state === 0 || state === 2">
				<div class="active-main-top">
					<div class="table-tit-row flex flex-sc">
						<div class="table-col1 text-align-c">

						</div>
						<div class="table-col2 text-align-c">
							用户名称
						</div>
						<div class="table-col3 text-align-c">
							累计抓取娃娃
						</div>
						<div class="table-col4 text-align-c">
							累计消费{{coinName}}
						</div>
					</div>
				</div>
				<div class="active-main-bottom1 flex-zhong">
					<span class="color-start" v-if="state === 0">即将开始</span>
					<span class="color-shenhe" v-if="state === 2">正在核对最后榜单成绩，<br />请耐心等待哦！</span>
				</div>
			</div>
			<div class="active-main active-main2" v-if="state === 1">
				<div class="active-main-top">
					<div class="table-tit-row flex flex-sc">
						<div class="table-col1 text-align-c">

						</div>
						<div class="table-col2 text-align-c">
							用户名称
						</div>
						<div class="table-col3 text-align-c">
							累计抓取娃娃
						</div>
						<div class="table-col4 text-align-c">
							累计消费{{coinName}}
						</div>
					</div>
				</div>
				<div class="active-main-bottom1">
					<div 
						class="table-row flex flex-sc br" 
						v-for="(item,index) of list" 
						:class="{bg1: index ===0,bg2: index ===1,bg3: index ===2,bg4: index > 2&&!item.isme,bg5: item.isme}">
						
						<div class="table-col1 text-align-c" :class="{'first-bg': index<3}">
							{{item.ranking || '-'}}
						</div>
						<div class="table-col2 text-align-c ellipsis">
							{{item.nickname || '虚位以待'}}
						</div>
						<div class="table-col3 text-align-c">
							{{item.winTimes || '-'}}
						</div>
						<div class="table-col4 text-align-c">
							{{item.spendWabi || '-'}}
						</div>
					</div>
					<div class="table-row flex flex-sc br bg5 my-grade" v-if="isHaveme === 1">
						<div class="table-col1 text-align-c" :class="{'first-bg': index<3}">
							未上榜
						</div>
						<div class="table-col2 text-align-c ellipsis">
							我的战绩
						</div>
						<div class="table-col3 text-align-c">
							{{myRechords.winTimes}}
						</div>
						<div class="table-col4 text-align-c">
							{{myRechords.spendWabi}}
						</div>
					</div>
					<p class="prize-hz" >
						排行榜数据每半小时更新一次<br />
						排行榜结果以活动结束时的最终榜单为准
					</p>
				</div>
			</div>

			<div class="active-main active-main1" v-if="state === 3">
				<div class="active-main-top">
					<div class="table-tit-row flex flex-sc">
						<div class="table-col1 text-align-c">
							
						</div>
						<div class="table-col2 text-align-c">
							用户名称
						</div>
						<div class="table-col3 text-align-c">
							累计抓取娃娃
						</div>
						<div class="table-col4 text-align-c">
							累计消费{{coinName}}
						</div>
					</div>
				</div>
				<div class="active-main-bottom1">
					<div 
						class="table-row flex flex-sc br" 
						v-for="(item,index) of list" 
						:class="{bg1: index ===0,bg2: index ===1,bg3: index ===2,bg4: index > 2&&!item.isme,bg5: item.isme}">
						<div class="table-col1 text-align-c" :class="{'first-bg': index<3}">
							{{item.ranking || '-'}}
						</div>
						<div class="table-col2 text-align-c ellipsis">
							{{item.nickname || '虚位以待'}}
						</div>
						<div class="table-col3 text-align-c">
							{{item.winTimes || '-'}}
						</div>
						<div class="table-col4 text-align-c">
							{{item.spendWabi || '-'}}
						</div>
					</div>
				</div>
				<div class="is-win" v-if="isMe === 1" @click="goSub">
					恭喜上榜，请提交信息>
				</div>
				<div class="no-win" v-if="isMe === 0">
					很遗憾，您未能上榜！
				</div>
			</div>
			<div class="active-rule-bg">
				
			</div>
			<div class="active-rule">
				<div class="active-rule-tit">
					<img src="../../assets/img/spring/active/explain.png"/>
				</div>
				<div class="active-rule-content" v-html="activityDetail">
					
				</div>
			</div>
			<shade v-if="showAlert">
				<div class="active-alert-content flex flex-s flex-sc">
					<img @click="close" class="wj-messageBox-close" src="../../assets/img/common/pop_close.png" alt="" />
					<img class="top-img" src="../../assets/img/spring/active/dialog.png" alt="" />
					<p class="active-alert-tit">
						恭喜您获得了 {{prizeMessage.awardName}}
					</p>
					<div class="active-alert-prize">
						<img :src="prizeMessage.awardImg" alt="" />
					</div>
					<div class="subButton flex-zhong" @click="goSub">
						提交信息
					</div>
				</div>
			</shade>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
	export default {
		data(){
			return{
				userId: this.User.getMemberId(),
				state: -1,//0 待开始    1 进行中 2待开奖中 3已结束 
				showAlert: false,
				isHaveme: 1,//榜单里是否有我
				isMe: -1,//我是否中奖
				gameBanner: '',
				prizeMessage: '',
				gameIllustrate: '',
				activeMessage: '',
				activityDetail: '',
				myRechords: {
					spendWabi: '-' ,
					userId: '' ,
					winTimes: '-'
				},
				coinName: '',
				list: []
			}
		},
		computed:{
			loginstate() {
				return this.$store.getters.loginstate;
			}
		},
		methods: {
			close(){
				this.showAlert = false;
			},
			goSub(){
				this.$router.push({path:'/active/subAdd',query:{id:this.prizeMessage.id,wwjid:this.activeMessage.id}})
			},
			handleMessage(message){//0 待开始    1 进行中 2待开奖  3已结束 
				switch (message){
					case 0:
						break;
					case 1:
						this.getRankingList();
						break;
					case 2:
						break;
					case 3:
						this.getRankingList();
						this.getPrize()
						break;
					default:
						break;
				};
			},
			getActiveInfo(){
				this.api.getB({
					url: 'wwjContest/getInfo',
					headers: {
						appKey: this.User.getAppKey(),
					}
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						this.activeMessage = _res.returnValue;
						this.state = _res.returnValue.activityState;
						this.gameBanner = _res.returnValue.gameBanner;
						this.gameIllustrate = _res.returnValue.gameIllustrate;
						this.activityDetail = _res.returnValue.activityDetail
						this.handleMessage(this.state)
					}else{
						
					}
				})
			},
			getRankingList(){
				this.api.getB({
					url: 'wwjContest/getRankingList',
					params:{
						wwjContestId: this.activeMessage.id,
					},
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						this.list = [];
						this.list.push(..._res.returnValue);
						if(this.loginstate == 1){
							this.getMyRecord(_res.returnValue)
						}
					}else{
						
					}
				})
			},
			getMyRecord(list){
				this.api.getB({
					url: 'wwjContest/getMyRecord',
					params:{
						wwjContestId: this.activeMessage.id,
						userId: this.User.getMemberId()
					},
					headers: {
						token: this.User.getToken(),
					}
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						if(_res.returnValue){
							this.myRechords = _res.returnValue;
							for (let i = 0; i < list.length; i++) {
								if(list[i].userId){
									if(list[i].userId == _res.returnValue.userId){
										this.isHaveme = -1;
										if( i >= 3 ){
											this.$set(list[i],'isme',true)
										}else{
											this.$set(list[i],'isme',false)
										}
										break;
									}else{
										this.$set(list[i],'isme',false)
									};
								}else{
									this.$set(list[i],'isme',false)
								}
							};
						}
					}else{
						
					}
				})
			},
			getAppCoinName(){
				this.api.getB({
					url: 'appSystemSet/getAppCoinName',
					params:{
						appKey: this.User.getAppKey(),
					},
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						this.coinName = _res.returnValue;
					}
				})
			},
			getPrize(){
				this.api.getB({
					url: 'wwjContest/getPrize',
					params:{
						wwjContestId: this.activeMessage.id,
						userId: this.userId
					},
					headers: {
						token: this.User.getToken(),
					}
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						if (_res.returnValue) {
							if (_res.returnValue.id) {
								this.isMe = 1;
								this.prizeMessage = _res.returnValue;
								if(this.Storage.getItem('isAlertPrize') != (this.activeMessage.id + '' + this.userId)){
									this.showAlert = true;
									this.Storage.setItem('isAlertPrize', (this.activeMessage.id + '' + this.userId))
								};
							};
						} else {
							this.isMe = 0;
							this.showAlert = false;
						}
					}
				})
			},
			closeAlert(){
				this.showAlert = false;
			}
		},
		created(){
			this.getAppCoinName();
			this.getActiveInfo();
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	@import './active';
</style>