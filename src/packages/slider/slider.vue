<template>
    <div :class="['d-slider', vertical ? 'd-slider--vertical' : '', disabled ? 'disabled' : '']" @click="handleSliderBarClick">
        <div class="d-slider__bar" :style="slideBarStyle"></div>
        <div class="d-slider__stops" v-if="showStops">
            <div class="d-slider__stop" v-for="i in stops" :style="vertical ? {top: i + '%'} : {left: i + '%'}" @click="handleStopClick($event, i)"></div>
        </div>
        <d-slider-button v-model="startValue" :limit-end="range ? endValue : max"></d-slider-button>
        <d-slider-button v-if="range" v-model="endValue" :limit-start="range ? startValue : min"></d-slider-button>
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
        },
        step: {
            type: Number,
            default: 1
        },
        showStops: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            startValue: this.getAjustedValue(this.value)[0],
            endValue: this.getAjustedValue(this.value)[1]
        }
    },
    watch: {
        value(v) {
            const [v1, v2] = this.getAjustedValue(v);
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
                offset: parseInt((this.startValue - this.min) / (this.max - this.min) * 100).toString() + '%',
                wh: parseInt((this.endValue - this.startValue) / (this.max - this.min) * 100).toString() + '%'
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
        stops() {
            const allStops = this.getAllStops();
            const stops = allStops.slice(1, allStops.length - 1);
            if (this.range) {
                return stops.filter(stop => stop < this.startValue || stop > this.endValue);
            }
            return stops.filter(stop => stop > this.startValue);
        }
    },
    methods: {
        ajustValue(value) {
            return this.getLastestValue(value > this.max ? this.max : value < this.min ? this.min : value);
        },
        countValue(percent) {
            return parseInt(this.min + (this.max - this.min) * percent);
        },
        getAllStops() {
            const stopsLength = Math.ceil((this.max - this.min) / this.step);
            const stops = [];
            for (let i = 0; i < stopsLength; i++) {
                let cur = i * this.step;
                if (cur < this.max) {
                    stops.push(cur)
                }
            }
            if (stops.indexOf(this.max) === -1) {
                stops.push(this.max);
            }
            return stops;
        },
        getAjustedValue(value) {
            if (this.range) {
                let [v1, v2] = value;
                if (v1 > v2) {
                    v2 = v1;
                }
                v1 = this.ajustValue(v1);
                v2 = this.ajustValue(v2);
                return [v1, v2];
            }
            return [this.ajustValue(value), this.min];
        },
        setClickValue(value) {
            let avg = (this.startValue + this.endValue) / 2;
            if (avg < value) {
                this.endValue = value;
            } else {
                this.startValue = value;
            }
        },
        handleStopClick(e, i) {
            e.preventDefault();
            e.stopPropagation();
            this.startValue = i;
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
                let value = this.countValue((pos.cY - pos.top) / pos.height);
                value = this.getLastestValue(value);
                if (this.range) {
                    this.setClickValue(value);
                } else {
                    this.startValue = value;
                }
            } else {
                let value = this.countValue((pos.cX - pos.left) / pos.width);
                if (this.range) {
                    this.setClickValue(value);
                } else {
                    this.startValue = value;
                }
            }
        },
        getLastestValue(value) {
            const stops = this.getAllStops();
            let v1, v2;
            for (let i = 0; i < stops.length; i++) {
                let cur = stops[i];
                let next = stops[i + 1];
                if (cur <= value && next >= value) {
                    v1 = cur;
                    v2 = next;
                    break;
                }
            }
            if (value === this.max) {
                return value;
            }
            if (Math.abs(value - v1) < this.step / 2) {
                return v1;
            }
            return v2;
        }
    }
}
</script>
