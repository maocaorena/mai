<template>
	<div v-show="show" tabindex="-1" :style="style" :class="['modal', className]" @keyup.esc="onEsc">
		<div class="modal-mask" v-if="mask" @click="onClickMask" :style="customMaskStyles"></div>
		<div class="modal-dialog" v-show="show" :style="dialogStyle">
			<span class="modal-close" v-if="closeButton" @click="$emit('hide')" />
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'modal',
		props: {
			show: {
				type: Boolean,
				required: true
			},
			height: {
				type: Number,
				default: 240
			},
			duration: {
				type: Number,
				default: 300
			},
			measure: {
				type: String,
				default: 'px'
			},
			mask: {
				type: Boolean,
				default: true
			},
			closeButton: {
				type: Boolean,
				default: false
			},
			closeOnEsc: {
				type: Boolean,
				default: false
			},
			closeOnClickMask: {
				type: Boolean,
				default: true
			},
			className: {
				type: String,
				default: ''
			},
			customStyles: {
				type: Object,
				default: () => ({})
			},
			customMaskStyles: {
				type: Object,
				default: () => ({})
			}
		},
		computed: {
			style() {
				return {
					animationDuration: `${this.duration}ms`
				}
			},
			dialogStyle() {
				return {
					width: this.width + this.measure,
					height: this.height + this.measure,
					animationDuration: `${this.duration}ms`,
					...this.customStyles
				}
			}
		},
		watch: {
			show(isShow) {
				isShow &&
					this.$nextTick(() => {
						this.$el.focus()
					})
			}
		},
		methods: {
			onEsc() {
				if(this.show && this.closeOnEsc) {
					this.$emit('hide')
				}
			},
			onClickMask() {
				this.$emit('clickMask')
				if(this.closeOnClickMask) {
					this.$emit('hide')
				}
			}
		},
		mounted(){
			document.getElementsByTagName('body')[0].style.overflow='hidden'
		},
		destroyed(){
			document.getElementsByTagName('body')[0].style.overflow = 'auto';
		}
	}
</script>

<style lang="scss" scoped>
	.modal,
	.modal-mask {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 200;
	}
	
	.modal {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.modal-mask {
		position: absolute;
		background: rgba(0, 0, 0, 0.3);
	}
	
	.modal-dialog {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 201;
		width: 100%;
		max-height: 100%;
		box-sizing: border-box;
		padding: 0;
		padding-top: 5px;
		background: #fff;
		border-radius: 0;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}
	
	.modal-close {
		position: absolute;
		cursor: pointer;
		top: 16px;
		right: 16px;
		width: 16px;
		height: 16px;
	}
	
	.modal-close:before,
	.modal-close:after {
		position: absolute;
		content: '';
		height: 2px;
		width: 100%;
		top: 50%;
		left: 0;
		margin-top: -1px;
		background: #999;
		border-radius: 100%;
		transition: background 0.2s;
	}
	
	.modal-close:before {
		transform: rotate(45deg);
	}
	
	.modal-close:after {
		transform: rotate(-45deg);
	}
	
	.modal-close:hover:before,
	.modal-close:hover:after {
		background: #333;
	}
	
	// @keyframes modal-fade-enter {
	//   from {
	//     opacity: 0;
	//   }
	// }
	// .modal-fade-enter-active {
	//   animation: modal-fade-enter both ease-in;
	// }
	// @keyframes modal-fade-leave {
	//   to {
	//     opacity: 0;
	//   }
	// }
	// .modal-fade-leave-active {
	//   animation: modal-fade-leave both ease-out;
	// }
	// @keyframes modal-zoom-enter {
	//   from {
	//     transform: scale3d(0.3, 0.3, 0.3);
	//   }
	// }
	// .modal-zoom-enter-active {
	//   animation: modal-zoom-enter both cubic-bezier(0.4, 0, 0, 1.5);
	// }
	// @keyframes modal-zoom-leave {
	//   to {
	//     transform: scale3d(0.3, 0.3, 0.3);
	//   }
	// }
	// .modal-zoom-leave-active {
	//   animation: modal-zoom-leave both;
	// }
</style>