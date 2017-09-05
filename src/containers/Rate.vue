<template>
    <div class="container">
        <h3>Rate 组件</h3>
        <br>
        <d-rate v-model="rate" @change="handleChange" :display-items="items"></d-rate>
        <br>
        <d-rate v-model="rate" disabled></d-rate>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rate: 1,
            txt: '',
            items: ['一星', '二星', '三星', '四星', '五星']
        }
    },
    methods: {
        handleChange(v) {
            console.log(v);
        }
    }
}
</script>
