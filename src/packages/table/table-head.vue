<template>
    <div class="d-table__header-wrapper">
        <table class="d-table__header" cellspacing="0" cellpadding="0" border="0" @resize="handleResize">
            <colgroup>
                <col v-for="column in tableColumns" :key="column._uid" :width="column.autoWidth" :name="'d-table__column' + column._uid">
            </colgroup>
            <tr>
                <th v-for="column in tableColumns" :key="column._uid" :class="['d-table__column' + column._uid]">
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
        tableColumns: {
            type: Array,
            default() {
                return [];
            }
        },
        tableWidth: {
            type: Number | String,
            default: ''
        }
    },
    data() {
        return {
            columnsData: [],
            timer: null,
        }
    },
    watch: {
        columnsData() {
            this.$nextTick(() => {
                this.updateWidthofColumn();
            })
        }
    },
    methods: {
        updateWidthofColumn() {
            const el = this.$el;
            const columns = el.querySelectorAll('[class^="d-table__column"]');
            const copyData = deepCopy(this.tableColumns);
            columns.forEach((column, index) => {
                let col = copyData[index];
                if (col.width) {
                    col.autoWidth = +col.width;
                    return;
                }
                col.autoWidth = column.scrollWidth;
            })
            this.dispatch('DTable', 'table.columns.update', copyData);
        },
        handleResize() {
            console.log('resize');
        }
    },
    mounted() {
        this.columnsData = this.tableColumns;
    },
    created() {
        window.onresize = e => {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(this.updateWidthofColumn, 200);
        };
    }
}
</script>
