<template>
    <div class="wj-shade">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: [],
        computed: {

        },
        created() {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        },
        mounted() {

        },
        destroyed() {
            document.getElementsByTagName('body')[0].style.overflowY = 'auto';
            document.getElementsByTagName('body')[0].style.overflowX = 'hidden';
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/rem";
    .wj-shade {
        position: fixed;
        z-index: 999;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: box;
        /* OLD - Android 4.4- */
        display: -webkit-box;
        /* OLD - iOS 6-, Safari 3.1-6 */
        display: -moz-box;
        /* OLD - Firefox 19- (buggy but mostly works) */
        display: -ms-flexbox;
        /* TWEENER - IE 10 */
        display: -webkit-flex;
        /* NEW - Chrome */
        display: flex;
        /* NEW, Spec - Opera 12.1, Firefox 20+ */
        /* 09版 */
        -webkit-box-pack: center;
        /* 12版 */
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        -o-justify-content: center;
        justify-content: center;
        /* 09版 */
        -webkit-box-align: center;
        /* 12版 */
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        width: auto;
        height: auto;
        background: rgba(0, 0, 0, .5);
    }
</style>