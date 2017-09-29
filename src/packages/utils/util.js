export const deepCopy = data => {
    return JSON.parse(JSON.stringify(data));
}

export const addInt = (a, b) => {
    return parseInt(a || 0) + parseInt(b || 0);
}