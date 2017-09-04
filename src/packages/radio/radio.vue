<template>
    <label :class="'d-radio' + (disabled ? ' disabled' : '')" @click="handleClick">
        <span :class="'d-radio__input' + (checked ? ' checked' : '')">
            <span class="d-radio__inner"></span>
        </span>
        <span class="d-radio__label">
            <slot></slot>
        </span>
    </label>
</template>
<script>
export default {
    name: 'DRadio',
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        label: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {
        checked() {
            return this.label && this.label === this.value;
        }
    },
    watch: {
        value(v) {
            this.setCurrentValue(v);
        }
    },
    methods: {
        handleClick() {
            this.setCurrentValue(this.label);
        },
        setCurrentValue(v) {
            if (this.disabled || this.checked) {
                return;
            }
            this.$emit('input', v);
        }
    }
}
</script>

