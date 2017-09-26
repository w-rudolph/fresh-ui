<template>
    <div :class="['d-select', showPopper ? 'expand' : '', clearable ? 'clearable' : '']">
        <div ref="reference" class="d-select-reference">
            <d-input :placeholder="placeholder" v-model="select_value" readonly></d-input>
            <d-icon name="arrow-down-b" class="d-select-arrow"></d-icon>
            <d-icon name="ios-close" v-if="clearable" class="d-select-clear" @click="onClear"></d-icon>
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
            type: String | Number,
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
    },
    data() {
        return {
            select_value: this.value,
        }
    },
    watch: {
        select_value(value) {
            this.broadcastChildren(value);
        }
    },
    methods: {
        broadcastChildren(value) {
            this.broadcast('DSelectOption', 'select.item.select', value);
        },
        onClear(e) {
            e.preventDefault();
            e.stopPropagation();
            this.select_value = '';
        }
    },
    created() {
        this.subscribe('select.item.select', value => {
            this.showPopper = false;
            if (this.select_value !== value) {
                this.select_value = value;
                this.$emit('select', value);
                this.$emit('input', value);
                this.broadcastChildren(value);
            }
        })
    },
    mounted() {
        this.broadcastChildren(this.value);
    }
}
</script>
