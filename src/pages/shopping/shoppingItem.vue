<template>
    <li class="width100 flex flex-hlr items">
        <div class="roomItem-in" @click="goDetail(message.id)">
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
        <div class="upLv">
            <img src="../../assets/img/shopping/levUp.png" alt="">
            <br>
            <span class="colorRed">升级</span>
        </div>
        <div class="roomItem-in" @click="goDetail(message.upProductId)">
            <div class="img">
                <img v-lazy.container="message.upProductImage" alt="">
            </div>
            <div class="name">
                {{message.upProductName}}
            </div>
            <div class="price">
                <div class="left">
                    ￥{{message.upProductPrice}}
                </div>
                <div class="right">
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