<template>
    <div :class="['d-switch', size ? 'd-switch--'+size : '',currentValue ? 'd-switch--checked' : '', disabled ? 'disabled' : '']" @click="handleClick">
        <div class="d-switch__inner">
            <slot name="on" v-if="currentValue"></slot>
            <slot name="off" v-else></slot>
        </div>
        <div class="d-switch__dot" ref="dot" :style="dotStyle"></div>
    </div>
</template>
<script>
export default {
    name: 'DSwitch',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: this.value,
            dotStyle: {
                left: '2px'
            }
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
            this.$emit('change', val);
            this.setDotStyle();
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) {
                return;
            }
            this.currentValue = !this.currentValue;
            this.setDotStyle();
            this.$emit('input', this.currentValue);
        },
        setDotStyle() {
            const offset = this.$el.offsetWidth - this.$refs.dot.offsetWidth - 4;
            this.dotStyle = {
                left: this.currentValue ? offset + 'px' : '2px'
            };
        }
    },
    mounted() {
        this.setDotStyle();
    }
}
</script>
