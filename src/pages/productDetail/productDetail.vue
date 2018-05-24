<template>
    <div id="productDetail" class="wrapper">
        <div class="topImg">
            <div class="swiper-container" id="detailSwiper">
				<div class="swiper-wrapper">
					<div v-for="item of 3" class="swiper-slide">
						<img src="../../assets/img/productDetail/1.png" />
					</div>
				</div>
				<!-- 分页器 -->
				<div class="swiper-pagination"></div>
			</div>
        </div>
        <div class="middleTxt">
            <div class="colorRed bigFont mb">
                ￥220
            </div>
            <div class="defaultFont color333 mb">
                大红酸之手串
            </div>
            <div class="colorRed smallFont mb">
                活动提示：该商品购买后可参加升级活动，如升级成功，升级后商品价值999.00元
            </div>
            <div class="bottomTxt flex flex-hlr mb">
                <p class="color999">快递：6元</p>
                <p class="colorRed">库存剩余：99998</p>
            </div>
        </div>
        <div class="detail">
            <img src="../../assets/img/productDetail/2.jpg" alt="">
            <img src="../../assets/img/productDetail/3.jpg" alt="">
        </div>
        <div class="bottom">
            <div class="bottomIn flex flex-sc flex-hlr">
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
                num: 1
            };
        },
        created() {

        },
        mounted() {
            let mySwiper = new Swiper('#detailSwiper', {
                loop: true,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                // 如果需要分页器
                pagination: '.swiper-pagination',
            })
        },
        methods: {
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