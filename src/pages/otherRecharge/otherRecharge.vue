<template>
    <div id="otherRecharge" class="wrapper">
        <div class="content flex flex-s flex-sc">
            <div class="banner">
                <img src="../../assets/img/recharge/beg2.png" />
            </div>
            <div class="recharge-list">
                <div class="recharge-item" :class="{mr0: index%2 === 1,selected: item.id === selectItem.id}" @click="selectThisNum(item)"
                    v-for="(item, index) of list">
                    <div class="recharge-item-bottom">

                    </div>
                    <div class="recharge-item-top">
                        <p>{{item.txt}}</p>
                        <p>￥{{item.amount}}</p>
                        <img :src="item.img" />
                    </div>
                </div>
            </div>
            <div class="button flex-zhong" @click="createReplaceRecharge">
                生成分享页面
            </div>
            <div class="tip">
                生成后截屏分享给朋友喔~
            </div>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui'; //引入mintUI  indicator组件
    export default {
        data() {
            return {
                selectItem: {
                    id: 1,
                    txt: '求打赏',
                    amount: 10,
                    img: './static/img/otherRecharge/beg_a.png'
                },
            }
        },
        computed: {
            list() {
                return this.$store.getters.otherRechargeList
            }
        },
        methods: {
            selectThisNum(item) {
                this.selectItem = item;
            },
            createReplaceRecharge() {
                this.api.postB({
                    url: 'replaceRecharge/createReplaceRecharge',
                    params: {
                        userId: this.User.getMemberId(),
                        amount: this.selectItem.amount
                    },
                    headers: {
                        token: this.User.getToken()
                    }
                }).then(res => {
                    let _res = res.data;
                    if (_res.successed) {
                        this.$router.push({
                            path: '/shareOther',
                            query: {
                                userId: this.User.getMemberId(),
                                rId: _res.returnValue,
                                itemId: this.selectItem.id,
                                nn: this.User.getMemberInfo().nickname,
                            }
                        })
                    } else {
                        this.Util.myAlert(res.data.errorDesc);
                    }
                }).catch(() => {

                });
            }
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import "./otherRecharge";
</style>