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