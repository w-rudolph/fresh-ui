<template>
    <table class="d-table__header" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="column in store.visibleColumns" :key="column.prop" :width="column.width ||  store.defaultCellWidth">
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
    }
}
</script>
