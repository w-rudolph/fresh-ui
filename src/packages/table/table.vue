<template>
    <div class="d-table">
        <div class="d-table__header-wrapper" ref="header">
            <d-table-head :store="store"></d-table-head>
        </div>
        <div class="d-table__body-wrapper" @scroll="handleBodyScroll" :style="{height: store.tableHeight + 'px'}">
            <d-table-body :store="store"></d-table-body>
        </div>
        <div class="d-table__footer-wrapper">
            <d-table-footer></d-table-footer>
        </div>
    </div>
</template>
<script>
import DTableHead from './table-head.vue';
import DTableBody from './table-body.vue';
import DTableFooter from './table-footer.vue';
import EventEmitter from '../mixins/event_emitter.js';
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
        defaultCellWidth: {
            type: Number,
            default: 80
        },
        tableHeight: {
            type: [Number, String],
        }
    },
    data() {
        return {
            store: {
                columns: [],
                tableData: [],
                visibleColumns: [],
                tableHeight: this.tableHeight,
                defaultCellWidth: this.defaultCellWidth,
            }
        }
    },
    watch: {
        columns(v) {
            this.initStore();
        },
        tableData() {
            this.initStore();
        }
    },
    methods: {
        initStore() {
            this.store = {
                ...this.store,
                columns: this.columns,
                tableData: this.tableData,
            };
            this.store.columns.forEach(column => {
                column._uid = guid();
                if (typeof column.visible === 'undefined') {
                    column.visible = true;
                }
            })
            this.store.visibleColumns = this.columns.filter(column => column.visible === true);
        },
        handleBodyScroll(event) {
            this.$refs.header.scrollLeft = event.target.scrollLeft;
        }
    },
    created() {
        this.initStore();
    }
}
</script>
