<template>
    <div class="wj-messageBox">
    	<Shade>
	    	<div class="wj-messageBox-border" :style="{width: inWidth}">
                <img @click="close" v-show="!hide" class="wj-messageBox-close" src="../../assets/img/common/pop_close.png" alt="" />
	    		<h3 class="wj-messageBox-tit" v-if="tit" @click="close">
    				<span class="wj-messageBox-tit-left">{{tit}}</span>
    				<span class="wj-messageBox-tit-right">{{remark}}</span>
	    		</h3>
	    		<slot>

	    		</slot>
	    	</div>
    	</Shade>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:[
    	'tit',
    	'remark',
        'width',
        'hide'
    ],
    methods:{
    	close(){
    		this.$emit('close','')
    	}
    },
    computed:{
    	inWidth(){
            return this.width || ''
        }
    },
    created(){

    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    .wj-messageBox{
    	.wj-messageBox-border{
    		position: relative;
    		margin-top: st(-100);
    		width: st(610);
    		height: auto;
    		padding: 0 st(30) st(50);
    		background: #fff;
    		border-radius: st(20)
    	}
    	.wj-messageBox-close{
    		position: absolute;
    		top: st(-76);
    		right: st(2);
    		width: st(52);
    	}
    	.wj-messageBox-tit{
    		width: 100%;
    		height: st(100);
    		line-height: st(100);
    		border-bottom: 1px solid #d8d8d8;
    	}
    	.wj-messageBox-tit-left{
    		color: #333;
    		float: left;
    		font-size: st(30);
    	}
    	.wj-messageBox-tit-right{
    		float: right;
    		font-size: st(26);
    		color: #9bacc6;
    	}
    }
</style>
