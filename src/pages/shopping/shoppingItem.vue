<template>
    <div class="roomItem-in" @click="goDetail()">
        <div class="img">
            <img v-lazy.container="message.image" alt="">
        </div>
        <div class="name">
            {{message.productName}}
        </div>
        <div class="price">
            <div class="left">
                ￥{{message.price}}
            </div>
            <div class="right">
                购买
            </div>
        </div>
    </div>
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
			goDetail() {
				this.$router.push({
                    name: 'productDetail',
                    query: {
                        productId: this.message.id
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