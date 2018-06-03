<template>
    <div id="receiveAddress" class="wrapper" :data="loginstate">
        <div class="content">
            <ul v-if="list.length>0" class="myAddress">

                <li v-if="!$route.query.isSelect" v-for="item of list" style="position: relative;">
                    <p class="name-num color333">
                        <span class="name">{{item.consignee}}</span>
                        <span class="tel">{{item.mobile}}</span>
                    </p>
                    <p class="all-addr color333">
                        {{item.province}}{{item.city}}{{item.region}} &nbsp; {{item.address}}
                    </p>
                    <p class="default-addr flex flex-sc" @click="setDefault(item,$event)">
                        <img class="haha" v-if="item.isDefault == 1" src="../../assets/img/addr/choice_2.png" />
                        <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
                        <span class="haha">默认地址</span>
                    </p>
                    <div class="my-addr-buttons flex-hse">
                        <button @click="handleAddr(item.id)">编辑</button>
                        <button @click="showAlert(item.id)">删除</button>
                    </div>
                </li>

                <li v-if="$route.query.isSelect" v-for="item of list" style="padding-bottom: 0;" @click="selectAddr(item.id)">
                    <p class="name-num color333">
                        <span class="name">{{item.consignee}}</span>
                        <span class="tel">{{item.mobile}}</span>
                    </p>
                    <p class="all-addr color333">
                        {{item.province}}{{item.city}}{{item.region}}{{item.address}}
                    </p>
                    <div class="right flex-zhong">
                        <img src="../../assets/img/addr/triangle.png" alt="">
                    </div>
                </li>

            </ul>
            <div v-if="defaultShow" class="defaultImg">
                <p>
                    你还没有添加收货地址，前去添加吧~
                </p>
            </div>
            <shade v-if="delAlert==1">
                <div class="duihuan-alert">
                    <p>
                        确定要删除该地址？
                    </p>
                    <div class="buttons flex flex-hc">
                        <button class="no" @click="isOk(1)">取消</button>
                        <button class="yes" @click="isOk(2)">确定</button>
                    </div>
                </div>
            </shade>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="addAddr">添加新地址</button>
        </div>
        <loading-v v-if="allLoading"></loading-v>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';//引入mintUI  indicator组件
    import bxmloading from '@/components/loading.vue';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                userId: this.User.getUserId(),
                token: this.User.getToken(),
                list: [],
                defaultShow: false,
                delAlert: -1,
                delId: '',
                allLoading: false,
            }
        },
        computed: {
            loginstate() {
                return this.$store.getters.loginstate;
            }
        },
        components: {
            'loading-v': bxmloading
        },
        methods: {
            //选择收货地址
            selectAddr(id) {
                this.$router.replace({
                    name: 'sureOrder',
                    query: {
                        num: this.$route.query.num,
                        productId: this.$route.query.productId,
                        addrId: id
                    }
                })
            },
            //新增地址
            addAddr() {
                this.$router.push({ path: '/my/receiveAddress/receiveAddress_add' })
            },
            //编辑地址
            handleAddr(id) {
                this.$router.push({ path: '/my/receiveAddress/receiveAddress_add', query: { addrid: id } })
            },
            showAlert(id) {
                MessageBox.confirm('确定删除?').then(action => {
                    this.deleteAddr(id)
                });
            },
            //删除地址
            deleteAddr(id) {
                this.api.ajaxB({
                    url: 'deliveryAddress/delete',
                    type: 'DELETE',
                    user: true,
                    params: {
                        id: id,
                    },
                }).then(res => {
                    Indicator.close();
                    if (res.successed) {
                        this.Util.myAlert('删除地址成功！');
                        this.getAddrList();
                    }
                }).catch(() => {
                    Indicator.close();
                })
            },
            //设置默认收货地址
            setDefault(item, e) {
                if (e.target.className == 'haha' && item.isDefault == 0) {
                    Indicator.open();
                    this.api.ajaxB({
                        url: 'deliveryAddress/setDefault',
                        type: 'put',
                        params: {
                            id: item.id,
                        },
                        user: true
                    }).then(res => {
                        Indicator.close();
                        if (res.successed) {
                            this.Util.myAlert('设置默认地址成功！');
                            this.getAddrList();
                        }
                    }).catch(() => {
                        Indicator.close();
                    })
                }
            },
            //获取地址列表
            getAddrList() {
                this.allLoading = true;
                this.api.getB({
                    url: 'deliveryAddress/getList',
                    user: true
                }).then(res => {
                    this.allLoading = false;

                    if (res.successed) {
                        this.list = res.returnValue;
                        if (this.list.length == 0) {
                            this.defaultShow = true;
                        }
                    }
                }).catch(() => {
                    Indicator.close();
                })
            }
        },
        created() {
            this.getAddrList();
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "./receiveAddress";
</style>