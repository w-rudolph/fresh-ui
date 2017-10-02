<template>
    <table class="d-table__header" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(width, index) in store.columnWidths" :key="index" :width="getColumnWidth(width, index)">
        </colgroup>
        <tr>
            <th v-for="column in store.visibleColumns" :key="column.prop" :class="['d-table__column-' + column.prop]">
                <div class="d-table__cell">{{column.label}}</div>
            </th>
        </tr>
    </table>
</template>
<script>

export default {
    name: 'DTableHead',
    props: {
        store: {
            type: Object,
            default() {
                return []
            }
        }
    },
    methods: {
        getColumnWidth(width, index) {
            const { bodyScroll, columnWidths } = this.store;
            if (index === columnWidths.length - 1 && bodyScroll.vertical) {
                width += this.store.scrollbarWidth;
            }
            return width;
        }
    }
}
</script>
