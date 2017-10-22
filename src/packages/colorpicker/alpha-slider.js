import DColorSlider from './color-slider.vue';

export default {
    name: 'DAlphaSlider',
    mixins: [DColorSlider],
    data() {
        return {
            ns: 'alpha',
            barStyle: {
                background: 'linear-gradient(to right, rgba(19, 206, 102, 0) 0%, rgb(19, 206, 102) 100%)'
            }
        }
    },
    watch: {
        currentValue(v) {
            const $bar = this.$refs.bar;
            const wh = this.vertical ? $bar.offsetHeight : $bar.offsetWidth;
            console.log(parseFloat((v / wh).toFixed(2)));
        }
    }
}
