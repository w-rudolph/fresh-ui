<template>
    <li :class="['d-select-item', active ? 'active' : '']" @click="hadleClick">
        <slot></slot>
    </li>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DSelectOption',
    mixins: [EventEmitter],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: false,
        }
    },
    methods: {
        hadleClick() {
            this.dispatch('DSelect', 'select.item.select', this.value);
        }
    },
    created() {
        this.subscribe('select.item.select', value => {
            if (this.value === value) {
                this.active = true;
            } else {
                this.active = false;
            }
        });
    }
}
</script>
