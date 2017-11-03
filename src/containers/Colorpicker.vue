<template>
    <div class="container">
        <h3>Colorpicker 组件</h3>
        <br> {{colorText}}<br>
        <h4>Panel</h4>
        <d-colorpicker-panel v-model="colorText" alpha></d-colorpicker-panel>
        <h4>Popper</h4>
        <h5>Basic</h5>
        <d-colorpicker v-model="color" @active-change="handleActiveChange" @change="handleChange"></d-colorpicker>
        <h5>alpha</h5>
        <d-colorpicker alpha v-model="colorText" @active-change="handleActiveChange" @change="handleChange"></d-colorpicker>
    </div>
</template>

<script>
import Color from 'tinycolor2';

export default {
    data() {
        return {
            colorText: 'rgba(255, 255, 0, 0.67)',
            color: '#f0f'
        }
    },
    methods: {
        handleActiveChange(v) {
            console.log('active:', v);
        },
        handleChange(v) {
            console.log(v);
        }
    }
}
</script>
