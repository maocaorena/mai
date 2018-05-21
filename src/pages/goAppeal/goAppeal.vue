<template>
	<div id="goAppeal" class="wrapper" :data="loginstate">
		<div class="content">
			<ul class="prizeRecords page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="color1 first">
					3天内的失败记录均可发起申述。
					若情况属实，工作人员将在1-3个工作日内执行退币或者归还娃娃的操作
				</li>
				<li class="flex page-infinite-listitem" v-for="(item,index) of list">
					<div class="left">
						<div class="left-in">
							<img :src="item.productPictureUrl" alt="" />
						</div>
					</div>
					<div class="middle">
						<p class="top ellipsis">{{item.productName}}</p>
						<p class="mp-row color1">{{item.gameTime}}</p>
						<p class="mp-row color1">{{item.gameResult==1?'抓取成功':'抓取失败'}}</p>
					</div>
					<div class="right" @click="slectThis(item)" v-if="item.gameResult!=1 && item.appealAble">
						<transition name="fade" mode="out-in">
							<img v-show="item.gameId == selectid" src="../../assets/img/myprize/choice_2.png" alt="" />
						</transition>
						<transition name="fade" mode="out-in">
							<img v-show="item.gameId != selectid" src="../../assets/img/myprize/choice_1.png" alt="" />
						</transition>
					</div>
				</li>
			</ul>
			<p class="noMore flex-zhong" v-show="!noMore"> <mt-spinner type="snake"></mt-spinner></p>
            <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
            <div v-if="list.length < 1 && noMore" class="defaultImg">
				<img src="../../assets/img/default/default9.png" alt="" />
				<p>
					您还没有游戏记录，不能申诉呦~
				</p>
			</div>
		</div>
		<div class="playRechods-bottom flex-zhong bottom-bar">
			<button v-show="selectid.length>0" @click="goNext">申诉</button>
			<button v-show="selectid.length<1" class="gray">申诉</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userId: this.User.getMemberId(),
				token: this.User.getToken(),
				list: [],
                loading: true,//控制加载，true会停止加载
				noMore: false,//没有更多
                pageNum: 1,
                selectid:'',
			}
		},
		computed:{
			loginstate(){
	        	if (this.$store.getters.loginstate > 0) {
					this.loading = false;
				};
	            return this.$store.getters.loginstate;
	        }
		},
		methods: {
			goNext(){
				if(this.selectid.length>0){
					this.$router.push({path:'/my/appeal',query:{
						gameid: this.selectid
					}})
				}
			},
			//选择此项
			slectThis(item) {
				this.selectid = item.gameId;
			},
			//获取游戏列表
			getList(){
				this.loading = true;
                this.api.getB({
                    url: 'order/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 10,
                        userId: this.userId,
                    },
                    headers:{
                        token: this.token
                    }
                }).then((res)=>{
                    let _res = res.data;
                    if(_res.successed){
                        this.list.push(..._res.returnValue.list);
                        if(_res.returnValue.list.length < 6){
							this.noMore = true;
						}else{
                            this.pageNum++;
							this.loading = false;
						};
                    }
                })
			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	@import './goAppeal';
</style>