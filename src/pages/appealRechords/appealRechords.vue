<template>
	<div id="playRechods" class="wrapper" :data="loginstate">
		<div class="content">
			<ul class="prizeRecords page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
				<li class="flex page-infinite-listitem" v-for="(item,index) of list">
					<div class="left">
						<div class="left-in">
							<img :src="item.productPictureUrl" alt="" />
						</div>
					</div>
					<div class="middle">
						<p class="top ellipsis">{{item.productName}}</p>
						<p class="mp-row color1">{{item.created}}</p>
						<p class="mp-row color1">{{item.appealReason}}</p>
					</div>
					<div class="right flex flex-sc">
						<p :class="{wait:item.state==1,success:item.state==2||3,faild:item.state==4}">
							{{item.state | state}}
						</p>
					</div>
				</li>
			</ul>
			<p class="noMore flex-zhong" v-show="!noMore"> 
				<mt-spinner type="snake"> </mt-spinner>
			</p>
            <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
            <div v-if="list.length < 1 && noMore" class="defaultImg">
				<img src="../../assets/img/default/default12.png" alt="" />
				<p>
					您没有申诉记录呦~
				</p>
			</div>
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
		filters:{
			state(val){
				switch (val){
					case 1:
						return '处理中';
						break;
					case 2:
						return '归还娃娃';
						break;
					case 3:
						return '退换哇币';
						break;
					case 4:
						return '驳回申诉';
						break;
					default:
						break;
				}
			}
		},
		methods: {
			getList(){
				this.loading = true;
                this.api.getB({
                    url: 'appealOrder/getList',
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
                        if(_res.returnValue.list.length < 10){
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
	@import './appealRechords';
</style>