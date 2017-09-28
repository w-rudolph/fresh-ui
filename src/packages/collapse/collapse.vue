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
        activeIndex: {
            type: Number | String,
            default: ''
        }
    },
    watch: {
        activeIndex(index) {
            this.updateChildExpand(index);
        }
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
        updateChildExpand(index) {
            const child = this.children[index];
            if (child) {
                child.showToggle();
            }
        }
    },
    created() {
        this.subscribe('item-click', this.handleChildClick);
    },
    mounted() {
        this.updateChildExpand(this.activeIndex);
    }
}
</script>
