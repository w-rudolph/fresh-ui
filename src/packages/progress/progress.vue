<template>
    <div :class="['d-progress', type ? 'd-progress--' + type : '']" :style="whStyle">
        <template v-if="type === 'circle'">
            <svg class="circle-svg" xmlns="http://www.w3.org/2000/svg" :width="width" :height="width">
                <circle :cx="cx" :cy="cx" :r="radius" fill="none" :stroke="strokeBgColor" :stroke-width="strokeWidth"></circle>
                <circle class="d-progress__circle" :cx="cx" :cy="cx" :r="radius" fill="none" :stroke="strokeColor" :stroke-width="strokeWidth" :stroke-dasharray="circumference" :stroke-dashoffset="offset"></circle>
            </svg>
        </template>
        <template v-if="type === 'line'">
            <div class="d-progress-bar" :style="{backgroundColor: strokeBgColor}">
                <div class="d-progress-bar__inner" :style="barStyle"></div>
            </div>
        </template>
        <div class="d-progress__text" v-if="showText">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DProgress',
    props: {
        type: {
            type: String,
            default: 'line'
        },
        strokeWidth: {
            type: Number,
            default: 6
        },
        width: {
            type: Number,
            default: 120
        },
        percent: {
            type: Number,
            default: 0
        },
        strokeBgColor: {
            type: String,
            default: '#ECEFF4'
        },
        strokeColor: {
            type: String,
            default: '#40A3EC'
        },
        showText: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        cx() {
            return this.width / 2;
        },
        radius() {
            return (this.width - this.strokeWidth) / 2;
        },
        circumference() {
            return Math.PI * 2 * this.radius;
        },
        offset() {
            return (1 - this.percent / 100) * this.circumference;
        },
        whStyle() {
            return this.type === 'circle' ? { width: this.width + 'px', height: this.width + 'px' } : {};
        },
        barStyle() {
            return { width: this.percent + '%', height: this.strokeWidth + 'px', backgroundColor: this.strokeColor };
        }
    }
}
</script>