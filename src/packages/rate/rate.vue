<template>
    <div :class="'d-rate' + (disabled ? ' disabled' : '')">
        <span v-for="idx in max" :key="idx" class="d-rate-item" @mouseover="handleMouseOver(idx)" @mouseleave="handleMouseLeave" @click="handleClick(idx)">
            <DIcon :name="getComputedIconName(idx)" :class="getComputedIconClass(idx)"></DIcon>
        </span>
        <span class="d-rate-item--text">{{hoverIndex}}</span>
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
            this.selectedValue = Math.min(val, this.max);
            this.hoverIndex = Math.min(val, this.max);
        }
    },
    methods: {
        getComputedIconName(idx) {
            return this.hoverIndex >= idx ? 'ios-star' : 'ios-star-outline';
        },
        getComputedIconClass(idx) {
            return 'd-rate-icon' + (this.hoverIndex >= idx ? ' d-rate-icon--active' : '');
        },
        handleMouseOver(idx) {
            if (this.disabled) {
                return;
            }
            this.hoverIndex = idx;
        },
        handleMouseLeave() {
            if (this.disabled) {
                return;
            }
            this.hoverIndex = this.selectedValue;
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
<style scoped>
.d-rate,
.d-rate-item {
    display: inline-block;
    user-select: none;
    font-size: 20px;
}

.d-rate-item {
    cursor: pointer;
}

.d-rate.disabled .d-rate-item {
    cursor: default;
}

.d-rate-icon--hover,
.d-rate-icon--active {
    color: #f7ba2a;
}
</style>
