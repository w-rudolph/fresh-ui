<template>
    <div :class="['d-cascader', size ? 'd-cascader--'+size : '']">
        <slot name="reference"></slot>
        <div v-if="!$slots.reference" ref="reference" :class="['d-cascader-reference', showPopper ? 'show' : '']" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <d-input :size="size" :placeholder="placeholder" class="d-cascader-input" :value="displayValue" :disabled="disabled" readonly></d-input>
            <d-icon name="arrow-down-b" v-show="!displayClearBtn" class="d-select-arrow"></d-icon>
            <d-icon name="ios-close" v-if="displayClearBtn" class="d-select-clear" @click="onClear"></d-icon>
        </div>
        <transition name="dropdown-slide">
            <div ref="popper" class="d-cascader-popper" v-show="showPopper">
                <d-cascader-panel ref="panel" @active-item-change="handleSelectChange" @change="handleChange" :options="options" :mapProps="mapProps" :value="value"></d-cascader-panel>
            </div>
        </transition>
    </div>
</template>
<script>
import DCascaderPanel from './cascader-panel';
import Popper from '../mixins/popper.js';
import EventEmitter from '../mixins/event_emitter';

export default {
    name: 'DCascader',
    mixins: [Popper, EventEmitter],
    components: {
        DCascaderPanel
    },
    props: {
        options: {
            type: Array,
            default: () => []
        },
        mapProps: {
            type: Object,
            default: () => {
                return { children: 'children', label: 'label', value: 'value' };
            }
        },
        value: {
            type: Array,
            default: () => []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        trigger: {
            type: String,
            default: 'click'
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        clearable: {
            type: Boolean,
            default: false
        },
        hideWhenClickOutside: {
            type: Boolean,
            default: true
        },
        displayRender: {
            type: Function,
            default: (values) => {
                return values.map(item => item.label).join('/');
            }
        },
        changeOnSelect: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showClear: false,
            selected_value: []
        }
    },
    computed: {
        displayClearBtn() {
            return this.showClear && this.value.length && !this.disabled;
        },
        displayValue() {
            return this.displayRender(this.selected_value);
        }
    },
    watch: {
        showPopper(show) {
            if (show) {
                this.$refs.panel.refresh();
            }
        }
    },
    methods: {
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
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.$emit('input', []);
            this.selected_value = [];
        },
        handleChange(val) {
            this.selected_value = val;
            this.showPopper = false;
            const t = val.map(item => item.value);
            this.$emit('input', t);
            this.$emit('change', t);
        },
        handleSelectChange(val) {
            if (this.changeOnSelect) {
                const t = val.map(item => item.value);
                this.$emit('input', t);
                this.$emit('change', t);
            }
            this.$emit('active-item-change', val);
        },
        initSelectedItems(res) {
            this.selected_value = res.map(item => {
                return { label: item.label, value: item.value };
            });
        }
    },
    created() {
        this.subscribe('selected.items', this.initSelectedItems);
    }
}
</script>

