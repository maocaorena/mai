<template>
    <div class="myswiper-wrapper">
        <div class="swiper-container" id="rechargeSwiper">
            <div class="swiper-wrapper">
                <div v-for="item in 3" class="swiper-slide ellipsis">
                    恭喜 222 用户成功获赠222！
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
            }
        },
        methods: {

        },
        mounted() {
            this.$nextTick(() => {
                let mySwiper = new Swiper('#rechargeSwiper', {
                    direction: 'vertical',
                    speed: 300,
                    loop: true,
                    autoplay: 1000,
                    autoplayDisableOnInteraction: false,
                });
            });
        },
        beforeDestroy() {}
    }
</script>

<style lang="scss">
    @import "./qipao";
</style>