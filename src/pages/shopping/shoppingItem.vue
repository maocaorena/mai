<template>
    <li class="width100 flex flex-hlr items"  @click="goDetail(message.id)">
        <div class="img">
            <img v-lazy.container="message.image" alt="">
            <div class="item-tip" v-if="message.isGiveGold == 1">
                送黄金
            </div>
        </div>
        <div class="right flex flex-s flex-hlr">
            <div class="name color333">
                {{message.productName}}
            </div>
            <div class="item-send" v-if="message.isGiveGold == 1">
                送价值{{message.giveGoldQuantity}}元黄金
            </div>
            <div class="price flex flex-hlr width100">
                <div class="left colorRed largeFont flex flex-sc">
                    ￥{{message.price}}
                </div>
                <div class="buy">
                    购买
                </div>
            </div>
        </div>
    </li>
    
    
    
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: [
            'message'
		],
		methods:{
			//进入房间
			goDetail(id) {
				this.$router.push({
                    name: 'productDetail',
                    query: {
                        productId: id
                    }
				})
			},
		},
		created() {
		},
		mounted() {}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import "./shoppingItem";
</style>