"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indent = exports.StringBuilder = void 0;
exports.decorates = decorates;
exports.decoratorName = decoratorName;
exports.isDecorator = isDecorator;
exports.hasDecorator = hasDecorator;
exports.getDecorator = getDecorator;
exports.isLibrary = isLibrary;
exports.not = not;
exports.toString = toString;
exports.getName = getName;
exports.getTypeName = getTypeName;
exports.cloneNode = cloneNode;
exports.isUserEntry = isUserEntry;
exports.isEntry = isEntry;
exports.className = className;
exports.isMethodNamed = isMethodNamed;
exports.updateSource = updateSource;
exports.hasErrorMessage = hasErrorMessage;
exports.hasWarningMessage = hasWarningMessage;
exports.hasMessage = hasMessage;
exports.isStdlib = isStdlib;
const assemblyscript_js_1 = require("assemblyscript/dist/assemblyscript.js");
const astBuilder_js_1 = require("./astBuilder.js");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
// const cloneDeep: <T>(t: T) => T = require("lodash.clonedeep") as any;
function decorates(node, name) {
    return decoratorName(node) === name;
}
function decoratorName(node) {
    return node.name.text;
}
function isDecorator(name) {
    return (node) => decorates(node, name);
}
function hasDecorator(node, name) {
    let decl;
    if (node instanceof assemblyscript_js_1.DeclarationStatement) {
        decl = node;
    }
    else {
        decl = node.declaration;
    }
    // because it could be undefined
    return decl.decorators?.some(isDecorator(name)) == true;
}
function getDecorator(node, name) {
    return node.decorators?.find(isDecorator(name));
}
function isLibrary(node) {
    return node.isLibrary || node.internalPath.startsWith("~lib/rt/");
}
function not(fn) {
    return (t) => !fn(t);
}
function toString(node) {
    return astBuilder_js_1.ASTBuilder.build(node);
}
const OR_NULL = /\|.*null/;
function getName(node) {
    if (node instanceof assemblyscript_js_1.TypeNode) {
        if (node instanceof assemblyscript_js_1.NamedTypeNode) {
            let name = getTypeName(node.name);
            const typeParameters = node.typeArguments;
            if (typeParameters && typeParameters.length > 0) {
                name += `<${typeParameters.map(getName).join(", ")}>`;
            }
            if (node.isNullable && !OR_NULL.test(name)) {
                name = `${name} | null`;
            }
            return name;
        }
        else if (node instanceof assemblyscript_js_1.TypeName) {
            return toString(node.identifier);
        }
        return "";
    }
    if (node instanceof assemblyscript_js_1.ClassDeclaration ||
        node instanceof assemblyscript_js_1.InterfaceDeclaration ||
        node instanceof assemblyscript_js_1.FunctionDeclaration) {
        return className(node);
    }
    return toString(node.name);
}
function getTypeName(node) {
    const partNames = [];
    let currentNode = node;
    while (currentNode) {
        partNames.push(toString(currentNode.identifier));
        currentNode = currentNode.next;
    }
    return partNames.join(".");
}
function cloneNode(node) {
    return (0, lodash_clonedeep_1.default)(node);
}
function isUserEntry(node) {
    return node.range.source.sourceKind == 1 /* SourceKind.UserEntry */;
}
function isEntry(node) {
    return (isUserEntry(node) || node.range.source.sourceKind == 3 /* SourceKind.LibraryEntry */);
}
function className(_class) {
    let name = toString(_class.name);
    const typeParameters = _class.typeParameters;
    if (typeParameters) {
        name += `<${typeParameters.map(getName).join(", ")}>`;
    }
    return name;
}
function isMethodNamed(name) {
    return (stmt) => stmt.kind == 58 /* NodeKind.MethodDeclaration */ && toString(stmt.name) === name;
}
function updateSource(program, newSource) {
    const sources = program.sources;
    for (let i = 0, len = sources.length; i < len; i++) {
        if (sources[i].internalPath == newSource.internalPath) {
            sources[i] = newSource;
            break;
        }
    }
}
class StringBuilder {
    sb = [];
    push(s) {
        this.sb.push(s);
    }
    finish(separator = "\n") {
        let res = this.sb.join(separator);
        this.sb = [];
        return res;
    }
    get last() {
        return this.sb[this.sb.length - 1];
    }
}
exports.StringBuilder = StringBuilder;
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have ERROR message
 */
function hasErrorMessage(emitter) {
    return hasMessage(emitter, 3 /* DiagnosticCategory.Error */);
}
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have WARNING message
 */
function hasWarningMessage(emitter) {
    return hasMessage(emitter, 2 /* DiagnosticCategory.Warning */);
}
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have `category` message
 */
function hasMessage(emitter, category) {
    const diagnostics = emitter.diagnostics ? emitter.diagnostics : [];
    for (const msg of diagnostics) {
        if (msg.category === category) {
            return true;
        }
    }
    return false;
}
let isStdlibRegex = /\~lib\/(?:array|arraybuffer|atomics|builtins|crypto|console|compat|dataview|date|diagnostics|error|function|iterator|map|math|number|object|process|reference|regexp|set|staticarray|string|symbol|table|typedarray|vector|rt\/?|bindings\/|shared\/typeinfo)|util\/|uri|polyfills|memory/;
function isStdlib(s) {
    let source = s instanceof assemblyscript_js_1.Source ? s : s.range.source;
    return isStdlibRegex.test(source.internalPath);
}
exports.indent = assemblyscript_js_1.util.indent;
