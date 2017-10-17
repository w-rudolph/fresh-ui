export const deepCopy = data => {
    return JSON.parse(JSON.stringify(data));
}

export const addInt = (a, b) => {
    return parseInt(a || 0) + parseInt(b || 0);
}

export const extend = (a, b) => {
    for (let p in b) {
        if (b.hasOwnProperty(p)) {
            a[p] = b[p];
        }
    }
}

export const isType = (target, type) => {
    //@type: Array, Date, String, Object, Boolean, Number, Function, RegExp, Undefined, Null
    return Object.prototype.toString.call(target) === "[object " + type + "]";
}

export const isString = str => isType(str, 'String');

export const isArray = arr => isType(arr, 'Array');

export const isDate = date => isType(date, 'Date') && !isNaN(date.valueOf());