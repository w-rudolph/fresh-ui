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

export default {
    name: 'DSliderButton',
    components: { DTooltip },
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        value: {
            type: Number,
            default: 0
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
            this.currentValue = this.setCurrentValue(value);
        }
    },
    computed: {
        formatValue() {
            const value = parseInt(this.currentValue);
            return this.tipFormat(value) || value;
        },
        posStyle() {
            return {
                offset: parseInt(this.currentValue).toString() + '%'
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
        setCurrentValue(value) {
            if (value > this.max) {
                value = this.max;
            }
            if (value < this.min) {
                value = this.min;
            }
            return value;
        },
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
            const $parent = this.$parent.$el;
            const pos = {
                left: $parent.offsetLeft,
                top: $parent.offsetTop,
                width: $parent.offsetWidth,
                height: $parent.offsetHeight,
                cX: this.lastPos.cX,
                cY: this.lastPos.cY
            };
            let d = this.vertical ? Math.ceil(pos.cY - pos.top) : Math.ceil(pos.cX - pos.left);
            this.currentValue = this.setCurrentValue(parseInt(d / (this.vertical ? pos.height : pos.width) * 100));
        }
    },
    created() {
        this.currentValue = this.setCurrentValue(this.value);
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

