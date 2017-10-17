<template>
    <div :class="['d-timepicker', size ? 'd-timepicker--'+size : '']">
        <slot name="reference"></slot>
        <div v-if="!$slots.reference" ref="reference" class="d-timepicker-reference" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <d-input :placeholder="placeholder" class="d-timepicker-input" :value="displayValue" :disabled="disabled" :size="size" readonly></d-input>
            <d-icon name="ios-clock-outline" v-show="!displayClearBtn" class="d-timepicker-arrow"></d-icon>
            <d-icon name="ios-close" v-if="displayClearBtn" class="d-timepicker-clear" @click="onClear"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-timepicker-popper" v-show="showPopper">
                <d-timepicker-panel ref="pickerPanel" :format="format" :options="options" v-model="currentValue" @change="handleChange"></d-timepicker-panel>
            </div>
        </transition>
    </div>
</template>

<script>
import DtimepickerPanel from './timepicker-panel';
import Popper from '../mixins/popper.js';
import Calender from '../utils/calender.js';
import { isString, isDate } from '../utils/util.js';

export default {
    name: 'DTimepicker',
    mixins: [Popper],
    components: { DtimepickerPanel },
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom-start',
        },
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Date],
            default() {
                return '';
            }
        },
        placeholder: {
            type: String,
            default: '选择时间'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        hideWhenClickOutside: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lang: {},
        type: {},
        options: {},
        format: {
            type: String,
            default: 'HH:mm:ss'
        }
    },
    data() {
        return {
            currentValue: this.value,
            showClear: false,
            displayValue: this.initValue(this.value)
        }
    },
    watch: {
        showPopper(val) {
            if (val) {
                this.$refs.pickerPanel.updateScroll();
            }
        },
        currentValue(v) {
            this.$emit('input', v);
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.currentValue && !this.disabled;
        },
    },
    methods: {
        initValue(value) {
            if (isDate(value)) { //Date
                return Calender.formatDate(value, this.format);
            } else if (isDate(new Date(value))) { // 'yyyy-MM-dd HH:mm'
                return Calender.formatDate(new Date(value), this.format);
            } else if (isString(value) && value.indexOf(':') > -1) { // 'HH:mm'
                return Calender.formatDate(new Date(Calender.formatDate(new Date, 'yyyy-MM-dd') + ' ' + value), this.format);
            } else {
                return '';
            }
        },
        formatNum(n) {
            return +n < 10 ? '0' + (+n) : n;
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.displayValue = '';
            this.$emit('input', '');
            this.$emit('change', '');
            if (this.showPopper) {
                this.showPopper = false;
            }
        },
        onMouseEnter() {
            if (this.clearable) {
                this.showClear = true;
            }
        },
        onMouseLeave() {
            if (this.clearable) {
                this.showClear = false;
            }
        },
        handleChange(v) {
            this.displayValue = v;
            this.$emit('change', v);
        }
    }
}
</script>
