const addClass = function (el, className) {
    return el.classList.add(className);
}

const removeClass = function (el, className) {
    return el.classList.remove(className);
}

const toggleClass = function (el, className) {
    return el.classList.toggle(className);
}

export {
    addClass,
    removeClass,
    toggleClass
}