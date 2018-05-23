<template>
    <div class="roomItem-in" @click="goDetail()">
        <div class="img">
            <img src="../../assets/img/home/true.jpg" alt="">
        </div>
        <div class="name">
            sss水电费水电费水电费水电费水电费水
        </div>
        <div class="price">
            <div class="left">
                ￥200
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

		],
		methods:{
			//进入房间
			goDetail() {
				this.$router.push({
					name: 'productDetail'
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