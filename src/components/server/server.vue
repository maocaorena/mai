<template>
    <MessageBox :tit="'客服'" v-on:close="changeServerAlert()">
            <div class="server-alert-in flex flex-s flex-hc flex-sc">
                <div class="server-alert-in-item" @click="phoneServer">
                    <border class="flex-zhong">
                        <span>客服热线：</span>
                        <span class="rexian">
                            <a href="tel:400-6305-186">400-6305-186</a>
                        </span>
                    </border>
                </div>
                <div class="server-alert-in-item" @click="qqServer">
                    <border class="flex-zhong">
                        <span>客服QQ：</span>
                        <span>3511735466</span>
                    </border>
                </div>
            </div>
        </MessageBox>
</template>
<script>
    export default {
        data() {
            return {
                serverAlert: 1,
            }
        },
        methods: {
            changeServerAlert(state) {
                this.$emit('close', '')
            },
            qqServer(){
                var kefu101 = "http://wpa.qq.com/msgrd?v=3&uin=5446833281&site=oicqzone.com&menu=yes";
                var kefu102 = "mqqwpa://im/chat?chat_type=wpa&uin=5446833281&version=1&src_type=web&web_src=oicqzone.com";
                if (/(|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(|Android|)/i.test(navigator.userAgent)) {
                    window.open(kefu102);
                } else {
                    window.open(kefu101);
                }
            },
            phoneServer(){
                window.location.href="tel:123456789"
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    .server-alert-in {
        padding-top: st(10);
        width: 100%;
        height: st(266);
        div:nth-child(1) {
            margin-bottom: st(38);
        }
    }

    .server-alert-in-item {
        width: st(484);
        height: st(90);
        span {
            color: #7e8b9e;
            font-size: st(28);
        }
        .rexian {
            color: #39c8fa;
        }
    }
</style>