<template>
    <div id="receiveAddress_add" class="wrapper">
        <div class="content">
            <div class="add-item">
                <p class="add-tip">
                    收件人姓名
                </p>
                <p class="add-bottom">
                    <input type="text" v-model="addrDetail.consignee" maxlength="20" placeholder="填写姓名，20个字以内" />
                </p>
            </div>
            <div class="add-item">
                <p class="add-tip">
                    手机号
                </p>
                <p class="add-bottom">
                    <input type="tel" v-model="addrDetail.mobile" placeholder="填写联系电话" />
                </p>
            </div>
            <div class="add-item">
                <p class="add-tip">
                    收件地址
                </p>
                <div class="add-bottom">
                    <p class="color333" id="name">
                        <span class="topCeng"></span>
                        <input type="text" placeholder="请选择省市区" v-model="addrCity" readonly/>
                        <img class="addr-right" src="../../assets/img/addr/triangle.png" alt="" />
                    </p>
                    <p class="color333" style="height: 3rem;padding-bottom: 0;">
                        <textarea v-model="addrDetail.address" maxlength="50" placeholder="填写详细地址,50个字以内" name=""></textarea>
                    </p>
                </div>
            </div>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="save">保存</button>
        </div>
        <loading-v v-if="allLoading"></loading-v>
    </div>
</template>

<script>
    import Picker from 'better-picker';
    import { city } from '../../lib/city/city1.js';
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import bxmloading from '@/components/loading.vue';
    var picker;
    export default {
        data() {
            return {
                token: this.User.getToken(),
                userId: this.User.getUserId(),
                addrCity: '',
                addrDetail: {
                    consignee: '',//收货人
                    province: '',//省
                    city: '',//市
                    region: '',//区
                    mobile: '',
                    address: ''
                },
                allLoading: false
            }
        },
        computed: {
        },
        components: {
            'loading-v': bxmloading
        },
        methods: {
            //验证用户参数
            save() {
                if (this.addrDetail.consignee.length == 0) {
                    this.Util.myAlert('请填写收货人');
                    return;
                } else if (this.addrDetail.mobile.length == 0) {
                    this.Util.myAlert('请填写手机号码')
                    return;
                } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.addrDetail.mobile))) {
                    this.Util.myAlert('请填写正确的手机号码');
                    return;
                } else if (this.addrCity.length == 0) {
                    this.Util.myAlert('请选择省市区');
                    return;
                } else if (this.addrDetail.address.length == 0) {
                    this.Util.myAlert('请填写详细地址');
                    return;
                } else {
                    let _params = {};
                    if (this.$route.query.addrid) {
                        this.addrDetail.customerId = this.userId;
                        this.addrDetail.id = this.$route.query.addrid;
                        _params = this.Util.jm(this.addrDetail);
                        this.updateAddr(_params);
                    } else {
                        this.addrDetail.customerId = this.userId;
                        _params = this.Util.jm(this.addrDetail);
                        this.addAddr(_params);
                    }
                }
            },
            //新增地址
            addAddr(params) {
                Indicator.open();
                this.api.postB({
                    url: 'deliveryAddress/add',
                    params: params,
                    headers: {
                        token: this.token
                    }
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
            //修改地址
            updateAddr(params) {
                Indicator.open();
                this.api.ajaxB({
                    url: 'deliveryAddress/update',
                    type: 'put',
                    params: params,
                    headers: {
                        token: this.token
                    }
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.Util.myAlert('修改地址成功！');
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
                }).catch(() => {
                    Indicator.close();
                    this.Util.myAlert("网络错误，请稍后重试");
                })
            },
            //根据id获取地址详情
            getAddrById() {
                this.allLoading = true;
                this.api.getB({
                    url: 'deliveryAddress/getById',
                    params: {
                        customerId: this.userId,
                        id: this.$route.query.addrid
                    },
                    headers: {
                        token: this.token
                    }
                }).then(res => {
                    this.allLoading = false;
                    if (res.successed) {
                        this.addrDetail = res.returnValue;
                        this.addrCity = res.returnValue.province + res.returnValue.city + res.returnValue.region;
                    }
                }).catch(() => {
                    Indicator.close();
                })
            }
        },
        created() {
            if (this.$route.query.addrid) {
                this.getAddrById()
            }
        },
        beforeDestroy() {
            picker.hide()
        },
        mounted() {
            this.$nextTick(()=>{
                let that = this;
                let nameEl = document.getElementById('name');
                console.log(nameEl);
                let first = []; /* 省，直辖市 */
                let second = []; /* 市 */
                let third = []; /* 区县 */

                let selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

                let checked = [0, 0, 0]; /* 已选选项 */

                function creatList(obj, list) {
                    obj.forEach(function (item, index, arr) {
                        let temp = new Object();
                        temp.text = item.name;
                        temp.value = index;
                        temp.code = item.code;
                        list.push(temp);
                    })
                };

                creatList(city, first);

                if (city[selectedIndex[0]].hasOwnProperty('sub')) {
                    creatList(city[selectedIndex[0]].sub, second);
                } else {
                    second = [{
                        text: '',
                        value: 0
                    }];
                };

                if (city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
                    creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
                } else {
                    third = [{
                        text: '',
                        value: 0
                    }];
                };

                picker = new Picker({
                    data: [first, second, third],
                    selectedIndex: selectedIndex,
                    title: '地址选择'
                });

                picker.on('picker.select', function (selectedVal, selectedIndex) {
                    let text1 = first[selectedIndex[0]].text;
                    let text2 = second[selectedIndex[1]].text;
                    let text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
                    that.addrCity = text1 + ' ' + text2 + ' ' + text3;
                    that.addrDetail.province = text1;
                    that.addrDetail.city = text2;
                    that.addrDetail.region = text3;
                });

                picker.on('picker.change', function (index, selectedIndex) {
                    if (index === 0) {
                        firstChange();
                    } else if (index === 1) {
                        secondChange();
                    };

                    function firstChange() {
                        second = [];
                        third = [];
                        checked[0] = selectedIndex;
                        let firstCity = city[selectedIndex];
                        if (firstCity.hasOwnProperty('sub')) {
                            creatList(firstCity.sub, second);

                            let secondCity = city[selectedIndex].sub[0]
                            if (secondCity.hasOwnProperty('sub')) {
                                creatList(secondCity.sub, third);
                            } else {
                                third = [{
                                    text: '',
                                    value: 0
                                }];
                                checked[2] = 0;
                            };
                        } else {
                            second = [{
                                text: '',
                                value: 0
                            }];
                            third = [{
                                text: '',
                                value: 0
                            }];
                            checked[1] = 0;
                            checked[2] = 0;
                        };

                        picker.refillColumn(1, second);
                        picker.refillColumn(2, third);
                        picker.scrollColumn(1, 0);
                        picker.scrollColumn(2, 0);
                    };

                    function secondChange() {
                        third = [];
                        checked[1] = selectedIndex;
                        let first_index = checked[0];
                        if (city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
                            let secondCity = city[first_index].sub[selectedIndex];
                            creatList(secondCity.sub, third);
                            picker.refillColumn(2, third);
                            picker.scrollColumn(2, 0)
                        } else {
                            third = [{
                                text: '',
                                value: 0
                            }];
                            checked[2] = 0;
                            picker.refillColumn(2, third);
                            picker.scrollColumn(2, 0)
                        };
                    };

                });
                nameEl.addEventListener('click', function () {
                    picker.show();
                });
            })
            
        }
    }
</script>

<style lang="scss">
    @import "./receiveAddress_add";
</style>