<template>
    <div id="topRoom" v-show="list.length > 0">
        <img class="close" @click="close" src="../../assets/img/alert/room_close.png" alt="">
        <p class="top-tip">
            这些房间不用排队哦~
        </p>
        <div class="rooms">
            <div class="rooms-item" v-for="item of list" @click="goDetail(item)">
                <img v-lazy.container="item.product.productPictureUrl" alt="">
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            close(){
                this.$emit('close', '')
            },
            //进入房间
            goDetail(item) {
                this.$router.replace({
                    path: '/home/waji',
                    query: {
                        roomId: item.roomId,
                    }
                });
                this.close();
            },
            getRooms() {
                this.api.getB({
                    url: 'room/getRoomList',
                    params: {
                        status: 1,
                        pageNum: 1,
                        pageSize: 20,
                    },
                    headers: {
                        appKey: this.User.getAppKey(),
                    }
                }).then((res) => {
                    let _res = res.data;
                    if (_res.successed) {
                        let _list = _res.returnValue.list;
                        if(_list.length < 1){
                            this.close();
                            return;
                        }
                        for (let i = 0; i < _res.returnValue.list.length; i++) {
                            let _item = _res.returnValue.list[i];
                            if( _item.roomId == this.$route.query.roomId){
                                _res.returnValue.list.splice(i,1)
                            }
                        }
                        if (_res.returnValue.list.length > 3) {
                            _list = _res.returnValue.list.splice(_res.returnValue.list.length-4, 3);
                        };
                        this.list.push(..._list);
                    } else {
                        this.Util.myAlert('获取列表失败，请稍后重试');
                    };
                }).catch(() => {
                    Indicator.close()
                })
            }
        },
        created() {
            this.getRooms()
        }
    }
</script>
<style lang="scss">
    @import "./topRoom";
</style>