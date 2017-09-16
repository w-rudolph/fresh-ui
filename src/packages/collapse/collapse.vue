<template>
    <div class="d-collapse">
        <slot></slot>
    </div>
</template>
<script>
import EventEmitter from '../mixins/event_emitter';
export default {
    name: 'DCollapse',
    mixins: [EventEmitter],
    props: {
        accordion: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        children() {
            return this.$children.filter(child => child.$options && child.$options.name === 'DCollapseItem');
        }
    },
    methods: {
        handleChildClick(vnode) {
            if (this.accordion) {
                this.broadcast('DCollapseItem', 'sibling-item-click', vnode);
            }
        },

    },
    mounted() {
        this.subscribe('item-click', this.handleChildClick);
    }
}
</script>
