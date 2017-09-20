<template>
    <div class="container">
        <h3>MessageBox 组件</h3>
        <hr>
        <d-button @click="showBasic">basic</d-button>
        <d-button @click="show">prompt</d-button>
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
        showBasic() {
            this.$messageBox({
                title: 'title',
                message: 'Basic message box',
                confirmText: '确定',
                cancelText: '取消',
                callback(action) {
                    this.$message(action);
                }
            })
        },
        show() {
            this.$prompt('请输入邮箱地址', '提示', {
                confirmText: '确定',
                cancelText: '取消',
                beforeClose: ({ value, action }, done) => {
                    if (value === '' && action === 'confirm') {
                        this.$message.error('邮箱地址不正确！');
                    } else {
                        if (action === 'confirm') {
                            this.$message.info('Email Address: ' + value);
                        }
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
