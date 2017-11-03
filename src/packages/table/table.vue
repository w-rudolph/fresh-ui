<template>
    <div :class="['d-table', stripe ? 'stripe' : '', border ? 'border' : '']">
        <div class="d-table__header-wrapper" ref="header" v-if="store.showHeader">
            <d-table-head :store="store" :style="{width: store.tableWidth + 'px'}" :columns="store.visibleColumns" :columnWidths="store.columnWidths"></d-table-head>
        </div>
        <div class="d-table__body-wrapper" @scroll="handleBodyScroll" ref="body" :style="{height: store.tableHeight + 'px'}">
            <d-table-body v-if="this.store.tableData.length" :store="store" :columns="store.visibleColumns" :columnWidths="store.columnWidths" :style="{width: store.tableBodyWidth + 'px'}"></d-table-body>
            <div class="d-table__empty" v-if="!this.store.tableData.length">
                <span class="d-table__empty--text">{{this.store.emptyText}}</span>
            </div>
        </div>
        <div class="d-table__footer-wrapper" ref="footer">
            <d-table-footer :store="store"></d-table-footer>
        </div>
        <div class="d-table__fixed-left-wrapper" v-if="store.leftFixedColumns.length">
            <d-table-fixed :store="store" ref="fixedLeft"></d-table-fixed>
        </div>
        <div class="d-table__fixed-right-wrapper" v-if="store.rightFixedColumns.length">
            <d-table-fixed :store="store" direction="right" ref="fixedRight"></d-table-fixed>
        </div>
    </div>
</template>
<script>
import DTableHead from './table-head.vue';
import DTableBody from './table-body.vue';
import DTableFooter from './table-footer.vue';
import DTableFixed from './table-fixed.vue';
import { guid } from '../utils/guid.js';
import { deepCopy } from '../utils/util.js';
import { getScrollbarWidth, hasScroll } from '../utils/dom.js';
import EventEmitter from '../mixins/event_emitter.js';

