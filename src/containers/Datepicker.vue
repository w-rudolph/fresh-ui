<template>
    <div class="container">
        <h3>Datepicker 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-datepicker v-model="value" @change="handleChange"></d-datepicker>
        <h4>Year Mode</h4>
        <d-datepicker v-model="value1" type="year" @change="handleChange"></d-datepicker>
        <h4>Month Mode</h4>
        <d-datepicker v-model="value2" type="month" @change="handleChange"></d-datepicker>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '2017-10-10',
            value1: '2018',
            value2: '2016-9'
        }
    },
    methods: {
        handleChange(v) {
            console.log(v);
        }
    }
}
</script>
