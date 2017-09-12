<template>
    <div class="d-dropdown">
        <div ref="reference" class="d-dropdown-reference">
            <slot></slot>
        </div>
        <transition :name="`${transition}`">
            <div ref="popper" :class="[`d-dropdown-popper`, showPopper ? 'show' : '']" v-show="showPopper">
                <slot name="dropdown"></slot>
            </div>
        </transition>
    </div>
</template>
<script>
import Popper from '../mixins/popper.js';
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DDropdown',
    mixins: [Popper, EventEmitter],
    props: {
        trigger: {
            type: String,
            default: 'click'
        },
        showArrow: {
            type: Boolean,
            default: false
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        transition: {
            type: String,
            default: 'slide'
        },
        hideWhenClickOutside: {
            type: Boolean,
            default: true
        },
        hideOnClick: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        showPopper(v) {
            this.$emit('visible-change', v);
        }
    },
    created() {
        this.subscribe('dropdown.item.select', item => {
            if (this.hideOnClick) {
                this.showPopper = false;
            }
            this.$emit('select', item);
        })
    }
}
</script>
