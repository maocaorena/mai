<template>
	<div id="outLink">
		<iframe id="p_ifr" name="p_ifr" :src="linkUrl" style="min-width: 100%;min-height: 100%;"></iframe>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				linkUrl: this.$route.query.linkUrl
			}
		},
		created(){
			
		}
	}
</script>

<style lang="scss" scoped>
	#outLink{
		width: 100%;
		height: 100%;
		iframe{
			border: none;
		}
	}
</style>