<template>
    <div id="home" class="wrapper">
        <div class="content" ref="content">
            <banner></banner>
            <!-- <div class="rooms flex flex-hc page-infinite-wrapper" ref="wrapper">
                <ul ref="roolist" class="room-list page-infinite-list" v-infinite-scroll="getRoomList" infinite-scroll-disabled="loading"
                    infinite-scroll-distance="60">
                    <li class="room-item page-infinite-listitem" v-for="(item,index) of listHandle">
                        <roomItem :message="item"></roomItem>
                    </li>
                    <li style="clear: both;"></li>
                </ul>
            </div> -->
            <ul class="home-list">
                <li class="home-item">
                    <img src="../../assets/img/home/true.jpg" alt="">
                </li>
                <li class="home-item">
                    <img src="../../assets/img/home/true2.jpg" alt="">
                </li>
                <li class="home-item">
                    <img src="../../assets/img/home/true3.jpg" alt="">
                </li>
                 <li class="home-item">
                    <img src="../../assets/img/home/true.jpg" alt="">
                </li>
            </ul>
            <!-- <p class="noMore flex-zhong" v-show="!noMore">
                <mt-spinner type="snake"></mt-spinner>
            </p> -->
            <!-- <p class="noMore" v-show="noMore">亲，没有更多了呦~</p> -->
        </div>
        <div class="qipao">
            <qipao></qipao>
        </div>
    </div>
</template>

<script>
    import banner from './banner.vue';
    import qipao from '@/components/qipao/qipao.vue';
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                alertStyles: {},
                list: [],
                loading: true, //控制加载，true会停止加载
                noMore: false, //没有更多
                pageNum: 1,

                balance: {
                    balance: '加载中'
                },
                userName: '',
                alertList: [],
                selectedTagId: '',
                alertItem: {},
                alertState: false,

            }
        },
        components: {
            'banner': banner,
            'qipao': qipao,
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

<style lang="scss">
    @import "./home";
</style>