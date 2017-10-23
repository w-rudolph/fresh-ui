import DColorSlider from './color-slider.vue';

export default {
    name: 'DHueSlider',
    mixins: [DColorSlider],
    data() {
        return {
            ns: 'hue',
            currentValue: this.$parent.color.h / 360,
        }
    },
    watch: {
        currentValue(v) {
            this.$emit('change', parseFloat((v * 360).toFixed(2)));
        }
    }
}