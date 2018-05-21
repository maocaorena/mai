<template>
    <div id="getTicket" class="wrapper">
        <h2>恭喜您领取成功！</h2>
        <div class="ticket">
            <div class="ticket-name">
               {{ticket.viewName}}
            </div>
            <div class="ticket-code">
                兑换码：{{ticket.redeemCode}}
            </div>
            <button class="btn ticket-btn" :data-clipboard-text="ticket.redeemCode">
                复制
            </button>
        </div>
        <div class="bottom-tit">
            兑换方法
        </div>
        <div class="bottom-border">
            <div class="one">
                1、复制兑换码
            </div>
            <div class="one">
                2、进入娃娃机 >> 个人中心 >> 兑换中心
            </div>
            <div class="one">
                3、粘贴或输入兑换码进行兑换
            </div>
        </div>
    </div>
</template>
<script>
    import Clipboard from 'clipboard';
    import { Toast } from 'mint-ui';
    var clipboard = null;
    export default {
        data() {
            return {
                key: this.$route.query.key,
                couponId: this.$route.query.id,
                otherP: this.$route.query.p,
                ticket: {}
            }
        },
        methods: {
            getTicket() {
                this.api.getBn({
                    url: 'redeemCode/getRedeemCode',
                    params: {
                        publicNumberKey: this.key,
                        couponId: this.couponId,
                        p: this.otherP
                    },
                }).then(res => {
                    if (res.data.successed) {
                        this.ticket = res.data.returnValue;
                    } else {
                        Toast(res.data.errorDesc);
                    }
                })
            }
        },
        created() {
            this.getTicket()
        },
        mounted() {
            this.$nextTick(() => {
                clipboard = new Clipboard('.btn');

                clipboard.on('success', function (e) {
                    e.clearSelection();
                    Toast({
                        message: '复制成功！',
                        position: 'bottom',
                        duration: 2000
                    });
                });
                clipboard.on('error', function (e) {
                    Toast({
                        message: '复制失败，请长摁兑换码复制',
                        position: 'bottom',
                        duration: 2000
                    });
                });
            })
        },
        beforeDestroy() {
            clipboard.destroy();
        }
    }
</script>
<style lang="scss">
    @import "./getTicket"
</style>