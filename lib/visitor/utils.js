import { DeclarationStatement, Source, ClassDeclaration, TypeNode, InterfaceDeclaration, FunctionDeclaration, TypeName, NamedTypeNode, util, } from "assemblyscript";
import { ASTBuilder } from "./astBuilder.js";
import cloneDeep from "lodash.clonedeep";
// const cloneDeep: <T>(t: T) => T = require("lodash.clonedeep") as any;
export function decorates(node, name) {
    return decoratorName(node) === name;
}
export function decoratorName(node) {
    return node.name.text;
}
export function isDecorator(name) {
    return (node) => decorates(node, name);
}
export function hasDecorator(node, name) {
    let decl;
    if (node instanceof DeclarationStatement) {
        decl = node;
    }
    else {
        decl = node.declaration;
    }
    // because it could be undefined
    return decl.decorators?.some(isDecorator(name)) == true;
}
export function getDecorator(node, name) {
    return node.decorators?.find(isDecorator(name));
}
export function isLibrary(node) {
    return node.isLibrary || node.internalPath.startsWith("~lib/rt/");
}
export function not(fn) {
    return (t) => !fn(t);
}
export function toString(node) {
    return ASTBuilder.build(node);
}
const OR_NULL = /\|.*null/;
export function getName(node) {
    if (node instanceof TypeNode) {
        if (node instanceof NamedTypeNode) {
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
        else if (node instanceof TypeName) {
            return toString(node.identifier);
        }
        return "";
    }
    if (node instanceof ClassDeclaration ||
        node instanceof InterfaceDeclaration ||
        node instanceof FunctionDeclaration) {
        return className(node);
    }
    return toString(node.name);
}
export function getTypeName(node) {
    const partNames = [];
    let currentNode = node;
    while (currentNode) {
        partNames.push(toString(currentNode.identifier));
        currentNode = currentNode.next;
    }
    return partNames.join(".");
}
export function cloneNode(node) {
    return cloneDeep(node);
}
export function isUserEntry(node) {
    return node.range.source.sourceKind == 1 /* SourceKind.UserEntry */;
}
export function isEntry(node) {
    return (isUserEntry(node) || node.range.source.sourceKind == 3 /* SourceKind.LibraryEntry */);
}
export function className(_class) {
    let name = toString(_class.name);
    const typeParameters = _class.typeParameters;
    if (typeParameters) {
        name += `<${typeParameters.map(getName).join(", ")}>`;
    }
    return name;
}
export function isMethodNamed(name) {
    return (stmt) => stmt.kind == 58 /* NodeKind.MethodDeclaration */ && toString(stmt.name) === name;
}
export function updateSource(program, newSource) {
    const sources = program.sources;
    for (let i = 0, len = sources.length; i < len; i++) {
        if (sources[i].internalPath == newSource.internalPath) {
            sources[i] = newSource;
            break;
        }
    }
}
export class StringBuilder {
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
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have ERROR message
 */
export function hasErrorMessage(emitter) {
    return hasMessage(emitter, 3 /* DiagnosticCategory.Error */);
}
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have WARNING message
 */
export function hasWarningMessage(emitter) {
    return hasMessage(emitter, 2 /* DiagnosticCategory.Warning */);
}
/**
 *
 * @param emitter DiagnosticEmitter
 * @returns return true if emitter have `category` message
 */
export function hasMessage(emitter, category) {
    const diagnostics = emitter.diagnostics ? emitter.diagnostics : [];
    for (const msg of diagnostics) {
        if (msg.category === category) {
            return true;
        }
    }
    return false;
}
let isStdlibRegex = /\~lib\/(?:array|arraybuffer|atomics|builtins|crypto|console|compat|dataview|date|diagnostics|error|function|iterator|map|math|number|object|process|reference|regexp|set|staticarray|string|symbol|table|typedarray|vector|rt\/?|bindings\/|shared\/typeinfo)|util\/|uri|polyfills|memory/;
export function isStdlib(s) {
    let source = s instanceof Source ? s : s.range.source;
    return isStdlibRegex.test(source.internalPath);
}
export const indent = util.indent;
//# sourceMappingURL=utils.js.map