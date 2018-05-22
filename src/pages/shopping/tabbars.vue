<-- 
    <tabbars-v v-on:clickThis="isThis" :names = '["最新揭晓","我参与"]' :tostatus = 'status' :showTop = '"y"'></tabbars-v>
	isThis 父组件回调函数名字，传出点击按钮的index；
	name是数组，tab栏内按钮名称；
	tostatus 上下箭头对应的状态；
	showTop = '"y"'  是否显示上下箭头，不写默认不显示；
 -->
<template>
	<div class="tabbars flex">
        <div class="tabbars-item flex-zhong" v-on:click="clickThis(index)" v-for="(item, index) of itemName">
            <button :class="{redborder : index == selectthis}">{{item}}</button>
        </div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: [
            "names",
            "tostatus",
            "showTop",
            "initTab"
        ],
        data(){
            return{
                itemNum : this.num,
                itemName : this.names,
                selectthis : 0
            }
        },
        components:{
        },
        methods:{
            clickThis(index){
                this.selectthis = index;
                this.$emit('clickThis',index);
            }
        },
        created(){
			if(this.initTab != undefined){
				this.selectthis = this.initTab;
			}
        }
	}
</script>
<style lang="scss">
    .tabbars{
        background: #fff;
        width: 100%;
        height: 39px;
        border-bottom: 1px solid #e2e2e2;
        span{
            position: absolute;
            top: 7px;
            left: 60%;
            display: block;
            width: 21px;
            height: 24px;
        }
    }
    .tabbars-item{
        position: relative;
        height: 100%;
        -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -moz-box-flex: 1;
	    -moz-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    width: 100%;
    }
    .tabbars button{
        border: none;
    	display: block;
        width: 90%;
        height: 100%;
        background: #fff;
        border-bottom: 2px solid #fff;
        font-size: 16px;
    }
    .tabbars .redborder{
        border-color: #f93069;
        color: #f93069;
    }
</style>