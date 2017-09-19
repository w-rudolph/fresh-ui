<template>
    <div class="container">
        <h3>MessageBox 组件</h3>
        <hr>
        <d-button @click="show">info</d-button>

    </div>
</template>

<script>
import MessageBox from '../packages/message-box/message-box.js';

export default {
    data() {
        return {

        }
    },
    methods: {
        show() {
            this.$prompt('请输入邮箱地址', '提示', {
                confirmText: '确定',
                cancelText: '取消',
                // callback(action) {
                //     console.log(action);
                // }
                beforeClose: ({ value, action }, done) => {
                    if (value === '' && action === 'confirm') {
                        this.$message.error('邮箱地址不正确！');
                    } else {
                        done({ value, action });
                    }
                }
            }).then(data => {
                console.log('then,', data);
            }).catch(data => {
                console.log('catch,', data);
            })
        },
    },
}
</script>
