export function assert(condition, message = "assertion failed") {
    if (!condition)
        throw Error(message);
    return condition;
}
//# sourceMappingURL=assert.js.map