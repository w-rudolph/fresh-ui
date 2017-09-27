<template>
    <div :class="['d-select', showPopper ? 'expand' : '', size ? 'd-select--'+size : '',  disabled ? 'disabled' : '']">
        <div ref="reference" class="d-select-reference" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <d-input :placeholder="placeholder" :disabled="disabled" :size="size" v-model="select_value" readonly></d-input>
            <d-icon name="arrow-down-b" v-show="!displayClearBtn" class="d-select-arrow"></d-icon>
            <d-icon name="ios-close" v-if="displayClearBtn" class="d-select-clear" @click="onClear"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-select-dropdown" v-show="showPopper">
                <ul class="d-select-dropdown-list">
                    <slot></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import Popper from '../mixins/popper.js';
import EventEmitter from '../mixins/event_emitter.js';
import DInput from '../input/input';
import DIcon from '../icon/icon';

export default {
    name: 'DSelect',
    mixins: [Popper, EventEmitter],
    comments: { DInput, DIcon },
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        value: {
            type: String | Number | Array,
            default: '',
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        clearable: {
            type: Boolean,
            default: false
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
        }
    },
    data() {
        return {
            select_value: '',
            showClear: false
        }
    },
    watch: {
        value(value) {
            this.broadcastChildren(value);
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.select_value && !this.disabled;
        }
    },
    methods: {
        broadcastChildren(value) {
            if (this.disabled) {
                return;
            }
            this.select_value = value;
            this.broadcast('DSelectOption', 'select.item.select', value);
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.select_value = '';
            this.handleChange('');
        },
        handleChange(value) {
            if (this.disabled) {
                return;
            }
            this.$emit('change', value);
            this.$emit('input', value);
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
    },
    created() {
        this.subscribe('select.item.select', value => {
            this.showPopper = false;
            if (this.select_value !== value) {
                this.handleChange(value);
                this.broadcastChildren(value);
            }
        })
    },
    mounted() {
        this.broadcastChildren(this.value);
    }
}
</script>
