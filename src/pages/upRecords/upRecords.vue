<template>
    <div id="upRecords" class="wrapper">
        <div class="lists width100">
            <ul class="list width100">
                <li class="row flex tit">
                    <div class="one">
                        升级时间
                    </div>
                    <div class="two">
                        订单数量
                    </div>
                    <div class="three">
                        商品名称
                    </div>
                    <div class="four">
                        状态
                    </div>
                </li>
                <li class="row flex" v-for="item of 6">
                    <div class="one">
                        2018-01-01 11:22:33
                    </div>
                    <div class="two">
                        1
                    </div>
                    <div class="three">
                        商品名称
                    </div>
                    <div class="four">
                        成功
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    created () {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
    @import './upRecords'
</style>

