<template>
	<div class="swiper-container" id="homeSwipe">
		<div class="swiper-wrapper">
			<div class="swiper-in">
				<mt-swipe :auto="4000">
					<mt-swipe-item v-for="(item,index) of bannerList" :key="index">
						<img @click="goUrl(item)" style="width: 100%; height: 100%;" :src="item.img" alt="">
					</mt-swipe-item>
				</mt-swipe>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bannerList: [],
			}
		},
		methods:{
			// 获取banner
			getBanner() {
				this.api.getB({
					url: 'banner/getList',
					params: {
						position: 0,
						appKey: this.User.getAppKey(),
					}
				}).then((res) => {
					this.bannerList = res.data.returnValue;
				});
			},
			//banner跳转
			goUrl(item) {
				switch(item.linkMethod) {
					case 0:
						this.$router.push({
							path: '/outLink',
							query: {
								linkUrl: item.linkUrl
							}
						});
						break;
					case 1:
						this.$router.push({
							path: item.linkUrl,
						});
						break;
					default:
						break;
				}
			},
		},
		created(){
			this.getBanner();
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/rem";
	#homeSwipe {
        padding-bottom: st(40);
        width: 100%;
        .swiper-wrapper {
            margin: 0 auto;
            width: 100%;
            height: st(270);
        }
        .swiper-in {
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
</style>