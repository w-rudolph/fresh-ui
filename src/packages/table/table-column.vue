<template>
    <div class="d-table__column">
        <slot></slot>
    </div>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DTableColumn',
    mixins: [EventEmitter],
    props: {
        label: {
            type: String,
            default: '',
        },
        prop: {
            type: String,
            default: '',
        },
        width: {
            type: String | Number,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    // created() {
    //     this.$nextTick(_ => {
    //         this.dispatch('DTable', 'table.columns.update');
    //     })
    // }
}
</script>
