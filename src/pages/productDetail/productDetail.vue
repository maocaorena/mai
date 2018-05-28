<template>
    <div id="productDetail" class="wrapper">
        <div class="topImg">
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
        <div class="middleTxt">
            <div class="colorRed bigFont mb">
                ￥{{detail.price}}
            </div>
            <div class="defaultFont color333 mb">
                {{detail.productName}}
            </div>
            <div class="colorRed smallFont mb">
                活动提示：该商品购买后可参加升级活动，如升级成功，升级后商品价值999.00元
            </div>
            <div class="bottomTxt flex flex-hlr mb">
                <!-- <p class="color999">快递：6元</p> -->
                <p class="colorRed">库存剩余：{{detail.stock}}</p>
            </div>
        </div>
        <div class="detail" v-html="detail.productDetail">
        </div>
        <div class="bottomTab">
            <div class="bottomTabIn flex flex-sc flex-hlr">
                <div class="left">
                    <p class="top">
                        <i class="iconfont icon-kefu bigFont color666"></i>
                    </p>
                    <p class="bottom defaultFont color666">
                        客服
                    </p>
                </div>
                <div class="left">
                    <p class="top">
                        <i class="iconfont icon-shouye bigFont color666"></i>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/lib/swiper/swiper.min.js';
    import '@/lib/swiper/swiper.min.css';
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                num: 1,
                detail: {

                },
                bannerList: []
            };
        },
        created() {
            this.getByDetail()
        },
        mounted() {
            
        },
        methods: {
            getByDetail(){
                Indicator.open();
                this.api.getB({
                    url: 'product/getDetail',
                    params: {
                        id: this.$route.query.productId
                    },
                }).then(res=>{
                    Indicator.close();
                    if(res.successed){
                        this.detail = res.returnValue;
                        this.bannerList.push(res.returnValue.image)
                    }
                }).then(()=>{
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
                this.$router.push({ name: 'sureOrder' })
            },
            up() {
                this.num++;
                this.handle();
            },
            down() {
                this.num--;
                this.handle();
            },
            handle(){
                if(this.num > 99){
                    this.num = 99;
                };
                if(this.num < 1){
                    this.num = 1;
                };
            }
        },
    };
</script>

<style lang="scss">
    @import "./productDetail";
</style>