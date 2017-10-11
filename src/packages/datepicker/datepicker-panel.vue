<template>
    <div class="d-datepicker-panel">
        <div class="d-datepicker-pannel__header">
            <span class="left-year-btn" @click="handleYearBtnClick(-1)">
                <d-icon name="ios-arrow-left"></d-icon>
                <d-icon name="ios-arrow-left"></d-icon>
            </span>
            <span class="left-month-btn" @click="handleMonthBtnClick(-1)" v-show="isShowTable('date')">
                <d-icon name="ios-arrow-left"></d-icon>
            </span>
            <span class="year-picker" @click="showPicker('year')">{{getFormatYear(displayYearMonth.year)}}</span>
            <span class="month-picker" @click="showPicker('month')" v-show="isShowTable('date')">{{getFormatMonth(displayYearMonth.month)}}</span>
            <span class="right-year-btn" @click="handleYearBtnClick(1)">
                <d-icon name="ios-arrow-right"></d-icon>
                <d-icon name="ios-arrow-right"></d-icon>
            </span>
            <span class="right-month-btn" @click="handleMonthBtnClick(1)" v-show="isShowTable('date')">
                <d-icon name="ios-arrow-right"></d-icon>
            </span>
        </div>
        <div class="d-datepicker-pannel__body">
            <table class="d-datepicker-table" v-show="isShowTable('date')">
                <thead>
                    <tr>
                        <th v-for="week in weeks" :key="week">{{week}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in displayDays" :key="i">
                        <td v-for="(week, j) in weeks" :key="j" @click="handleCellClick(item[j])" :class="[item[j].class, getComputedClass(item[j])]">{{item[j].day}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="d-datepicker-year-table" v-show="isShowTable('year')">
                <tbody>
                    <tr v-for="(year, i) in displayYears" :key="i">
                        <td v-for="j in 4" :key="j" :class="[year[j - 1].class, getComputedClass(year[j-1], 'year')]" @click="handleYearCellClick(year[j-1])">
                            <span class="cell">{{year[j-1].year}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="d-datepicker-month-table" v-show="isShowTable('month')">
                <tbody>
                    <tr v-for="(month, i) in displayMonths" :key="i">
                        <td v-for="(t, j) in 4" :key="t" :class="['picker-month', getComputedClass({month:4*i+j+1}, 'month')]" @click="handleMonthCellClick(4*i+j+1)">
                            <span class="cell">{{month[j]}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import Calender from '../utils/calender.js';
import DIcon from '../icon/icon';

export default {
    name: 'DDatepickerPanel',
    components: { DIcon },
    props: {
        lang: {
            type: String,
            default: 'zh_cn'
        },
        value: {
            type: [String, Number, Date],
            default: ''
        },
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default() {
                if (this.type === 'date') {
                    return 'yyyy-MM-dd';
                } else if (this.type === 'year') {
                    return 'yyyy';
                } else if (this.type === 'month') {
                    return 'yyyy-MM';
                }
            }
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            currentValue: this.setValue2Date(this.value),
            currentType: this.type
        }
    },
    watch: {
        value(val, oldV) {
            this.setCurrentValue(val);
            this.$emit('change', val, oldV);
        }
    },
    computed: {
        weeks() {
            return Calender.WeekMaps[this.displayLang];
        },
        displayLang() {
            return this.lang;
        },
        displayYearMonth() {
            const { year, month } = Calender.getDateData(this.currentValue);
            return { year, month };
        },
        displayDays() {
            const { year, month } = this.displayYearMonth;
            return Calender.getDisplayDays(year, month);
        },
        displayYears() {
            return Calender.getDisplayYears(this.displayYearMonth.year);
        },
        displayMonths() {
            return Calender.getDisplayMonths(this.lang);
        }
    },
    methods: {
        setValue2Date(value) {
            if (typeof value === 'number') {
                value = value.toString();
            }
            return Calender.convert2Date(value);
        },
        isShowTable(type) {
            return this.currentType === type;
        },
        showPicker(type) {
            this.currentType = type;
        },
        setCurrentValue(value) {
            this.currentValue = this.setValue2Date(value);
        },
        resetData(value) {
            this.currentType = this.type;
            this.currentValue = this.setValue2Date(this.value);
        },
        handleYearBtnClick(diff = -1) {
            if (this.currentType === 'year') {
                diff = diff * 10;
            }
            const date = Calender.getYearDate(new Date(this.currentValue), diff);
            this.setCurrentValue(date);
        },
        handleMonthBtnClick(diff) {
            const date = Calender.getMonthDate(new Date(this.currentValue), diff);
            this.setCurrentValue(date);
        },
        getFormatYear(year) {
            const unit = Calender.YearUnitMaps[this.displayLang];
            const y = year.toString();
            if (['date', 'month'].indexOf(this.currentType) > -1) {
                return year.toString() + unit;
            }
            if (this.currentType === 'year') {
                return y.substr(0, 3) + '0' + unit + ' - ' + y.substr(0, 3) + '9' + unit;
            }
        },
        getFormatMonth(month) {
            return Calender.MonthMaps[this.displayLang][month - 1];
        },
        getComputedClass({ year, month, day }, type = 'date') {
            const { year: y, month: m, day: d } = Calender.getDateData(this.setValue2Date(this.value));
            const { year: ty, month: tm, day: td } = Calender.getDateData(new Date);
            const cls = [];
            if (type === 'year') {
                if (y === year) {
                    cls.push('active');
                }
                if (ty === year) {
                    cls.push('today');
                }
            }
            if (type === 'month') {
                if (m === month) {
                    cls.push('active');
                }
                if (tm === month) {
                    cls.push('today');
                }
            }
            if (type === 'date') {
                if (y === year && m === month && d === day) {
                    cls.push('active');
                }
                if (ty === year && tm === month && td === day) {
                    cls.push('today');
                }
            }
            return cls.join(' ');
        },
        handleCellClick({ year, month, day }) {
            const date = new Date(year, month - 1, day);
            const dateStr = Calender.formatDate(date, this.format);
            this.setCurrentValue(date);
            this.$emit('input', dateStr);
            this.closePanel();
        },
        handleYearCellClick({ year }) {
            const date = new Date(this.currentValue);
            date.setFullYear(year);
            this.setCurrentValue(date);
            const dateStr = Calender.formatDate(date, this.format);
            if (this.type === 'year') {
                this.$emit('input', dateStr);
                this.closePanel();
            } else {
                this.showPicker('month');
            }
        },
        handleMonthCellClick(month) {
            const date = new Date(this.currentValue);
            date.setMonth(month - 1);
            this.setCurrentValue(date);
            const dateStr = Calender.formatDate(date, this.format);
            if (this.type === 'date') {
                this.showPicker('date');
            }
            if (this.type === 'month') {
                this.closePanel();
            }
            this.$emit('input', dateStr);
        },
        closePanel() {
            this.$emit('close-panel');
        }
    },
    created() {
        window.Calender = Calender;
    }
}
</script>
