<template>
    <div :class="['d-select', showPopper ? 'expand' : '', size ? 'd-select--'+size : '',  disabled ? 'disabled' : '', multiple ? 'multiple' : '']">
        <div ref="reference" class="d-select-reference" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <template v-if="multiple">
                <div class="d-select-tags">
                    <d-tag closable type="info" :disabled="disabled" v-for="item in select_value" :key="item" @close="handleTagClose(item, $event)">{{item}}</d-tag>
                    <input readonly v-if="!select_value.length" :placeholder="placeholder" class="d-select-placeholder"></input>
                </div>
            </template>
            <template v-else>
                <d-input :placeholder="placeholder" :disabled="disabled" :size="size" v-model="select_value" readonly></d-input>
            </template>
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
import DTag from '../tag/tag';

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
        multiple: {
            type: Boolean,
            default: false
        },
        value: {
            type: this.multiple ? Array : String | Number,
            default: this.multiple ? [] : '',
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
            select_value: this.multiple ? [] : '',
            showClear: false,
            hideOnClick: this.multiple ? false : true
        }
    },
    watch: {
        value(value) {
            if (this.disabled) {
                return;
            }
            this.broadcastChildren(value);
        },
        select_value() {
            this.updatePopper(false);
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.select_value.length && !this.disabled;
        }
    },
    methods: {
        broadcastChildren(value) {
            if (this.select_value !== value) {
                this.select_value = value;
            }
            this.broadcast('DSelectOption', 'select.item.select', value);
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.select_value = this.multiple ? [] : '';
            this.handleChange(this.select_value);
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
        },
        handleTagClose(item, e) {
            e.preventDefault();
            e.stopPropagation();
            const index = this.select_value.indexOf(item);
            if (index > -1) {
                this.select_value.splice(index, 1);
            }
        }
    },
    created() {
        this.subscribe('select.item.select', value => {
            if (this.hideOnClick) {
                this.showPopper = false;
            }
            if (this.multiple) {
                const index = this.select_value.indexOf(value);
                if (index === -1) {
                    this.select_value.push(value);
                } else {
                    this.select_value.splice(index, 1);
                }
                this.handleChange(this.select_value);
                this.broadcastChildren(this.select_value);
            } else {
                if (this.select_value !== value) {
                    this.handleChange(value);
                    this.broadcastChildren(value);
                }
            }
        })
    },
    mounted() {
        this.select_value = this.value;
        this.broadcastChildren(this.value);
    }
}
</script>
