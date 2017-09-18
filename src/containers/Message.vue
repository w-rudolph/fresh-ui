<template>
    <div class="container">
        <h3>Message 组件</h3>
        <hr>
        <d-button @click="show">Show message</d-button>
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
            const msg = new Message({
                data: {
                    showClose: true,
                    duration: 0,
                    type: 'error'
                }
            });
            msg.show();
        }
    }
}
</script>
