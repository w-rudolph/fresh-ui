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
            new MessageBox({
                title: 'title',
                message: 'content'
            })
        },
    },
}
</script>
