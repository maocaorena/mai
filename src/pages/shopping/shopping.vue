<template>
    <div id="shopping" class="wrapper">
        <tabbars-v class="tab" v-on:clickThis="isThis" :names = '["选项1","选项2"]'></tabbars-v>
        <div class="qipao">
            <qipao></qipao>
        </div>
        <ul class="list">
            <li v-for="(item, index) of 5" class="item" :class="{'mr0':index%2 === 1}">
                <shoppingItem> </shoppingItem>
            </li>
            <li class="clear"></li>
        </ul>
    </div>
</template>

<script>
    import qipao from '@/components/qipao/qipao.vue';
    import shoppingItem from './shoppingItem.vue'
    import tabbars from './tabbars.vue';//引入选项卡组件
    import { Indicator } from "mint-ui"; //引入mintUI  indicator组件
    export default {
        data() {
            return {};
        },
        components: {
            "tabbars-v" : tabbars,
            'qipao': qipao,
            'shoppingItem': shoppingItem
        },
        created() {},
        methods: {
            isThis(index){
				console.log("fu",index);
			}
        },
        mounted() {}
    };
</script>

<style lang="scss">
    @import "./shopping";
</style>