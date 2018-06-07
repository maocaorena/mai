<template>
    <div id="setting" class="wrapper">
        <mt-cell title="常见问题" :to="{name:'question'}" is-link ></mt-cell>
        <div class="line"></div>
        <mt-cell title="关于我们" :to="{name:'question'}" is-link ></mt-cell>
        <div class="line"></div>
        <br>
        <br>
        <mt-button v-if="isLogin" class="goCharge" @click.native="outLogin" type="danger">退出登录</mt-button>
    </div>
</template>
<script>

export default {
    data(){
        return{
            isLogin: false
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        outLogin(){
            this.Storage.removeItem('uf');
            this.$router.push({
                name: 'home'
            })
        },
        getInfo(){
            this.api.getBn({
                url: 'customer/getByToken',
                user: true
            }).then(res=>{
                if(res.successed){
                    this.isLogin = true;
                }else{
                    this.isLogin = false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #setting{
        .goCharge{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 40px;
            margin: auto;
            display: block;
            width: 90%;
        }
    }
</style>

