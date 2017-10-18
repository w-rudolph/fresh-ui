<template>
    <div :class="['d-slider', vertical ? 'd-slider--vertical' : '']">
        <div class="d-slider__bar" style="" :style="slideBarStyle"></div>
        <d-tooltip placement="top" ref="tooltip" theme="black" trigger="focus" :disabled="!showTooltip">
            <span slot="content">{{this.getFormatTip(currentValue)}}</span>
            <div slot="reference" :class="['d-slider__button', startMouseDrag ? 'draging' : '']" :style="sliderBtnStyle" @mouseenter="handleMouseHover(true)" @mouseleave="handleMouseHover(false)" @mouseup="handleMouseUp" @mousedown="handleMouseDown"></div>
        </d-tooltip>
    </div>
</template>

<script>
export default {
    name: 'DSlider',
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number,
            default: 20
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: true
        },
        formatTip: {
            type: Function,
            default: () => { }
        }
    },
    data() {
        return {
            currentValue: this.value > 100 ? 100 : this.value,
            startMouseDrag: false,
            lastPos: {}
        }
    },
    computed: {
        posStyle() {
            return {
                offset: parseInt(this.currentValue).toString() + '%'
            }
        },
        slideBarStyle() {
            if (this.vertical) {
                return {
                    height: this.posStyle.offset
                }
            }
            return {
                width: this.posStyle.offset
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
    watch: {
        currentValue() {
            this.$refs.tooltip.updatePopper(false);
        }
    },
    methods: {
        getFormatTip(currentValue) {
            const value = parseInt(currentValue);
            const res = this.formatTip(value);
            if (res) {
                return res;
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
            if (!this.startMouseDrag || this.disabled) {
                return;
            }
            if (!this.vertical && this.lastPos.cX === e.clientX || this.vertical && this.lastPos.cY === e.clientY) {
                return;
            }
            this.lastPos = {
                cX: e.clientX,
                cY: e.clientY
            };
            const pos = {
                left: this.$el.offsetLeft,
                top: this.$el.offsetTop,
                width: this.$el.offsetWidth,
                height: this.$el.offsetHeight,
                cX: e.clientX,
                cY: e.clientY
            };
            let d = Math.ceil(pos.cX - pos.left);
            d = d < 0 ? 0 : (d > pos.width ? pos.width : d);
            d = (d / pos.width > 1 ? 1 : d / pos.width) * 100;
            if (this.vertical) {
                d = Math.ceil(pos.cY - pos.top);
                d = d < 0 ? 0 : (d > pos.height ? pos.height : d);
                d = (d / pos.height > 1 ? 1 : d / pos.height) * 100;
            }
            if (this.currentValue !== d) {
                this.currentValue = d;
            }
        },
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
