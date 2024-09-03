"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeTransform = void 0;
const baseTransform_js_1 = require("./baseTransform.js");
class RangeTransform extends baseTransform_js_1.BaseTransformVisitor {
    node;
    constructor(node) {
        super();
        this.node = node;
    }
    _visit(node) {
        node.range = this.node.range;
        return super._visit(node);
    }
    static visit(node, from) {
        return new RangeTransform(from)._visit(node);
    }
}
exports.RangeTransform = RangeTransform;
