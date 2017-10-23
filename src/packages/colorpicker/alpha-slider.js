import DColorSlider from './color-slider.vue';

export default {
    name: 'DAlphaSlider',
    mixins: [DColorSlider],
    data() {
        return {
            ns: 'alpha',
            currentValue: this.$parent.color.a,
        }
    },
    computed: {
        barStyle() {
            const { r, g, b } = this.$parent.rgbColor;
            return {
                background: `linear-gradient(to right, rgba(${r}, ${g},${b}, 0) 0%, rgb(${r}, ${g},${b}) 100%)`
            }
        },
    },
    watch: {
        currentValue(v) {
            this.$emit('change', parseFloat(v.toFixed(2)))
        }
    }
}