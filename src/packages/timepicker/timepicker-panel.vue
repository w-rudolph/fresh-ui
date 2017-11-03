<template>
    <div class="d-timepicker-panel">
        <div class="d-timepicker-hours" ref="hours">
            <ul class="d-timepicker__cells">
                <li v-for="item in hoursList" :key="item.value" :class="['d-timepicker__cell', item.active ? 'selected' : '']" @click="handleItemClick(item, 'hours')">{{item.label}}</li>
            </ul>
        </div>
        <div class="d-timepicker-minutes" ref="minutes">
            <ul class="d-timepicker__cells">
                <li v-for="item in minutesList" :key="item.value" :class="['d-timepicker__cell', item.active ? 'selected' : '']" @click="handleItemClick(item, 'minutes')">{{item.label}}</li>
            </ul>
        </div>
        <div class="d-timepicker-seconds" ref="seconds" v-show="showSeconds">
            <ul class="d-timepicker__cells">
                <li v-for="item in secondsList" :key="item.value" :class="['d-timepicker__cell', item.active ? 'selected' : '']" @click="handleItemClick(item, 'seconds')">{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import { deepCopy, isDate } from '../utils/util.js';
import Calender from '../utils/calender.js';

export default {
    name: 'DTimepickerPanel',
    props: {
        value: {
            type: [String, Date],
            default() {
                return '';
            }
        },
        format: {
            type: String,
            default: 'HH:mm:ss'
        }
    },
    data() {
        return {
            currentValue: this.initValue(this.value),
            hoursList: this.getHoursList(),
            minutesList: this.getMinutesList(),
            secondsList: this.getSecondsList(),
        }
    },
    computed: {
        current_hours() {
            return this.currentValue[0];
        },
        current_minutes() {
            return this.currentValue[1];
        },
        current_seconds() {
            return this.currentValue[2];
        },
        full_value() {
            return this.currentValue.join(':');
        },
        showSeconds() {
            return this.format.indexOf('ss') > -1;
        }
    },
    watch: {
        value(val) {
            this.$emit('change', Calender.formatDate(val, this.format));
        },
        currentValue() {
            this.updateScroll();
            this.$emit('input', new Date(Calender.formatDate(new Date, 'yyyy-MM-dd') + ' ' + this.full_value));
        },
    },
    methods: {
        initValue(value) {
            if (isDate(value)) {
                const { hours, minutes, seconds } = Calender.getDateData(value);
                return [hours, minutes, seconds];
            } else if (isDate(new Date(value))) {
                const { hours, minutes, seconds } = Calender.getDateData(new Date(value));
                return [hours, minutes, seconds];
            } else {
                return (value || '::').split(':');
            }
        },
        getHoursList() {
            return this.getIndexArray(24, 0);
        },
        getMinutesList() {
            return this.getIndexArray(60, 1);
        },
        getSecondsList() {
            return this.getIndexArray(60, 2);
        },
        getIndexArray(len, index) {
            const result = [];
            const init = this.initValue(this.value)[index];
            for (let i = 0; i < len; i++) {
                result.push({
                    value: i,
                    label: i < 10 ? '0' + i : i,
                    active: init !== '' && init == i,
                });
            }
            return result;
        },
        handleItemClick(item, type) {
            const idx = ['hours', 'minutes', 'seconds'].indexOf(type);
            const copy = deepCopy(this.currentValue).map(item => item === '' ? '0' : item);
            copy[idx] = item.value;
            this.currentValue = copy;
        },
        doScroll(type, value) {
            this.$refs[type].scrollTop = (+value) * 24;
            const data = deepCopy(this[`${type}List`]);
            this[`${type}List`] = data.map(it => {
                return {
                    ...it,
                    active: it.value == value && value !== ''
                }
            });
        },
        updateScroll() {
            this.$nextTick(() => {
                this.doScroll('hours', this.current_hours);
                this.doScroll('minutes', this.current_minutes);
                this.doScroll('seconds', this.current_seconds);
            })
        }
    },
    mounted() {
        this.updateScroll();
    }
}
</script>
