<template>
    <d-tooltip ref="tooltip" class="d-slider__button-wraper" trigger="focus" theme="black" :disabled="!showTooltip" :style="sliderBtnStyle">
        <span slot="content">{{ formatValue }}</span>
        <div slot="reference" class="d-slider__button-referrence" @mouseenter="handleMouseHover(true)" @mouseleave="handleMouseHover(false)" @mouseup="handleMouseUp" @mousedown="handleMouseDown">
            <div :class="['d-slider__button', startMouseDrag ? 'draging' : '']"></div>
        </div>
    </d-tooltip>
</template>
<script>
import DTooltip from '../tooltip/tooltip.vue';
import { getBoundingClientRect } from '../utils/dom.js';

export default {
    name: 'DSliderButton',
    components: { DTooltip },
    props: {
        value: {
            type: Number,
            default: 0
        },
        limitEnd: {
            type: Number,
            default: Infinity
        },
        limitStart: {
            type: Number,
            default: -Infinity
        }
    },
    data() {
        return {
            currentValue: 0,
            startMouseDrag: false,
            lastPos: {}
        }
    },
    watch: {
        currentValue(value) {
            this.$refs.tooltip.updatePopper(false);
            this.$emit('input', value);
        },
        value(value) {
            this.currentValue = this.$parent.ajustValue(value);
        }
    },
    computed: {
        min() {
            return this.$parent.min;
        },
        max() {
            return this.$parent.max;
        },
        vertical() {
            return this.$parent.vertical;
        },
        disabled() {
            return this.$parent.disabled;
        },
        showTooltip() {
            return this.$parent.showTooltip;
        },
        tipFormat() {
            return this.$parent.tipFormat;
        },
        formatValue() {
            const value = parseInt(this.currentValue);
            return this.tipFormat(value) || value;
        },
        posStyle() {
            return {
                offset: parseInt((this.currentValue - this.min) / (this.max - this.min) * 100).toString() + '%'
            }
        },
        sliderBtnStyle() {
            if (this.vertical) {
                return {
                    top: this.posStyle.offset
                }
            }
            return {
                left: this.posStyle.offset
            }
        }
    },
    methods: {
        handleMouseHover(flag) {
            if (flag) {
                this.$refs.tooltip.showPopper = true;
            } else {
                if (!this.startMouseDrag) {
                    this.$refs.tooltip.showPopper = false;
                }
            }
        },
        handleMouseDown(e) {
            if (this.disabled) {
                return;
            }
            this.startMouseDrag = true;
        },
        handleMouseUp(e) {
            if (this.disabled) {
                return;
            }
            this.startMouseDrag = false;
        },
        handleMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.startMouseDrag || this.disabled) {
                return;
            }
            if (!this.vertical && this.lastPos.cX === e.clientX || this.vertical && this.lastPos.cY === e.clientY) {
                return;
            }
            this.lastPos = {
                cX: e.pageX,
                cY: e.pageY
            };
            const { left, top, width, height } = getBoundingClientRect(this.$parent.$el, true);
            const pos = {
                top,
                left,
                width,
                height,
                cX: this.lastPos.cX,
                cY: this.lastPos.cY
            };
            let d = this.vertical ? pos.cY - pos.top : pos.cX - pos.left;
            let percent = d / (this.vertical ? pos.height : pos.width);
            let value = this.min + (this.max - this.min) * percent;
            value = this.$parent.ajustValue(value);
            value = value > this.limitEnd ? this.limitEnd : (value < this.limitStart ? this.limitStart : value);
            this.currentValue = this.$parent.getLastestValue(Math.round(value));
        }
    },
    created() {
        this.currentValue = this.$parent.ajustValue(this.value);
    },
    mounted() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp)
    },
    beforeDestroy() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp)
    }
}
</script>

