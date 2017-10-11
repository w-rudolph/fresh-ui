<template>
    <div class="container">
        <h3>Datepicker 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-datepicker-panel v-model="value" @change="handleChange"></d-datepicker-panel>
        <h4>Year Mode</h4>
        <d-datepicker-panel v-model="value1" type="year" @change="handleChange"></d-datepicker-panel>
        <h4>Month Mode</h4>
        <d-datepicker-panel v-model="value2" type="month" @change="handleChange"></d-datepicker-panel>
        <h4>Popper Mode</h4>
        <h5>Input</h5>
        <d-datepicker type="date" v-model="value3" @change="handleChange"></d-datepicker><br>
        <h5>Custom</h5>
        <d-datepicker type="date" v-model="value4" @change="handleChange">
            <d-button slot="reference" type="link">
                <d-icon name="ios-calendar-outline"></d-icon> {{value4}}</d-button>
        </d-datepicker>
        <hr style="height: 300px;visibility: hidden;">
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: '2017-10-10',
            value1: '2018',
            value2: '2016-9',
            value3: '2017-09-11',
            value4: '2017-10-10'
        }
    },
    methods: {
        handleChange(v) {
            console.log(v);
        }
    }
}
</script>
