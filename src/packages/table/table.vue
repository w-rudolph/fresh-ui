<template>
    <div class="d-table">
        <d-table-head :store="store"></d-table-head>
        <d-table-body :store="store"></d-table-body>
        <d-table-footer></d-table-footer>
    </div>
</template>
<script>
import DTableHead from './table-head.vue';
import DTableBody from './table-body.vue';
import DTableFooter from './table-footer.vue';
import EventEmitter from '../mixins/event_emitter.js';
import { addInt, extend, deepCopy } from '../utils/util';
import { guid } from '../utils/guid.js';

export default {
    name: 'DTable',
    components: { DTableHead, DTableBody, DTableFooter },
    mixins: [EventEmitter],
    props: {
        tableData: {
            type: Array,
            default() {
                return [];
            }
        },
        columns: {
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
            store: {
                columns: [],
                tableData: [],
                visibleColumns: [],
                minRowWidth: 0
            }
        }
    },
    watch: {
        columns(v) {
            this.initStore();
            this.broadcast('DTableHead', 'table.columns.widthUpdate', null);
        },
        tableData() {
            this.initStore();
        }
    },
    methods: {
        initStore() {
            this.store = {
                columns: this.columns,
                tableData: this.tableData,
                minRowWidth: this.minRowWidth
            };
            this.store.columns.forEach(column => {
                column._uid = guid();
                if (typeof column.visible === 'undefined') {
                    column.visible = true;
                }
            })
            this.store.visibleColumns = this.columns.filter(column => column.visible === true);
        },
        updateStore(columns) {
            const cols = deepCopy(this.store.visibleColumns);
            cols.forEach((col, index) => {
                let column = columns[index];
                if (column.autoWidth < this.minRowWidth) {
                    column.autoWidth = this.minRowWidth;
                }
                extend(col, column);
            });
            this.store = {
                ...this.store,
                visibleColumns: cols
            };
        }
    },
    created() {
        this.initStore();
        this.subscribe('table.columns.update', columns => {
            this.updateStore(columns);
        })
    }
}
</script>
