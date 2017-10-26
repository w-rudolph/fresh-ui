export function deepCopy(data) {
    return JSON.parse(JSON.stringify(data));
}

export function addInt(a, b) {
    return parseInt(a || 0) + parseInt(b || 0);
}

export function extend(a, b) {
    for (let p in b) {
        if (b.hasOwnProperty(p)) {
            a[p] = b[p];
        }
    }
}

export function isType(target, type) {
    //@type: Array, Date, String, Object, Boolean, Number, Function, RegExp, Undefined, Null
    return Object.prototype.toString.call(target) === "[object " + type + "]";
}

export function isString(str) {
    return isType(str, 'String');
};

export function isArray(arr) {
    return isType(arr, 'Array')
};

export function isDate(date) {
    return isType(date, 'Date') && !isNaN(date.valueOf());
}