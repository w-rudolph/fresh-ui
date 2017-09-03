<template>
    <label :class="'d-checkbox' + (disabled ? ' disabled' : '')" @click="handleClick">
        <span :class="'d-checkbox__input' + (currentValue ? ' checked' : '')">
            <span class="d-checkbox__inner"></span>
        </span>
        <span class="d-checkbox__label">
            <slot></slot>
        </span>
    </label>
</template>
<script>
import EventEmitter from '../mixins/event_emitter';
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
        },
        label: {
            type: [String, Number],
            default: ''
        }
    },
    mixins: [EventEmitter],
    data() {
        return {
            currentValue: this.value,
        }
    },
    watch: {
        value(v) {
            this.setCurrentValue(v);
        }
    },
    methods: {
        handleClick() {
            if (this.$parent.$options.name === 'DCheckboxGroup') {
                this.dispatch('DCheckboxGroup', 'set_values', {
                    value: this.label,
                    append: !this.currentValue
                });
            }
            this.setCurrentValue(!this.currentValue);
        },
        setCurrentValue(v) {
            if (this.disabled) {
                return;
            }
            this.currentValue = v;
            this.$emit('input', v);

        }
    },
    created() {
        if (this.$parent.$options.name === 'DCheckboxGroup') {
            this.subscribe('init_values', values => {
                const index = values.indexOf(this.label);
                this.setCurrentValue(index > -1);
            })
        }
    }
}
</script>

