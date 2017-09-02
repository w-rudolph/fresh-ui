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
import EventEmitter from '../../mixins/event_emitter';
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
<style scoped>
.d-checkbox {
    cursor: pointer;
    display: inline-block;
}

.d-checkbox.disabled {
    cursor: not-allowed;
}

.d-checkbox+.d-checkbox {
    margin-left: 10px;
}

.d-checkbox__inner {
    position: relative;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    width: 18px;
    height: 18px;
    background-color: #fff;
}

.d-checkbox__inner:after {
    position: absolute;
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    width: 4px;
    height: 8px;
    left: 5px;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    transition: all .2s ease-in-out;
    transform-origin: center;
}

.d-checkbox__input.indeterminate .d-checkbox__inner:after {
    width: 10px;
    height: 1px;
    left: 3px;
    top: 7px;
    border-width: 1px;
    background: #fff;
    transform: scale(1);
}

.d-checkbox__input.checked .d-checkbox__inner:after {
    transform: rotate(45deg) scaleY(1);
}

.d-checkbox__input.checked .d-checkbox__inner,
.d-checkbox__input.indeterminate .d-checkbox__inner {
    background-color: #2d8cf0;
    border-color: #2d8cf0;
}

.d-checkbox.disabled .d-checkbox__inner {
    background-color: #eef1f6;
    border-color: #d1dbe5;
}

.d-checkbox.disabled .d-checkbox__input.checked .d-checkbox__inner,
.d-checkbox.disabled .d-checkbox__input.indeterminate .d-checkbox__inner {
    background-color: #d1dbe5;
}

.d-checkbox__inner:hover {
    border-color: #2d8cf0;
}

.d-checkbox__label {
    font-size: 14px;
}

.d-checkbox.disabled .d-checkbox__label {
    color: #ddd;
}
</style>


