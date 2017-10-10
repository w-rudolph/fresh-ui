<template>
    <div class="d-datepicker">
        <div class="d-datepicker-panel">
            <div class="d-datepicker-pannel__header">
                <span class="left-year-btn" @click="handleYearClick(-1)">
                    <d-icon name="ios-arrow-left"></d-icon>
                    <d-icon name="ios-arrow-left"></d-icon>
                </span>
                <span class="left-month-btn" @click="handleMonthClick(-1)">
                    <d-icon name="ios-arrow-left"></d-icon>
                </span>
                <span class="year-picker">{{getFormatYear(displayYearMonth.year)}}</span>
                <span class="month-picker">{{getFormatMonth(displayYearMonth.month)}}</span>
                <span class="right-year-btn" @click="handleYearClick(1)">
                    <d-icon name="ios-arrow-right"></d-icon>
                    <d-icon name="ios-arrow-right"></d-icon>
                </span>
                <span class="right-month-btn" @click="handleMonthClick(1)">
                    <d-icon name="ios-arrow-right"></d-icon>
                </span>
            </div>
            <div class="d-datepicker-pannel__body">
                <table class="d-datepicker-table" v-show="showTable('date')">
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
                <table class="d-datepicker-year-table" v-show="showTable('year')">

                </table>
                <table class="d-datepicker-month-table" v-show="showTable('month')">

                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Calender from '../utils/calender.js';

export default {
    name: 'DDatepicker',
    props: {
        lang: {
            type: String,
            default: 'en'
        },
        value: {
            type: [String, Date],
            default: ''
        },
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        }
    },
    data() {
        return {
            currentValue: Calender.convert2Date(this.value),
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
        }
    },
    methods: {
        getYearMonth() {

        },
        showTable(type) {
            return this.currentType === type;
        },
        setCurrentValue(value) {
            this.currentValue = Calender.convert2Date(value);
        },
        handleYearClick(diff) {
            const date = Calender.getYearDate(new Date(this.currentValue), diff);
            this.setCurrentValue(date);
        },
        handleMonthClick(diff) {
            const date = Calender.getMonthDate(new Date(this.currentValue), diff);
            this.setCurrentValue(date);
        },
        getFormatYear(year) {
            return year.toString() + Calender.YearUnitMaps[this.displayLang];
        },
        getFormatMonth(month) {
            return Calender.MonthUnitMaps[this.displayLang][month - 1];
        },
        getComputedClass({ year, month, day }) {
            const { year: y, month: m, day: d } = Calender.getDateData(Calender.convert2Date(this.value));
            const { year: ty, month: tm, day: td } = Calender.getDateData(new Date);
            const cls = [];
            if (y === year && m === month && d === day) {
                cls.push('active');
            }
            if (ty === year && tm === month && td === day) {
                cls.push('today');
            }
            return cls.join(' ');
        },
        handleCellClick({ year, month, day }) {
            const date = new Date(year, month - 1, day);
            const dateStr = Calender.formatDate(date, this.format);
            this.setCurrentValue(date);
            this.$emit('input', dateStr);
        }
    },
    created() {
        window.Calender = Calender;
    }
}
</script>
