<template>
    <div class="container">
        <h3>Notification 组件</h3>
        <hr>
        <d-button @click="create()">create</d-button>
        <d-button @click="create(0)">Not close</d-button>
    </div>
</template>
<script>
import Notification from '../packages/notification/notification.js';

export default {
    methods: {
        create(duration) {
            const item = {
                title: '测试title' + Math.random() * 10,
                content: '哈哈哈哈'
            };
            item.duration = duration;
            // Notification.show(item);
            this.$notify(item);
        },
    }
}
</script>
