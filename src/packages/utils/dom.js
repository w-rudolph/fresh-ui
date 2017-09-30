const addClass = function (el, className) {
    return el.classList.add(className);
}

const removeClass = function (el, className) {
    return el.classList.remove(className);
}

const toggleClass = function (el, className) {
    return el.classList.toggle(className);
}

const getStyle = function (el, attr) {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return window.getComputedStyle(el, null)[attr];
    }
}

export {
    addClass,
    removeClass,
    toggleClass,
    getStyle
}