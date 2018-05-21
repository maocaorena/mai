<template>
	<div id="imgText">
		<img src="../../assets/img/imgtext/1.jpg" alt="" />
		<img src="../../assets/img/imgtext/2.jpg" alt="" />
		<div class="zhanwei"></div>
		<div class="bottomBtn flex-zhong">
			<router-link tag="p" to="/home">
				点击开始抓娃娃
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		created(){
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../assets/scss/rem";
	#imgText{
		width: 100%;
		height: 100%;
		img{
			width: 100%;
			vertical-align: top;
		}
		.zhanwei{
			width: 100%;
			height: st(84);
		}
		.bottomBtn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: st(96);
			background: #fff000;
			p{
				width: st(670);
				height: st(82);
				text-align: center;
				line-height: st(82);
				font-size: 14px;
				color: #fff;
				background: #ff5b88;
				border-radius: st(16);
			}
		}
	}
</style>