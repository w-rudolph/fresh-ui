export function guid() {
    return Math.random().toString(16).substring(2) + (+new Date());
}