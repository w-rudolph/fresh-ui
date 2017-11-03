<template>
    <div class="container">
        <h3>Datepicker 组件</h3>
        <hr>
        <h4>Basic</h4>
        <d-datepicker-panel v-model="value" @change="handleChange"></d-datepicker-panel>
        <h4>Year Mode</h4>
        <d-datepicker-panel v-model="value1" type="year" format="yyyy年" @change="handleChange"></d-datepicker-panel>
        <h4>Month Mode</h4>
        <d-datepicker-panel v-model="value2" type="month" format="yyyy年MM月" @change="handleChange"></d-datepicker-panel>
        <h4>Popper Mode</h4>
        <h5>Input</h5>
        <d-datepicker type="date" format="yyyy年MM月dd日" v-model="value3" @change="handleChange"></d-datepicker><br>
        <h5>Custom</h5>
        <d-datepicker type="date" v-model="value4" @change="handleCustom">
            <d-button slot="reference" type="link">
                <d-icon name="ios-calendar-outline"></d-icon> {{custom}}
            </d-button>
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
            value4: '',
            custom: '2017-10-10',
        }
    },
    methods: {
        handleChange(v) {
            console.log(v);
        },
        handleCustom(v) {
            this.custom = v;
        }
    }
};
</script>
