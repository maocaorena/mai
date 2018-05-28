<template>
    <div id="layout">
        <mt-header fixed style="z-index:10" :title="$route.meta.name">
            <div slot="left" v-show="$route.meta.showBack">
                <mt-button icon="back" @click="goBack">返回</mt-button>
            </div>
            <mt-button slot="right" v-if="$route.meta.tabRight" @click="clickRightBar">
                {{$route.meta.tabRight}}
            </mt-button>
        </mt-header>
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
            rightBarFun(){
                return this.$store.getters.rightBarFun
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            },
            clickRightBar(){
                this.rightBarFun()
            }
        },
        created() {
            let search = this.$route.query;
            this.Storage.setItem("urlMessage", search);
        },
        mounted() {}
    }
</script>

<style lang="scss" scoped>
    @import "./layout";
</style>