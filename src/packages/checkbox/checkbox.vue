<template>
    <label :class="'d-checkbox' + (disabled ? ' disabled' : '')" @click="handleClick">
        <d-icon :name="currentValue ? 'check-square' : 'square-o'" :class="'d-checkbox__icon' + (currentValue ? ' checked' : '')"></d-icon>
        <span class="d-checkbox__label">
            <slot></slot>
        </span>
    </label>
</template>
<script>
export default {
    name: 'DCheckbox',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: this.value,
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) {
                return;
            }
            this.currentValue = !this.currentValue;
            this.$emit('input', this.currentValue);
        }
    }
}
</script>
<style scoped>
.d-checkbox {
    cursor: pointer;
}

.d-checkbox.disabled {
    background: #ddd;
    opacity: 0.5;
}

.d-checkbox__icon {
    font-size: 18px;
}

.d-checkbox__icon:hover {
    color: #006f42;
}

.d-checkbox__icon.checked {
    color: #006f42;
}
</style>


