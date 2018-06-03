<template>
    <div id="addCard" class="wrapper">
        <div class="add-item">
            <p class="add-tip">
                持卡人
            </p>
            <p class="add-bottom">
                <input type="text" v-model="carddetail.cardholder" maxlength="20" placeholder="持卡人" />
            </p>
        </div>
        <div class="add-item">
            <p class="add-tip">
                持卡人身份证号码
            </p>
            <p class="add-bottom">
                <input type="tel" v-model="carddetail.identityNumber" placeholder="持卡人身份证号码" />
            </p>
        </div>
        <div class="add-item">
            <p class="add-tip">
                银行卡卡号
            </p>
            <p class="add-bottom">
                <input type="tel" v-model="carddetail.cardNumber" placeholder="银行卡卡号" />
            </p>
        </div>
        <div class="add-item">
            <p class="add-tip">
                所属银行
            </p>
            <p class="add-bottom">
                <input type="tel" v-model="carddetail.openBank" placeholder="所属银行" />
            </p>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="save">保存</button>
        </div>
    </div>
</template>
<script>
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                token: this.User.getToken(),
                userId: this.User.getUserId(),
                carddetail: {
                    cardholder: '',
                    identityNumber: '',
                    cardNumber: '',
                    openBank: ''
                },
                cardNum: ''
            }
        },
        created() {
            if (this.$route.query.cardId) {
                this.getById()
            }
        },
        methods: {
            //新增银行卡
            save() {
                if (this.carddetail.cardholder.length == 0) {
                    this.Util.myAlert('请填写持卡人');
                    return;
                } else if (this.carddetail.identityNumber.length == 0) {
                    this.Util.myAlert('请填写身份证号码')
                    return;
                } else if (this.carddetail.cardNumber.length == 0) {
                    this.Util.myAlert('请填写银行卡卡号')
                    return;
                } else if (this.carddetail.openBank.length == 0) {
                    this.Util.myAlert('请填写所属银行')
                    return;
                } else {
                    let _params = {};
                    if (this.$route.query.cardId) {
                        this.carddetail.id = this.$route.query.cardId;
                        _params = this.Util.jm(this.carddetail);
                        this.updateAddr(_params);
                    } else {
                        this.carddetail.customerId = this.userId;
                        _params = this.Util.jm(this.carddetail);
                        this.addCard(_params);
                    }
                }
            },
            addCard(params) {
                Indicator.open();
                this.api.postB({
                    url: 'customerBankCard/add',
                    params: params,
                    user: true
                }).then((res) => {
                    Indicator.close();
                    if (res.returnValue) {
                        this.Util.myAlert('添加成功');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500)
                    }
                }).catch(() => {
                    Indicator.close();
                })
            },
            //修改
            updateAddr(params) {
                Indicator.open();
                this.api.ajaxB({
                    url: 'customerBankCard/update',
                    type: 'put',
                    params: params,
                    user: true
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.Util.myAlert('修改成功！');
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 500)
                    } else {
                        switch (res.errorCode) {
                            case '1001':
                                this.Util.myAlert(res.errorDesc);
                                this.api.noLogin();
                                break;
                            case '500':
                                this.Util.myAlert('系统异常，请稍后重试');
                                break;
                            default:
                                this.Util.myAlert(res.errorDesc);
                                break;
                        };
                    }
                }).catch((err) => {
                    console.log(err)
                    Indicator.close();
                    this.Util.myAlert("网络错误，请稍后重试");
                })
            },
            //根据id获取详情
            getById() {
                this.allLoading = true;
                this.api.getB({
                    url: 'customerBankCard/getById',
                    params: {
                        id: this.$route.query.cardId
                    },
                    user: true
                }).then(res => {
                    this.allLoading = false;
                    if (res.successed) {
                        this.carddetail = res.returnValue;
                        console.log(this.carddetail)
                    }
                }).catch(() => {
                    Indicator.close();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    #addCard {
        padding-top: st(20);
        background: #fff;
        padding-bottom: st(100);
        .add-item {
            padding-left: st(44);
            padding-bottom: st(20);
            width: 100%;
            height: auto;
        }
        .add-tip {
            margin-bottom: st(20);
            width: 100%;
            height: st(26);
            font-size: st(26);
            color: #999999;
        }
        .add-bottom {
            position: relative;
            width: 100%;
            height: st(90);
            input,
            textarea {
                width: 100%;
                height: 100%;
                border: 0;
                color: #333;
            }
            input::-webkit-input-placeholder {
                color: #c1cbda;
            }
            input:-moz-placeholder {
                /* Firefox 18- */
                color: #c1cbda;
            }
            input::-moz-placeholder {
                /* Firefox 19+ */
                color: #c1cbda;
            }
            input:-ms-input-placeholder {
                color: #c1cbda;
            }
            p {
                padding-bottom: st(70);
            }
        }
        #name {
            margin-bottom: st(30);
            height: st(90);
            position: relative;
            input {
                height: st(90);
            }
            .topCeng {
                display: block;
                position: absolute;
                width: 100%;
                height: st(90);
            }
        }
        .addr-right {
            position: absolute;
            right: st(52);
            top: st(30);
            width: st(18);
        }
        .receiveAddress-bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 100%;
            height: st(100);
            border-top: 1px solid #d8d8d8;
            background: #fff;
            button {
                width: st(672);
                height: st(84);
                background: #ff5b88;
                border-radius: st(20);
                text-align: center;
                font-size: st(28);
                border: 0;
                color: #FFF;
            }
        }
    }
</style>