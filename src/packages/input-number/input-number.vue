<template>
    <div :class="['d-input-number', size ? 'd-input-number--'+size : '', disabled ? 'disabled' : '']" @mouseenter="showControls = true" @mouseleave="showControls = false">
        <input class="d-input-number__inner" :disabled="disabled" ref="input" type="text" :value="currentValue" @input="onInputChange($event)" @blur="onBlur($event)" @keydown.up="onIncrease" @keydown.down="onDecrease">
        <div class="d-input-number__control" v-show="controls && !disabled && showControls">
            <d-icon :class="['d-input-number__increase', canIncrease ? '' : 'disabled']" name="ios-arrow-up" @click="onIncrease"></d-icon>
            <d-icon :class="['d-input-number__decrease', canDecrease ? '' : 'disabled']" name="ios-arrow-down" @click="onDecrease"></d-icon>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DInputNumber',
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        precision: {
            type: Number,
            default: Infinity
        },
        step: {
            type: Number,
            default: 1
        },
        min: {
            type: Number,
            default: -Infinity
        },
        max: {
            type: Number,
            default: Infinity
        },
        debounce: {
            type: Number,
            default: 350
        },
        controls: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentValue: this.value,
            showControls: false
        }
    },
    computed: {
        canIncrease() {
            return parseFloat(this.currentValue) < this.max && !this.disabled;
        },
        canDecrease() {
            return parseFloat(this.currentValue) > this.min && !this.disabled;
        }
    },
    watch: {
        value(val) {
            this.setCurrentValue(this.filterValue(val));
        }
    },
    methods: {
        onInputChange(e) {
            this.setCurrentValue(this.filterValue(e.target.value));
        },
        onBlur(e) {
            let value = parseFloat(e.target.value);
            value = this.filterValueRange(value);
            value = this.handlePrecision(value);
            this.setCurrentValue(this.filterValue(value));
        },
        handlePrecision(value) {
            if (this.precision !== Infinity && value !== '') {
                value = parseFloat(value).toFixed(this.precision);
            }
            return value;
        },
        filterValue(value, init = false) {
            if (this.disabled) {
                return;
            }
            value = value.toString().replace(/[^-.0-9]+/g, '').replace(/^(\.)/g, '');
            value = this.filterDash(value);
            value = this.filterDot(value);
            if (init) {
                value = this.filterValueRange(value);
                value = this.handlePrecision(value);
            }
            this.$refs.input.value = value;
            return value;
        },
        filterDash(value) {
            const dashIndex = value.indexOf('-');
            value = value.replace(/-/g, '');
            if (dashIndex === 0 && this.min < 0) {
                value = '-' + value;
            }
            return value;
        },
        filterDot(value) {
            const dotIndex = value.indexOf('.');
            const dotLastIndex = value.lastIndexOf('.');
            if (dotIndex !== dotLastIndex) {
                value = value.replace(/\./g, '');
                value = value.substr(0, dotIndex) + '.' + value.substr(dotIndex, value.length);
            }
            return value;
        },
        filterValueRange(value) {
            if (this.min !== -Infinity && parseFloat(value) < this.min) {
                value = Math.max(value, this.min);
            }
            if (this.max !== Infinity && parseFloat(value) > this.max) {
                value = Math.min(value, this.max);
            }
            return value;
        },
        setCurrentValue(value) {
            if (this.disabled) {
                return;
            }
            this.currentValue = value;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.$emit('input', value);
                if (this.currentValue != value) {
                    this.$emit('change', value, this.currentValue);
                }
            }, this.debounce)
        },
        checkValue(value) {

        },
        onIncrease() {
            const step = this.precision === 0 ? Math.ceil(this.step) : this.step;
            const value = parseFloat(this.currentValue) + step;
            this.setCurrentValue(this.filterValue(value, true));
        },
        onDecrease() {
            const step = this.precision === 0 ? Math.ceil(this.step) : this.step;
            const value = parseFloat(this.currentValue) - step;
            this.setCurrentValue(this.filterValue(value, true));
        }
    },
    mounted() {
        this.setCurrentValue(this.filterValue(this.value, true));
    }
}
</script>
