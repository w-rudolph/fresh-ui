<template>
    <div :class="[baseClass, vertical ? baseClass + '--vertical' : '', ns]" @click="handleClick">
        <div :class="baseClass + '__bar'" ref="bar" :style="barStyle"></div>
        <div :class="baseClass + '__button'" ref="btn" :style="buttonStyle" @mouseup="handleMouseUp" @mousedown="handleMouseDown"></div>
    </div>
</template>
<script>
import { getBoundingClientRect } from '../utils/dom.js';

export default {
    name: 'DColorSlider',
    props: {
        vertical: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isDragging: false,
            lastPos: {},
            currentValue: 0,
            ns: '',
            barStyle: {}
        }
    },
    computed: {
        baseClass() {
            return 'd-color-slider';
        },
        buttonStyle() {
            return {
                top: this.vertical ? this.currentValue + 'px' : undefined,
                left: this.vertical ? undefined : this.currentValue + 'px'
            }
        }
    },
    methods: {
        handleMouseUp() {
            this.isDragging = false;
        },
        handleMouseDown() {
            this.isDragging = true;
        },
        handleMouseMove(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDragging) {
                return;
            }
            if (!this.vertical && this.lastPos.cX === e.clientX || this.vertical && this.lastPos.cY === e.clientY) {
                return;
            }
            this.lastPos = {
                cX: e.pageX,
                cY: e.pageY
            };
            const { left, top, width, height } = getBoundingClientRect(this.$refs.bar, true);
            const pos = {
                left,
                top,
                width,
                height,
                cX: this.lastPos.cX,
                cY: this.lastPos.cY
            };
            let offset = parseInt(this.vertical ? pos.cY - pos.top : pos.cX - pos.left);
            let wh = this.vertical ? pos.height : pos.width;
            offset = offset < 0 ? 0 : (offset > wh ? wh : offset);
            this.currentValue = offset;
        },
        handleClick(e) {
            this.isDragging = true;
            this.handleMouseMove(e);
            this.$nextTick(_ => {
                this.isDragging = false;
            })
        }
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

