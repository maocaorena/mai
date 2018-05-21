<template>
    <div id="waji-room">
        <div class="waji-room-top">
            <qipao v-if="isShow"></qipao>

            <transition name="fadetop" mode="">
                <toproom v-if="showTopRoom && showTopRoomOne && !isStart" v-on:close="showTopRoom = false;showTopRoomOne = false;"></toproom>
            </transition>
            <!-- 成功视频按钮 -->
            <div v-show="!isStart" class="success-records" @click="showSuccessVideosDlg">
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

            <!--视频-->
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
            <div v-show="room.device.deviceState!==undefined && !isStart" class="room-state" :class="room.device.deviceState===1?'status-idel':room.device.deviceState===-1?'status-fault':'status-play'">
                <div class="stateFront">
                    <img v-if="room.device.deviceState!=1&&room.device.deviceState!=-1" :src="room.roomPlayer.userPicUrl" />
                </div>
                <div class="p-status">
                    {{room.device.deviceState===1?'空闲中':room.device.deviceState===-1?'维修中':'游戏中'}}
                </div>
            </div>
        </div>
        <!-- 游戏页面 -->
        <w-play v-if="isStart" :wsFrontUrl="wsFrontUrl" :successNum="roomViewerNumber" :videoType="videoType" :wsSideUrl="wsSideUrl"
            :userId="userId" :userToken="userToken" :wsToken="wsToken" :deviceId="deviceId" :gameToken="gameToken" :gameId="gameId"
            :music="music" @switchVideo="switchVideo" @toggleMusic="toggleMusic" @start="startGame" @end="isEnd">
        </w-play>
        <!-- 聊天框 -->
        <div class="im" ref="im" v-show="!isStart">
            <div class="im-in">
                <div class="im-msgs">

                    <!-- 顶部公告 -->
                    <div class="announcement flex">
                        <p class="laba">
                            <i class="iconfont icon-gonggao"></i>
                        </p>
                        <p class="announcement-message">{{chatRoom.announcement}}</p>
                    </div>

                    <template v-for="(item,index) in chatRoom.msgs">

                        <!--发表消息-->
                        <div v-if="item.type==='text'" class="msg-enter" :key="index">
                            <img class="head" :src="item.fromAvatar" />
                            <span>{{item.fromNick}}</span>：{{item.text}}
                        </div>

                        <!--开始了表演-->
                        <div v-if="item.type==='custom' && item.content.type===2" class="msg-play" :key="index">
                            <img class="head" :src="item.content.userPicUrl" />
                            <span class="name">{{item.content.userName}}</span>{{item.content.userBehavior}}
                        </div>

                        <!--中奖了-->
                        <div v-if="item.type==='custom' && item.content.type===1" :key="index" class="msg-catch">
                            <div class="msg-catch-in flex flex-sc">
                                <span class="in-in flex flex-sc">
                                    <img class="head" :src="item.content.userPicUrl" />
                                    <span class="name">{{item.content.userName}}</span> 成功抓到了奖品！！！
                                </span>
                            </div>
                        </div>

                        <!--进入房间-->
                        <div v-if="item.type==='notification' && item.attach.type==='memberEnter' && item.attach.custom" class="msg-enter" :key="index">
                            <img class="head" :src="item.attach.custom.roomAvatar" />
                            <span class="name">{{item.attach.fromNick}}</span>进入房间
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="bottom" v-show="!isStart">
            <div class="tips" v-if="isFirstEnter">
                点击此按钮开始抓娃娃
            </div>
            <div class="btn-comment" @click="shwoCommentDlg">
                <div>发言</div>
            </div>
            <div class="btn-play" v-if="!isFirstEnter&&room.device.deviceState===-1" @click="isRepair">
                维修中
                <p v-if="wajiFreeCount > 0" class="price">
                    <span>
                        (剩余免费试玩次数:{{wajiFreeCount}})
                    </span>
                </p>
                <p v-if="wajiFreeCount <= 0" class="price">
                    <i class="iconfont icon-jinbi"></i>
                    <span>
                        {{priceBxm}}/次
                    </span>
                </p>
            </div>
            <div class="btn-play" :class="{'isFirstEnter':isFirstEnter}" v-else-if="isFirstEnter||room.device.deviceState===1" @click="startGame">
                开始游戏
                <p v-if="wajiFreeCount > 0" class="price">
                    <span>
                        (剩余免费试玩次数:{{wajiFreeCount}})
                    </span>
                </p>
                <p v-if="wajiFreeCount <= 0" class="price">
                    <i class="iconfont icon-jinbi"></i>
                    <span>
                        {{priceBxm}}/次
                    </span>
                </p>
            </div>
            <div class="btn-play" v-else-if="!isFirstEnter" @click="$toast.show('有人在游戏中，稍后再开始游戏喔~');showTopRoom = true;">
                开始游戏
                <p v-if="wajiFreeCount > 0" class="price">
                    <span>
                        (剩余免费试玩次数:{{wajiFreeCount}})
                    </span>
                </p>
                <p v-if="wajiFreeCount <= 0" class="price">
                    <i class="iconfont icon-jinbi"></i>
                    <span>
                        {{priceBxm}}/次
                    </span>
                </p>
            </div>
            <div class="btn-recharge" @click="recharge">
                <p class="balance" v-if="balance.balance != -1">
                    <i class="iconfont icon-jinbi"></i>
                    <span>
                        {{balance.balance>99999999?'99999999+':balance.balance}}
                    </span>
                </p>
                <div>
                    {{visitMode == 1? '领券' : '充值'}}
                    <span v-if="balance.balance<priceBxm" class="dian"></span>
                </div>
            </div>
        </div>

        <!--发送弹幕-->
        <ModalMessage v-if="commentDlg" class="comment-dlg" :height="94" :show="commentDlg" @hide="closeCommentDlg">
            <div class="quick-msgs">
                <span v-for="(item,index) in quickMsgs" :key="index" @click="setQuickMsg(item)">{{item}}</span>
            </div>
            <div class="input-bar">
                <input v-model="msg" type="text" maxlength="20" autofocus="autofocus" name="ttt" placeholder="发送弹幕，20字以内">
                <div class="btn-send" @click="sendMsg">发送</div>
            </div>
        </ModalMessage>
        <!--成功视频弹窗-->
        <success-videos v-if="successVideosDlg" v-on:close="closeSuccessVideosDlg" :room-id="roomId"></success-videos>
        <!--背景音乐-->
        <audio v-if="bgmState" preload="auto" ref="music" :src="systemSet.backgroundMusicUrl" type="audio/mp3" loop="loop"></audio>

        <ResultBxm v-if="alert.show" :msg="alert.msg" :alertType="alert.alertType" :userType="alert.userType" v-on:alertClick="alertClick" v-on:close="closeAlert"></ResultBxm>

        <shade :style="{'z-index': 55}" v-if="isFirstEnter" @click.native="closeFirstEnterMask">
        </shade>

        <shade :style="{'z-index': 80}" v-if="showLoading">
            <p style="padding: 10px; background: #fff;border-radius: 5px;">请稍等..</p>
        </shade>
    </div>
