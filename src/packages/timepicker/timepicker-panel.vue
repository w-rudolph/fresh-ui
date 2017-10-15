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
import { deepCopy } from '../utils/util.js';
import { scrollTop } from '../utils/dom.js';

export default {
    name: 'DTimepickerPanel',
    props: {
        value: {
            type: Array,
            default() {
                return [0, 0, 0]
            }
        },
        showSeconds: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            current_hours: this.value[0],
            current_minutes: this.value[1],
            current_seconds: this.value[2],
            hoursList: this.getHoursList(),
            minutesList: this.getMinutesList(),
            secondsList: this.getSecondsList(),
        }
    },
    watch: {
        value(val, oldVal) {
            ['hours', 'minutes', 'seconds'].forEach((it, index) => {
                if (val[index] != oldVal[index]) {
                    this.doScroll(it, val[index], true);
                }
            })
            this.$emit('change', val, oldVal);
        },
    },
    methods: {
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
            for (let i = 0; i < len; i++) {
                result.push({
                    value: i,
                    label: i < 10 ? '0' + i : i,
                    active: this.value[index] == i,
                });
            }
            return result;
        },
        handleItemClick(item, type) {
            if (this[`current_${type}`] != item.value) {
                this[`current_${type}`] = item.value;
                this.doScroll(type, item.value);
            }
        },
        doScroll(type, value, first = false) {
            this.$refs[type].scrollTop = (+value) * 24;
            const data = deepCopy(this[`${type}List`]);
            this[`${type}List`] = data.map(it => {
                return {
                    ...it,
                    active: it.value == value
                }
            });
            if (!first) {
                this.$emit('input', [this.current_hours, this.current_minutes, this.current_seconds]);
            }
        },
        updateScroll() {
            this.$nextTick(() => {
                this.doScroll('hours', this.value[0], true);
                this.doScroll('minutes', this.value[1], true);
                this.doScroll('seconds', this.value[2], true);
            })
        }
    },
    mounted() {
        this.updateScroll();
    }
}
</script>
