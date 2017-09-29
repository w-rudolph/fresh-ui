<template>
    <div class="d-table">
        <div class="d-table__columns" v-show="false">
            <slot></slot>
        </div>
        <d-table-head :table-columns="tableColumns" :table-width="tableWidth"></d-table-head>
        <d-table-body :table-columns="tableColumns" :table-width="tableWidth" :data="data"></d-table-body>
        <d-table-footer></d-table-footer>
    </div>
</template>
<script>
import DTableHead from './table-head.vue';
import DTableBody from './table-body.vue';
import DTableFooter from './table-footer.vue';
import EventEmitter from '../mixins/event_emitter.js';
import { addInt } from '../utils/util';

export default {
    name: 'DTable',
    components: { DTableHead, DTableBody, DTableFooter },
    mixins: [EventEmitter],
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        minRowWidth: {
            type: Number,
            default: 80
        }
    },
    data() {
        return {
            tableColumns: [],
            tableWidth: ''
        }
    },
    computed: {
        _tableColumns() {
            return this.$children.filter(child => child.$options.name === 'DTableColumn');
        }
    },
    mounted() {
        this.updateTableCoulumns(this._tableColumns);
    },
    methods: {
        getTableCoulumns() {
            return this.$children.map(child => child.prop);
        },
        updateTableCoulumns(columnsData) {
            this.tableColumns = columnsData.map(column => {
                return {
                    label: column.label,
                    prop: column.prop,
                    width: this.getColumnWidth(column.width),
                    autoWidth: +this.getColumnWidth(column.autoWidth) || 0,
                    _uid: column._uid
                }
            });
            console.log(columnsData);
            this.tableWidth = this.tableColumns.map(column => column.autoWidth).reduce((a, b) => addInt(a, b), 0);
        },
        getColumnWidth(width) {
            if (width && width < this.minRowWidth) {
                return this.minRowWidth;
            }
            return width;
        }
    },
    created() {
        this.subscribe('table.columns.update', data => {
            this.updateTableCoulumns(data)
        })
    }
}
</script>
