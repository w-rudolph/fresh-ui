<template>
    <li :class="['d-dropdown__menu-item', disabled ? 'disabled' : '', divided ? 'divided' : '']" @click="handleItemClick">
        <slot></slot>
    </li>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';
export default {
    name: 'DDropdownItem',
    mixins: [EventEmitter],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        divided: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleItemClick() {
            if (this.disabled) {
                return;
            }
            this.dispatch('DDropdown', 'dropdown.item.select', this);
        }
    }
}
</script>
