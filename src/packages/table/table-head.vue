<template>
    <table class="d-table__header" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(width, index) in columnWidths" :key="index" :width="width">
        </colgroup>
        <tr>
            <th v-for="column in columns" :key="column.prop" :class="['d-table__column-' + column.prop]">
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
    methods: {
        getColumnWidth(width, index) {
            const { bodyScroll, columnWidths } = this.store;
            if (index === columnWidths.length - 1 && bodyScroll.vertical && this.ajustLastCellWidth) {
                width += this.store.scrollbarWidth;
            }
            return width;
        }
    }
}
</script>
