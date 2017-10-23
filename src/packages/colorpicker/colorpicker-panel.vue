<template>
    <div class="d-colorpicker-panel">
        <svpanel @change="handleSVChange" :style="bgColor"></svpanel>
        <d-hue-slider @change="handleHueChange"></d-hue-slider><br>
        <d-alpha-slider @change="handleAlphaChange" v-if="alpha"></d-alpha-slider>
    </div>
</template>
<script>
import DHueSlider from './hue-slider.js';
import DAlphaSlider from './alpha-slider.js';
import svpanel from './svpanel.vue'
import tinycolor from 'tinycolor2';

export default {
    name: 'DColorpickerPanel',
    components: { DHueSlider, DAlphaSlider, svpanel },
    props: {
        value: {
            type: String,
            default: ''
        },
        alpha: {
            type: Boolean,
            default: false
        },
        format: {
            type: String, // hsl、hsv、hex、rgb
            default() {
                return this.alpha ? 'rgb' : 'hex';
            }
        }
    },
    data() {
        return {
            color: { h: 0, s: 0, v: 0, a: 1 }
        }
    },
    watch: {
        value(val) {
            this.setColor(val);
        }
    },
    computed: {
        bgColor() {
            return {
                background: tinycolor(`hsv(${this.color.h}, 100%, 100%`).toRgbString()
            };
        },
        colorObj() {
            const { h, s, v, a } = this.color;
            const tc = tinycolor(`hsv(${h},${s},${v})`);
            tc.setAlpha(a);
            return tc;
        },
        rgbColor() {
            return this.colorObj.toRgb();
        },
        hsvColor() {
            return this.colorObj.toHsv();
        },
        hslColor() {
            return this.colorObj.toHsl();
        }
    },
    methods: {
        handleHueChange(v) {
            this.color = {
                ...this.color,
                h: v
            };
            this.handleColorChange();
        },
        handleAlphaChange(alpha) {
            this.color = {
                ...this.color,
                a: alpha
            };
            this.handleColorChange();
        },
        handleSVChange({ s, v }) {
            this.color = {
                ...this.color, s, v
            };
            this.handleColorChange();
        },
        handleColorChange() {
            const map = {
                'hsl': 'toHslString',
                'hsv': 'toHsvString',
                'hex': 'toHexString',
                'rgb': 'toRgbString',
            };
            const val = this.colorObj[map[this.format]]();
            this.$emit('change', val);
            this.$emit('input', val);
        },
        setColor(value) {
            if(value){
                this.color = tinycolor(value).toHsv();
            }
        }
    },
    created() {
        this.setColor(this.value);
    }
}
</script>

