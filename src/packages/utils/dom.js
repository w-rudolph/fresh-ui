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

const getScrollbarWidth = function () {
    const oDiv = document.createElement("div");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    const noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    const scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll - scroll;
}

const hasScroll = function (el) {
    const scroll = {
        vertical: false,
        horizontal: false
    };
    if (typeof el === 'undefined') {
        return scroll;
    }
    if (el.scrollHeight > el.clientHeight) {
        scroll.vertical = true;
    }
    if (el.scrollWidth > el.clientWidth) {
        scroll.horizontal = true;
    }
    return scroll;
}

export {
    addClass,
    removeClass,
    toggleClass,
    getStyle,
    getScrollbarWidth,
    hasScroll,
}