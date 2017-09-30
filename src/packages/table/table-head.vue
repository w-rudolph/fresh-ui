<template>
    <div class="d-table__header-wrapper">
        <table class="d-table__header" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
                <col v-for="column in store.visibleColumns" :key="column.prop" :width="column.autoWidth">
            </colgroup>
            <tr>
                <th v-for="column in store.visibleColumns" :key="column.prop" :class="['d-table__column-' + column.prop]">
                    <div class="d-table__cell">{{column.label}}</div>
                </th>
            </tr>
        </table>
    </div>
</template>
<script>
import { deepCopy } from '../utils/util';
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DTableHead',
    mixins: [EventEmitter],
    props: {
        store: {
            type: Object,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            timer: null,
            visibleColumns: []
        }
    },
    methods: {
        updateWidthofColumn() {
            const el = this.$el;
            const columns = el.querySelectorAll('[class^="d-table__column"]');
            const copyData = deepCopy(this.store.visibleColumns);
            columns.forEach((column, index) => {
                let col = copyData[index];
                if (col.width) {
                    col.autoWidth = +col.width;
                    return;
                }
                col.autoWidth = column.scrollWidth;
            })
            this.dispatch('DTable', 'table.columns.update', copyData);
        }
    },
    mounted() {
        this.updateWidthofColumn();
    },
    created() {
        this.visibleColumns = this.store.visibleColumns;
        window.onresize = e => {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.visibleColumns.forEach(col => {
                if (!col.width) {
                    col.autoWidth = this.store.minRowWidth;
                }
            })
            this.dispatch('DTable', 'table.columns.update', this.visibleColumns);
            this.timer = setTimeout(this.updateWidthofColumn, 200);
        };
        this.subscribe('table.columns.widthUpdate', data => {
            this.$nextTick(this.updateWidthofColumn);
        });
    }
}
</script>
