<template>
    <div class="play-content">
        <div class="play-video">
            <div v-if="!loading" class="timer">
                {{second}}"
            </div>
            <!--音乐开关、转换摄像头-->
            <div class="bottom-btns flex">
                <div class="btn-music" @click="toggleMusic">
                    <img v-show="music" src="../assets/bxmimg/room_music.png">
                    <img v-show="!music" src="../assets/bxmimg/room_closemusic.png">
                </div>
                <div class="btn-switch" @click="switchVideo">
                    <img src="../assets/bxmimg/room_camera.png">
                </div>
            </div>
        </div>

        <!--获取游戏结果loading-->
        <div v-show="loading" class="getResult">
            <p>
                已下爪，等待结果..
            </p>
        </div>

        <!--弹框-->
        <Alert :styles="alertStyles.alert" v-if="alertState === 1" v-on:close='confrim()'>
            <img slot="title" :src="alertStyles.titImg" alt="" />
            <div slot="main" :style="alertStyles.main">
                {{alertStyles.mainText}}
            </div>
            <template slot="btns">
                <button v-for="(item,index) of alertStyles.btns" class="button" @click='alertClick(alertStyles.type ,index)' :style="item.styles">
                    {{item.txt}}
                    <span v-if="item.timerState">({{time}})</span>
                </button>
            </template>
        </Alert>

        <!--开始倒计时-->
        <WDao v-if="isFinish" @finish="finish"></WDao>
        <!--点击音效-->
        <audio ref="music" preload src="//s1.wajiwaji.net/%E6%8C%89%E9%92%AE.wav" type="audio/mp3"></audio>
        <!--操作爪子按钮-->
        <div class="play-control-box flex flex-sc">
            <div v-if="isSupportTouch" class="play-control">
                <div class="btn direction-up" @touchstart.prevent="clickBtn('top',1)" @touchend="clickBtn('top',0)">
                    <div v-show="top === 0" class="pressup">
                        <i class="iconfont icon-shangjiantou"></i>
                    </div>
                    <div v-show="top === 1" class="press">
                        <i class="iconfont icon-shangjiantou"></i>
                    </div>
                </div>
                <div class="btn direction-down" @touchstart.prevent="clickBtn('bottom',1)" @touchend="clickBtn('bottom',0)">
                    <div v-show="bottom === 0" class="pressup">
                        <i class="iconfont icon-xiajiantou"></i>
                    </div>
                    <div v-show="bottom === 1" class="press">
                        <i class="iconfont icon-xiajiantou"></i>
                    </div>
                </div>
                <div class="btn direction-left" @touchstart.prevent="clickBtn('left',1)" @touchend="clickBtn('left',0)">
                    <div v-show="left === 0" class="pressup">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                    <div v-show="left === 1" class="press">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                </div>
                <div class="btn direction-right" @touchstart.prevent="clickBtn('right',1)" @touchend="clickBtn('right',0)">
                    <div v-show="right === 0" class="pressup">
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                    <div v-show="right === 1" class="press">
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                </div>
                <div class="zhua">
                    <div class="btn catch flex-zhong" @touchstart.prevent="clickBtn('press',1)" @touchend="clickBtn('press',0)">
                        <div v-if="press === 0" class="pressup1">
                        </div>
                        <div v-if="press === 1" class="press1"></div>
                    </div>
                    <div class="huan">
                        <div class="yuandi-wl">
                            <div class="yuandi" :class="{addTranstionDelay:transtionSwitch}" :style="{transform:'rotate('+degl+'deg)'}">
                            </div>
                        </div>
                        <div class="yuandi-wr">
                            <div class="yuandi" :class="{addTranstion:transtionSwitch}" :style="{transform:'rotate('+degr+'deg)'}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="control">
                <div class="btn direction-up" @mousedown="clickBtn('top',1)" @mouseup="clickBtn('top',0)">
                    <div v-show="top === 0" class="pressup">
                        <i class="iconfont icon-shangjiantou"></i>
                    </div>
                    <div v-show="top === 1" class="press">
                        <i class="iconfont icon-shangjiantou"></i>
                    </div>
                </div>
                <div class="btn direction-down" @mousedown="clickBtn('bottom',1)" @mouseup="clickBtn('bottom',0)">
                    <div v-show="bottom === 0" class="pressup">
                        <i class="iconfont icon-xiajiantou"></i>
                    </div>
                    <div v-show="bottom === 1" class="press">
                        <i class="iconfont icon-xiajiantou"></i>
                    </div>
                </div>
                <div class="btn direction-left" @mousedown="clickBtn('left',1)" @mouseup="clickBtn('left',0)">
                    <div v-show="left === 0" class="pressup">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                    <div v-show="left === 1" class="press">
                        <i class="iconfont icon-zuojiantou"></i>
                    </div>
                </div>
                <div class="btn direction-right" @mousedown="clickBtn('right',1)" @mouseup="clickBtn('right',0)">
                    <div v-show="right === 0" class="pressup">
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                    <div v-show="right === 1" class="press">
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                </div>
                <div class="zhua">
                    <div class="btn catch flex-zhong" @mousedown="clickBtn('press',1)" @mouseup="clickBtn('press',0)">
                        <div v-show="press === 0" class="pressup1"></div>
                        <div v-show="press === 1" class="press1"></div>
                    </div>
                    <div class="huan">
                        <div class="yuandi-wl">
                            <div class="yuandi" :style="{transform:'rotate('+degl+'deg)'}">
                            </div>
                        </div>
                        <div class="yuandi-wr">
                            <div class="yuandi" :style="{transform:'rotate('+degr+'deg)'}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import WDao from '@/waji/components/WDao'
    import api from '@/waji/api'
    const Paho = window.Paho;
    var resultTimer = null;
    function check(num) {
        if (num < 10) {
            num = `0${num}`
        }
        return `${num}`
    }

    function handleFormateTime() {
        const now = new Date()
        const year = now.getFullYear()
        const month = check(now.getMonth() + 1)
        const day = check(now.getDate())
        const hour = check(now.getHours())
        const minute = check(now.getMinutes())
        const second = check(now.getSeconds())

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }

    export default {
        components: {
            WDao,
        },
        props: {
            videoType: '',
            successNum: {

            },
            userToken: {
                type: String,
                required: true
            },
            wsToken: {
                type: String,
                required: true
            },
            deviceId: {
                type: String,
                required: true
            },
            gameToken: {
                type: String,
                required: true
            },
            gameId: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
            music: {
                type: Boolean,
                required: true
            },
            wsFrontUrl: {
                type: String,
                required: true
            },
            wsSideUrl: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                alertStyles: {},
                alertState: 0,
                isFinish: true,
                isPlaying: false,
                counter: 20,
                second: 25,
                time: 5,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                press: 0,
                controlId: 0,
                mqtt: null,
                alert: {
                    title: '',
                    msg: '',
                    show: false,
                    type: -1
                },
                loading: false,
                timeout: null,
                degl: 0,
                degr: 0,
                transtionSwitch: false,
                successBtn: '查看奖品',
            }
        },
        computed: {
            isSupportTouch() {
                return document.ontouchstart === null || document.ontouchstart
            },
            urlFront() {
                return `${this.wsFrontUrl}/?u=${encodeURIComponent(this.userToken)}&w=${this.wsToken}${process.env.BUILD_ENV === 't' ? '&t=1' : ''}`
            },
            urlSide() {
                return `${this.wsSideUrl}/?u=${encodeURIComponent(this.userToken)}&w=${this.wsToken}${process.env.BUILD_ENV === 't' ? '&t=1' : ''}`
            },
            wajiFreeCount() {
                return this.$store.getters.wajiFreeCount;
            }
        },
        watch: {
            top(val) {
                val && (this.controlId += 1)
                if (this.videoType === 'SIDE') {
                    this.sendMessage('kleft', val)
                } else {
                    this.sendMessage('ktop', val)
                }
            },
            bottom(val) {
                val && (this.controlId += 1)
                if (this.videoType === 'SIDE') {
                    this.sendMessage('kright', val)
                } else {
                    this.sendMessage('kbottom', val)
                }
            },
            left(val) {
                val && (this.controlId += 1)
                if (this.videoType === 'SIDE') {
                    this.sendMessage('kbottom', val)
                } else {
                    this.sendMessage('kleft', val)
                }
            },
            right(val) {
                val && (this.controlId += 1)
                if (this.videoType === 'SIDE') {
                    this.sendMessage('ktop', val)
                } else {
                    this.sendMessage('kright', val)
                }
            },
            press(val) {
                if (val) {
                    this.second = 0;
                }
            },
            second(val) {
                if (this.second <= 0) {
                    this.controlId += 1
                    this.sendMessage('kcatch', 1)
                    this.sendMessage('kcatch', 0)
                    this.stopPlay()
                }
            },
            gameId(val) {
                //每次开始游戏前的初始化
                console.log('gameIdChanged')
                this.connectMqtt()
                this.isFinish = true
                // this.switchVideo('FONT');
                this.second = 25;
                this.counter = 20;
                this.time = 5;
                this.top = 0;
                this.bottom = 0;
                this.left = 0;
                this.right = 0;
                this.press = 0;
                this.controlId = 0;
                //圆环动画初始化
                this.transtionSwitch = false;
                this.degr = 0;
                this.degl = 0;
            }
        },
        created() {
            if (this.$store.getters.logState) {
                this.$store.dispatch('SetData', {
                    code: 'gameId',
                    message: this.gameId
                });
            };
        },
        mounted() {
            this.connectMqtt();
        },
        methods: {
            //弹框
            bxmShowAlert(type, mainTxt) {
                this.alertStyles = {
                    alert: {
                    },
                    main: {
                        'margin': this.Util.st(38),
                        'padding-top': this.Util.st(56),
                        'padding-bottom': this.Util.st(56),
                        'border-radius': this.Util.st(20),
                        'background': '#ffffff',
                        'color': '#895d11',
                        'text-align': 'center',
                        'font-size': this.Util.st(36),
                        'font-weight': '600'
                    },
                    mainText: '亲，太可惜啦！',
                    btns: []
                };
                this.alertStyles.type = type;
                switch (type) {
                    case 'fail':
                        this.alertStyles.titImg = './static/img/pop_fail_title.png';
                        this.alertStyles.mainText = '亲，太可惜啦！';
                        this.alertStyles.btns = [{
                            timerState: true,
                            txt: '再来一次',
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
                    case 'success':
                        this.alertStyles.titImg = './static/img/pop_success_title.png';
                        this.alertStyles.mainText = '天选之人，抓到了哦！',
                            this.alertStyles.btns = [{
                                txt: '查看奖品',
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
                                txt: '再玩一次',
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
                        break;
                    case 'recharge':
                        this.alertStyles.titImg = './static/img/pop_recharge_title.png';
                        this.alertStyles.mainText = '老板，加钱吗？',
                            this.alertStyles.btns = [{
                                txt: '充值',
                                styles: {
                                    'width': this.Util.st(302),
                                    'height': this.Util.st(132),
                                    'background': 'url(./static/img/pop_btn.png) no-repeat center',
                                    'background-size': '100% 100%',
                                    'border': 'none',
                                    'color': '#895d11',
                                    'font-size': this.Util.st(40),
                                }
                            }];
                        break;
                    case 'badGame':
                        this.alertStyles.titImg = './static/img/pop_error_title.png';
                        this.alertStyles.mainText = mainTxt,
                            this.alertStyles.btns = [{
                                timerState: true,
                                txt: '再玩一次',
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
                };
                this.alertState = 1;
                clearInterval(resultTimer);
                resultTimer = setInterval(() => {
                    if (this.time <= 0) {
                        clearInterval(resultTimer);
                        if (this.time === 0) this.confrim();
                        return;
                    }
                    this.time -= 1;
                }, 1000);
            },
            //弹窗方法
            showAlert(msg, title, type) {
                clearInterval(resultTimer)
                this.alert.title = title;
                this.alert.msg = msg;
                this.alert.show = true;
                this.alert.type = type;
                this.time = 5;
                if (type == 1) {
                    this.successBtn = '查看奖品'
                } else {
                    this.successBtn = ''
                };
                const resultTimer = setInterval(() => {
                    if (this.time <= 0) {
                        clearInterval(resultTimer);
                        if (this.time === 0) this.confrim();
                        return;
                    }
                    this.time -= 1;
                }, 1000);
            },
            alertClick(type, idx) {
                console.log(type, idx)
                switch (type) {
                    case 'fail':
                        this.again();
                        break;
                    case 'success':
                        if (idx === 0) {
                            this.$router.push({
                                path: '/my/myPrize'
                            })
                        } else if (idx === 1) {
                            this.again();
                        };
                        break;
                    case 'recharge':
                        break;
                    case 'badGame':
                        this.again();
                        break;
                };
            },
            //圆环倒计时开始转圈
            startzhuan() {
                this.transtionSwitch = true;
                this.degr = 180;
                this.degl = 180;
            },
            //按钮点击
            clickBtn(type, val) {
                if (val === 0 && this.music) {
                    this.$refs.music.play()
                }
                switch (type) {
                    case 'top':
                        this.top = val
                        break
                    case 'bottom':
                        this.bottom = val
                        break
                    case 'left':
                        this.left = val
                        break
                    case 'right':
                        this.right = val
                        break
                    case 'press':
                        this.press = val
                        break
                };
                if (this.$store.getters.logState) {
                    let dd = JSON.parse(JSON.stringify(this.$store.getters.operationLogArray));
                    dd.push(type);
                    console.log(dd);
                    this.$store.dispatch('SetData', {
                        code: 'operationLogArray',
                        message: dd
                    });
                    dd = null;
                };
            },
            //切换摄像头
            switchVideo(type) {
                console.log(type)
                this.$emit('switchVideo')
            },
            //获取游戏结果
            getGameResult() {
                this.counter -= 1
                if (this.counter < 0) {
                    this.loading = false;
                    this.bxmShowAlert('badGame', '无法感应到游戏结果，如果抓到了请联系客服申诉！');
                    return
                }
                api
                    .getGameResult(this.gameId)
                    .then(({
                        result
                    }) => {
                        switch (result.gameResult) {
                            case 0:
                                // 未拿到结果，接着轮询
                                this.timeout = setTimeout(() => {
                                    this.getGameResult()
                                }, 1000)
                                break
                            case 1:
                                // 成功抓到
                                this.$store.dispatch('SetFreeCount', this.wajiFreeCount - 1);
                                this.loading = false;
                                this.bxmShowAlert('success');
                                break
                            case -1:
                                // 没有抓到
                                this.loading = false
                                switch (result.gameFailureReason) {
                                    case 10:
                                        this.$store.dispatch('SetFreeCount', this.wajiFreeCount - 1);
                                        this.bxmShowAlert('fail');
                                        break
                                    case 20:
                                        this.bxmShowAlert('badGame', '游戏因出现问题而中断，已经将花费退回至你的账户中，请查收！');
                                        break
                                    case 21:
                                        this.bxmShowAlert('badGame', '游戏因出现问题而中断，该游戏房间将进入维修状态，已经将花费退回至你的账户中，请查收！');
                                        break
                                }
                                break
                            default:
                                this.loading = false
                                console.log('无效的游戏结果代码')
                        }
                    })
                    .catch(res => {
                        this.loading = false
                        console.log('失败', res)
                    })
            },
            //连接操控
            connectMqtt() {
                const host = 'mqtt-cn-0pp07wo2y01.mqtt.aliyuncs.com'
                const groupId = 'GID_wajiwaji_Operation'
                const clientId = `${groupId}@@@web${this.gameId}`
                const that = this
                this.mqtt = new Paho.MQTT.Client(host, 443, '/mqtt', clientId)

                // set callback handlers
                this.mqtt.onConnectionLost = onConnectionLost
                this.mqtt.onMessageArrived = onMessageArrived

                // connect the client
                this.mqtt.connect({
                    timeout: 3,
                    keepAliveInterval: 90,
                    cleanSession: true,
                    onSuccess: onConnect,
                    useSSL: true,
                    onFailure: () => {
                        console.log('www', that.isPlaying)
                        if (that.isPlaying) {
                            that.connectMqtt()
                        }
                    }
                })
                // called when the client connects
                function onConnect() {
                    // Once a connection has been made, make a subscription and send a message.
                    console.log('onConnect')
                    const data = {
                        token: that.gameToken,
                        type: 'W'
                    }
                    // data = JSON.stringify(data)
                    const message = new Paho.MQTT.Message(JSON.stringify(data)) // set body
                    message.destinationName = '$SYS/uploadToken' // set topic
                    message.qos = 1
                    that.mqtt.send(message)

                    setTimeout(() => {
                        console.log('开始游戏')
                        that.isPlaying = true
                        that.sendMessage('start')
                    }, 200)
                }

                function onConnectionLost(response) {
                    console.log('mqtt connection lost')
                    if (that.isPlaying) {
                        that.connectMqtt()
                    }
                    if (response.errorCode !== 0) {
                        console.error(`onConnectionLost:${response.errorMessage}`)
                    }
                }

                function onMessageArrived(message) {
                    const topic = message.destinationName
                    const payload = message.payloadString + message.payloadBytes
                    console.log(`recv msg : ${topic}   ${payload}`)
                }
            },
            sendMessage(method, state) {
                let data = {}
                if (method === 'start') {
                    data = {
                        gameId: this.gameId,
                        date: handleFormateTime(),
                        function: method,
                        deviceId: this.deviceId,
                        userId: this.userId
                    }
                } else {
                    data = {
                        gameId: this.gameId,
                        date: handleFormateTime(),
                        function: 'control',
                        control: method,
                        controlId: this.controlId,
                        state: `${state}`,
                        deviceId: this.deviceId,
                        userId: this.userId
                    }
                }
                const topic = `Topic_wajiwaji_Customer2Device/${this.deviceId}/`
                console.log(data)
                const message = new Paho.MQTT.Message(JSON.stringify(data)) // set body
                message.destinationName = topic // set topic
                this.mqtt.send(message)
            },
            //音乐开关
            toggleMusic() {
                this.$emit('toggleMusic')
            },
            stopPlay() {
                this.isPlaying = false
                setTimeout(() => {
                    this.loading = true;
                    api.updateGameLog(
                        this.$store.getters.gameId,
                        JSON.parse(JSON.stringify(this.$store.getters.fpsLogArray)),
                        JSON.parse(JSON.stringify(this.$store.getters.networkDelayLogArray)),
                        JSON.parse(JSON.stringify(this.$store.getters.operationLogArray)),
                    ).then((res) => {
                        console.log('www')
                    });
                    this.$store.dispatch('SetData', {
                        code: 'logState',
                        message: false
                    });
                    this.$store.dispatch('SetData', {
                        code: 'fpsLogArray',
                        message: []
                    });
                    this.$store.dispatch('SetData', {
                        code: 'networkDelayLogArray',
                        message: []
                    });
                    this.$store.dispatch('SetData', {
                        code: 'operationLogArray',
                        message: []
                    })
                    this.getGameResult()
                }, 6000)
            },
            //刚进入play页面
            start() {
                this.startzhuan(); //开始转圈
                const daoTimer = setInterval(() => {
                    if (this.second <= 0) {
                        clearInterval(daoTimer)
                        return
                    }
                    this.second -= 1
                }, 1000)
            },
            //再来一次
            again() {
                console.log('agin');
                clearInterval(resultTimer);
                this.alertState = 0;
                this.$emit('start');
            },
            //关闭退出
            confrim() {
                console.log('end')
                this.alertState = 0;
                this.$emit('end');
            },
            finish() {
                this.isFinish = false;
                this.start();
            }
        },
        destroyed() {
            try {
                this.isPlaying = false;
                this.mqtt && this.mqtt.disconnect();
            } catch (error) {
                console.error(error);
            };
            clearInterval(resultTimer);
            this.timeout && clearTimeout(this.timeout);
        }
    }
</script>
<style lang="scss">
    @import './WPlay';
</style>