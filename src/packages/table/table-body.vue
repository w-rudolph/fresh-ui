<template>
    <table class="d-table__body" cellspacing="0" cellpadding="0" border="0">
        <colgroup>
            <col v-for="(width, index) in columnWidths" :key="index" :width="getColumnWidth(width, index)">
        </colgroup>
        <tbody ref="tbody">
            <template v-for="(row, index) in store.tableData">
                <tr :class="['d-table__row', store.stripe ? (index % 2 ? 'even':'odd') : '']" :key="index" @mouseenter="handleMouseEvent(index, 'enter')" @mouseleave="handleMouseEvent(index, 'leave')">
                    <td v-for="column in columns" :key="column.prop" :class="['d-table__column-' + column.prop]">
                        <div class="d-table__cell expand-cell" v-if="column.type === 'expand'" @click="toggleExpand(row,$event)">
                            <d-icon name="ios-arrow-right" :class="['expand-icon', !!row.expand ? 'expand' : '']"></d-icon>
                        </div>
                        <d-render class="d-table__cell" v-else :render="() => renderCell(row, column)"></d-render>
                    </td>
                </tr>
                <tr v-if="!!row.expand" :key="'expand_' + index">
                    <td :colspan="columns.length" class="d-table-expand__cell">
                        <d-render :render="() => renderExpandRow(row)"></d-render>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script>
import EventEmitter from '../mixins/event_emitter.js';
import { addClass, removeClass, insertAfter } from '../utils/dom.js';
import DRender from '../base/render.vue';

export default {
    name: 'DTableBody',
    components: { DRender },
    mixins: [EventEmitter],
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
            showExpandCell: true
        }
    },
    methods: {
        renderCell(row, column) {
            const findColumn = this.store.columns.find(col => col._uid === column._uid);
            if (typeof findColumn.render === 'function') {
                return findColumn.render(this.$createElement, row);
            }
            return row[findColumn.prop];
        },
        getColumnWidth(width, index) {
            const { bodyScroll, columnWidths } = this.store;
            if (index === columnWidths.length - 1 && bodyScroll.vertical && this.ajustLastCellWidth) {
                width -= this.store.scrollbarWidth;
            }
            return width;
        },
        handleMouseEvent(index, type) {
            this.dispatch('DTable', 'table.row.hover', { type, index });
        },
        toggleExpand(row, e) {
            this.$set(row, 'expand', !row.expand);
        },
        renderExpandRow(row) {
            const column = this.columns.find(column => column.type === 'expand');
            if (typeof column.render === 'function') {
                return column.render(this.$createElement, row);
            }
            return row[column.prop];
        }
    },
    created() {
        this.subscribe('table.row.hover', ({ type, index }) => {
            const $trs = this.$refs.tbody.querySelectorAll('tr.d-table__row');
            if (type === 'enter') {
                addClass($trs[index], 'hover');
            } else {
                removeClass($trs[index], 'hover');
            }
        })
    }
}
</script>
