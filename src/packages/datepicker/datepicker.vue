<template>
    <div :class="['d-datepicker', size ? 'd-datepicker--'+size : '']">
        <slot name="reference"></slot>
        <div v-if="!$slots.reference" ref="reference" class="d-datepicker-reference" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <d-input :placeholder="placeholder" class="d-datepicker-input" :value="currentValue" :disabled="disabled" :size="size" readonly></d-input>
            <d-icon name="ios-calendar-outline" v-show="!displayClearBtn" class="d-datepicker-arrow"></d-icon>
            <d-icon name="ios-close" v-if="displayClearBtn" class="d-datepicker-clear" @click="onClear"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-datepicker-popper" v-show="showPopper">
                <d-datepicker-panel @close-panel="handlePanelClose" :lang="lang" :type="type" :format="format" :options="options" v-model="currentValue"></d-datepicker-panel>
            </div>
        </transition>
    </div>
</template>

<script>
import DDatepickerPanel from './datepicker-panel';
import Popper from '../mixins/popper.js';
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DDatepicker',
    mixins: [Popper, EventEmitter],
    components: { DDatepickerPanel },
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
            type: [String, Number, Date],
            default: '',
        },
        placeholder: {
            type: String,
            default: '选择日期'
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
        format: {},
        options: {}
    },
    data() {
        return {
            currentValue: this.value,
            showClear: false,
        }
    },
    watch: {
        currentValue(val, oldVal) {
            this.$emit('input', val);
        },
        value(val, oldVal) {
            this.currentValue = val;
            this.$emit('change', val, oldVal);
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.currentValue.length && !this.disabled;
        }
    },
    methods: {
        handlePanelClose() {
            this.showPopper = false;
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.currentValue = '';
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
