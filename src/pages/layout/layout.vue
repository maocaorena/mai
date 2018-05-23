<template>
    <div id="layout">
        <router-view></router-view>
        <div class="footer-wrapper" v-if="$route.meta.showBottomTab">
	        <div id="bottomBar" class="flex flex-h">
	            <router-link :to="{name:'home'}" tag="div" class="bottomBar-item col">
                    <p class="icon">
                        <i class="iconfont icon-shouye"></i>
                    </p>
	            	<p class="txt">首页</p>
	            </router-link>
	            <router-link :to="{name:'shopping'}" tag="div" class="bottomBar-item col">
                    <p class="icon">
                        <i class="iconfont icon-dianpu"></i>
                    </p>
	                <p class="txt">商城</p>
	            </router-link>
	            <router-link :to="{name:'my'}" tag="div" class="bottomBar-item col">
                    <p class="icon">
                        <i class="iconfont icon-wode"></i>
                    </p>
	                <p class="txt">我的</p>
	            </router-link>
                
	        </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {

            }
        },
        computed: {
        },
        methods: {
        },
        created() {
            
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "./layout";
</style>