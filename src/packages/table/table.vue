<template>
    <div :class="['d-table', stripe ? 'stripe' : '', border ? 'border' : '']">
        <div class="d-table__header-wrapper" ref="header" v-if="showHeader">
            <d-table-head :store="store" :style="{width: store.tableWidth + 'px'}"></d-table-head>
        </div>
        <div class="d-table__body-wrapper" @scroll="handleBodyScroll" ref="body" :style="{height: store.tableHeight + 'px'}">
            <d-table-body v-if="this.store.tableData.length" :store="store" :style="{width: store.tableBodyWidth + 'px'}"></d-table-body>
            <div class="d-table__empty" v-if="!this.store.tableData.length">
                <span class="d-table__empty--text">{{this.store.emptyText}}</span>
            </div>
        </div>
        <div class="d-table__footer-wrapper" ref="footer">
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
import { getScrollbarWidth, hasScroll } from '../utils/dom.js';

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
                columns: [],
                tableData: this.tableData,
                scrollbarWidth: getScrollbarWidth(),
                tableWidth: '',
                tableBodyWidth: '',
                visibleColumns: [],
                columnWidths: [],
                bodyScroll: {
                    vertical: false,
                    horizontal: false
                },
                tableHeight: this.tableHeight,
                emptyText: this.emptyText,
                defaultCellWidth: this.defaultCellWidth,
            }
        }
    },
    watch: {
        columns(v) {
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
            const visibleColumns = columns.filter(column => column.visible === true);
            this.store = {
                ...this.store,
                columns,
                visibleColumns,
            };
        },
        handleBodyScroll(event) {
            if (!this.showHeader) {
                return;
            }
            this.$refs.header.scrollLeft = event.target.scrollLeft;
        },
        setTableWidth() {
            const { bodyScroll, scrollbarWidth, visibleColumns } = this.store;
            const width = this.$el.clientWidth;
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
                const $tr = this.$refs.body.querySelector('tr');
                const columnWidths = [];
                const $tds = $tr.children;
                for (let i = 0; i < $tds.length; i++) {
                    let width = this.columns[i].width;
                    if (!width) {
                        width = $tds[i].offsetWidth;
                    }
                    if (width < this.store.defaultCellWidth) {
                        width = this.store.defaultCellWidth;
                    }
                    columnWidths.push(width)
                }
                this.store = {
                    ...this.store,
                    columnWidths
                }
            });
        },
        setScrollState() {
            const bodyScroll = hasScroll(this.$refs.body);
            this.store.bodyScroll = bodyScroll;
            console.log(JSON.stringify(this.store.bodyScroll))
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
        window.onresize = () => {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(this.setTableWidth, 200)
        }
    }
}
</script>
