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
        background: url(../../assets/img/home/home_list.png) no-repeat center st(214);
        -webkit-background-size: st(726) st(92);
        background-size: st(726) st(92);
        .swiper-wrapper {
            margin: 0 auto;
            width: st(724);
            height: st(270);
            border: st(2) solid #ff7b8b;
            border-radius: st(50);
        }
        .swiper-in {
            position: relative;
            padding: st(2);
            width: 100%;
            height: 100%;
            border: st(4) solid #ff7b8b;
            border-radius: st(48);
        }
        .mint-swipe {
            overflow: initial;
            border-radius: st(44);
        }
        .mint-swipe-items-wrap {
            border-radius: st(44);
            overflow: hidden;
            z-index: 10;
        }
        .mint-swipe-item {
            overflow: hidden;
            background: #ccc;
            display: inline-block!important;
            img {}
        }
        .mint-swipe-indicators {
            z-index: 100;
            bottom: st(-30);
        }
        .mint-swipe-indicators {
            .mint-swipe-indicator {
                width: st(18);
                height: st(10);
                background: url(../../assets/img/home/home_dot1.png);
                opacity: 1;
                border-radius: 0;
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
            }
            .is-active {
                background: url(../../assets/img/home/home_dot2.png);
                -webkit-background-size: 100% 100%;
                background-size: 100% 100%;
            }
        }
    }
</style>