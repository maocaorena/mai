<template>
    <div class="myswiper-wrapper">
        <div class="swiper-container" v-if="list.length > 0" id="rechargeSwiper">
            <div class="swiper-wrapper">
                <div v-for="item in list" class="swiper-slide ellipsis">
                    <span class="color999">恭喜</span>
                    用户 
                    <span class="color333"> {{item.nickname}} </span> 
                    <span class="color999">升级成功</span> 
                    获得
                    <span class="colorRed">{{item.productName}} * {{item.orderCount}}</span> 

                </div>
            </div>
        </div>
    </div> 
</template>

<script>
    import '@/lib/swiper/swiper.min.js';
    import '@/lib/swiper/swiper.min.css';
    import { Name } from '@/assets/js/name.js'
    let timer = null;
    export default {
        name: 'layout',
        data() {
            return {
                list:[]
            }
        },
        methods: {
            // 获取
			getList() {
				this.api.getBn({
					url: 'notice/getList',
				}).then((res) => {
					this.list = res.returnValue;
				}).then(()=>{
                    this.$nextTick(() => {
                        let mySwiper = new Swiper('#rechargeSwiper', {
                            direction: 'vertical',
                            speed: 300,
                            loop: true,
                            autoplay: 1000,
                            autoplayDisableOnInteraction: false,
                        });
                    });
                });
			},
        },
        created(){
            this.getList()
        },
        mounted() {
        },
        beforeDestroy() {}
    }
</script>

<style lang="scss">
    @import "./qipao";
</style>