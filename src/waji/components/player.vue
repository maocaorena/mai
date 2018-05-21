<template>
	<div class="video-wrapper">
		<div class="video-box no-controls">
			<div v-show="showVideo === 2" ref="canvasBoxOut">
			</div>
		</div>
		<div class="delayMs flex flex-sc">
			<img v-show="delayMss>=0&&delayMss<50" src="../assets/bxmimg/room_wifi1.png" alt="" />
			<img v-show="delayMss>=50&&delayMss<100" src="../assets/bxmimg/room_wifi2.png" alt="" />
			<img v-show="delayMss>=100&&delayMss<300" src="../assets/bxmimg/room_wifi3.png" alt="" />
			<img v-show="delayMss>=300" src="../assets/bxmimg/room_wifi4.png" alt="" />
			{{delayMss}}
		</div>
	</div>
</template>

<script>
	let player = null;
	export default {
		data() {
			return {
				showVideo: 0,
				delayMss: null,
			}
		},
		props: {
			deviceId: {},
			type: {
				type: String,
				default: 'FRONT'
			}
		},
		watch: {
			deviceId(val) {
				if(val && this.type) {
					console.log('deviceId change')
					player.send('play', `${val}-${this.type}`)
				}
			},
			type(val) {
				if(this.deviceId && val) {
					console.log('type change')
					if(val === 'FRONT') {
						this.$toast.show('正在切换至正面视角，请稍后', true);
						this.showVideo = 1;
					} else if(val === 'SIDE') {
						this.$toast.show('正在切换至顶部视角，请稍后', true)
						this.showVideo = 1;
					};
					player.send('play', `${this.deviceId}-${val}`)
				};
			}
		},
		mounted() {
			player = new window.WSPlayer({
				container: this.$refs.canvasBoxOut,
				webgl: 'auto',
				workerFile: './static/Decoder.js'
			})
			player.connect('wss://ws-server-h264.wajiwaji.net/')
			if(this.deviceId && this.type) {
				console.log('mounted')
				player.send('play', `${this.deviceId}-${this.type}`)
			}

			player.on('loading', val => {
				if(val) {
					console.log('视频连接未成功')
				} else {
					console.log('视频连接成功')
					if( this.showVideo === 1){
						this.$toast.show('切换成功！', true)
					}
					this.showVideo = 2;
				}
			})
            
            player.on('fps', val => {
                if(this.$store.getters.logState){
                    let dd = JSON.parse(JSON.stringify(this.$store.getters.fpsLogArray));
                    dd.push(val);
                    this.$store.dispatch('SetData',{
                        code: 'fpsLogArray',
                        message: dd
                    });
                    dd = null;
                }
            });

			player.on('delay', val => {
                this.delayMss = val;
                if (this.$store.getters.logState) {
                    let dd = JSON.parse(JSON.stringify(this.$store.getters.networkDelayLogArray));
                    dd.push(val);
                    this.$store.dispatch('SetData', {
                        code: 'networkDelayLogArray',
                        message: dd
                    });
                    dd = null;
                }
			})

			player.on('connected', val => {
				// 第一次连接上
			})
			player.on('reconnected', val => {
				// 断线重连上
				player.send('play', `${this.deviceId}-${this.type}`)
			})
			player.on('disconnected', val => {
				// 连接断开
			})
		},
		destroyed() {
			player.destroy()
			player = null;
		}
	}
</script>

<style lang="scss">
	@import "../../assets/scss/rem";
	.video-wrapper {
		position: relative;
		padding: 0 3px 3px;
		width: 100%;
		height: 100%;
		border-bottom: st(6) solid #dd2a00;
		border-left: st(6) solid #dd2a00;
		border-right: st(6) solid #dd2a00;
		border-bottom-left-radius: st(22);
		border-bottom-right-radius: st(22);
		background: #fff;
		overflow: hidden;
	}
	.delayMs{
        position: absolute;
        top: st(88);
        right: st(40);
        z-index: 15;
        padding-left: st(12);
        width: st(152);
        height: st(56);
        font-size: 12px;
        text-align: center;
        line-height: st(40);
        color: #fff;
        background: url(../assets/bxmimg/room_wifibg.png) no-repeat center;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        img{
            width: st(42);
            height: st(30);
            margin-right: 3px;
        }
    }
	.video-box {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: url(../assets/bxmimg/load.png) no-repeat center;
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		canvas {
			width: 100%;
			height: 100%;
		}
	}
</style>