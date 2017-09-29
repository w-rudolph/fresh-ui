<template>
    <div class="container">
        <h3>Rate 组件</h3>
        <br>
        <h4>basic</h4>
        <d-rate v-model="rate" @change="handleChange"></d-rate> {{txt}}
        <br>
        <h4>disabled</h4>
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
        handleChange(idx) {
            this.txt = this.items[idx - 1];
        }
    },
    mounted() {
        this.txt = this.items[this.rate - 1];
    }
}
</script>
