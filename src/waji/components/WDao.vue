<template>
	<div class="mask">
		<div class="container">
			<div class="dao-timer" v-show="second === 1"><img src="../assets/bxmimg/game_go.png" /></div>
			<div class="dao-timer" v-show="second === 2"><img src="../assets/bxmimg/game_1.png" /></div>
			<div class="dao-timer" v-show="second === 3"><img src="../assets/bxmimg/game_2.png" /></div>
			<div class="dao-timer" v-show="second === 4"><img src="../assets/bxmimg/game_3.png" /></div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				second: 4
			}
		},
		mounted() {
			const timer = setInterval(() => {
				if(this.second <= 1) {
					clearInterval(timer)
					this.$emit('finish')
				}
				this.second -= 1
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: opacity 0.3s ease;
	}

	.container {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translate(-50%, -50%);
		width: 100%;
		margin: 0px auto;
		color: #fff;
		text-align: center;
		.dao-timer {
			img {
				width: 52px;
			}
		}
	}
</style>
