<template>
	<div class="waji-room-top" v-show="!isStart">

		<!-- 成功视频按钮 -->
		<div class="success-records" @click="showSuccessVideosDlg">
			<p v-if="room.roomSuccessNumber > 0" class="success-num">
				{{room.roomSuccessNumber >= 99?'99+':room.roomSuccessNumber+'次'}}成功
			</p>
			<p v-if="room.roomSuccessNumber <= 0" class="success-num">
				全新上架
			</p>
			<div class="tips" v-if="isFirstEnter">
				成功视频集锦
			</div>
		</div>

		<!-- 围观人数 -->
		<p class="p-num">{{roomViewerNumber > 999?'99+':roomViewerNumber}} 人围观</p>

		<!-- 游戏直播 -->
		<bxmplayer :deviceId="deviceId" :type="videoType"></bxmplayer>

		<!--音乐开关、转换摄像头-->
		<div class="bottom-btns flex">
			<div class="btn-music" @click="toggleMusic">
				<img v-show="music" src="../assets/bxmimg/room_music.png">
				<img v-show="!music" src="../assets/bxmimg/room_closemusic.png">
				<div class="tips" v-if="isFirstEnter">
					音效开关
				</div>
			</div>
			<div class="btn-switch" @click="switchVideo">
				<img src="../assets/bxmimg/room_camera.png">
				<div class="tips" v-if="isFirstEnter">
					切换视角
				</div>
			</div>
		</div>

		<!-- 房间状态 -->
		<div v-if="room.device.deviceState!==undefined" class="room-state" :class="room.device.deviceState===1?'status-idel':room.device.deviceState===-1?'status-fault':'status-play'">
			<div class="stateFront">
				<img v-if="room.device.deviceState!=1&&room.device.deviceState!=-1" :src="room.roomPlayer.userPicUrl" />
			</div>
			<div class="p-status">
				{{room.device.deviceState===1?'空闲中':room.device.deviceState===-1?'维修中':'游戏中'}}
			</div>
		</div>
	</div>
</template>

<script>
	import bxmplayer from './player'
	export default {
		data() {
			return {
			}
		},
		props: {
			
		},
		components: {
			bxmplayer
		},
		watch: {
			
		},
		mounted() {
			
		},
		destroyed() {
			
		}
	}
</script>

<style>

</style>