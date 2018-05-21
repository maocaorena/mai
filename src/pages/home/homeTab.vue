<template>
	<div>
		<div class="home-tab" ref="tab" v-if="tagList.length > 1">
			<div class="home-tab-in flex flex-sc">
				<div 
					class="tab-item" 
					v-for="(item,index) of tagList" 
					:class="{'tab-item-selected': item.tagId === selectedTagId,'shrink0':tagList.length > 4, 'col':tagList.length < 5, 'mr0': tagList.length-1 == index}" 
					@click="selectTag(item)"
					>
					{{item.content}}
				</div>
				<div style="clear: both;"></div>
			</div>
		</div>
		<div class="home-tab home-tab-fixed" v-if="srcollTop === 1 && tagList.length > 1">
			<div class="home-tab-in flex flex-sc">
				<div 
					class="tab-item" 
					:class="{'tab-item-selected': item.tagId === selectedTagId,'shrink0':tagList.length > 4, 'col':tagList.length < 5,'mr0': tagList.length-1 == index}" 
					v-for="(item,index) of tagList" 
					@click="selectTag(item)">
					{{item.content}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				tagList: [],
				selectedTagId: '',
				srcollTop: 0
			}
		},
		methods:{
			//获取tag标签列表
			getTagList() {
				this.api.getBn({
					url: 'room/getTagList',
				}).then((res) => {
					let _res = res.data;
					if(_res.successed) {
						_res.returnValue.unshift (
							{
								content: "全部",
								tagId: ""
							}
						);
						this.selectedTagId = res.data.returnValue[0].tagId;
						this.tagList = res.data.returnValue;
					};
				});
			},
			selectTag(item){
				this.selectedTagId = item.tagId;
				this.$emit('selectThis',item)
			}
		},
		created(){
			this.getTagList();
		},
		mounted(){
			this.$nextTick(() => {
				let that = this;
				window.onscroll = function() {
					if(that.$refs.tab){
						let _offsetTop = that.$refs.tab.offsetTop;
						let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						if(scrollTop > _offsetTop) {
							that.srcollTop = 1;
						}else{
							that.srcollTop = 0;
						};
					};
				};
			});
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/rem";
	.home-tab {
		padding-top: st(16);
        width: 100%;
        height: st(100);
        overflow: auto;
        -webkit-background-size: st(704) st(76);
    	background-size: st(704) st(76);
    }
    .home-tab-fixed{
    	position: fixed;
    	top: 0;
    	left: 0;
    	z-index: 20;
    }
    .home-tab-in{
        width: auto;
        height: st(68);
        padding-left: st(24);
        padding-right: st(24);
    }
    .tab-item {
        margin-right: st(10);
        width: st(352);
        height: st(76);
        background: url(../../assets/img/home/tab_2.png) no-repeat center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        text-align: center;
        line-height: st(66);
        color: #ff5f76;
    }
    .mr0{
    	margin-right: 0;
    }
    .shrink0{
    	flex-shrink: 0;
    }
    .tab-item-selected{
        color: #fff;
        background: url(../../assets/img/home/tab_1.png) no-repeat center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }
</style>