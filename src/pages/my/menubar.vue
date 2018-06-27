<template>
	<router-link class="menubar flex-zhong" :style="{ height: (height || 45)+'px' }" :to="togo">
		<i class="iconfont ss" :class="icon"></i>
		<p><span>{{title}}</span> <slot></slot> </p>
		<div class="flex flex-sc">
			<i class="iconfont icon-xiangyou1 color999"></i>
		</div>
	</router-link>
</template>
<style lang="scss">
	.menubar{
		width: 100%;
		position: relative;
		border-bottom: 1px solid #eee;
		.ss{
			display: block;
			width: 10%;
			color: #ff5b88;
			font-size: 24px;
		}
		p{
			width: 80%;
            color: #666;
            font-weight: 600;
		}
		.flex{
			height: 100%;
			position: absolute;
			right: 15px;
			color: #bcbcbc;
			.iconfont{
                font-size: 16px;
			}
		}
	}
</style>
<script type="text/javascript">
	export default {
		props: [
            'togo',
            'icon',
            'title',
			'height'
        ]
	}
</script>