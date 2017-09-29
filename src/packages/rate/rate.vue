<template>
    <div :class="['d-rate', disabled ? 'disabled' : '']">
        <span v-for="idx in max" :key="idx" class="d-rate-item" @mouseenter="handleMouseEnter(idx,$event)" @mouseleave="handleMouseLeave($event)" @click="handleClick(idx)">
            <d-icon name="star" :class="['d-rate-item__icon', hoverIndex >= idx ? 'active' : '']"></d-icon>
        </span>
    </div>
</template>
<script>
import DIcon from '../icon/icon';
import { addClass, removeClass } from '../utils/dom.js';

export default {
    name: 'DRate',
    components: [DIcon],
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hoverIndex: Math.min(this.value, this.max),
            selectedValue: Math.min(this.value, this.max),
        }
    },
    watch: {
        value(val, oldVal) {
            if (this.disabled) {
                return;
            }
            this.selectedValue = Math.min(val, this.max);
            this.hoverIndex = Math.min(val, this.max);
        }
    },
    methods: {
        handleMouseEnter(idx, e) {
            if (this.disabled) {
                return;
            }
            addClass(e.target, 'hover');
            this.hoverIndex = idx;
            this.$emit('change', idx);
        },
        handleMouseLeave(e) {
            if (this.disabled) {
                return;
            }
            removeClass(e.target, 'hover');
            this.hoverIndex = this.selectedValue;
            this.$emit('change', this.hoverIndex);
        },
        handleClick(idx) {
            if (this.disabled) {
                return;
            }
            this.selectedValue = idx;
            this.$emit('input', idx);
            this.$emit('change', idx);
        }
    }
}
</script>