</template>

<style lang="scss">
    @import "./wajiRoom";
</style>
<script>
    import { Toast } from 'mint-ui';
    import throttle from 'lodash/throttle'
    import timeConfig from '@/config/config'

    import api from '@/waji/api'
    import http from '@/waji/api/http'
    import ModalMessage from '@/waji/components/Modal-message'
    import WPlay from '@/waji/components/WPlay'
    import SuccessVideos from '@/waji/components/SuccessVideos'
    import ResultBxm from '@/waji/components/ResultBxm'
    import bxmplayer from './player'
    import toproom from './topRoom'
    import qipao from '@/pages/home/qipao.vue';
    export default {
        components: {
            SuccessVideos,
            WPlay,
            ModalMessage,
            ResultBxm,
            bxmplayer,
            toproom,
            qipao
        },
        props: {
            userId: {
                type: String
            },
            token: {
                type: String
            },
            imAccid: {
                type: String
            },
            imToken: {
                type: String
            },
            roomId: {
                type: String,
                required: true
            },
            userName: {
                type: String
            },
            userPicUrl: {
                type: String
            },
        },
        data() {
            return {
                isShow: false,//弹幕
                isFirstEnter: localStorage.getItem('isFirstEnter') === null,
                isStart: false,
                userToken: null,
                wsToken: null,
                gameId: null,
                gameToken: null,
                interval: null,
                deviceId: '',
                room: {
                    roomPlayer: {},
                    roomGold: {},
                    roomSilver: {},
                    roomBronze: {},
                    roomFirst: {},
                    device: {}
                },
                alert: {
                    alertType: '',
                    msg: '',
                    userType: 3,
                    show: false,
                },
                msg: '',
                quickMsgs: ['666', '233333', '还能有这种操作？！！', '厉害了',],
                successVideosDlg: false,
                commentDlg: false,
                needQueryParam: false,
                music: localStorage.getItem('music') ? localStorage.getItem('music') === 'true' : true,
                showLoading: false,
                successUser: {},
                successVideoUrl: '',
                isVideoNull: false,
                videoType: 'FRONT',
                flvPlayer: null,
                chatRoom: {
                    instance: null,
                    announcement: '',
                    msgs: []
                },
                balance: {
                    balance: -1
                },
                priceBxm: '',
                roomViewerNumber: '',
                bgmState: false,
                showTopRoom: false,
                showTopRoomOne: true
            }
        },
        computed: {
            wajiFreeCount() {//剩余免费次数
                return this.$store.getters.wajiFreeCount;
            },
            systemSet() {//背景音乐
                return this.$store.getters.systemSet;
            },
            wsUrl() {
                console.log('userToken', this.userToken)
                return `wss://ws-server-h264.wajiwaji.net/?u=${encodeURIComponent(this.userToken)}&w=${this.wsToken}${process.env.BUILD_ENV === 't' ? '&t=1' : ''}`
            },
            userType() {
                return this.$store.getters.userType;
            },
            visitMode() {
                return this.$store.getters.visitMode;
            }
        },
        watch: {
            'isStart': function (oldVal, newVal) {
                if (newVal) {
                    this.checkImScroller()
                }
            },
            '$route.query.roomId': function () {
                this.roomId = this.$route.query.roomId;
                this.isShow = false;
                setTimeout(() => {
                    this.isShow = true;
                }, 300)
            }
        },
        created() {
            this.getWabiBalance(); //获取余额
            this.userToken = `USERTOKEN_&&_${this.userId}_&&_${this.token}`
            http.setToken(this.userToken);
        },
        mounted() {
            if (!this.systemSet) {
                this.$store.dispatch('GetSystemSet').then(systemSet => { // 如果 后台设置了 免费金额 或者  免费次数
                    this.bgmState = true;
                    this.$nextTick(() => {
                        if (this.music) {
                            this.$refs.music.play();
                        } else {
                            this.$refs.music.pause();
                        };
                    });
                });
            } else {
                this.bgmState = true;
                this.$nextTick(() => {
                    if (this.music) {
                        this.$refs.music.play();
                    } else {
                        this.$refs.music.pause();
                    };
                })
            };
            if (this.needQueryParam) {
                return
            };

            api.enterRoom(this.roomId)
                .then(({
                    result
                }) => {
                    if (result) {
                        this.room = result;
                        this.getPriceBxm(result.product.productCurrentPrice);
                        if (result.device.deviceState === -1) {
                            Toast({
                                message: '很抱歉房间正在维修中，请稍后再来喔~',
                                position: 'bottom',
                                duration: 1000
                            });
                        };
                        this.deviceId = this.room.device.deviceId;
                        this.getVisiterCount();
                        this.initChatRoom()
                    } else {
                        console.log('未获取到房间信息', result)
                    }
                })
                .catch(res => {
                    console.log('进入房间失败', res)
                })
        },
        methods: {
            switchVideo(type) {
                if (this.isFirstEnter) {
                    this.closeFirstEnterMask()
                    return
                };
                this.videoType = this.videoType === 'SIDE' ? 'FRONT' : 'SIDE'
            },
            isEnd() {
                this.isStart = false
                this.getWabiBalance();
            },
            //游客获取剩余的免费次数
            getVisiterCount() {
                console.log('获取次数')
                return new Promise((resolve, reject) => {
                    this.api.getBn({
                        url: 'order/getLimitTimes',
                        params: {
                            deviceId: this.User.getDeviceId(),
                            userId: this.User.getMemberId(),
                        },
                        headers: {
                            appKey: this.User.getAppKey(),
                            token: this.User.getToken(),
                        }
                    }).then(res => {
                        if (res.data.successed) {
                            resolve(res.data.returnValue)
                        } else {
                            reject()
                        }
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            // 获取余额
            getWabiBalance() {
                this.balance = {
                    balance: '加载中...'
                };
                this.api.getBn({
                    url: 'user/getWabiBalance',
                    params: {
                        userId: this.User.getMemberId()
                    },
                    headers: {
                        token: this.User.getToken(),
                    }
                }).then((res) => {
                    if (res.data.successed) {
                        this.balance = res.data.returnValue;
                    } else {
                        this.balance = {
                            balance: -1
                        }
                    }
                })
            },
            //汇率转换
            getPriceBxm(count) {
                this.api.ajaxB({
                    type: 'POST',
                    url: 'order/calcOrderAmount',
                    params: {
                        wabi: count,
                    },
                    headers: {
                        appKey: this.User.getAppKey()
                    }
                }).then((res) => {
                    if (res.data.successed) {
                        this.priceBxm = res.data.returnValue;
                    } else {
                        this.priceBxm = '';
                    }
                })
            },
            //弹窗的点击事件
            alertClick(type, idx, userType) {
                switch (type) {
                    case 'recharge':
                        if (userType === 1) {
                            this.$router.push('/ticketList')
                        }else if(userType === 2){
                            this.api.goLogin();
                        }else{
                            if (idx === 0) {
                                this.recharge();
                            } else {
                                this.$router.push('/ticketList')
                            }
                        }
                        this.closeAlert();
                        break;
                    case 'other':
                        this.closeAlert();
                        break;
                    default:
                        break;
                }
            },
            closeAlert() {
                this.alert.show = false;
                if(this.isStart){
                    this.isEnd();
                }
            },
            //弹窗方法
            showAlert(msg, type, userType) {
                this.alert.msg = msg;
                this.alert.alertType = type;
                this.alert.userType = userType || 3;
                this.alert.show = true;
            },
            //消息滚动到底部
            checkImScroller() {
                const im = this.$refs.im
                if (im.scrollHeight - im.clientHeight - im.scrollTop <= 10) {
                    this.$nextTick(() => {
                        im.scrollTop = im.scrollHeight - im.clientHeight
                    })
                }
            },
            //初始化房间信息
            initChatRoom() {
                this.isShow = true;
                const _this = this
                if (!Chatroom) {
                    console.error('NIM_Web_Chatroom_v4.3.0.js未引入！')
                }
                let options
                if (this.token) {
                    options = {
                        account: this.imAccid,
                        token: this.imToken,
                        chatroomNick: this.userName,
                        chatroomAvatar: this.userPicUrl,
                        chatroomEnterCustom: JSON.stringify({
                            roomAvatar: this.userPicUrl
                        })
                    }
                } else {
                    options = {
                        isAnonymous: true,
                        chatroomNick: '游客'
                    }
                }
                this.chatRoom.instance = Chatroom.getInstance({
                    appKey: '17e27129996d06804bd5fa7649a7e213',
                    chatroomId: this.room.im.imChatRoomId,
                    chatroomAddresses: this.room.im.imChatRoomAddr,
                    ...options,
                    onconnect(obj) {
                        console.log('onconnect', obj)
                        _this.chatRoom.announcement = obj.chatroom.announcement;
                        _this.roomViewerNumber = obj.chatroom.onlineMemberNum;
                    },
                    onerror(error, obj) {
                        console.log('onerror', error, obj)
                    },
                    onwillreconnect(obj) {
                        console.log('onwillreconnect', obj)
                    },
                    ondisconnect(error) {
                        console.log('ondisconnect', error)
                    },
                    onmsgs(msgs) {
                        console.log('onmsgs', msgs)
                        msgs.forEach(msg => {
                            if (
                                msg.type === 'text' ||
                                msg.type === 'custom' ||
                                (msg.type === 'notification' && msg.attach.type === 'memberEnter' && msg.attach.custom)
                            ) {
                                // 需要显示的消息
                                if (msg.type === 'custom') {
                                    msg.content = JSON.parse(msg.content)
                                } else if (msg.type === 'notification' && msg.attach.type === 'memberEnter' && msg.attach.custom) {
                                    msg.attach.custom = JSON.parse(msg.attach.custom)
                                }
                                _this.chatRoom.msgs.push(msg)
                                // 滚动条接近底部时，新消息到达自动滚动到最底部
                                _this.checkImScroller()
                            }
                            if (msg.type === 'notification' && msg.attach.type === 'updateChatroom') {
                                msg.attach.custom = JSON.parse(msg.attach.custom)
                                if (msg.attach.custom && msg.attach.custom.deviceState !== undefined) {
                                    msg.attach.custom.device = {
                                        ..._this.room.device,
                                        ...msg.attach.custom.device,
                                        deviceState: msg.attach.custom.deviceState
                                    }
                                }
                                delete msg.attach.custom.deviceState
                                _this.room = {
                                    ..._this.room,
                                    ...msg.attach.custom
                                }
                            }
                        })
                    }
                })
            },
            isRepair() {
                Toast({
                    message: '房间维修中，去看看其他房间吧~',
                    position: 'bottom',
                    duration: 1000
                });
            },
            //开始游戏
            startGame(e) {
                if (this.isFirstEnter) {
                    this.closeFirstEnterMask()
                    return
                }
                if (!this.token) {
                    this.$emit('noLogin')
                } else {
                    if (this.userType === 2) {

                        this.showLoading = true;
                        this.getVisiterCount().then(count => {
                            if (count < 1) {
                                this.showLoading = false;
                                this.showAlert('游客模式试玩次数用完咯~', 'recharge', 2)
                            } else {
                                this.startGameApi()
                            }
                        })

                    }else{

                        if (this.balance.balance < this.priceBxm && this.wajiFreeCount <= 0) {
                             if (this.visitMode === 1) {
                                this.showAlert('老板，加钱吗？', 'recharge', 1)
                            } else {
                                this.showAlert('老板，加钱吗？', 'recharge', 3)
                            }
                        }else{
                            this.startGameApi();
                        };

                        
                    }
                }
            },
            startGameApi(){
                this.showLoading = true;
                api
                    .startGame(this.roomId)
                    .then(({
                        result
                    }) => {
                        this.gameId = result.gameId;
                        this.gameToken = result.gameToken;
                        this.wsToken = result.wsToken;
                        this.wsFrontUrl = result.wsFrontUrl;
                        this.wsSideUrl = result.wsSideUrl;
                        // this.switchVideo('FRONT');
                        if (this.videoType === 'SIDE') {
                            this.videoType = 'FRONT'
                        }
                        this.isStart = true;
                        this.showLoading = false;
                        this.$store.dispatch('SetData', {
                            code: 'logState',
                            message: true
                        });
                    })
                    .catch(res => {
                        console.log('失败', res)
                        this.showLoading = false;
                        this.isStart = false;
                        this.getWabiBalance();
                        switch (res.code) {
                            case '60001':
                                Toast({
                                    message: '房间使用中！',
                                    position: 'bottom',
                                    duration: 1000
                                });
                                break
                            case '60002':
                                Toast({
                                    message: '房间维护中！',
                                    position: 'bottom',
                                    duration: 1000
                                });
                                break
                            case '60003':
                                if (res.message == '抱歉,余额不足,请充值') {
                                    if(this.visitMode === 1){
                                        this.showAlert('老板，加钱吗？', 'recharge', 1)
                                    }else{
                                        this.showAlert('老板，加钱吗？', 'recharge', 3)
                                    }
                                } else {
                                    Toast({
                                        message: res.message,
                                        position: 'bottom',
                                        duration: 1500
                                    });
                                }
                                break
                            default:
                                res && res.message && Toast({
                                    message: res.message,
                                    position: 'bottom',
                                    duration: 1500
                                });
                        }
                    })
            },
            //打开成功视频弹窗
            showSuccessVideosDlg() {
                if (this.isFirstEnter) {
                    this.closeFirstEnterMask()
                    return
                }
                this.successVideosDlg = true
            },
            closeSuccessVideosDlg() {
                this.successVideosDlg = false
            },
            closeFirstEnterMask() {
                this.isFirstEnter = false
                localStorage.setItem('isFirstEnter', false)
            },
            //开关音乐
            toggleMusic() {
                if (this.isFirstEnter) {
                    this.closeFirstEnterMask()
                    return
                }
                this.music = !this.music
                localStorage.setItem('music', this.music)
                if (this.music) {
                    this.$refs.music.play();
                    Toast({
                        message: '音乐打开成功',
                        position: 'bottom',
                        duration: 1000
                    });
                } else {
                    this.$refs.music.pause()
                    Toast({
                        message: '音乐关闭成功',
                        position: 'bottom',
                        duration: 1000
                    });
                }
            },
            //下方按钮点击判断是否登录
            shwoCommentDlg() {
                if (!this.token || this.userType == 2) {
                    this.$emit('noLogin');
                    return;
                } else {
                    this.msg = '';
                };
                this.commentDlg = true;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.setQuickMsg('')
                    }, 500)
                })
            },
            closeCommentDlg() {
                this.commentDlg = false;
            },
            //快速发消息
            setQuickMsg(msg) {
                this.msg = msg;
                document.all.ttt.focus();
            },
            //发送消息
            sendMsg() {
                if (this.msg) {
                    if (this.msg.length > 20) {
                        Toast({
                            message: '请输入20字以内',
                            position: 'bottom',
                            duration: 1000
                        });
                    } else {
                        this.chatRoom.instance.sendText({
                            text: this.msg,
                            done: (error, msg) => {
                                if (!error) {
                                    this.chatRoom.msgs.push(msg)
                                    this.checkImScroller();
                                } else {
                                    Toast({
                                        message: '发送失败，请再试一次',
                                        position: 'bottom',
                                        duration: 1000
                                    });
                                }
                            }
                        })
                        this.commentDlg = false;
                        this.msg = '';
                    }
                }
            },
            recharge() {
                this.$emit('goRecharge')
            }
        },
        destroyed() {
            this.chatRoom.instance && this.chatRoom.instance.disconnect()
        }

    }
</script>