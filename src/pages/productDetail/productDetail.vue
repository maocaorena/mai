<template>
    <div id="productDetail" class="wrapper">
        <div class="topImg">
            <!-- <div class="go-home" @click="goHome">
                返回首页 
            </div> -->
            <div class="item-tip" v-if="detail.isGiveGold == 1">
                送黄金
            </div>
            <div class="swiper-container" id="detailSwiper">
				<div class="swiper-wrapper">
					<div v-for="item of bannerList" class="swiper-slide">
						<img :src="item" />
					</div>
				</div>
				<!-- 分页器 -->
				<div class="swiper-pagination"></div>
			</div>
        </div>
        <div class="middleTxt mb">
            <div class="colorRed bigFont mb">
                ￥{{detail.price}}
            </div>
            <div class="defaultFont color333 mb">
                {{detail.productName}}
            </div>
            <div class="colorRed smallFont mb" v-if="detail.upProductId">
                活动提示：该商品购买后可参加升级活动，如升级成功，升级后商品价值999.00元
            </div>
            <div class="bottomTxt flex flex-hlr mb color999">
                <!-- <p class="color999">快递：6元</p> -->
                <p>月销：{{detail.sales}}</p>
                <p :class="{'colorRed':detail.stock<99}">库存剩余：{{detail.stock>=99? '99+':detail.stock}}</p>
            </div>
        </div>
        <div class="color2 pd20 tc bg1 mb" @click="openServer">
            联系客服
        </div>
        <div class="detail" v-html="detail.productDetail">
        </div>
        <div class="bottomTab">
            <div class="bottomTabIn flex-zhong">
                <button @click="buy">
                    立即购买
                </button>
                <!-- <div class="left">
                    <p class="top">
                        <i class="iconfont icon-kefu defaultFont color666"></i>
                    </p>
                    <p class="bottom defaultFont color666">
                        客服
                    </p>
                </div>
                <div class="left">
                    <p class="top">
                        <i class="iconfont icon-shouye defaultFont color666"></i>
                    </p>
                    <p class="bottom defaultFont color666">
                        首页
                    </p>
                </div>
                <div class="middle flex flex-sc">
                    <div class="left1" @click="down">
                        -
                    </div>
                    <div class="midd flex flex-s">
                        <div class="top">
                            <input type="number" @change="handle" v-model="num">
                        </div>
                        <div class="bottom color999">
                            购买数量
                        </div>
                    </div>
                    <div class="right" @click="up">
                        +
                    </div>
                </div>
                <div class="buy flex-zhong" @click="buy">
                    立即购买
                </div> -->
            </div>
        </div>
        <server-v v-if="serverState" v-on:close="close"></server-v>
    </div>
</template>

<script>
    import '@/lib/swiper/swiper.min.js';
    import '@/lib/swiper/swiper.min.css';
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    import server from '@/components/server/server.vue'
    export default {
        data() {
            return {
                serverState: false,
                num: 1,
                detail: {

                },
                bannerList: []
            };
        },
        components: {
            'server-v': server  
        },
        created() {
            this.getByDetail()
        },
        mounted() {

        },
        methods: {
            openServer(){
                this.serverState = true;
            },
            close(){
                this.serverState = false;
            },
            goHome(){
                this.$router.push({
                    name: 'home'
                })
            },
            getByDetail() {
                Indicator.open();
                this.api.getB({
                    url: 'product/getDetail',
                    params: {
                        id: this.$route.query.productId
                    },
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.detail = res.returnValue;
                        this.bannerList.push(...res.returnValue.images)
                    }
                }).then(() => {
                    let mySwiper = new Swiper('#detailSwiper', {
                        loop: true,
                        autoplay: 2000,
                        autoplayDisableOnInteraction: false,
                        // 如果需要分页器
                        pagination: '.swiper-pagination',
                    })
                })
            },
            buy() {
                this.$router.push({
                    name: 'sureOrder',
                    query: {
                        num: this.num,
                        productId: this.$route.query.productId
                    }
                })
            },
            up() {
                this.num++;
                this.handle();
            },
            down() {
                this.num--;
                this.handle();
            },
            handle() {
                if (this.num > 99) {
                    this.num = 99;
                };
                if (this.num < 1) {
                    this.num = 1;
                };
            }
        },
    };
</script>

<style lang="scss">
    @import "./productDetail";
</style>