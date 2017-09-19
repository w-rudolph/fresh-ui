<template>
    <div class="container">
        <h3>Message 组件</h3>
        <hr>
        <d-button @click="show('info')">info</d-button>
        <d-button @click="show('success')">success</d-button>
        <d-button @click="show('warning')">warning</d-button>
        <d-button @click="show('error')">danger</d-button>
        <br><br>
        <label for="">closable:</label>
        <d-button @click="show1('error')">error</d-button>

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
        show(type) {
            this.$message[type](`${type} message`)
        },  
        show1(type) {
            this.$message({
                type,
                message: `${type} message`,
                showClose: true
            })
        }
    },
}
</script>
