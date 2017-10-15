<template>
    <div :class="['d-timepicker', size ? 'd-timepicker--'+size : '']">
        <slot name="reference"></slot>
        <div v-if="!$slots.reference" ref="reference" class="d-timepicker-reference" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <d-input :placeholder="placeholder" class="d-timepicker-input" :value="displayValueStr" :disabled="disabled" :size="size" readonly></d-input>
            <d-icon name="ios-clock-outline" v-show="!displayClearBtn" class="d-timepicker-arrow"></d-icon>
            <d-icon name="ios-close" v-if="displayClearBtn" class="d-timepicker-clear" @click="onClear"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-timepicker-popper" v-show="showPopper">
                <d-timepicker-panel ref="pickerPanel" :showSeconds="showSeconds" :options="options" v-model="currentValue"></d-timepicker-panel>
            </div>
        </transition>
    </div>
</template>

<script>
import DtimepickerPanel from './timepicker-panel';
import Popper from '../mixins/popper.js';
import Calender from '../utils/calender.js';

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
            default: '',
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
        showSeconds: {
            type: Boolean,
            default: true
        },
        separator: {
            type: String,
            default: ':'
        },
        format: {
            type: String,
            default() {
                if (this.showSeconds) {
                    return 'hh:mm:ss';
                }
                return 'hh:mm';
            }
        }
    },
    data() {
        return {
            currentValue: this.getInitValue(this.value),
            showClear: false,
        }
    },
    watch: {
        value(val, oldVal) {
            this.currentValue = this.getInitValue(val);
            this.$emit('change', val, oldVal);
        },
        displayValueStr(v) {
            this.$emit('input', v);
        },
        showPopper(val) {
            if (val) {
                this.$refs.pickerPanel.updateScroll();
            }
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.currentValue.length && !this.disabled;
        },
        displayValueStr() {
            if (!this.currentValue.length) {
                return '';
            }
            const [h = 0, m = 0, s = 0] = this.currentValue;
            const date = new Date();
            date.setHours(h);
            date.setMinutes(m);
            date.setSeconds(s);
            return Calender.formatDate(date, this.format);
        }
    },
    methods: {
        formatNum(n) {
            return +n < 10 ? '0' + (+n) : n;
        },
        getInitValue(value) {
            if (typeof value === 'string') {
                return value ? value.split(this.separator) : [];
            } else {
                return [];
            }
        },
        handleChange(v) {
            console.log(v);
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.currentValue = [];
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
        }
    }
}
</script>
