export function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

export function getTime() {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
}
