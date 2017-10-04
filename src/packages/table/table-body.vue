<template>
    <table class="d-table__body" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(width, index) in columnWidths" :key="index" :width="getColumnWidth(width, index)">
        </colgroup>
        <tbody>
            <tr v-for="(row, index) in store.tableData" :key="index">
                <td v-for="column in columns" :key="column.prop" :class="['d-table__column-' + column.prop]">
                    <div class="d-table__cell" v-html="renderCell(row, column)"></div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    name: 'DTableBody',
    props: {
        store: {
            type: Object,
            default() {
                return {};
            }
        },
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        columnWidths: {
            type: Array,
            default() {
                return []
            }
        },
        ajustLastCellWidth: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        renderCell(row, column) {
            const findColumn = this.store.columns.find(col => col._uid === column._uid);
            if (typeof findColumn.render === 'function') {
                return findColumn.render(row);
            }
            return row[findColumn.prop];
        },
        getColumnWidth(width, index) {
            const { bodyScroll, columnWidths } = this.store;
            if (index === columnWidths.length - 1 && bodyScroll.vertical && this.ajustLastCellWidth) {
                width -= this.store.scrollbarWidth;
            }
            return width;
        }
    }
}
</script>
