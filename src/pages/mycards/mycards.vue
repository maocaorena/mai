<template>
    <div id="myCards" class="wrapper">
        <ul v-if="list.length>0" class="myAddress">

            <li v-if="!$route.query.isSelect" v-for="item of list">
                <p class="name-num color333 mb">
                    <span class="name">{{item.openBank}}</span>
                    <span class="tel">（尾号{{item.cardNumber.substr(-4,4)}}）</span>
                </p>
                <br>
                <p class="default-addr flex flex-sc" @click="setDefault(item,$event)">
                    <img class="haha" v-if="item.isDefault == 1" src="../../assets/img/addr/choice_2.png" />
                    <img class="haha" v-else src="../../assets/img/addr/choice_1.png" />
                    <span class="haha">默认银行卡</span>
                </p>
                <div class="my-addr-buttons flex-hse">
                    <button @click="handleAddr(item.id)">编辑</button>
                    <button @click="isOk(item.id)">删除</button>
                </div>
            </li>
            <li v-if="$route.query.isSelect" v-for="item of list" @click="selectAddr(item.id)">
                <p class="name-num color333 mb">
                    <span class="name">{{item.openBank}}</span>
                    <span class="tel">（尾号{{item.cardNumber.substr(-4,4)}}）</span>
                </p>
                <div class="right flex-zhong">
                    <img src="../../assets/img/addr/triangle.png" alt="">
                </div>
            </li>

        </ul>
        <p class="width100 tc pd20 color999">
            银行卡为提现使用
        </p>
        <div v-if="list.length == 0" class="defaultImg">
            <p class="width100 tc">
                你还没有添加银行卡，前去添加吧~
            </p>
        </div>
        <div class="receiveAddress-bottom flex-zhong bottom-bar">
            <button @click="addCard">添加银行卡</button>
        </div>
        <loading-v v-if="allLoading"></loading-v>
    </div>
</template>
<script>
    import bxmloading from '@/components/loading.vue';
    import { MessageBox } from 'mint-ui';
    export default {
        data() {
            return {
                list: [],
                allLoading: false,
                userId: this.User.getUserId(),
                token: this.User.getToken(),
            }
        },
        components: {
            'loading-v': bxmloading
        },
        created() {
            this.getList();
        },
        methods: {
            // 选择银行卡
            selectAddr(id) {
                this.$router.replace({
                    name: 'getMoney',
                    query: {
                        id: id
                    }
                })
            },
            //编辑银行卡
            handleAddr(id) {
                this.$router.push({ name: 'addCard', query: { cardId: id } })
            },
            //设置默认银行卡
            setDefault(item, e) {
                if (e.target.className == 'haha' && item.isDefault == 0) {
                    this.allLoading = true;
                    this.api.ajaxB({
                        url: 'customerBankCard/setDefault',
                        type: 'put',
                        params: {
                            id: item.id,
                        },
                        user: true
                    }).then(res => {
                        this.allLoading = false;
                        if (res.successed) {
                            this.Util.myAlert('设置默认银行卡成功！');
                            this.getList();
                        }
                    }).catch(() => {
                        this.allLoading = false;
                    })
                }
            },
            isOk(id) {
                MessageBox.confirm('确定删除?').then(action => {
                    this.deleteAddr(id)
                });
            },
            //删除地址
            deleteAddr(id) {
                this.allLoading = true;
                this.api.ajaxB({
                    url: 'customerBankCard/delete',
                    type: 'DELETE',
                    params: {
                        id: id,
                    },
                    user: true
                }).then(res => {
                    this.allLoading = false;
                    if (res.successed) {
                        this.Util.myAlert('删除银行卡成功！');
                        this.getList();
                    }
                }).catch(() => {
                    this.allLoading = false;
                })
            },
            //新增银行卡
            addCard() {
                this.$router.push({ name: 'addCard' })
            },
            //获取列表
            getList() {
                this.allLoading = true;
                this.api.getB({
                    url: 'customerBankCard/getList',
                    user: true
                }).then(res => {
                    this.allLoading = false;

                    if (res.successed) {
                        this.list = res.returnValue;
                    }
                }).catch(() => {
                    Indicator.close();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './myCards'
</style>