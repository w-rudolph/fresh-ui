export function addClass(el, className) {
    return el.classList.add(className);
}

export function removeClass(el, className) {
    return el.classList.remove(className);
}

export function toggleClass(el, className) {
    return el.classList.toggle(className);
}

export function getStyle(el, attr) {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return window.getComputedStyle(el, null)[attr];
    }
}

export function getScrollbarWidth() {
    const oDiv = document.createElement("div");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    const noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    const scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll - scroll;
}

export function hasScroll(el) {
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

export function getBoundingClientRect(el, absolute = false) {
    let { left, top, width, height } = el.getBoundingClientRect();
    if (absolute) {
        left += window.scrollX;
        top += window.scrollY;
    }
    return { left, top, width, height };
}