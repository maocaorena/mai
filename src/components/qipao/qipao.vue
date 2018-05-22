<template>
    <div class="qipao-in">
        <div v-if="isShow" class="qipao-message flex flex-sc">
            <span>
                恭喜 （手机号 {{nameItem}}） 升级成功，获得商品X20！
            </span>
        </div>
    </div>
</template>

<script>
    import { Name } from '@/pages/rechargeNew/name.js'
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
                    let dd = Math.floor(Math.random() * 5 + 10) + 1;
                    _this.isShow = false;
                    setTimeout(() => {
                        _this.isShow = true;
                        xunhuan();
                    }, dd*100)
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