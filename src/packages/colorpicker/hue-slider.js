import DColorSlider from './color-slider.vue';

export default {
    name: 'DHueSlider',
    mixins: [DColorSlider],
    data() {
        return {
            ns: 'hue'
        }
    },
    watch: {
        currentValue(v) {
            const $bar = this.$refs.bar;
            const wh = this.vertical ? $bar.offsetHeight : $bar.offsetWidth;
            console.log(parseInt(v / wh * 360));
        }
    }
}
