<template>
    <div class="wj-border" :style="{'border-color': normalColor,'background':npmalBg}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props:[
    	'color',
    	'bg'
    ],
    computed:{
    	normalColor: function () {
    		if(this.color){
    			return this.color
    		}
    		return '#d8d8d8'
		},
		npmalBg: function () {
    		if(this.bg){
    			return this.bg
    		}
    		return '#fff'
		},
    },
    created(){
    	
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    .wj-border{
        width: 100%;
        height: 100%;
        border-radius: st(20);
        position: relative;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid #d8d8d8;
            border-radius: st(20);
            width: 200%;
            height: 200%;
            -webkit-transform: scale(0.5);
            -ms-transform: scale(0.5);
            -o-transform: scale(0.5);
            transform: scale(0.5);
            -webkit-transform-origin: left top;
            -moz-transform-origin: left top;
            -ms-transform-origin: left top;
            transform-origin: left top;
        }
    }
</style>
