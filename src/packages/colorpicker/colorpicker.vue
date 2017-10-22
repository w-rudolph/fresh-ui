<template>
    <div class="d-colorpicker">
        <d-hue-slider @change="handleChange"></d-hue-slider><br>
        <d-alpha-slider></d-alpha-slider>
    </div>
</template>
<script>
import DHueSlider from './hue-slider.js';
import DAlphaSlider from './alpha-slider.js';

export default {
    name: 'DColorpicker',
    components: { DHueSlider, DAlphaSlider },
    methods: {
        handleChange(v){
            console.log(v);
        }
    }
}
</script>

