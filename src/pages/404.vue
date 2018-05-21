<template>
    <h1>404</h1>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        created(){
            console.log(this.$route.path);
            let _url = this.$route.path;
            if(_url.indexOf('access_token') > -1){
                let start = _url.indexOf('access_token');
                let str = _url.slice(start)
                console.log(str)
                let _str = str.slice(str.indexOf('=')+1,str.indexOf('&'))
                console.log(start, _str, typeof(_str))
                let allUrl = JSON.stringify(window.location.href);
                let _redicUrl = allUrl.slice(1, allUrl.indexOf(':')) + '://' + window.location.host;
                let endUrl = _redicUrl+'?state=bd&access_token=' + _str;
                location.replace(endUrl);
            };
        },
        methods: {
            
        }

    }
</script>