<template>
    <Alert :styles="alertStyles.alert" v-on:close='close()'>

        <!--新用户-->

        <template v-if="upAlertStyle.type === 'newUser'">
            <img slot="title" :src="alertStyles.titImg" alt="" />
            <div slot="main" :style="alertStyles.main">

            </div>
            <template slot="btns">
                <button class="button" @click='btnClick()' :style="alertStyles.btn">{{alertStyles.btnTxt}}</button>
            </template>
        </template>

        <!--默认-->

        <template v-else>
            <img slot="title" :src="alertStyles.titImg" alt="" />
            <div slot="main" :style="alertStyles.main" v-html="alertStyles.html">

            </div>
            <template slot="btns">
                <button class="button" @click='btnClick()' :style="alertStyles.btn">{{alertStyles.btnTxt}}</button>
            </template>
        </template>
    </Alert>
</template>

<script>
    export default {
        data() {
            return {
                alertStyles: {},
            }
        },
        props: [
            'upAlertStyle'
			/*
			 
			 * type 为 newUser  新用户弹框
			 * 需要传入 
			 * 		titImg: './static/img/pop_new_title.png',
					alertBg: './static/img/pop_new.png',
					btnTxt: 'GO',
					type: 'newUser',
					clickType: 2, //按钮点击事件类型，1为直接关闭，2为跳转链接 2的情况下需要传入goUrl, 3为执行传入的函数
					goUrl:'' // 跳往的链接 clickType 为2时传入
					isFun: function // 执行的事件  clickType 为3时传入
					btnImg： 按钮背景图 可传可不传
			 * type 为 默认   带字提示框
			 * 需要传入 
			 * 		titImg: './static/img/pop_new_title.png',
					btnTxt: 'GO',
					type: 'newUser',
					clickType: 1,
					btnImg： 按钮背景图 可传可不传
			 * */
        ],
        watch: {
            upAlertStyle(val){
                this.initStyle()
            }
        },
        created() {
            this.initStyle()
        },
        methods: {
            initStyle(){
                switch (this.upAlertStyle.type) {
                    case 'newUser':
                        this.alertStyles = {
                            alert: {
                                'background-image': 'url(' + this.upAlertStyle.alertBg + ')',
                                'background-position': 'center top',
                                'background-repeat': 'no-repeat',
                                'background-size': '100%',
                            },
                            titImg: this.upAlertStyle.titImg,
                            main: {
                                'height': this.Util.st(160),
                            },
                            btnTxt: this.upAlertStyle.btnTxt,
                            btn: {
                                'width': this.Util.st(302),
                                'height': this.Util.st(132),
                                'background-image': 'url(' + (this.upAlertStyle.btnImg || './static/img/pop_btn.png') + ')',
                                'background-position': 'center',
                                'background-repeat': 'no-repeat',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#f95355',
                                'font-size': this.upAlertStyle.btnSz || this.Util.st(72),
                            }
                        };
                        break;
                    default:
                        this.alertStyles = {
                            titImg: this.upAlertStyle.titImg,
                            alert: {},
                            main: {
                                'margin': this.Util.st(38),
                                'margin-top': 0,
                                'padding-top': this.Util.st(56),
                                'padding-bottom': this.Util.st(56),
                                'border-radius': this.Util.st(20),
                                'background': '#ffffff',
                                'text-align': 'center',
                                'font-weight': '600'
                            },
                            btn: {
                                'width': this.Util.st(302),
                                'height': this.Util.st(132),
                                'background-image': 'url(' + (this.upAlertStyle.btnImg || './static/img/pop_btn.png') + ')',
                                'background-position': 'center',
                                'background-repeat': 'no-repeat',
                                'background-size': '100% 100%',
                                'border': 'none',
                                'color': '#895d11',
                                'font-size': this.Util.st(38)
                            },
                            btnTxt: this.upAlertStyle.btnTxt,
                            html: this.upAlertStyle.html,
                        };
                        break;
                }
            },
            btnClick() {
                switch (this.upAlertStyle.clickType) {
                    case 1:
                        this.close()
                        break;
                    case 2:
                        this.$router.push(this.upAlertStyle.goUrl);
                        break;
                    case 3:
                        this.upAlertStyle.isFun()
                        break;
                    default:
                        break;
                }
            },
            close() {
                this.$emit('close', '')
            }
        }
    }
</script>

<style>
</style>