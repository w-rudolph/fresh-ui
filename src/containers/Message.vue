<template>
    <div class="container">
        <h3>Message 组件</h3>
        <hr>
        <d-button @click="show">Show message</d-button>
        <pre>
            * this.$message<br>
            * this.$message.info <br>
            * this.$message.success<br>
            * this.$message.warning<br>
            * this.$message.danger<br>
        </pre>
    </div>
</template>

<script>
import Message from '../packages/message/message.js';

export default {
    data() {
        return {

        }
    },
    methods: {
        show() {
            // const h = this.$createElement;
            // const msg = new Message({
            //     showClose: true,
            //     type: 'error',
            //     message: '哈哈哈哈2'
            // });
            // this.$message({
            //     showClose: true,
            //     type: 'error',
            //     onClose(){
            //         console.log('close！');
            //     },
            //     message: '哈哈哈哈2'
            // });

            //  this.$message('哈哈哈哈哈哈！')
            this.$message.info('a')
        }
    },
}
</script>
