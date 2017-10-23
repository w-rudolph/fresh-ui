<template>
    <div class="d-color-svpanel" @click="handleClick">
        <div class="d-color-svpanel__white"></div>
        <div class="d-color-svpanel__black"></div>
        <div class="d-color-svpanel__pointer" ref="poiner" :style="pointerStyle" @mouseup="handleMouseUp" @mousedown="handleMouseDown"></div>
    </div>
</template>
<script>
import { getBoundingClientRect } from '../utils/dom.js';

export default {
    name: 'svpanel',
    data() {
        return {
            pos: {},
            lastPos: {},
        }
    },
    computed: {
        pointerStyle() {
            return {
                left: this.color.s * 100 + '%',
                top: (1 - this.color.v) * 100 + '%'
            }
        },
        color() {
            return this.$parent.color;
        }
    },
    watch: {
        pos(v) {
            this.$emit('change', { s: v.left, v: 1 - v.top });
        }
    },
    methods: {
        handleMouseUp() {
            this.isDragging = false;
        },
        handleMouseDown(e) {
            this.isDragging = true;
        },
        handleMouseMove(e, drag = true) {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isDragging && drag) {
                return;
            }
            if (this.lastPos.cX === e.pageX && this.lastPos.cY === e.pageY) {
                return;
            }
            this.lastPos = {
                cX: e.pageX,
                cY: e.pageY
            };
            const { left, top, width, height } = getBoundingClientRect(this.$el, true);
            const pos = {
                left,
                top,
                width,
                height,
                cX: e.pageX,
                cY: e.pageY
            };
            const w = this.$refs.poiner.offsetWidth;
            const h = this.$refs.poiner.offsetHeight;
            let t = pos.cY - pos.top;
            let l = pos.cX - pos.left;
            t = t > (pos.height - h / 2) ? (pos.height - h / 2) : t < 0 ? 0 : t;
            l = l > (pos.width - w / 2) ? (pos.width - w / 2) : l < 0 ? 0 : l;
            this.pos = {
                top: t / (pos.height - h / 2),
                left: l / (pos.width - w / 2)
            };
        },
        handleClick(e) {
            this.handleMouseMove(e, false);
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
