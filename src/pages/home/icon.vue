<template>
	<div id="icon">
		<div class="iconIn" :class="{move: isMove}" @click="goActive()">
			<img src="../../../static/spring/home/entrance_spr2.gif"/>
		</div>
	</div>
</template>

<script>
	export default {
		data (){
			return {
				isMove: false
			}
		},
		methods:{
			goActive(){
				this.$router.push('/springActive')
			},
			move(){
				this.isMove = true;
				setTimeout(()=>{
					this.isMove = false;
				},2000)
			}
		},
		created(){
			if(this.Util.isTimerOver('move')) { // 如果是第二天  弹窗
				this.move()
				this.Storage.setItem('move', Date.parse(new Date()));
			};
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/rem";
	#icon{
		position: fixed;
		right: 0;
		top: 80%;
		z-index: 20;
		width: st(140);
		height: st(140);
		img{
			width: 100%;
			vertical-align: bottom;
		}
		.iconIn{
			
		}
		.move{
			transform: translate(st(-580),st(-1200));
			animation: mymove 2s linear;
		}
		@keyframes mymove{
			0{
				transform: translate(st(-580),st(-1200));
			}
			60%{
				transform: translate(st(-580), 0);
			}
			100%{
				transform: translate(0, 0);
			}
		}
	}
</style>