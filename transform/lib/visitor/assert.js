"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
function assert(condition, message = "assertion failed") {
    if (!condition)
        throw Error(message);
    return condition;
}
