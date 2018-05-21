1<template>
    <div id="video">
        <MessageBox :tit="'游戏回放'" v-on:close="close" :width="'17.25rem'">
            <div class="video-out">
                <d-player :video="video" :autoplay="autoplay" :contextmenu="contextmenu" ref="player">
                </d-player>
            </div>
        </MessageBox>
    </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
export default {
    data () {
        return {
            // 视频相关
            video: {
                url: '',
                pic: '',
            },
            isVideo: false,
            autoplay: false,
            player: null,
            contextmenu: [{
                text: '变现猫',
                link: 'http://www.bianxianmao.com'
            }]
        }
    },
    props:[
        'message'
    ],
    components: {
        'd-player': VueDPlayer
    },
    methods:{
        close(){
            this.$emit('close','')
        }
    },
    created(){
    	this.video.url=this.message.videoUrl;
    	this.video.pic=this.message.img;
    },
    mounted(){

    }
}
</script>

<style lang="scss">
    @import "../assets/scss/rem";
    #video{
        .video-out{
            padding-top: st(30);
            width: 100%;
        }
    }
</style>
