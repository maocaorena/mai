<template>
    <div id="home" class="wrapper">
        <div class="content" ref="content">
            <banner></banner>
            <notice></notice>
            <div class="qipao">
                <qipao></qipao>
            </div>
            <ul class="home-list">
                <li class="home-item" v-for="item of list">
                    <img :src="item.img" alt="">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import banner from './banner.vue';
    import qipao from '@/components/qipao/qipao.vue';
    import notice from '@/components/notice/notice.vue';
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                list: [],
            }
        },
        components: {
            'banner': banner,
            'qipao': qipao,
            'notice': notice
        },
        computed: {
        },
        created() {
            this.getBanner()
        },
        mounted() {
        },
        methods: {
            // 获取广告位
			getBanner() {
				this.api.getBn({
					url: 'banner/getList',
					params: {
						position: 3,
					}
				}).then((res) => {
					this.list = res.returnValue;
				});
			},
        },
    }
</script>

<style lang="scss">
    @import "./home";
</style>