<template>
	<shade>
		<Alert :styles="alertStyles.alert"  v-on:close='close()'>
			<img slot="title" :src="alertStyles.titImg" alt="" />
			<div slot="main" :style="alertStyles.main">
				<div class="rooms flex flex-hc page-infinite-wrapper" ref="wrapper">
					<ul ref="list" class="video-list page-infinite-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="60">
						<li class="video-item page-infinite-listitem flex flex-sc" v-for="(item,index) of list" @click="playVideo(item.gameId)">
							<div class="img">
								<img :src="item.gameVideoCoverUrl">
							</div>
							<p class="name ellipsis">{{item.userName}}</p>
							<div class="right flex flex-sc">
								<img src="../../assets/img/addr/triangle.png" alt="">
							</div>
						</li>
						<li style="clear: both;"></li>
					</ul>
				</div>
				<p class="noMore flex-zhong" v-show="!noMore">
					<mt-spinner type="snake"></mt-spinner>
				</p>
				<p class="noMore" v-show="noMore">亲，没有更多了呦~</p>
			</div>
		</Alert>
		<Alert :styles="alertStyles1.alert" v-if="showVideo" v-on:close='closeVideo()'>
			<div slot="main" :style="alertStyles1.main">
				<video style="width: 100%; height: 100%;" v-if="gameVideoUrl" :src="gameVideoUrl" ref="video" controls x-webkit-airplay="allow" webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" preload></video>
			</div>
		</Alert>
	</shade>
</template>

<script>
	import api from '@/waji/api'
	import Loading from '@/waji/components/Loading'
	import Modal from '@/waji/components/Modal'
	export default {
		components: {
			Loading,
			Modal
		},
		props: {
			roomId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				list: [],
				page: 1,
				loading: true, //控制加载，true会停止加载
				noMore: false, //没有更多
				showVideo: false,
				gameVideoUrl: '',
				errMsg: '',
				gameVideoState: false,
				alertStyles: {
					alert: {
						
					},
					titImg: './static/img/pop_record_title.png',
					main: {
						'height': this.Util.st(586),
						'overflow': 'auto',
						'margin': '10px 30px 10px',
						'background': '#fff',
						'border-radius': '10px'
					}
				},
				alertStyles1: {
					alert: {
						'padding-top': '0'
					},
					main: {
						'height': this.Util.st(586),
						'overflow': 'hidden',
						'margin': this.Util.st(10),
						'padding-top': this.Util.st(40),
					}
				}
			}
		},
		methods: {
			loadMore() {
				this.busy = true
				const pageSize = 12
				api
					.getSuccessVideos(this.roomId, this.page, pageSize)
					.then(({
						result
					}) => {
						if(result && result.length >= pageSize) {
							this.list.push(...result);
							if(result.length >= pageSize) {
								this.page += 1
								this.loading = false
							} else {
								this.noMore = true
							}
						} else {
                            this.loading = true;
							this.noMore = true
						}
					})
					.catch(res => {
						console.error(res)
					})
			},
			closeVideo(){
				this.showVideo = false
			},
			playVideo(gameId) {
				this.showVideo = true
				api
					.getGameVideo(gameId)
					.then(({
						result
					}) => {
						if(this.showVideo) {
							this.gameVideoUrl = result.gameVideoUrl
							this.$nextTick(() => {
								this.$refs.video.play()
							})
						}
					})
					.catch(res => {
						this.errMsg = res.message
						console.error(res)
					})
			},
			close(){
				this.$emit('close','')
			}
		},
		mounted() {
			this.loadMore()
		},
		watch: {
			showVideo() {
				if(!this.showVideo) {
					this.$refs.video && this.$refs.video.pause()
					setTimeout(() => {
						this.gameVideoUrl = ''
						this.errMsg = ''
					}, 300)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './SuccessVideo';
</style>
