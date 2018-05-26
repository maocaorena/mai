<template>
    <div id="setting" class="wrapper">
        <mt-cell title="常见问题" :to="{name:'updatePw'}" is-link ></mt-cell>
        <div class="line"></div>
        <mt-cell title="关于我们" :to="{name:'updatePw'}" is-link ></mt-cell>
        <div class="line"></div>
        <br>
        <br>
        <mt-button class="goCharge" @click.native="outLogin" type="danger">退出登录</mt-button>
    </div>
</template>
<script>
export default {
    methods: {
        outLogin(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
    #setting{
        .goCharge{
            display: block;
            width: 90%;
            margin: 0 auto;
        }
    }
</style>

