<template>
    <div :class="['d-slider', vertical ? 'd-slider--vertical' : '', disabled ? 'disabled' : '']" @click="handleSliderBarClick">
        <div class="d-slider__bar" :style="slideBarStyle"></div>
        <d-slider-button v-model="startValue" :min="min" :max="range ? endValue : max" :vertical="vertical" :show-tooltip="showTooltip" :disabled="disabled" :tip-format="tipFormat"></d-slider-button>
        <d-slider-button v-if="range" v-model="endValue" :min="startValue" :max="max" :vertical="vertical" :show-tooltip="showTooltip" :disabled="disabled" :tip-format="tipFormat"></d-slider-button>
    </div>
</template>
<script>
import DSliderButton from './slider-button.vue';

export default {
    name: 'DSlider',
    components: { DSliderButton },
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        vertical: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: true
        },
        tipFormat: {
            type: Function,
            default: () => { }
        },
        range: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Array, Number],
            default() {
                return this.range ? [0, 0] : 0;
            }
        }
    },
    data() {
        return {
            startValue: this.setCurrentValue(this.value)[0],
            endValue: this.setCurrentValue(this.value)[1]
        }
    },
    watch: {
        value(v) {
            const [v1, v2] = this.setCurrentValue(v);
            this.startValue = v1;
            this.endValue = v2;
        },
        startValue(v) {
            this.startValue = v;
            this.$emit('input', this.range ? [v, this.endValue] : v);
        },
        endValue(v) {
            this.endValue = v;
            this.$emit('input', [this.startValue, v]);
        }
    },
    computed: {
        posStyle() {
            return {
                offset: parseInt(this.startValue).toString() + '%',
                wh: parseInt(this.endValue - this.startValue).toString() + '%'
            }
        },
        slideBarStyle() {
            if (this.vertical) {
                if (this.range) {
                    return {
                        height: this.posStyle.wh,
                        top: this.posStyle.offset
                    }
                }
                return {
                    height: this.posStyle.offset,
                }
            }
            if (this.range) {
                return {
                    width: this.posStyle.wh,
                    left: this.posStyle.offset
                }
            }
            return {
                width: this.posStyle.offset
            }
        },
    },
    methods: {
        setCurrentValue(value) {
            if (this.range) {
                let [v1, v2] = value;
                if (v1 > v2) {
                    v2 = v1;
                }
                v1 = v1 > 100 ? 100 : v1;
                v2 = v2 > 100 ? 100 : v2;
                return [v1, v2];
            }
            return [value > 100 ? 100 : value, 0];
        },
        handleSliderBarClick(e) {
            if (this.disabled) {
                return;
            }
            const $el = this.$el;
            const pos = {
                top: $el.offsetTop,
                left: $el.offsetLeft,
                width: $el.offsetWidth,
                height: $el.offsetHeight,
                cX: e.pageX,
                cY: e.pageY
            }
            if (this.vertical) {
                let value = parseInt((pos.cY - pos.top) / pos.height * 100);
                if (this.range) {
                    let avg = (this.startValue + this.endValue) / 2;
                    if (avg < value) {
                        this.endValue = value;
                    } else {
                        this.startValue = value;
                    }
                } else {
                    this.startValue = value;
                }
            } else {
                let value = parseInt((pos.cX - pos.left) / pos.width * 100);
                if (this.range) {
                    let avg = (this.startValue + this.endValue) / 2;
                    if (avg < value) {
                        this.endValue = value;
                    } else {
                        this.startValue = value;
                    }
                } else {
                    this.startValue = value;
                }
            }
        }
    }
}
</script>
