"use strict";
// tslint:disable: as-internal-case
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASTBuilder = void 0;
const assemblyscript_js_1 = require("assemblyscript/dist/assemblyscript.js");
const base_js_1 = require("./base.js");
const utils_js_1 = require("./utils.js");
const assert_js_1 = require("./assert.js");
// declare function i64_to_string(i: I64): string;
// import { i64_to_string } from "../../../src/glue/i64"
/** An AST builder. */
class ASTBuilder extends base_js_1.BaseVisitor {
    _visit(node) {
        this.visitNode(node);
    }
    /** Rebuilds the textual source from the specified AST, as far as possible. */
    static build(node) {
        var builder = new ASTBuilder();
        builder.visitNode(node);
        return builder.finish();
    }
    sb = [];
    indentLevel = 0;
    visitNode(node) {
        switch (node.kind) {
            case 0 /* NodeKind.Source */: {
                this.visitSource(node);
                break;
            }
            // types
            case 1 /* NodeKind.NamedType */: {
                this.visitNamedTypeNode(node);
                break;
            }
            case 2 /* NodeKind.FunctionType */: {
                this.visitFunctionTypeNode(node);
                break;
            }
            case 4 /* NodeKind.TypeParameter */: {
                this.visitTypeParameter(node);
                break;
            }
            // expressions
            case 13 /* NodeKind.False */:
            case 18 /* NodeKind.Null */:
            case 23 /* NodeKind.Super */:
            case 24 /* NodeKind.This */:
            case 25 /* NodeKind.True */:
            case 26 /* NodeKind.Constructor */:
            case 6 /* NodeKind.Identifier */: {
                this.visitIdentifierExpression(node);
                break;
            }
            case 7 /* NodeKind.Assertion */: {
                this.visitAssertionExpression(node);
                break;
            }
            case 8 /* NodeKind.Binary */: {
                this.visitBinaryExpression(node);
                break;
            }
            case 9 /* NodeKind.Call */: {
                this.visitCallExpression(node);
                break;
            }
            case 10 /* NodeKind.Class */: {
                this.visitClassExpression(node);
                break;
            }
            case 11 /* NodeKind.Comma */: {
                this.visitCommaExpression(node);
                break;
            }
            case 12 /* NodeKind.ElementAccess */: {
                this.visitElementAccessExpression(node);
                break;
            }
            case 14 /* NodeKind.Function */: {
                this.visitFunctionExpression(node);
                break;
            }
            case 15 /* NodeKind.InstanceOf */: {
                this.visitInstanceOfExpression(node);
                break;
            }
            case 16 /* NodeKind.Literal */: {
                this.visitLiteralExpression(node);
                break;
            }
            case 17 /* NodeKind.New */: {
                this.visitNewExpression(node);
                break;
            }
            case 20 /* NodeKind.Parenthesized */: {
                this.visitParenthesizedExpression(node);
                break;
            }
            case 21 /* NodeKind.PropertyAccess */: {
                this.visitPropertyAccessExpression(node);
                break;
            }
            case 22 /* NodeKind.Ternary */: {
                this.visitTernaryExpression(node);
                break;
            }
            case 27 /* NodeKind.UnaryPostfix */: {
                this.visitUnaryPostfixExpression(node);
                break;
            }
            case 28 /* NodeKind.UnaryPrefix */: {
                this.visitUnaryPrefixExpression(node);
                break;
            }
            // statements
            case 30 /* NodeKind.Block */: {
                this.visitBlockStatement(node);
                break;
            }
            case 31 /* NodeKind.Break */: {
                this.visitBreakStatement(node);
                break;
            }
            case 32 /* NodeKind.Continue */: {
                this.visitContinueStatement(node);
                break;
            }
            case 33 /* NodeKind.Do */: {
                this.visitDoStatement(node);
                break;
            }
            case 34 /* NodeKind.Empty */: {
                this.visitEmptyStatement(node);
                break;
            }
            case 35 /* NodeKind.Export */: {
                this.visitExportStatement(node);
                break;
            }
            case 36 /* NodeKind.ExportDefault */: {
                this.visitExportDefaultStatement(node);
                break;
            }
            case 37 /* NodeKind.ExportImport */: {
                this.visitExportImportStatement(node);
                break;
            }
            case 38 /* NodeKind.Expression */: {
                this.visitExpressionStatement(node);
                break;
            }
            case 39 /* NodeKind.For */: {
                this.visitForStatement(node);
                break;
            }
            case 40 /* NodeKind.ForOf */: {
                this.visitForOfStatement(node);
                break;
            }
            case 41 /* NodeKind.If */: {
                this.visitIfStatement(node);
                break;
            }
            case 42 /* NodeKind.Import */: {
                this.visitImportStatement(node);
                break;
            }
            case 43 /* NodeKind.Return */: {
                this.visitReturnStatement(node);
                break;
            }
            case 44 /* NodeKind.Switch */: {
                this.visitSwitchStatement(node);
                break;
            }
            case 45 /* NodeKind.Throw */: {
                this.visitThrowStatement(node);
                break;
            }
            case 46 /* NodeKind.Try */: {
                this.visitTryStatement(node);
                break;
            }
            case 47 /* NodeKind.Variable */: {
                this.visitVariableStatement(node);
                break;
            }
            case 49 /* NodeKind.While */: {
                this.visitWhileStatement(node);
                break;
            }
            // declaration statements
            case 51 /* NodeKind.ClassDeclaration */: {
                this.visitClassDeclaration(node);
                break;
            }
            case 52 /* NodeKind.EnumDeclaration */: {
                this.visitEnumDeclaration(node);
                break;
            }
            case 53 /* NodeKind.EnumValueDeclaration */: {
                this.visitEnumValueDeclaration(node);
                break;
            }
            case 54 /* NodeKind.FieldDeclaration */: {
                this.visitFieldDeclaration(node);
                break;
            }
            case 55 /* NodeKind.FunctionDeclaration */: {
                this.visitFunctionDeclaration(node);
                break;
            }
            case 56 /* NodeKind.ImportDeclaration */: {
                this.visitImportDeclaration(node);
                break;
            }
            case 57 /* NodeKind.InterfaceDeclaration */: {
                this.visitInterfaceDeclaration(node);
                break;
            }
            case 58 /* NodeKind.MethodDeclaration */: {
                this.visitMethodDeclaration(node);
                break;
            }
            case 59 /* NodeKind.NamespaceDeclaration */: {
                this.visitNamespaceDeclaration(node);
                break;
            }
            case 60 /* NodeKind.TypeDeclaration */: {
                this.visitTypeDeclaration(node);
                break;
            }
            case 61 /* NodeKind.VariableDeclaration */: {
                this.visitVariableDeclaration(node);
                break;
            }
            // other
            case 62 /* NodeKind.Decorator */: {
                this.serializeDecorator(node);
                break;
            }
            case 63 /* NodeKind.ExportMember */: {
                this.visitExportMember(node);
                break;
            }
            case 5 /* NodeKind.Parameter */: {
                this.serializeParameter(node);
                break;
            }
            case 64 /* NodeKind.SwitchCase */: {
                this.visitSwitchCase(node);
                break;
            }
            case 65 /* NodeKind.IndexSignature */: {
                this.visitIndexSignature(node);
                break;
            }
            default:
                (0, assert_js_1.assert)(false, node.kind.toString());
        }
    }
    visitSource(source) {
        var statements = source.statements;
        for (let i = 0, k = statements.length; i < k; ++i) {
            this.visitNodeAndTerminate(statements[i]);
        }
    }
    // types
    visitTypeNode(node) {
        switch (node.kind) {
            case 1 /* NodeKind.NamedType */: {
                this.visitNamedTypeNode(node);
                break;
            }
            case 2 /* NodeKind.FunctionType */: {
                this.visitFunctionTypeNode(node);
                break;
            }
            default:
                (0, assert_js_1.assert)(false);
        }
    }
    visitTypeName(node) {
        this.visitIdentifierExpression(node.identifier);
        var sb = this.sb;
        var current = node.next;
        while (current) {
            sb.push(".");
            this.visitIdentifierExpression(current.identifier);
            current = current.next;
        }
    }
    visitNamedTypeNode(node) {
        this.visitTypeName(node.name);
        var typeArguments = node.typeArguments;
        if (typeArguments) {
            let numTypeArguments = typeArguments.length;
            let sb = this.sb;
            if (numTypeArguments) {
                sb.push("<");
                this.visitTypeNode(typeArguments[0]);
                for (let i = 1; i < numTypeArguments; ++i) {
                    sb.push(", ");
                    this.visitTypeNode(typeArguments[i]);
                }
                sb.push(">");
            }
            if (node.isNullable)
                sb.push(" | null");
        }
    }
    visitFunctionTypeNode(node) {
        var isNullable = node.isNullable;
        var sb = this.sb;
        sb.push(isNullable ? "((" : "(");
        var explicitThisType = node.explicitThisType;
        if (explicitThisType) {
            sb.push("this: ");
            this.visitTypeNode(explicitThisType);
        }
        var parameters = node.parameters;
        var numParameters = parameters.length;
        if (numParameters) {
            if (explicitThisType)
                sb.push(", ");
            this.serializeParameter(parameters[0]);
            for (let i = 1; i < numParameters; ++i) {
                sb.push(", ");
                this.serializeParameter(parameters[i]);
            }
        }
        var returnType = node.returnType;
        if (returnType) {
            sb.push(") => ");
            this.visitTypeNode(returnType);
        }
        else {
            sb.push(") => void");
        }
        if (isNullable)
            sb.push(") | null");
    }
    visitTypeParameter(node) {
        this.visitIdentifierExpression(node.name);
        var extendsType = node.extendsType;
        if (extendsType) {
            this.sb.push(" extends ");
            this.visitTypeNode(extendsType);
        }
        var defaultType = node.defaultType;
        if (defaultType) {
            this.sb.push("=");
            this.visitTypeNode(defaultType);
        }
    }
    // expressions
    visitIdentifierExpression(node) {
        if (node.isQuoted)
            this.visitStringLiteral(node.text);
        else
            this.sb.push(node.text);
    }
    visitArrayLiteralExpression(node) {
        var sb = this.sb;
        sb.push("[");
        var elements = node.elementExpressions;
        var numElements = elements.length;
        if (numElements) {
            let element = elements[0];
            if (element)
                this.visitNode(element);
            for (let i = 1; i < numElements; ++i) {
                element = elements[i];
                sb.push(", ");
                if (element)
                    this.visitNode(element);
            }
        }
        sb.push("]");
    }
    visitObjectLiteralExpression(node) {
        var sb = this.sb;
        var names = node.names;
        var values = node.values;
        var numElements = names.length;
        (0, assert_js_1.assert)(numElements == values.length);
        if (numElements) {
            sb.push("{\n");
            (0, utils_js_1.indent)(sb, ++this.indentLevel);
            this.visitNode(names[0]);
            sb.push(": ");
            this.visitNode(values[0]);
            for (let i = 1; i < numElements; ++i) {
                sb.push(",\n");
                (0, utils_js_1.indent)(sb, this.indentLevel);
                let name = names[i];
                let value = values[i];
                if (name === value) {
                    this.visitNode(name);
                }
                else {
                    this.visitNode(name);
                    sb.push(": ");
                    this.visitNode(value);
                }
            }
            sb.push("\n");
            (0, utils_js_1.indent)(sb, --this.indentLevel);
            sb.push("}");
        }
        else {
            sb.push("{}");
        }
    }
    visitAssertionExpression(node) {
        var sb = this.sb;
        switch (node.assertionKind) {
            case 0 /* AssertionKind.Prefix */: {
                sb.push("<");
                this.visitTypeNode((0, assert_js_1.assert)(node.toType));
                sb.push(">");
                this.visitNode(node.expression);
                break;
            }
            case 1 /* AssertionKind.As */: {
                this.visitNode(node.expression);
                sb.push(" as ");
                this.visitTypeNode((0, assert_js_1.assert)(node.toType));
                break;
            }
            case 2 /* AssertionKind.NonNull */: {
                this.visitNode(node.expression);
                sb.push("!");
                break;
            }
            case 3 /* AssertionKind.Const */: {
                this.visitNode(node.expression);
                sb.push(" as const");
                break;
            }
            default:
                (0, assert_js_1.assert)(false);
        }
    }
    visitBinaryExpression(node) {
        var sb = this.sb;
        this.visitNode(node.left);
        sb.push(" ");
        sb.push((0, assemblyscript_js_1.operatorTokenToString)(node.operator));
        sb.push(" ");
        this.visitNode(node.right);
    }
    visitCallExpression(node) {
        this.visitNode(node.expression);
        this.visitArguments(node.typeArguments, node.args);
    }
    visitArguments(typeArguments, args) {
        var sb = this.sb;
        if (typeArguments) {
            let numTypeArguments = typeArguments.length;
            if (numTypeArguments) {
                sb.push("<");
                this.visitTypeNode(typeArguments[0]);
                for (let i = 1; i < numTypeArguments; ++i) {
                    sb.push(", ");
                    this.visitTypeNode(typeArguments[i]);
                }
                sb.push(">(");
            }
        }
        else {
            sb.push("(");
        }
        var numArgs = args.length;
        if (numArgs) {
            this.visitNode(args[0]);
            for (let i = 1; i < numArgs; ++i) {
                sb.push(", ");
                this.visitNode(args[i]);
            }
        }
        sb.push(")");
    }
    visitClassExpression(node) {
        var declaration = node.declaration;
        this.visitClassDeclaration(declaration);
    }
    visitCommaExpression(node) {
        var expressions = node.expressions;
        var numExpressions = (0, assert_js_1.assert)(expressions.length);
        this.visitNode(expressions[0]);
        var sb = this.sb;
        for (let i = 1; i < numExpressions; ++i) {
            sb.push(",");
            this.visitNode(expressions[i]);
        }
    }
    visitElementAccessExpression(node) {
        var sb = this.sb;
        this.visitNode(node.expression);
        sb.push("[");
        this.visitNode(node.elementExpression);
        sb.push("]");
    }
    visitFunctionExpression(node) {
        var declaration = node.declaration;
        if (!declaration.arrowKind) {
            if (declaration.name.text.length) {
                this.sb.push("function ");
            }
            else {
                this.sb.push("function");
            }
        }
        else {
            (0, assert_js_1.assert)(declaration.name.text.length == 0);
        }
        this.visitFunctionCommon(declaration);
    }
    visitLiteralExpression(node) {
        switch (node.literalKind) {
            case 0 /* LiteralKind.Float */: {
                this.visitFloatLiteralExpression(node);
                break;
            }
            case 1 /* LiteralKind.Integer */: {
                this.visitIntegerLiteralExpression(node);
                break;
            }
            case 2 /* LiteralKind.String */: {
                this.visitStringLiteralExpression(node);
                break;
            }
            case 3 /* LiteralKind.Template */: {
                this.visitTemplateLiteralExpression(node);
                break;
            }
            case 4 /* LiteralKind.RegExp */: {
                this.visitRegexpLiteralExpression(node);
                break;
            }
            case 5 /* LiteralKind.Array */: {
                this.visitArrayLiteralExpression(node);
                break;
            }
            case 6 /* LiteralKind.Object */: {
                this.visitObjectLiteralExpression(node);
                break;
            }
            default: {
                (0, assert_js_1.assert)(false);
                break;
            }
        }
    }
    visitFloatLiteralExpression(node) {
        this.sb.push(node.value.toString());
    }
    visitInstanceOfExpression(node) {
        this.visitNode(node.expression);
        this.sb.push(" instanceof ");
        this.visitTypeNode(node.isType);
    }
    visitIntegerLiteralExpression(node) {
        this.sb.push(i64_to_string(node.value));
    }
    visitStringLiteral(str) {
        var sb = this.sb;
        sb.push('"');
        this.visitRawString(str, 34 /* util.CharCode.DoubleQuote */);
        sb.push('"');
    }
    visitRawString(str, quote) {
        var sb = this.sb;
        var off = 0;
        var i = 0;
        for (let k = str.length; i < k;) {
            switch (str.charCodeAt(i)) {
                case 0 /* util.CharCode.Null */: {
                    if (i > off)
                        sb.push(str.substring(off, (off = i + 1)));
                    sb.push("\\0");
                    off = ++i;
                    break;
                }
                case 92 /* util.CharCode.Backslash */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    off = ++i;
                    sb.push("\\b");
                    break;
                }
                case 9 /* util.CharCode.Tab */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    off = ++i;
                    sb.push("\\t");
                    break;
                }
                case 10 /* util.CharCode.LineFeed */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    off = ++i;
                    sb.push("\\n");
                    break;
                }
                case 11 /* util.CharCode.VerticalTab */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    off = ++i;
                    sb.push("\\v");
                    break;
                }
                case 12 /* util.CharCode.FormFeed */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    off = ++i;
                    sb.push("\\f");
                    break;
                }
                case 13 /* util.CharCode.CarriageReturn */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    sb.push("\\r");
                    off = ++i;
                    break;
                }
                case 34 /* util.CharCode.DoubleQuote */: {
                    if (quote == 34 /* util.CharCode.DoubleQuote */) {
                        if (i > off)
                            sb.push(str.substring(off, i));
                        sb.push('\\"');
                        off = ++i;
                    }
                    else {
                        ++i;
                    }
                    break;
                }
                case 39 /* util.CharCode.SingleQuote */: {
                    if (quote == 39 /* util.CharCode.SingleQuote */) {
                        if (i > off)
                            sb.push(str.substring(off, i));
                        sb.push("\\'");
                        off = ++i;
                    }
                    else {
                        ++i;
                    }
                    break;
                }
                case 92 /* util.CharCode.Backslash */: {
                    if (i > off)
                        sb.push(str.substring(off, i));
                    sb.push("\\\\");
                    off = ++i;
                    break;
                }
                case 96 /* util.CharCode.Backtick */: {
                    if (quote == 96 /* util.CharCode.Backtick */) {
                        if (i > off)
                            sb.push(str.substring(off, i));
                        sb.push("\\`");
                        off = ++i;
                    }
                    else {
                        ++i;
                    }
                    break;
                }
                default: {
                    ++i;
                    break;
                }
            }
        }
        if (i > off)
            sb.push(str.substring(off, i));
    }
    visitStringLiteralExpression(node) {
        this.visitStringLiteral(node.value);
    }
    visitTemplateLiteralExpression(node) {
        var sb = this.sb;
        var tag = node.tag;
        var parts = node.parts;
        var expressions = node.expressions;
        if (tag)
            this.visitNode(tag);
        sb.push("`");
        this.visitRawString(parts[0], 96 /* util.CharCode.Backtick */);
        (0, assert_js_1.assert)(parts.length == expressions.length + 1);
        for (let i = 0, k = expressions.length; i < k; ++i) {
            sb.push("${");
            this.visitNode(expressions[i]);
            sb.push("}");
            this.visitRawString(parts[i + 1], 96 /* util.CharCode.Backtick */);
        }
        sb.push("`");
    }
    visitRegexpLiteralExpression(node) {
        var sb = this.sb;
        sb.push("/");
        sb.push(node.pattern);
        sb.push("/");
        sb.push(node.patternFlags);
    }
    visitNewExpression(node) {
        this.sb.push("new ");
        this.visitTypeName(node.typeName);
        this.visitArguments(node.typeArguments, node.args);
    }
    visitParenthesizedExpression(node) {
        var sb = this.sb;
        sb.push("(");
        this.visitNode(node.expression);
        sb.push(")");
    }
    visitPropertyAccessExpression(node) {
        this.visitNode(node.expression);
        this.sb.push(".");
        this.visitIdentifierExpression(node.property);
    }
    visitTernaryExpression(node) {
        var sb = this.sb;
        this.visitNode(node.condition);
        sb.push(" ? ");
        this.visitNode(node.ifThen);
        sb.push(" : ");
        this.visitNode(node.ifElse);
    }
    visitUnaryExpression(node) {
        switch (node.kind) {
            case 27 /* NodeKind.UnaryPostfix */: {
                this.visitUnaryPostfixExpression(node);
                break;
            }
            case 28 /* NodeKind.UnaryPrefix */: {
                this.visitUnaryPrefixExpression(node);
                break;
            }
            default:
                (0, assert_js_1.assert)(false);
        }
    }
    visitUnaryPostfixExpression(node) {
        this.visitNode(node.operand);
        this.sb.push((0, assemblyscript_js_1.operatorTokenToString)(node.operator));
    }
    visitUnaryPrefixExpression(node) {
        this.sb.push((0, assemblyscript_js_1.operatorTokenToString)(node.operator));
        this.visitNode(node.operand);
    }
    // statements
    visitNodeAndTerminate(node) {
        this.visitNode(node);
        var sb = this.sb;
        if (!sb.length || // leading EmptyStatement
            node.kind == 47 /* NodeKind.Variable */ || // potentially assigns a FunctionExpression
            node.kind == 38 /* NodeKind.Expression */ // potentially assigns a FunctionExpression
        ) {
            sb.push(";\n");
        }
        else {
            let last = sb[sb.length - 1];
            let lastCharPos = last.length - 1;
            if (lastCharPos >= 0 &&
                (last.charCodeAt(lastCharPos) == 125 /* util.CharCode.CloseBrace */ ||
                    last.charCodeAt(lastCharPos) == 59 /* util.CharCode.Semicolon */)) {
                sb.push("\n");
            }
            else {
                sb.push(";\n");
            }
        }
    }
    visitBlockStatement(node) {
        var sb = this.sb;
        var statements = node.statements;
        var numStatements = statements.length;
        if (numStatements) {
            sb.push("{\n");
            let indentLevel = ++this.indentLevel;
            for (let i = 0; i < numStatements; ++i) {
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitNodeAndTerminate(statements[i]);
            }
            (0, utils_js_1.indent)(sb, --this.indentLevel);
            sb.push("}");
        }
        else {
            sb.push("{}");
        }
    }
    visitBreakStatement(node) {
        var label = node.label;
        if (label) {
            this.sb.push("break ");
            this.visitIdentifierExpression(label);
        }
        else {
            this.sb.push("break");
        }
    }
    visitContinueStatement(node) {
        var label = node.label;
        if (label) {
            this.sb.push("continue ");
            this.visitIdentifierExpression(label);
        }
        else {
            this.sb.push("continue");
        }
    }
    visitClassDeclaration(node, isDefault = false) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        var sb = this.sb;
        if (isDefault) {
            sb.push("export default ");
        }
        else {
            this.serializeExternalModifiers(node);
        }
        if (node.is(128 /* CommonFlags.Abstract */))
            sb.push("abstract ");
        if (node.name.text.length) {
            sb.push("class ");
            this.visitIdentifierExpression(node.name);
        }
        else {
            sb.push("class");
        }
        var typeParameters = node.typeParameters;
        if (typeParameters != null && typeParameters.length > 0) {
            sb.push("<");
            this.visitTypeParameter(typeParameters[0]);
            for (let i = 1, k = typeParameters.length; i < k; ++i) {
                sb.push(", ");
                this.visitTypeParameter(typeParameters[i]);
            }
            sb.push(">");
        }
        var extendsType = node.extendsType;
        if (extendsType) {
            sb.push(" extends ");
            this.visitTypeNode(extendsType);
        }
        var implementsTypes = node.implementsTypes;
        if (implementsTypes) {
            let numImplementsTypes = implementsTypes.length;
            if (numImplementsTypes) {
                sb.push(" implements ");
                this.visitTypeNode(implementsTypes[0]);
                for (let i = 1; i < numImplementsTypes; ++i) {
                    sb.push(", ");
                    this.visitTypeNode(implementsTypes[i]);
                }
            }
        }
        var indexSignature = node.indexSignature;
        var members = node.members;
        var numMembers = members.length;
        if (indexSignature !== null || numMembers) {
            sb.push(" {\n");
            let indentLevel = ++this.indentLevel;
            if (indexSignature) {
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitNodeAndTerminate(indexSignature);
            }
            for (let i = 0, k = members.length; i < k; ++i) {
                let member = members[i];
                if (member.kind != 54 /* NodeKind.FieldDeclaration */ ||
                    member.parameterIndex < 0) {
                    (0, utils_js_1.indent)(sb, indentLevel);
                    this.visitNodeAndTerminate(member);
                }
            }
            (0, utils_js_1.indent)(sb, --this.indentLevel);
            sb.push("}");
        }
        else {
            sb.push(" {}");
        }
    }
    visitDoStatement(node) {
        var sb = this.sb;
        sb.push("do ");
        this.visitNode(node.body);
        if (node.body.kind == 30 /* NodeKind.Block */) {
            sb.push(" while (");
        }
        else {
            (0, utils_js_1.indent)(sb, this.indentLevel);
            sb.push("while (");
        }
        this.visitNode(node.condition);
        sb.push(")");
    }
    visitEmptyStatement(node) {
        /* nop */
    }
    visitEnumDeclaration(node, isDefault = false) {
        var sb = this.sb;
        if (isDefault) {
            sb.push("export default ");
        }
        else {
            this.serializeExternalModifiers(node);
        }
        if (node.is(8 /* CommonFlags.Const */))
            sb.push("const ");
        sb.push("enum ");
        this.visitIdentifierExpression(node.name);
        var values = node.values;
        var numValues = values.length;
        if (numValues) {
            sb.push(" {\n");
            let indentLevel = ++this.indentLevel;
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitEnumValueDeclaration(node.values[0]);
            for (let i = 1; i < numValues; ++i) {
                sb.push(",\n");
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitEnumValueDeclaration(node.values[i]);
            }
            sb.push("\n");
            (0, utils_js_1.indent)(sb, --this.indentLevel);
            sb.push("}");
        }
        else {
            sb.push(" {}");
        }
    }
    visitEnumValueDeclaration(node) {
        this.visitIdentifierExpression(node.name);
        var initializer = node.initializer;
        if (initializer) {
            this.sb.push(" = ");
            this.visitNode(initializer);
        }
    }
    visitExportImportStatement(node) {
        var sb = this.sb;
        sb.push("export import ");
        this.visitIdentifierExpression(node.externalName);
        sb.push(" = ");
        this.visitIdentifierExpression(node.name);
    }
    visitExportMember(node) {
        this.visitIdentifierExpression(node.localName);
        if (node.exportedName.text != node.localName.text) {
            this.sb.push(" as ");
            this.visitIdentifierExpression(node.exportedName);
        }
    }
    visitExportStatement(node) {
        var sb = this.sb;
        if (node.isDeclare) {
            sb.push("declare ");
        }
        var members = node.members;
        if (members == null) {
            sb.push("export *");
        }
        else if (members.length > 0) {
            let numMembers = members.length;
            sb.push("export {\n");
            let indentLevel = ++this.indentLevel;
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitExportMember(members[0]);
            for (let i = 1; i < numMembers; ++i) {
                sb.push(",\n");
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitExportMember(members[i]);
            }
            --this.indentLevel;
            sb.push("\n}");
        }
        else {
            sb.push("export {}");
        }
        var path = node.path;
        if (path) {
            sb.push(" from ");
            this.visitStringLiteralExpression(path);
        }
        sb.push(";");
    }
    visitExportDefaultStatement(node) {
        var declaration = node.declaration;
        switch (declaration.kind) {
            case 52 /* NodeKind.EnumDeclaration */: {
                this.visitEnumDeclaration(declaration, true);
                break;
            }
            case 55 /* NodeKind.FunctionDeclaration */: {
                this.visitFunctionDeclaration(declaration, true);
                break;
            }
            case 51 /* NodeKind.ClassDeclaration */: {
                this.visitClassDeclaration(declaration, true);
                break;
            }
            case 57 /* NodeKind.InterfaceDeclaration */: {
                this.visitInterfaceDeclaration(declaration, true);
                break;
            }
            case 59 /* NodeKind.NamespaceDeclaration */: {
                this.visitNamespaceDeclaration(declaration, true);
                break;
            }
            default:
                (0, assert_js_1.assert)(false);
        }
    }
    visitExpressionStatement(node) {
        this.visitNode(node.expression);
    }
    visitFieldDeclaration(node) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        this.serializeAccessModifiers(node);
        this.visitIdentifierExpression(node.name);
        var sb = this.sb;
        if (node.flags & 16384 /* CommonFlags.DefinitelyAssigned */) {
            sb.push("!");
        }
        var type = node.type;
        if (type) {
            sb.push(": ");
            this.visitTypeNode(type);
        }
        var initializer = node.initializer;
        if (initializer) {
            sb.push(" = ");
            this.visitNode(initializer);
        }
    }
    visitForStatement(node) {
        var sb = this.sb;
        sb.push("for (");
        var initializer = node.initializer;
        if (initializer) {
            this.visitNode(initializer);
        }
        var condition = node.condition;
        if (condition) {
            sb.push("; ");
            this.visitNode(condition);
        }
        else {
            sb.push(";");
        }
        var incrementor = node.incrementor;
        if (incrementor) {
            sb.push("; ");
            this.visitNode(incrementor);
        }
        else {
            sb.push(";");
        }
        sb.push(") ");
        this.visitNode(node.body);
    }
    visitForOfStatement(node) {
        var sb = this.sb;
        sb.push("for (");
        this.visitNode(node.variable);
        sb.push(" of ");
        this.visitNode(node.iterable);
        sb.push(") ");
        this.visitNode(node.body);
    }
    visitFunctionDeclaration(node, isDefault = false) {
        var sb = this.sb;
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        if (isDefault) {
            sb.push("export default ");
        }
        else {
            this.serializeExternalModifiers(node);
            this.serializeAccessModifiers(node);
        }
        if (node.name.text.length) {
            sb.push("function ");
        }
        else {
            sb.push("function");
        }
        this.visitFunctionCommon(node);
    }
    visitFunctionCommon(node) {
        var sb = this.sb;
        this.visitIdentifierExpression(node.name);
        var signature = node.signature;
        var typeParameters = node.typeParameters;
        if (typeParameters) {
            let numTypeParameters = typeParameters.length;
            if (numTypeParameters) {
                sb.push("<");
                this.visitTypeParameter(typeParameters[0]);
                for (let i = 1; i < numTypeParameters; ++i) {
                    sb.push(", ");
                    this.visitTypeParameter(typeParameters[i]);
                }
                sb.push(">");
            }
        }
        if (node.arrowKind == 2 /* ArrowKind.Single */) {
            let parameters = signature.parameters;
            (0, assert_js_1.assert)(parameters.length == 1);
            (0, assert_js_1.assert)(!signature.explicitThisType);
            this.serializeParameter(parameters[0]);
        }
        else {
            sb.push("(");
            let parameters = signature.parameters;
            let numParameters = parameters.length;
            let explicitThisType = signature.explicitThisType;
            if (explicitThisType) {
                sb.push("this: ");
                this.visitTypeNode(explicitThisType);
            }
            if (numParameters) {
                if (explicitThisType)
                    sb.push(", ");
                this.serializeParameter(parameters[0]);
                for (let i = 1; i < numParameters; ++i) {
                    sb.push(", ");
                    this.serializeParameter(parameters[i]);
                }
            }
        }
        var body = node.body;
        var returnType = signature.returnType;
        if (node.arrowKind) {
            if (body) {
                if (node.arrowKind == 2 /* ArrowKind.Single */) {
                    (0, assert_js_1.assert)((0, assemblyscript_js_1.isTypeOmitted)(returnType));
                }
                else {
                    if ((0, assemblyscript_js_1.isTypeOmitted)(returnType)) {
                        sb.push(")");
                    }
                    else {
                        sb.push("): ");
                        this.visitTypeNode(returnType);
                    }
                }
                sb.push(" => ");
                this.visitNode(body);
            }
            else {
                (0, assert_js_1.assert)(!(0, assemblyscript_js_1.isTypeOmitted)(returnType));
                sb.push(" => ");
                this.visitTypeNode(returnType);
            }
        }
        else {
            if (!(0, assemblyscript_js_1.isTypeOmitted)(returnType) &&
                !node.isAny(524288 /* CommonFlags.Constructor */ | 4096 /* CommonFlags.Set */)) {
                sb.push("): ");
                this.visitTypeNode(returnType);
            }
            else {
                sb.push(")");
            }
            if (body) {
                sb.push(" ");
                this.visitNode(body);
            }
        }
    }
    visitIfStatement(node) {
        var sb = this.sb;
        sb.push("if (");
        this.visitNode(node.condition);
        sb.push(") ");
        var ifTrue = node.ifTrue;
        this.visitNode(ifTrue);
        if (ifTrue.kind != 30 /* NodeKind.Block */) {
            sb.push(";\n");
        }
        var ifFalse = node.ifFalse;
        if (ifFalse) {
            if (ifTrue.kind == 30 /* NodeKind.Block */) {
                sb.push(" else ");
            }
            else {
                sb.push("else ");
            }
            this.visitNode(ifFalse);
        }
    }
    visitImportDeclaration(node) {
        var externalName = node.foreignName;
        var name = node.name;
        this.visitIdentifierExpression(externalName);
        if (externalName.text != name.text) {
            this.sb.push(" as ");
            this.visitIdentifierExpression(name);
        }
    }
    visitImportStatement(node) {
        var sb = this.sb;
        sb.push("import ");
        var declarations = node.declarations;
        var namespaceName = node.namespaceName;
        if (declarations) {
            let numDeclarations = declarations.length;
            if (numDeclarations) {
                sb.push("{\n");
                let indentLevel = ++this.indentLevel;
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitImportDeclaration(declarations[0]);
                for (let i = 1; i < numDeclarations; ++i) {
                    sb.push(",\n");
                    (0, utils_js_1.indent)(sb, indentLevel);
                    this.visitImportDeclaration(declarations[i]);
                }
                --this.indentLevel;
                sb.push("\n} from ");
            }
            else {
                sb.push("{} from ");
            }
        }
        else if (namespaceName) {
            sb.push("* as ");
            this.visitIdentifierExpression(namespaceName);
            sb.push(" from ");
        }
        this.visitStringLiteralExpression(node.path);
    }
    visitIndexSignature(node) {
        var sb = this.sb;
        sb.push("[key: ");
        this.visitTypeNode(node.keyType);
        sb.push("]: ");
        this.visitTypeNode(node.valueType);
    }
    visitInterfaceDeclaration(node, isDefault = false) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        var sb = this.sb;
        if (isDefault) {
            sb.push("export default ");
        }
        else {
            this.serializeExternalModifiers(node);
        }
        sb.push("interface ");
        this.visitIdentifierExpression(node.name);
        var typeParameters = node.typeParameters;
        if (typeParameters != null && typeParameters.length > 0) {
            sb.push("<");
            this.visitTypeParameter(typeParameters[0]);
            for (let i = 1, k = typeParameters.length; i < k; ++i) {
                sb.push(", ");
                this.visitTypeParameter(typeParameters[i]);
            }
            sb.push(">");
        }
        var extendsType = node.extendsType;
        if (extendsType) {
            sb.push(" extends ");
            this.visitTypeNode(extendsType);
        }
        // must not have implementsTypes
        sb.push(" {\n");
        var indentLevel = ++this.indentLevel;
        var members = node.members;
        for (let i = 0, k = members.length; i < k; ++i) {
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitNodeAndTerminate(members[i]);
        }
        --this.indentLevel;
        sb.push("}");
    }
    visitMethodDeclaration(node) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        this.serializeAccessModifiers(node);
        if (node.is(2048 /* CommonFlags.Get */)) {
            this.sb.push("get ");
        }
        else if (node.is(4096 /* CommonFlags.Set */)) {
            this.sb.push("set ");
        }
        this.visitFunctionCommon(node);
    }
    visitNamespaceDeclaration(node, isDefault = false) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        var sb = this.sb;
        if (isDefault) {
            sb.push("export default ");
        }
        else {
            this.serializeExternalModifiers(node);
        }
        sb.push("namespace ");
        this.visitIdentifierExpression(node.name);
        var members = node.members;
        var numMembers = members.length;
        if (numMembers) {
            sb.push(" {\n");
            let indentLevel = ++this.indentLevel;
            for (let i = 0, k = members.length; i < k; ++i) {
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitNodeAndTerminate(members[i]);
            }
            (0, utils_js_1.indent)(sb, --this.indentLevel);
            sb.push("}");
        }
        else {
            sb.push(" {}");
        }
    }
    visitReturnStatement(node) {
        var value = node.value;
        if (value) {
            this.sb.push("return ");
            this.visitNode(value);
        }
        else {
            this.sb.push("return");
        }
    }
    visitSwitchCase(node) {
        var sb = this.sb;
        var label = node.label;
        if (label) {
            sb.push("case ");
            this.visitNode(label);
            sb.push(":\n");
        }
        else {
            sb.push("default:\n");
        }
        var statements = node.statements;
        var numStatements = statements.length;
        if (numStatements) {
            let indentLevel = ++this.indentLevel;
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitNodeAndTerminate(statements[0]);
            for (let i = 1; i < numStatements; ++i) {
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitNodeAndTerminate(statements[i]);
            }
            --this.indentLevel;
        }
    }
    visitSwitchStatement(node) {
        var sb = this.sb;
        sb.push("switch (");
        this.visitNode(node.condition);
        sb.push(") {\n");
        var indentLevel = ++this.indentLevel;
        var cases = node.cases;
        for (let i = 0, k = cases.length; i < k; ++i) {
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitSwitchCase(cases[i]);
            sb.push("\n");
        }
        --this.indentLevel;
        sb.push("}");
    }
    visitThrowStatement(node) {
        this.sb.push("throw ");
        this.visitNode(node.value);
    }
    visitTryStatement(node) {
        var sb = this.sb;
        sb.push("try {\n");
        var indentLevel = ++this.indentLevel;
        var statements = node.bodyStatements;
        for (let i = 0, k = statements.length; i < k; ++i) {
            (0, utils_js_1.indent)(sb, indentLevel);
            this.visitNodeAndTerminate(statements[i]);
        }
        var catchVariable = node.catchVariable;
        if (catchVariable) {
            (0, utils_js_1.indent)(sb, indentLevel - 1);
            sb.push("} catch (");
            this.visitIdentifierExpression(catchVariable);
            sb.push(") {\n");
            let catchStatements = node.catchStatements;
            if (catchStatements) {
                for (let i = 0, k = catchStatements.length; i < k; ++i) {
                    (0, utils_js_1.indent)(sb, indentLevel);
                    this.visitNodeAndTerminate(catchStatements[i]);
                }
            }
        }
        var finallyStatements = node.finallyStatements;
        if (finallyStatements) {
            (0, utils_js_1.indent)(sb, indentLevel - 1);
            sb.push("} finally {\n");
            for (let i = 0, k = finallyStatements.length; i < k; ++i) {
                (0, utils_js_1.indent)(sb, indentLevel);
                this.visitNodeAndTerminate(finallyStatements[i]);
            }
        }
        (0, utils_js_1.indent)(sb, indentLevel - 1);
        sb.push("}");
    }
    visitTypeDeclaration(node) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        var sb = this.sb;
        this.serializeExternalModifiers(node);
        sb.push("type ");
        this.visitIdentifierExpression(node.name);
        var typeParameters = node.typeParameters;
        if (typeParameters) {
            let numTypeParameters = typeParameters.length;
            if (numTypeParameters) {
                sb.push("<");
                for (let i = 0; i < numTypeParameters; ++i) {
                    this.visitTypeParameter(typeParameters[i]);
                }
                sb.push(">");
            }
        }
        sb.push(" = ");
        this.visitTypeNode(node.type);
    }
    visitVariableDeclaration(node) {
        this.visitIdentifierExpression(node.name);
        var type = node.type;
        var sb = this.sb;
        if (node.flags & 16384 /* CommonFlags.DefinitelyAssigned */) {
            sb.push("!");
        }
        if (type) {
            sb.push(": ");
            this.visitTypeNode(type);
        }
        var initializer = node.initializer;
        if (initializer) {
            sb.push(" = ");
            this.visitNode(initializer);
        }
    }
    visitVariableStatement(node) {
        var decorators = node.decorators;
        if (decorators) {
            for (let i = 0, k = decorators.length; i < k; ++i) {
                this.serializeDecorator(decorators[i]);
            }
        }
        var sb = this.sb;
        var declarations = node.declarations;
        var numDeclarations = (0, assert_js_1.assert)(declarations.length);
        var firstDeclaration = declarations[0];
        this.serializeExternalModifiers(firstDeclaration);
        sb.push(firstDeclaration.is(8 /* CommonFlags.Const */)
            ? "const "
            : firstDeclaration.is(16 /* CommonFlags.Let */)
                ? "let "
                : "var ");
        this.visitVariableDeclaration(node.declarations[0]);
        for (let i = 1; i < numDeclarations; ++i) {
            sb.push(", ");
            this.visitVariableDeclaration(node.declarations[i]);
        }
    }
    visitWhileStatement(node) {
        var sb = this.sb;
        sb.push("while (");
        this.visitNode(node.condition);
        var statement = node.body;
        if (statement.kind == 34 /* NodeKind.Empty */) {
            sb.push(")");
        }
        else {
            sb.push(") ");
            this.visitNode(node.body);
        }
    }
    // other
    serializeDecorator(node) {
        var sb = this.sb;
        sb.push("@");
        this.visitNode(node.name);
        var args = node.args;
        if (args) {
            sb.push("(");
            let numArgs = args.length;
            if (numArgs) {
                this.visitNode(args[0]);
                for (let i = 1; i < numArgs; ++i) {
                    sb.push(", ");
                    this.visitNode(args[i]);
                }
            }
            sb.push(")\n");
        }
        else {
            sb.push("\n");
        }
        (0, utils_js_1.indent)(sb, this.indentLevel);
    }
    serializeParameter(node) {
        var sb = this.sb;
        var kind = node.parameterKind;
        var implicitFieldDeclaration = node.implicitFieldDeclaration;
        if (implicitFieldDeclaration) {
            this.serializeAccessModifiers(implicitFieldDeclaration);
        }
        if (kind == 2 /* ParameterKind.Rest */) {
            sb.push("...");
        }
        this.visitIdentifierExpression(node.name);
        var type = node.type;
        var initializer = node.initializer;
        if (type) {
            if (kind == 1 /* ParameterKind.Optional */ && !initializer)
                sb.push("?");
            if (!(0, assemblyscript_js_1.isTypeOmitted)(type)) {
                sb.push(": ");
                this.visitTypeNode(type);
            }
        }
        if (initializer) {
            sb.push(" = ");
            this.visitNode(initializer);
        }
    }
    serializeExternalModifiers(node) {
        var sb = this.sb;
        if (node.is(2 /* CommonFlags.Export */)) {
            sb.push("export ");
        }
        else if (node.is(1 /* CommonFlags.Import */)) {
            sb.push("import ");
        }
        else if (node.is(4 /* CommonFlags.Declare */)) {
            sb.push("declare ");
        }
    }
    serializeAccessModifiers(node) {
        var sb = this.sb;
        if (node.is(256 /* CommonFlags.Public */)) {
            sb.push("public ");
        }
        else if (node.is(512 /* CommonFlags.Private */)) {
            sb.push("private ");
        }
        else if (node.is(1024 /* CommonFlags.Protected */)) {
            sb.push("protected ");
        }
        if (node.is(32 /* CommonFlags.Static */)) {
            sb.push("static ");
        }
        else if (node.is(128 /* CommonFlags.Abstract */)) {
            sb.push("abstract ");
        }
        if (node.is(64 /* CommonFlags.Readonly */)) {
            sb.push("readonly ");
        }
    }
    finish() {
        var ret = this.sb.join("");
        this.sb = [];
        return ret;
    }
}
exports.ASTBuilder = ASTBuilder;
