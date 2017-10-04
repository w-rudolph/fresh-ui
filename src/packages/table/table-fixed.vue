<template>
    <div class="d-table__fixed" :style="{width: tableWidth + 'px'}">
        <div class="d-table__header-wrapper" ref="header" v-if="store.showHeader">
            <d-table-head :store="store" :columns="ajustColumns" :columnWidths="columnWidths" :style="{width: store.tableWidth + 'px'}"></d-table-head>
        </div>
        <div class="d-table__body-wrapper" :style="{height: tableBodyHeight + 'px'}" ref="body">
            <d-table-body :store="store" :columns="ajustColumns" :ajust-last-cell-width="false" :columnWidths="columnWidths" :style="{width: store.tableBodyWidth + 'px'}"></d-table-body>
        </div>
    </div>
</template>
<script>
import DTableHead from './table-head.vue';
import DTableBody from './table-body.vue';

export default {
    name: 'DTableFixed',
    components: { DTableHead, DTableBody },
    props: {
        direction: {
            type: String,
            default: 'left'
        },
        store: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        columns() {
            return this.direction === 'left' ? this.store.leftFixedColumns : this.store.rightFixedColumns;
        },
        ajustColumns() {
            return this.direction === 'left' ? this.store.visibleColumns : this.store.rVisibleColumns;
        },
        tableBodyHeight() {
            const { bodyScroll, tableHeight, scrollbarWidth } = this.store;
            return bodyScroll.horizontal ? tableHeight - scrollbarWidth : tableHeight;
        },
        tableWidth() {
            const length = this.columns.length;
            return this.columnWidths.slice(0, length).reduce((a, b) => a + b, 0);
        },
        columnWidths() {
            if (this.direction === 'left') {
                return this.store.columnWidths;
            }
            const length = this.store.columnWidths.length;
            const n1 = this.store.rightFixedColumns.length;
            return this.store.columnWidths.slice(-n1).concat(this.store.columnWidths.slice(0, length - n1));
        }
    },
    methods: {
        doScroll(position) {
            this.$refs.body.scrollTop = position;
        }
    }
}
</script>
