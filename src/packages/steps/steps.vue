<template>
    <div class="d-steps">
        <slot></slot>
    </div>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DSteps',
    mixins: [EventEmitter],
    props: {
        active: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            stepItems: [],
            timer: null
        }
    },
    methods: {
        updateChildren() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.stepItems = this.$children;
            }, 20);
        }
    },
    computed: {
        itemsCount() {
            return this.stepItems.length;
        }
    },
    created() {
        this.subscribe('Step.add', stepItem => {
            this.updateChildren();
        });
    }
}
</script>

