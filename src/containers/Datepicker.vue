<template>
    <div class="container">
        <h3>Datepicker 组件</h3>
        <hr>
        <d-datepicker v-model="value" @change="handleChange"></d-datepicker>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '2017-10-10'
        }
    },
    methods: {
        handleChange(v) {
            console.log(v);
        }
    }
}
</script>
