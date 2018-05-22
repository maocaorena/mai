<template>
	<Shade>
		<div class="wj-alert-wrapper" :style="allStyles">
			<div class="wj-alert-border">
				<div class="wj-alert-border-in">
					
				</div>
			</div>
	    	<div class="wj-alert" :style="styles">
	    		<div class="wj-alert-close" @click="close">
	    			<slot name="closeImg">
	    			</slot>
	    		</div>
	    		<div class="wj-alert-title flex-zhong">
		    		<slot name="title">
		    			
		    		</slot>
	    		</div>
	    		<div class="wj-alert-main">
		    		<slot name="main">
		    		</slot>
	    		</div>
	    		<div class="wj-alert-btns flex-zhong">
		    		<slot name="btns">
		    			
		    		</slot>
	    		</div>
	    	</div>
			
		</div>
	</Shade>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:{
    	styles:{
    		type: Object,
    		required: false
    	},
    	allStyles:{
    		type: Object,
    		required: false
    	},
    },
    methods:{
    	close(){
    		this.$emit('close','')
    	}
    },
    computed:{
    	
    },
    created(){

    },
    mounted(){

    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/rem";
    .wj-alert-wrapper{
    	position: relative;
    	padding: st(6);
    	background: #fff3f3;
    	border-radius: st(38);
    	box-shadow: 0px st(10) 0 0 #cca3b1;
    }
    .wj-alert-border{
    	position: absolute;
    	left: 0;
    	top: 0;
    	padding: st(6);
    	width: 100%;
    	height: 100%;
    }
    .wj-alert-border-in{
    	width: 100%;
    	height: 100%;
    	border: #ffdcdc st(6) solid;
    	border-radius: st(32);
    	background-size: 100%;
    	
    }
	.wj-alert{
		position: relative;
		z-index: 100;
		padding-top: st(138);
		width: st(636);
		height: auto;
		border-radius: st(32);
	}
	.wj-alert-close{
		position: absolute;
		top: st(-50);
		right: st(-6);
		z-index: 101;
		width: st(90);
		height: st(90);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.wj-alert-title{
		position: absolute;
		left: 0;
		top: st(-140);
		width: 100%;
		img{
			height: st(238);
		}
	}
	.wj-alert-main{
	}
	.wj-alert-btns{
		padding-bottom: st(14);
		width: 100%;
		font-weight: 600;
		.button{
			text-shadow: 2px 2px 2px rgba(255,255,255,0.75);
		}
	}
</style>
