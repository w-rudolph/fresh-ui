<template>
    <div class="container">
        <h3>MessageBox 组件</h3>
        <hr>
        <d-button @click="showBasic">basic</d-button>
        <d-button @click="show">prompt</d-button>
        <br><br>
        <d-button @click="showVNodeMessage">VNode Message</d-button>
    </div>
</template>

<script>
import Vue from 'vue';
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
                bodyScrollLock: false,
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
                        // this.showBasic();
                    }
                }
            }).then(data => {
                console.log('then,', data);
            }).catch(data => {
                console.log('catch,', data);
            })
        },

        showVNodeMessage() {
            const h = this.$createElement;
            // const cpt = h('div', { style: { 'color': '#f00' } }, '哈哈哈');
            const cpt = h({
                template: '<div style="color: #f00">哈哈哈哈</div>'
            });
            this.$confirm(cpt, '提示', {
                confirmText: '确定',
                cancelText: '取消',
                callback(action) {
                    this.$message(action);
                }
            });
        }
    },
}
</script>
