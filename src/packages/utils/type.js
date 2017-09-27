export function isType(target, type) {
    //@type: Array, String, Object, Boolean, Number, Function, RegExp, Undefined, Null
    return Object.prototype.toString.call(target) === "[object " + type + "]";
}

export function isArray(arr) {
    return isType(arr, 'Array');
}

export function isString(str) {
    return typeof str === 'string';
}