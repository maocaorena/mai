<template>
    <div class="notice">
        <marquee class="scroll" direction="" height="25&quot;">
                {{txt}}
        </marquee>
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
                txt: ''
            }
        },
        created(){
            this.getBanner()
        },
        methods: {
            // 获取广告位
			getBanner() {
				this.api.getBn({
					url: 'banner/getList',
					params: {
						position: 2,
					}
				}).then((res) => {
                    this.txt = res.returnValue[0].linkUrl
				});
			},
        },
        mounted() {
        },
        beforeDestroy() {}
    }
</script>

<style lang="scss" scoped>
    @import "./notice";
</style>