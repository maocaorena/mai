<template>
	<div class="bxm-loading flex-zhong">
		<div>
			<mt-spinner type="snake"> </mt-spinner>
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
		created() {
			// this.Util.cm(this.message)
			document.getElementsByTagName('body')[0].style.overflow='hidden'
		},
		mounted() {},
		destroyed(){
			document.getElementsByTagName('body')[0].style.overflow = 'auto';
		}
	}
</script>

<style lang="scss" scoped>
	.bxm-loading{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: auto;
		height: auto;
		margin: auto;
		z-index: 99999;
		div{
			padding: 17px;
			border-radius: 5px;
			background: rgba(0,0,0,0.7);
		}
	}
</style>