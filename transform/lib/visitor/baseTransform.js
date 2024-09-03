"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTransformVisitor = void 0;
const visitor_js_1 = require("./visitor.js");
const assert_js_1 = require("./assert.js");
class BaseTransformVisitor extends visitor_js_1.AbstractTransformVisitor {
    depth = 0;
    _visit(node) {
        switch (node.kind) {
            case 0 /* NodeKind.Source */: {
                return this.visitSource(node);
            }
            // types
            case 1 /* NodeKind.NamedType */: {
                return this.visitNamedTypeNode(node);
            }
            case 2 /* NodeKind.FunctionType */: {
                return this.visitFunctionTypeNode(node);
            }
            case 3 /* NodeKind.TypeName */: {
                return this.visitTypeName(node);
            }
            case 4 /* NodeKind.TypeParameter */: {
                return this.visitTypeParameter(node);
            }
            // expressions
            case 13 /* NodeKind.False */:
            case 18 /* NodeKind.Null */:
            case 23 /* NodeKind.Super */:
            case 24 /* NodeKind.This */:
            case 25 /* NodeKind.True */:
            case 26 /* NodeKind.Constructor */:
            case 6 /* NodeKind.Identifier */: {
                return this.visitIdentifierExpression(node);
            }
            case 7 /* NodeKind.Assertion */: {
                return this.visitAssertionExpression(node);
            }
            case 8 /* NodeKind.Binary */: {
                return this.visitBinaryExpression(node);
            }
            case 9 /* NodeKind.Call */: {
                return this.visitCallExpression(node);
            }
            case 10 /* NodeKind.Class */: {
                return this.visitClassExpression(node);
            }
            case 11 /* NodeKind.Comma */: {
                return this.visitCommaExpression(node);
            }
            case 12 /* NodeKind.ElementAccess */: {
                return this.visitElementAccessExpression(node);
            }
            case 14 /* NodeKind.Function */: {
                return this.visitFunctionExpression(node);
            }
            case 15 /* NodeKind.InstanceOf */: {
                return this.visitInstanceOfExpression(node);
            }
            case 16 /* NodeKind.Literal */: {
                return this.visitLiteralExpression(node);
            }
            case 17 /* NodeKind.New */: {
                return this.visitNewExpression(node);
            }
            case 20 /* NodeKind.Parenthesized */: {
                return this.visitParenthesizedExpression(node);
            }
            case 21 /* NodeKind.PropertyAccess */: {
                return this.visitPropertyAccessExpression(node);
            }
            case 22 /* NodeKind.Ternary */: {
                return this.visitTernaryExpression(node);
            }
            case 27 /* NodeKind.UnaryPostfix */: {
                return this.visitUnaryPostfixExpression(node);
            }
            case 28 /* NodeKind.UnaryPrefix */: {
                return this.visitUnaryPrefixExpression(node);
            }
            // statements
            case 30 /* NodeKind.Block */: {
                return this.visitBlockStatement(node);
            }
            case 31 /* NodeKind.Break */: {
                return this.visitBreakStatement(node);
            }
            case 32 /* NodeKind.Continue */: {
                return this.visitContinueStatement(node);
            }
            case 33 /* NodeKind.Do */: {
                return this.visitDoStatement(node);
            }
            case 34 /* NodeKind.Empty */: {
                return this.visitEmptyStatement(node);
            }
            case 35 /* NodeKind.Export */: {
                return this.visitExportStatement(node);
            }
            case 36 /* NodeKind.ExportDefault */: {
                return this.visitExportDefaultStatement(node);
            }
            case 37 /* NodeKind.ExportImport */: {
                return this.visitExportImportStatement(node);
            }
            case 38 /* NodeKind.Expression */: {
                return this.visitExpressionStatement(node);
            }
            case 39 /* NodeKind.For */: {
                return this.visitForStatement(node);
            }
            case 41 /* NodeKind.If */: {
                return this.visitIfStatement(node);
            }
            case 42 /* NodeKind.Import */: {
                return this.visitImportStatement(node);
            }
            case 43 /* NodeKind.Return */: {
                return this.visitReturnStatement(node);
            }
            case 44 /* NodeKind.Switch */: {
                return this.visitSwitchStatement(node);
            }
            case 45 /* NodeKind.Throw */: {
                return this.visitThrowStatement(node);
            }
            case 46 /* NodeKind.Try */: {
                return this.visitTryStatement(node);
            }
            case 47 /* NodeKind.Variable */: {
                return this.visitVariableStatement(node);
            }
            case 49 /* NodeKind.While */: {
                return this.visitWhileStatement(node);
            }
            // declaration statements
            case 51 /* NodeKind.ClassDeclaration */: {
                return this.visitClassDeclaration(node);
            }
            case 52 /* NodeKind.EnumDeclaration */: {
                return this.visitEnumDeclaration(node);
            }
            case 53 /* NodeKind.EnumValueDeclaration */: {
                return this.visitEnumValueDeclaration(node);
            }
            case 54 /* NodeKind.FieldDeclaration */: {
                return this.visitFieldDeclaration(node);
            }
            case 55 /* NodeKind.FunctionDeclaration */: {
                return this.visitFunctionDeclaration(node);
            }
            case 56 /* NodeKind.ImportDeclaration */: {
                return this.visitImportDeclaration(node);
            }
            case 57 /* NodeKind.InterfaceDeclaration */: {
                return this.visitInterfaceDeclaration(node);
            }
            case 58 /* NodeKind.MethodDeclaration */: {
                return this.visitMethodDeclaration(node);
            }
            case 59 /* NodeKind.NamespaceDeclaration */: {
                return this.visitNamespaceDeclaration(node);
            }
            case 60 /* NodeKind.TypeDeclaration */: {
                return this.visitTypeDeclaration(node);
            }
            case 61 /* NodeKind.VariableDeclaration */: {
                return this.visitVariableDeclaration(node);
            }
            // other
            case 62 /* NodeKind.Decorator */: {
                return this.visitDecoratorNode(node);
            }
            case 63 /* NodeKind.ExportMember */: {
                return this.visitExportMember(node);
            }
            case 5 /* NodeKind.Parameter */: {
                return this.visitParameter(node);
            }
            case 64 /* NodeKind.SwitchCase */: {
                return this.visitSwitchCase(node);
            }
            case 65 /* NodeKind.IndexSignature */: {
                return this.visitIndexSignature(node);
            }
            default:
                (0, assert_js_1.assert)(false, "visit panic");
        }
        return node;
    }
    visitSource(node) {
        let statements = [];
        for (let i = 0; i < node.statements.length; i++) {
            const stmt = node.statements[i];
            this.depth++;
            statements.push(this._visit(stmt));
            this.depth--;
        }
        node.statements = statements;
        return node;
    }
    visitTypeNode(node) {
        return node;
    }
    visitTypeName(node) {
        node.identifier = this.visitIdentifierExpression(node.identifier);
        node.next = this.visit(node.next);
        return node;
    }
    visitNamedTypeNode(node) {
        node.name = this.visit(node.name);
        node.typeArguments = this.visit(node.typeArguments);
        return node;
    }
    visitFunctionTypeNode(node) {
        node.parameters = this.visit(node.parameters);
        node.returnType = this.visit(node.returnType);
        node.explicitThisType = this.visit(node.explicitThisType);
        return node;
    }
    visitTypeParameter(node) {
        node.name = this.visit(node.name);
        node.extendsType = this.visit(node.extendsType);
        node.defaultType = this.visit(node.defaultType);
        return node;
    }
    visitIdentifierExpression(node) {
        return node;
    }
    visitArrayLiteralExpression(node) {
        node.elementExpressions = this.visit(node.elementExpressions);
        return node;
    }
    visitObjectLiteralExpression(node) {
        node.names = this.visit(node.names);
        node.values = this.visit(node.values);
        return node;
    }
    visitAssertionExpression(node) {
        node.expression = this.visit(node.expression);
        node.toType = this.visit(node.toType);
        return node;
    }
    visitBinaryExpression(node) {
        node.left = this.visit(node.left);
        node.right = this.visit(node.right);
        return node;
    }
    visitCallExpression(node) {
        node.expression = this.visit(node.expression);
        node.typeArguments = this.visit(node.typeArguments);
        node.args = this.visit(node.args);
        return node;
    }
    visitClassExpression(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitCommaExpression(node) {
        node.expressions = this.visit(node.expressions);
        return node;
    }
    visitElementAccessExpression(node) {
        node.elementExpression = this.visit(node.elementExpression);
        node.expression = this.visit(node.expression);
        return node;
    }
    visitFunctionExpression(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitLiteralExpression(node) {
        switch (node.literalKind) {
            case 5 /* LiteralKind.Array */: {
                return this.visitArrayLiteralExpression(node);
            }
            case 0 /* LiteralKind.Float */: {
                return this.visitFloatLiteralExpression(node);
            }
            case 1 /* LiteralKind.Integer */: {
                return this.visitIntegerLiteralExpression(node);
            }
            case 6 /* LiteralKind.Object */: {
                return this.visitObjectLiteralExpression(node);
            }
            case 4 /* LiteralKind.RegExp */: {
                return this.visitRegexpLiteralExpression(node);
            }
            case 2 /* LiteralKind.String */: {
                return this.visitStringLiteralExpression(node);
            }
            case 3 /* LiteralKind.Template */: {
                return this.visitTemplateLiteralExpression(node);
            }
            default:
                throw new Error("Invalid LiteralKind: " + node.literalKind);
        }
    }
    visitFloatLiteralExpression(node) {
        return node;
    }
    visitInstanceOfExpression(node) {
        node.expression = this.visit(node.expression);
        node.isType = this.visit(node.isType);
        return node;
    }
    visitIntegerLiteralExpression(node) {
        return node;
    }
    visitStringLiteral(str, singleQuoted = false) {
        return str;
    }
    visitStringLiteralExpression(node) {
        node.value = this.visitStringLiteral(node.value);
        return node;
    }
    visitTemplateLiteralExpression(node) {
        return node;
    }
    visitRegexpLiteralExpression(node) {
        return node;
    }
    visitNewExpression(node) {
        node.typeArguments = this.visit(node.typeArguments);
        node.typeArguments = this.visit(node.typeArguments);
        node.args = this.visit(node.args);
        return node;
    }
    visitParenthesizedExpression(node) {
        node.expression = this.visit(node.expression);
        return node;
    }
    visitPropertyAccessExpression(node) {
        node.property = this.visit(node.property);
        node.expression = this.visit(node.expression);
        return node;
    }
    visitTernaryExpression(node) {
        node.condition = this.visit(node.condition);
        node.ifThen = this.visit(node.ifThen);
        node.ifElse = this.visit(node.ifElse);
        return node;
    }
    visitUnaryExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitUnaryPostfixExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitUnaryPrefixExpression(node) {
        node.operand = this.visit(node.operand);
        return node;
    }
    visitSuperExpression(node) {
        return node;
    }
    visitFalseExpression(node) {
        return node;
    }
    visitTrueExpression(node) {
        return node;
    }
    visitThisExpression(node) {
        return node;
    }
    visitNullExperssion(node) {
        return node;
    }
    visitConstructorExpression(node) {
        return node;
    }
    visitNodeAndTerminate(node) {
        return node;
    }
    visitBlockStatement(node) {
        this.depth++;
        node.statements = this.visit(node.statements);
        this.depth--;
        return node;
    }
    visitBreakStatement(node) {
        node.label = this.visit(node.label);
        return node;
    }
    visitContinueStatement(node) {
        node.label = this.visit(node.label);
        return node;
    }
    visitClassDeclaration(node, isDefault = false) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.typeParameters = this.visit(node.typeParameters);
        node.extendsType = this.visit(node.extendsType);
        node.implementsTypes = this.visit(node.implementsTypes);
        this.depth++;
        node.members = this.visit(node.members);
        this.depth--;
        return node;
    }
    visitDoStatement(node) {
        node.condition = this.visit(node.condition);
        node.body = this.visit(node.body);
        return node;
    }
    visitEmptyStatement(node) {
        return node;
    }
    visitEnumDeclaration(node, isDefault = false) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.values = this.visit(node.values);
        return node;
    }
    visitEnumValueDeclaration(node) {
        node.name = this.visit(node.name);
        node.initializer = this.visit(node.initializer);
        return node;
    }
    visitExportImportStatement(node) {
        node.name = this.visit(node.name);
        node.externalName = this.visit(node.externalName);
        return node;
    }
    visitExportMember(node) {
        node.localName = this.visit(node.localName);
        node.exportedName = this.visit(node.exportedName);
        return node;
    }
    visitExportStatement(node) {
        node.path = this.visit(node.path);
        node.members = this.visit(node.members);
        return node;
    }
    visitExportDefaultStatement(node) {
        node.declaration = this.visit(node.declaration);
        return node;
    }
    visitExpressionStatement(node) {
        node.expression = this.visit(node.expression);
        return node;
    }
    visitFieldDeclaration(node) {
        node.name = this.visit(node.name);
        node.type = this.visit(node.type);
        node.initializer = this.visit(node.initializer);
        node.decorators = this.visit(node.decorators);
        return node;
    }
    visitForStatement(node) {
        node.initializer = this.visit(node.initializer);
        node.condition = this.visit(node.condition);
        node.incrementor = this.visit(node.incrementor);
        node.body = this.visit(node.body);
        return node;
    }
    visitFunctionDeclaration(node, isDefault = false) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.typeParameters = this.visit(node.typeParameters);
        node.signature = this.visit(node.signature);
        this.depth++;
        node.body = this.visit(node.body);
        this.depth--;
        return node;
    }
    visitIfStatement(node) {
        node.condition = this.visit(node.condition);
        node.ifTrue = this.visit(node.ifTrue);
        node.ifFalse = this.visit(node.ifFalse);
        return node;
    }
    visitImportDeclaration(node) {
        node.foreignName = this.visit(node.foreignName);
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        return node;
    }
    visitImportStatement(node) {
        node.namespaceName = this.visit(node.namespaceName);
        node.declarations = this.visit(node.declarations);
        return node;
    }
    visitIndexSignature(node) {
        node.keyType = this.visit(node.keyType);
        node.valueType = this.visit(node.valueType);
        return node;
    }
    visitInterfaceDeclaration(node, isDefault = false) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.typeParameters = this.visit(node.typeParameters);
        node.implementsTypes = this.visit(node.implementsTypes);
        node.extendsType = this.visit(node.extendsType);
        this.depth++;
        node.members = this.visit(node.members);
        this.depth--;
        return node;
    }
    visitMethodDeclaration(node) {
        node.name = this.visit(node.name);
        node.typeParameters = this.visit(node.typeParameters);
        node.signature = this.visit(node.signature);
        node.decorators = this.visit(node.decorators);
        this.depth++;
        node.body = this.visit(node.body);
        this.depth--;
        return node;
    }
    visitNamespaceDeclaration(node, isDefault = false) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.members = this.visit(node.members);
        return node;
    }
    visitReturnStatement(node) {
        node.value = this.visit(node.value);
        return node;
    }
    visitSwitchCase(node) {
        node.label = this.visit(node.label);
        node.statements = this.visit(node.statements);
        return node;
    }
    visitSwitchStatement(node) {
        node.condition = this.visit(node.condition);
        this.depth++;
        node.cases = this.visit(node.cases);
        this.depth--;
        return node;
    }
    visitThrowStatement(node) {
        node.value = this.visit(node.value);
        return node;
    }
    visitTryStatement(node) {
        node.bodyStatements = this.visit(node.bodyStatements);
        node.catchVariable = this.visit(node.catchVariable);
        node.catchStatements = this.visit(node.catchStatements);
        node.finallyStatements = this.visit(node.finallyStatements);
        return node;
    }
    visitTypeDeclaration(node) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.type = this.visit(node.type);
        node.typeParameters = this.visit(node.typeParameters);
        return node;
    }
    visitVariableDeclaration(node) {
        node.name = this.visit(node.name);
        node.decorators = this.visit(node.decorators);
        node.type = this.visit(node.type);
        node.initializer = this.visit(node.initializer);
        return node;
    }
    visitVariableStatement(node) {
        node.decorators = this.visit(node.decorators);
        node.declarations = this.visit(node.declarations);
        return node;
    }
    visitWhileStatement(node) {
        node.condition = this.visit(node.condition);
        this.depth++;
        node.body = this.visit(node.body);
        this.depth--;
        return node;
    }
    visitVoidStatement(node) {
        return node;
    }
    visitComment(node) {
        return node;
    }
    visitDecoratorNode(node) {
        node.name = this.visit(node.name);
        node.args = this.visit(node.args);
        return node;
    }
    visitParameter(node) {
        node.name = this.visit(node.name);
        node.implicitFieldDeclaration = this.visit(node.implicitFieldDeclaration);
        node.initializer = this.visit(node.initializer);
        node.type = this.visit(node.type);
        return node;
    }
}
exports.BaseTransformVisitor = BaseTransformVisitor;