export default {
    name: 'DTable',
    mixins: [EventEmitter],
    components: { DTableHead, DTableBody, DTableFooter, DTableFixed },
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
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            store: {
                stripe: this.stripe,
                columns: [],
                tableData: deepCopy(this.tableData),
                showHeader: this.showHeader,
                scrollbarWidth: getScrollbarWidth(),
                tableWidth: '',
                tableBodyWidth: '',
                notFixedColumns: [],
                visibleColumns: [],
                rVisibleColumns: [],
                leftFixedColumns: [],
                rightFixedColumns: [],
                columnWidths: [],
                bodyScroll: {
                    vertical: false,
                    horizontal: false
                },
                tableHeight: this.tableHeight,
                emptyText: this.emptyText,
                defaultCellWidth: this.defaultCellWidth,
                selectAll: false,
            },
            timer: null,
        }
    },
    watch: {
        columns() {
            this.initStore();
            this.$nextTick(this.setTableWidth);
        },
        tableData() {
            this.initStore();
        }
    },
    methods: {
        initStore() {
            const columns = this.columns.map(column => {
                return {
                    ...column,
                    _uid: guid(),
                    visible: column.visible === undefined ? true : column.visible
                }
            })
            const notFixedColumns = columns.filter(column => column.visible === true && !column.fixed);
            const leftFixedColumns = columns.filter(column => column.fixed && column.fixed === 'left');
            const rightFixedColumns = columns.filter(column => column.fixed && column.fixed === 'right');
            const visibleColumns = leftFixedColumns.concat(notFixedColumns, rightFixedColumns);
            const rVisibleColumns = rightFixedColumns.concat(notFixedColumns, leftFixedColumns);
            let tableData = this.store.tableData;
            if (columns.find(column => column.type === 'selection')) {
                tableData = tableData.map(data => {
                    return {
                        ...data,
                        checked: data.checked ? data.checked : false
                    };
                })
            }
            if (columns.find(column => column.type === 'expand')) {
                tableData = tableData.map(data => {
                    return {
                        ...data,
                        expand: data.expand ? data.expand : false
                    };
                })
            }
            this.store = {
                ...this.store,
                tableData,
                columns,
                notFixedColumns,
                visibleColumns,
                rVisibleColumns,
                leftFixedColumns,
                rightFixedColumns
            };
        },
        handleBodyScroll(event) {
            if (this.store.leftFixedColumns.length) {
                this.$refs.fixedLeft.doScroll(event.target.scrollTop);
            }
            if (this.store.rightFixedColumns.length) {
                this.$refs.fixedRight.doScroll(event.target.scrollTop);

            }
            if (!this.showHeader) {
                return;
            }
            this.$refs.header.scrollLeft = event.target.scrollLeft;
        },
        getAjuastWidth(width) {
            return width < this.store.defaultCellWidth ? this.store.defaultCellWidth : width;
        },
        setTableWidth() {
            const { bodyScroll, scrollbarWidth, columns } = this.store;
            let width;
            if (columns.filter(column => column.width).length === columns.length) {
                width = columns.map(column => column.width).reduce((a, b) => a + b, 0);
            } else {
                width = this.$el.clientWidth;
            }
            this.store = {
                ...this.store,
                tableWidth: width,
                columnWidths: [],
                tableBodyWidth: bodyScroll.vertical ? width - scrollbarWidth : width,
            };
            this.$nextTick(() => {
                if (!this.store.tableData.length) {
                    return;
                }
                const columnWidths = [];
                const length = this.columns.length;
                const columnsWithWidth = this.columns.filter(column => column.width);
                const rest = length - columnsWithWidth.length;
                const countWidth = columnsWithWidth.map(column => this.getAjuastWidth(column.width)).reduce((a, b) => a + b, 0);
                for (let i = 0; i < length; i++) {
                    let width = this.columns[i].width;
                    if (!width && rest) {
                        width = Math.floor((this.store.tableBodyWidth - countWidth) / rest);
                    }
                    width = this.getAjuastWidth(width);
                    if (i === length - 1 && bodyScroll.vertical) {
                        width += this.store.scrollbarWidth;
                    }
                    columnWidths.push(width);
                }
                this.store = {
                    ...this.store,
                    columnWidths
                };
                this.$nextTick(() => {
                    this.setScrollState();
                })
            });
        },
        setScrollState() {
            const bodyScroll = hasScroll(this.$refs.body);
            this.store.bodyScroll = bodyScroll;
        },
        handleSelectAll() {
            const { tableData, selectAll } = this.store;
            const selectedRows = tableData.filter(data => data.checked === true);
            this.store = {
                ...this.store,
                tableData: tableData.map(row => {
                    return {
                        ...row,
                        checked: selectAll ? true : (selectedRows.length === tableData.length) ? false : row.checked
                    }
                })
            };
        },
        handleSelectRows() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            const selectedRows = this.store.tableData.filter(data => data.checked === true);
            if (selectedRows.length !== this.store.tableData.length && this.store.selectAll) {
                this.store = {
                    ...this.store,
                    selectAll: false
                };
            }
            if (selectedRows.length === this.store.tableData.length && !this.store.selectAll) {
                this.store = {
                    ...this.store,
                    selectAll: true
                };
            }

            this.timer = setTimeout(() => {

                this.$emit('selection-change',
                    deepCopy(this.store.tableData.filter(data => data.checked === true).map(row => {
                        return {
                            ...row,
                            expand: undefined,
                            checked: undefined
                        }
                    })));
            }, 200);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setScrollState();
            this.setTableWidth();
        })
        window.EL = this.$refs.body;
    },
    created() {
        this.initStore();
        window.addEventListener('resize', () => {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(this.setTableWidth, 200)
        });
        this.subscribe('table.row.hover', data => {
            this.broadcast('DTableBody', 'table.row.hover', data);
        })
        this.subscribe('table.row.select', row => this.handleSelectRows(row));
        this.subscribe('table.row.selectAll', this.handleSelectAll)
    }
}
</script>
