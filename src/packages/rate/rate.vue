<template>
    <div :class="['d-rate', disabled ? 'disabled' : '']">
        <span v-for="idx in max" :key="idx" class="d-rate-item" @mouseover="handleMouseOver(idx)" @mouseleave="handleMouseLeave" @click="handleClick(idx)">
            <d-icon name="star" :class="['d-rate-item__icon', hoverIndex >= idx ? 'active' : '']"></d-icon>
        </span>
    </div>
</template>
<script>
import DIcon from '../icon/icon';

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
        size: {
            type: String,
            default: 'lg'
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
        handleMouseOver(idx) {
            if (this.disabled) {
                return;
            }
            this.hoverIndex = idx;
            this.$emit('change', idx);
        },
        handleMouseLeave() {
            if (this.disabled) {
                return;
            }
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
