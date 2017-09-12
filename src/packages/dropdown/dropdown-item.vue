<template>
    <li class="d-dropdown__menu-item" @click="handleItemClick">
        <slot></slot>
    </li>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';
export default {
    name: 'DDropdownItem',
    mixins: [EventEmitter],
    methods: {
        handleItemClick() {
            this.dispatch('DDropdown', 'dropdown.item.select', this);
        }
    }
}
</script>
