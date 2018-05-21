<template>
    <div class="qipao">
        <div class="qipao-in">
            <div v-if="isShow" class="qipao-message flex flex-sc">
                <img src="../../assets/img/qipao/toust.png" alt="">
                <span>
                    {{nameItem}} 抓中了娃娃！
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { Name } from '../rechargeNew/name.js'
    let timer = null;
    export default {
        name: 'layout',
        data() {
            return {
                nameList: Name.getNameList(),
                nameItem: '',
                isShow: true
            }
        },
        methods: {

        },
        mounted() {
            let i = 0;
            this.nameItem = this.nameList[i];
            let _this = this;
            let xunhuan = function () {
                timer = setTimeout(() => {
                    let dd = Math.floor(Math.random() * 20 + 10) + 1;
                    _this.isShow = false;
                    setTimeout(() => {
                        _this.isShow = true;
                        xunhuan();
                    }, dd*1000)
                }, 10000)
            };
            xunhuan()
        },
        beforeDestroy() {
            clearInterval(timer);
        }
    }
</script>

<style lang="scss">
    @import "./qipao";
</style>