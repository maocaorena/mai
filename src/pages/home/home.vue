<template>
    <div id="home" class="wrapper">
        <div class="content" ref="content">
            <banner v-on:goUrl="goUrl"></banner>
            <notice></notice>
            <div class="qipao" v-if="!isHide">
                <qipao></qipao>
            </div>
            <ul class="home-list">
                <li class="home-item" v-for="item of list" @click="goUrl(item)">
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
                isHide: this.api.noShowNum().indexOf(this.User.getShareCode()) < 0? false: true,
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
            // 0商品详情，1内部链接，2外部链接，3通告 ,
            // 获取广告位
			getBanner() {
				this.api.getBn({
					url: 'banner/getList',
					params: {
                        position: 2,
                        pageIndex: 0
					}
				}).then((res) => {
					this.list = res.returnValue;
				});
            },
            goUrl(item){
                switch(item.linkMethod) {
                    case 0:
                        this.$router.push({
                            name: 'productDetail',
                            query: {
                                productId: item.linkUrl
                            }
                        })
						break;
					case 1:
						this.$router.push({
							name: item.linkUrl,
						});
                        break;
                    case 2:
                        window.location.href = item.linkUrl
						break;
					default:
						break;
				}
            }
        },
    }
</script>

<style lang="scss">
    @import "./home";
</style>