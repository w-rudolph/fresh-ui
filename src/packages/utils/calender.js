export default class Calender {
    static WeekMaps = {
        'en': ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        'zh_cn': ['日', '一', '二', '三', '四', '五', '六']
    }

    static MonthUnitMaps = {
        'en': ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'zh_cn': ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']
    }

    static YearUnitMaps = {
        'en': '',
        'zh_cn': ' 年'
    }

    static convert2Date(value) {
        let date = new Date();
        if (Calender.isDate(value)) {
            date = value;
        }
        if (Calender.isDateString(value)) {
            date = new Date(value)
        }
        return date;
    }

    static isDate(date) {
        return Object.prototype.toString.call(date) === "[object Date]";
    }

    static isDateString(dateStr) {
        const dateStamp = (new Date(dateStr)).valueOf();
        return typeof dateStr === 'string' && dateStamp === dateStamp
    }

    static getCurrentDate() {
        let now = new Date();
        const dateData = Calender.getDateData(now)
        now = null;
        return dateData;
    }

    static getDateData(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            week: date.getDay(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            millSeconds: date.getMilliseconds(),
            timestamp: date.getTime()
        };
    }

    static getDaysOfMonth(year, month) {
        let date = new Date(year, month, 0);
        const days = date.getDate();
        date = null;
        return days;
    }

    static getWeek(date, lang = 'en') {
        return Calender.WeekMaps[lang][date.getDay()];
    }

    static getMonthDate(date, diff = 0) {
        date.setMonth(date.getMonth() + diff);
        return date;
    }
    static getYearDate(date, diff = 0) {
        date.setFullYear(date.getFullYear() + diff);
        return date;
    }

    static getMonthWeek(year, month) {
        const days = Calender.getDaysOfMonth(year, month)
        return [new Date(year, month - 1, 1).getDay(), new Date(year, month - 1, days).getDay()];
    }

    static getSomeDaysofMonth(date, num, type = 'first') {
        const { year, month } = Calender.getDateData(date);
        const Days = Calender.makeIndexArray(Calender.getDaysOfMonth(year, month));
        if (type === 'first') {
            return Days.slice(0, num)
        } else {
            return Days.slice(-num);
        }
    }

    static getDisplayDays(year, month) {
        const dayArray = Calender.makeIndexArray(Calender.getDaysOfMonth(year, month));
        const days = dayArray.map(day => ({ year, month, day, class: 'current-month' }));
        const [firstDayWeek, lastDayWeek] = Calender.getMonthWeek(year, month);

        const preDate = Calender.getMonthDate(new Date(year, month - 1, 1), -1);
        const nextDate = Calender.getMonthDate(new Date(year, month - 1, 1), 1);

        const prevDays = Calender.getSomeDaysofMonth(preDate, firstDayWeek === 0 ? 7 : firstDayWeek, 'last')
            .map(day => ({ year: preDate.getFullYear(), month: preDate.getMonth() + 1, day, class: 'prev-month' }));

        const nextDays = Calender.getSomeDaysofMonth(nextDate, 6 * 7 - days.length - prevDays.length)
            .map(day => ({ year: nextDate.getFullYear(), month: nextDate.getMonth() + 1, day, class: 'next-month' }));

        const total = prevDays.concat(days, nextDays);
        const result = [];
        while (total.length) {
            result.push(total.splice(0, 7));
        }
        return result;
    }

    static isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

    static formatDate(date, fmt = 'yyyy-MM-dd') {
        const { year, month, day, hours, minutes, seconds, millSeconds } = Calender.getDateData(date);
        const o = {
            'M+': month,
            'd+': day,
            'h+': hours,
            'm+': minutes,
            's+': seconds,
            'S': millSeconds
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, year.toString().substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    static makeIndexArray(num) {
        if (num < 0) {
            return []
        }
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(i + 1);
        }
        return arr;
    }
}