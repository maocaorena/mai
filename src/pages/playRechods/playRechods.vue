<template>
    <div id="playRechods" class="wrapper" :data="loginstate">
        <div class="content">
            <ul class="prizeRecords page-infinite-list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
                <li class="flex page-infinite-listitem" v-for="(item,index) of list" @click="showVideo(item.gameVideoUrl,item.productPictureUrl)">
                    <div class="left">
                        <div class="left-in">
                            <img :src="item.productPictureUrl" alt="" />
                        </div>
                    </div>
                    <div class="middle">
                        <p class="top ellipsis">{{item.productName}}</p>
                        <p class="mp-row color1">游戏消耗：{{item.gamePay}} {{payName}}</p>
                        <p class="mp-row color1">{{item.gameTime}}</p>
                        <p class="mp-row color1">{{item.gameResult==1?'抓取成功':'抓取失败'}}</p>
                    </div>
                    <div class="right flex flex-sc">
                        <img src="../../assets/img/addr/triangle.png" alt="">
                    </div>
                </li>
            </ul>
            <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p>
            <p class="noMore" v-show="list.length > 0 && noMore">亲，没有更多了呦~</p>
            <div v-if="list.length < 1 && noMore" class="defaultImg">
                <img src="../../assets/img/default/default3.png" alt="" />
                <p>
                    您还没有游戏记录，去抓娃娃吧~
                </p>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <videop v-if="videoState" :message="videoDetail" v-on:close="close"></videop>
        </transition>
        <router-link class="playRechods-bottom bottom-bar" tag="div" to="/my/goAppeal">
            发起申诉
        </router-link>
    </div>
</template>

<script>
    import videop from '../../components/video.vue';
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                userId: this.User.getMemberId(),
                token: this.User.getToken(),
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,
                videoState: false,
                videoDetail: '',
                payName: this.User.getMemberInfo().coinName,
            }
        },
        components: {
            'videop': videop
        },
        computed: {
            loginstate() {
                if (this.$store.getters.loginstate > 0) {
                    this.loading = false;
                };
                return this.$store.getters.loginstate;
            }
        },
        methods: {
            close() {
                this.videoState = false;
            },
            getList() {
                this.loading = true;
                this.api.getB({
                    url: 'order/getList',
                    params: {
                        pageNum: this.pageNum,
                        pageSize: 10,
                        userId: this.userId,
                        appKey: this.User.getAppKey()
                    },
                    headers: {
                        token: this.token
                    }
                }).then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.list.push(..._res.returnValue.list);
                        if (_res.returnValue.list.length < 10) {
                            this.noMore = true;
                        } else {
                            this.pageNum++;
                            this.loading = false;
                        };
                    }
                })
            },
            showVideo(gameVideoUrl, productPictureUrl) {
                if (!gameVideoUrl) {
                    Toast({
                        message: '视频正在赶来的路上，请稍后查看~~',
                        position: 'bottom',
                        duration: 1000
                    });
                    return;
                }
                this.videoDetail = {
                    img: productPictureUrl,
                    videoUrl: gameVideoUrl
                };
                this.videoState = true;
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import './playRechods';
</style>