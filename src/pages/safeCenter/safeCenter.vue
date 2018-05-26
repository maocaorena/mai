<template>
    <div id="safeCenter" class="wrapper">
        <mt-cell title="手机号" :to="{name:'updatePhone'}" is-link value="18336077777"></mt-cell>
        <div class="line"></div>
        <mt-cell title="修改密码" :to="{name:'updatePw'}" is-link ></mt-cell>
        <div class="line"></div>
        <mt-cell title="实名认证" :to="{name:'trueName'}" is-link ></mt-cell>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import './safeCenter'
</style>