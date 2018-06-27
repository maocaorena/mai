<template>
    <div class="swiper-container" id="homeSwipe">
        <div class="swiper-wrapper">
            <div v-for="(item,index) of bannerList" :key="index" class="swiper-slide ellipsis">
                <img @click="goUrl(item)" :src="item.img" alt="">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import '@/lib/swiper/swiper.min.js';
    import '@/lib/swiper/swiper.min.css';
	export default{
		data(){
			return{
				bannerList: [],
			}
		},
		methods:{
			// 获取banner
			getBanner() {
				this.api.getBn({
					url: 'banner/getList',
					params: {
                        position: 0,
                        pageIndex: 0
					}
				}).then((res) => {
					this.bannerList = res.returnValue;
				}).then(()=>{
                    this.$nextTick(()=>{
                        let mySwiper = new Swiper('#homeSwipe', {
                            speed: 300,
                            loop: true,
                            autoplay: 1000,
                            autoplayDisableOnInteraction: false,
                            // 如果需要分页器
                            pagination: '.swiper-pagination',
                        });
                    })
                });
			},
			//banner跳转
			goUrl(item) {
				this.$emit('goUrl', item)
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
        width: 100%;
        .swiper-wrapper {
            margin: 0 auto;
            width: 100%;
            img{
                width: st(750);
                height: st(374);
            }
        }
    }
</style>