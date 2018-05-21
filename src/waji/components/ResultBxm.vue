<template>
    <shade>
        <Alert :styles="alertStyles.alert" :allStyles="alertStyles.allStyles" v-on:close='close()'>
            <div slot="main" :style="alertStyles.main">
                <img :style="alertStyles.titImgStyle" :src="alertStyles.titImg" alt="" />
                <p :style="alertStyles.titStyle">
                    {{msg}}
                </p>
            </div>
            <template slot="btns">
                <button v-for="(item,index) of alertStyles.btns" class="button" @click='alertClick(alertType, index)' :style="item.styles">
                    {{item.txt}}
                    <span v-if="alertStyles.timerState">({{time}})</span>
                </button>
            </template>
        </Alert>
    </shade>
</template>

<script>
    export default {
        data() {
            return {
                alertStyles: {
                    allStyles: {
                        'position': 'absolute',
                        'bottom': 0,
                        'left': 0,
                        'width': '100%'
                    },
                    alert: {
                        'padding': `0 ${this.Util.st(48)}`,
                        'width': '100%'
                    },
                    titImg: './static/img/dialog_recharge.png',
                    titImgStyle: {
                        'width': this.Util.st(210),
                        'height': this.Util.st(210),
                        'position': 'absolute',
                        'top': this.Util.st(-60),
                        'left': 0
                    },
                    titStyle: {
                        'padding-left': this.Util.st(160)
                    },
                    main: {
                        'overflow': 'auto',
                        'margin': '10px 0',
                        'padding': `${this.Util.st(60)} 0`,
                        'background': '#fff',
                        'border-radius': '10px',
                        'color': '#895d11',
                        'text-align': 'center',
                        'font-size': this.Util.st(36),
                        'font-weight': '600'
                    },
                    btns: [{
                        txt: '立即充值！',
                        styles: {
                            'width': this.Util.st(392),
                            'height': this.Util.st(108),
                            'background': 'url(./static/img/dialog_btn1.png) no-repeat center',
                            'background-size': '100% 100%',
                            'border': 'none',
                            'color': '#895d11',
                            'font-size': this.Util.st(40),
                        }
                    }]
                }
            }
        },
        props: {
            userType: {
                type: Number,
                default: 3
            },
            alertType: {
                type: String,
                default: ''
            },
            msg: {
                type: String,
                default: ''
            },
        },
        created() {
            this.alertStyles = {
                allStyles: {
                    'position': 'absolute',
                    'bottom': 0,
                    'left': 0,
                    'width': '100%'
                },
                alert: {
                    'padding': `0 ${this.Util.st(48)}`,
                    'width': '100%'
                },
                titImgStyle: {
                    'width': this.Util.st(210),
                    'height': this.Util.st(210),
                    'position': 'absolute',
                    'top': this.Util.st(-60),
                    'left': 0
                },
                titStyle: {
                    'padding-left': this.Util.st(160),
                    'padding-right': this.Util.st(20),
                },
                main: {
                    'overflow': 'auto',
                    'margin': '10px 0',
                    'padding': `${this.Util.st(60)} 0`,
                    'background': '#fff',
                    'border-radius': '10px',
                    'color': '#895d11',
                    'text-align': 'center',
                    'font-size': this.Util.st(36),
                    'font-weight': '600'
                }
            };
            switch (this.alertType) {
                case 'recharge':
                    this.alertStyles.titImg = './static/img/dialog_recharge.png';
                    if (this.userType === 1) {
                        this.alertStyles.btns = [{
                            timerState: true,
                            txt: '领券免费玩',
                            styles: {
                                'width': this.Util.st(332),
                                'height': this.Util.st(108),
                                'background': 'url(./static/img/dialog_btn1.png) no-repeat center',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#895d11',
                                'font-size': this.Util.st(40),
                            }
                        }];
                    } else if( this.userType === 2 ) {
                        this.alertStyles.btns = [{
                            timerState: true,
                            txt: '立即登录畅玩',
                            styles: {
                                'width': this.Util.st(332),
                                'height': this.Util.st(108),
                                'background': 'url(./static/img/dialog_btn1.png) no-repeat center',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#895d11',
                                'font-size': this.Util.st(40),
                            }
                        }];
                    } else {
                        this.alertStyles.btns = [{
                            txt: '充值',
                            styles: {
                                'width': this.Util.st(252),
                                'height': this.Util.st(108),
                                'background': 'url(./static/img/dialog_btn2.png) no-repeat center',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#895d11',
                                'font-size': this.Util.st(40),
                            }
                        }, {
                            timerState: true,
                            txt: '领券免费玩',
                            styles: {
                                'width': this.Util.st(332),
                                'height': this.Util.st(108),
                                'background': 'url(./static/img/dialog_btn1.png) no-repeat center',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#895d11',
                                'font-size': this.Util.st(40),
                            }
                        }];
                    }
                    break;
        case 'other':
        this.alertStyles.titImg = './static/img/dialog_recharge.png';
        this.alertStyles.btns = [{
            txt: '好的',
            styles: {
                'width': this.Util.st(392),
                'height': this.Util.st(108),
                'background': 'url(./static/img/dialog_btn1.png) no-repeat center',
                'background-size': '100% 100%',
                'border': 'none',
                'color': '#895d11',
                'font-size': this.Util.st(40),
            }
        }];
        break;
    }
        },
    mounted() {
    },
    methods: {
        close() {
            this.$emit('close', '')
        },
        alertClick(type, idx) {
            this.$emit('alertClick', type, idx, this.userType)
        },
        confrim(event) {
            this.$emit('on-confrim', event)
        },
        cancel(event) {
            this.$emit('on-cancel', event)
        },
        leftClick() {
            this.$emit('leftClick', event)
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {}

    .modal-container {
        position: relative;
        width: 400px;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 20px 60px 0 rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    }

    .wj-messageBox-close {
        position: absolute;
        top: -38px;
        right: 2px;
        width: 26px;
    }

    .model-contianer-large {
        width: 600px;
    }

    .model-contianer-small {
        width: 300px;
    }

    .text-center {
        text-align: center;
    }

    .modal-header {
        padding: 20px 28px 0;
        position: relative;
        font-size: 20px;
    }

    .model-header-s {
        font-size: 16px;
        text-align: center;
    }

    .modal-body {
        padding: 0 20px;
    }

    .modal-footer {
        padding: 30px 20px 0;
        display: flex;
        justify-content: center;
    }

    .modal-footer-s {
        justify-content: space-between;
    }

    .modal-footer-text {
        padding: 0 20px 20px;
    }

    .text-small {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333;
        line-height: 34px;
        font-weight: 600;
    }

    .fubiaoti {
        width: 100%;
        padding: 0;
    }

    .icon {
        text-align: center;
    }

    .iconfont {
        font-size: 36px;
        color: #7a58f0;
    }

    .heading {
        width: 100%;
        line-height: 36px;
        text-align: center;
        img {
            width: 143px;
        }
    }

    .tooltip {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 360px;
    }

    .tooltip-l {
        left: 110px;
    }

    /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter-active .modal-container {
        animation: slideUpLarge 0.3s;
    }

    .modal-leave-active .modal-container {
        animation: slideDownLarge 2s;
    }

    @keyframes slideDownLarge {
        0% {
            transform: translateY(0%);
        }
        100% {
            transform: translateY(100%);
        }
    }

    @keyframes slideUpLarge {
        0% {
            transform: translateY(50%);
        }
        100% {
            transform: translateY(0%);
        }
    }
</style>