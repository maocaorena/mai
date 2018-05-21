<template>
    <div id="springActive">
        <div class="img-wrapper">
            <img src="../../assets/img/spring/springActive/activity_banner.png" />
        </div>
        <div class="section">
            <p class="text">活动时间： 2.5-2.23</p>
            <div class="step">
                <img src="../../assets/img/spring/springActive/activity1.png" />
                <router-link class="go-button" tag="div" to="/rechargeNew">
                    我要福利
                </router-link>
            </div>
            <div class="step">
                <img src="../../assets/img/spring/springActive/activity2.png" />
                <router-link class="go-button" tag="div" to="/otherRecharge">
                    我要红包
                </router-link>
            </div>
            <div class="step">
                <img src="../../assets/img/spring/springActive/activity3.png" />
                <router-link class="go-button" tag="div" to="/active">
                    我要大奖
                </router-link>
            </div>
        </div>
        <div class="rule">
            <div class="rule-in">
                <div class="rule-tit">
                    <img src="../../assets/img/spring/springActive/activity_ruly.png" />
                </div>
                <ol>
                    <li>
                        活动时间：2018.2.5-2.23
                    </li>
                    <li>
                        充值的金额仅用于娃娃机内使用，充值账款不做退回处理
                    </li>
                    <li>
                        如有问题：请联系400-6305-186
                    </li>
                    <li>
                        本活动最终解释权归平台所有
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    @import "./springActive"
</style>