<template>
    <div class="d-table__body-wrapper">
        <table class="d-table__body" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
                <col v-for="column in store.visibleColumns" :key="column.prop" :width="column.autoWidth">
            </colgroup>
            <tr v-for="(row, index) in store.tableData" :key="index">
                <td v-for="column in store.visibleColumns" :key="column.prop" :class="['d-table__column-' + column.prop]">
                    <div class="d-table__cell" v-html="renderCell(row, column)"></div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'DTableBody',
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

        }
    },
    methods: {
        renderCell(row, column) {
            const findColumn = this.store.columns.find(col => col._uid === column._uid);
            if(typeof findColumn.render === 'function'){
                return findColumn.render(row)
            }
            return row[findColumn.prop]
        }
    }
}
</script>
