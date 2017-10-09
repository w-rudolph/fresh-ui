<template>
    <div class="container">
        <h3>InputNumber 组件</h3>
        <hr>
        <h4>Size</h4>
        <d-input-number v-model="val" :precision="0" size="small" :min="-1" :max="9" :step="0.4"></d-input-number>
        <d-input-number v-model="val" :precision="0" :min="-1" :max="9" :step="0.4"></d-input-number>
        <d-input-number v-model="val" :precision="0" size="large" :min="-1" :max="9" :step="0.4"></d-input-number>

        <h4>Hide Controls</h4>
        <d-input-number v-model="val1" :controls="false" :precision="2" :min="-1" :max="9" :step="0.4" @change="handleChange"></d-input-number>

        <h4>Disabled</h4>
        <d-input-number v-model="val1" disabled :controls="false" :precision="2" :min="-1" :max="9" :step="0.4"></d-input-number>
    </div>
</template>

<script>
export default {
    data() {
        return {
            val: '22',
            val1: ''
        }
    },
    methods: {
        handleChange(v, oldV) {
            console.log(v, oldV);
        }
    }
}
</script>
