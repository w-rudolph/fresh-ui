<template>
    <div class="d-pagination">
        <span class="d-pagination__count" v-show="showTotal">共 {{total}} 条</span>
        <span class="d-pagination__sizer" v-show="showSizer">
            <d-select :value="currentPageSize" @change="haleSelectChange">
                <d-select-option v-for="size in pageSizes" :key="size" :value="size">{{size}} 条/页</d-select-option>
            </d-select>
            <span> 条/页 </span>
        </span>
        <ul class="d-pagination__pager">
            <li :class="['d-pager-item prev-control', !prevClickable ? 'disabled' : '']" @click="handleControlClick(-1, prevClickable)">
                <d-icon name="ios-arrow-left"></d-icon>
            </li>
            <li v-for="page in displayPages" :key="page.num" :class="['d-pager-item', currentPageValue === page.num ? 'active' : '']" @click="handlePageClick(page)">
                <span v-if="page.moreType === 1" class="d-pager-item__more prev"></span>
                <span v-if="page.moreType === 0">{{page.num}}</span>
                <span v-if="page.moreType === -1" class="d-pager-item__more next"></span>
            </li>
            <li :class="['d-pager-item next-control', !nextClickable ? 'disabled' : '']" @click="handleControlClick(1, nextClickable)">
                <d-icon name="ios-arrow-right"></d-icon>
            </li>
        </ul>
        <span class="d-pagination__jumper" v-show="showJumper">
            <span>前往</span><input type="text" ref="jumper" @keyup.enter="handleKeyEnter" class="jumper-input">
            <span>页</span>
        </span>
    </div>
</template>
<script>
import DIcon from '../icon/icon.vue';

export default {
    name: "DPagination",
    components: { DIcon },
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 30, 40]
            }
        },
        total: {
            type: Number,
            default: 0
        },
        currentPage: {
            type: Number,
            default: 0
        },
        showTotal: {
            type: Boolean,
            default: false
        },
        showSizer: {
            type: Boolean,
            default: false
        },
        showJumper: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            pageStart: 1,
            currentPageSize: this.pageSize,
            currentPageValue: this.currentPage
        }
    },
    watch: {
        currentPage(val) {
            this.setCurrentPageValue(val);
        }
    },
    computed: {
        pageCount() {
            return Math.floor(this.total / this.currentPageSize);
        },
        prevClickable() {
            return !!this.pageCount && this.currentPageValue > 1;
        },
        nextClickable() {
            return !!this.pageCount && this.currentPageValue < this.pageCount;
        },
        showPrevMore() {
            return !!this.pageCount && this.currentPageValue >= this.pageStart + 4;
        },
        showNextMore() {
            return this.pageCount - this.currentPageValue >= 4;
        },
        displayPages() {
            if (this.pageCount < this.pageStart) {
                return [];
            }
            let res = [];
            this.addDisplayPage(res, this.pageStart);
            this.addDisplayPage(res, this.pageCount);
            this.addDisplayPage(res, this.currentPageValue);

            let left = this.currentPageValue - this.pageStart, right = this.pageCount - this.currentPageValue;
            if (this.showPrevMore && !this.showNextMore) {
                left = 5 - right;
            }
            if (!this.showPrevMore && this.showNextMore) {
                right = 5 - left;
            }
            if (this.showPrevMore && this.showNextMore) {
                left = right = 2;
            }

            for (let i = 0; i < left; i++) {
                if (this.currentPageValue - i - 1 > this.pageStart) {
                    this.addDisplayPage(res, this.currentPageValue - i - 1);
                }
            }
            for (let i = 0; i < right; i++) {
                if (this.currentPageValue + i + 1 < this.pageCount) {
                    this.addDisplayPage(res, this.currentPageValue + i + 1);
                }
            }

            res = res.map(page => ({ num: page, moreType: 0 }));
            if (this.showPrevMore) {
                res.push({ num: 1 + 0.5, moreType: 1 })
            }
            if (this.showNextMore) {
                res.push({ num: this.pageCount - 0.5, moreType: -1 });
            }
            return res.sort((a, b) => a.num - b.num);
        }
    },
    methods: {
        addDisplayPage(displayPages, page) {
            if (displayPages.indexOf(page) === -1) {
                displayPages.push(page);
            }
        },
        setCurrentPageValue(value) {
            if (!this.pageCount) {
                return;
            }
            if (value < this.pageStart) {
                value = this.pageStart;
            }
            if (value > this.pageCount) {
                value = this.pageCount;
            }
            if (this.currentPageValue !== value) {
                this.$emit('current-change', value);
            }
            this.currentPageValue = value;
            this.$emit('input', value);
            this.$refs.jumper.value = value || '';
        },
        handlePageClick(page) {
            if (this.currentPageValue === page.num) {
                return;
            }
            if (page.moreType === 0) {
                this.setCurrentPageValue(page.num);
            } else {
                this.setCurrentPageValue(this.currentPageValue - page.moreType * 5);
            }
        },
        handleControlClick(diff, clickable) {
            if (!clickable) {
                return;
            }
            this.setCurrentPageValue(this.currentPageValue + diff);
        },
        handleKeyEnter(e) {
            this.setCurrentPageValue(parseInt(e.target.value) || 1);
        },
        haleSelectChange(size) {
            this.currentPageSize = size;
            this.$emit('size-change', size);
        }
    }
}
</script>
