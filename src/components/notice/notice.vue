<template>
    <div class="notice">
        <marquee v-if="txt.length>0" class="scroll" scrollAmount="3" direction="">
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
                        position: 1,
                        pageIndex: 0
					}
				}).then((res) => {
                    res.returnValue.forEach(element => {
                        this.txt += element.linkUrl
                    });
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