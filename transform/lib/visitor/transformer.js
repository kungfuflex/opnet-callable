"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformVisitor = exports.PathTransformVisitor = exports.ASTBuilderVisitor = exports.ASTTransformVisitor = void 0;
exports.mergeTransformer = mergeTransformer;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const base_js_1 = require("./base.js");
const transform_js_1 = require("assemblyscript/dist/transform.js");
const astBuilder_js_1 = require("./astBuilder.js");
const path_js_1 = require("./path.js");
const ts_mixer_1 = require("ts-mixer");
const baseTransform_js_1 = require("./baseTransform.js");
class Transform extends transform_js_1.Transform {
}
class ASTTransformVisitor extends (0, ts_mixer_1.Mixin)(base_js_1.BaseVisitor, Transform) {
}
exports.ASTTransformVisitor = ASTTransformVisitor;
class ASTBuilderVisitor extends (0, ts_mixer_1.Mixin)(astBuilder_js_1.ASTBuilder, Transform) {
}
exports.ASTBuilderVisitor = ASTBuilderVisitor;
class PathTransformVisitor extends (0, ts_mixer_1.Mixin)(path_js_1.PathVisitor, Transform) {
}
exports.PathTransformVisitor = PathTransformVisitor;
function mergeTransformer(from, to) {
    // @ts-ignore
    to.program = from.program;
    // @ts-ignore
    to.baseDir = from.baseDir;
    // @ts-ignore
    to.stdout = from.stdout;
    // @ts-ignore
    to.stderr = from.stderr;
    // @ts-ignore
    to.log = from.log;
    to.writeFile = from.writeFile;
    to.readFile = from.readFile;
    to.listFiles = from.listFiles;
}
class TransformVisitor extends (0, ts_mixer_1.Mixin)(baseTransform_js_1.BaseTransformVisitor, Transform) {
}
exports.TransformVisitor = TransformVisitor;
