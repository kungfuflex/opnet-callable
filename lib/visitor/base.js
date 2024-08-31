import { AbstractVisitor } from "./visitor.js";
import { assert } from "./assert.js";
export class BaseVisitor extends AbstractVisitor {
    depth = 0;
    _visit(node) {
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
            case 3 /* NodeKind.TypeName */: {
                this.visitTypeName(node);
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
                this.visitDecoratorNode(node);
                break;
            }
            case 63 /* NodeKind.ExportMember */: {
                this.visitExportMember(node);
                break;
            }
            case 5 /* NodeKind.Parameter */: {
                this.visitParameter(node);
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
                assert(false);
        }
    }
    visitSource(node) {
        for (const stmt of node.statements) {
            this.depth++;
            this.visit(stmt);
            this.depth--;
        }
    }
    visitTypeNode(node) { }
    visitTypeName(node) {
        this.visit(node.identifier);
        this.visit(node.next);
    }
    visitNamedTypeNode(node) {
        this.visit(node.name);
        this.visit(node.typeArguments);
    }
    visitFunctionTypeNode(node) {
        this.visit(node.parameters);
        this.visit(node.returnType);
        this.visit(node.explicitThisType);
    }
    visitTypeParameter(node) {
        this.visit(node.name);
        this.visit(node.extendsType);
        this.visit(node.defaultType);
    }
    visitIdentifierExpression(node) { }
    visitArrayLiteralExpression(node) {
        this.visit(node.elementExpressions);
    }
    visitObjectLiteralExpression(node) {
        this.visit(node.names);
        this.visit(node.values);
    }
    visitAssertionExpression(node) {
        this.visit(node.toType);
        this.visit(node.expression);
    }
    visitBinaryExpression(node) {
        this.visit(node.left);
        this.visit(node.right);
    }
    visitCallExpression(node) {
        this.visit(node.expression);
        this.visitArguments(node.typeArguments, node.args);
    }
    visitArguments(typeArguments, args) {
        this.visit(typeArguments);
        this.visit(args);
    }
    visitClassExpression(node) {
        this.visit(node.declaration);
    }
    visitCommaExpression(node) {
        this.visit(node.expressions);
    }
    visitElementAccessExpression(node) {
        this.visit(node.elementExpression);
        this.visit(node.expression);
    }
    visitFunctionExpression(node) {
        this.visit(node.declaration);
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
            default:
                throw new Error("Invalid LiteralKind: " + node.literalKind);
        }
    }
    visitFloatLiteralExpression(node) { }
    visitInstanceOfExpression(node) {
        this.visit(node.expression);
        this.visit(node.isType);
    }
    visitIntegerLiteralExpression(node) { }
    visitStringLiteral(str, singleQuoted = false) { }
    visitStringLiteralExpression(node) {
        this.visitStringLiteral(node.value);
    }
    visitTemplateLiteralExpression(node) { }
    visitRegexpLiteralExpression(node) { }
    visitNewExpression(node) {
        this.visit(node.typeArguments);
        this.visitArguments(node.typeArguments, node.args);
        this.visit(node.args);
    }
    visitParenthesizedExpression(node) {
        this.visit(node.expression);
    }
    visitPropertyAccessExpression(node) {
        this.visit(node.property);
        this.visit(node.expression);
    }
    visitTernaryExpression(node) {
        this.visit(node.condition);
        this.visit(node.ifThen);
        this.visit(node.ifElse);
    }
    visitUnaryExpression(node) {
        this.visit(node.operand);
    }
    visitUnaryPostfixExpression(node) {
        this.visit(node.operand);
    }
    visitUnaryPrefixExpression(node) {
        this.visit(node.operand);
    }
    visitSuperExpression(node) { }
    visitFalseExpression(node) { }
    visitTrueExpression(node) { }
    visitThisExpression(node) { }
    visitNullExperssion(node) { }
    visitConstructorExpression(node) { }
    visitNodeAndTerminate(statement) { }
    visitBlockStatement(node) {
        this.depth++;
        this.visit(node.statements);
        this.depth--;
    }
    visitBreakStatement(node) {
        this.visit(node.label);
    }
    visitContinueStatement(node) {
        this.visit(node.label);
    }
    visitClassDeclaration(node, isDefault = false) {
        this.visit(node.name);
        this.depth++;
        this.visit(node.decorators);
        assert(node.isGeneric
            ? node.typeParameters != null
            : node.typeParameters == null);
        this.visit(node.typeParameters);
        this.visit(node.extendsType);
        this.visit(node.implementsTypes);
        this.visit(node.members);
        this.depth--;
    }
    visitDoStatement(node) {
        this.visit(node.condition);
        this.visit(node.body);
    }
    visitEmptyStatement(node) { }
    visitEnumDeclaration(node, isDefault = false) {
        this.visit(node.name);
        this.visit(node.decorators);
        this.visit(node.values);
    }
    visitEnumValueDeclaration(node) {
        this.visit(node.name);
        this.visit(node.initializer);
    }
    visitExportImportStatement(node) {
        this.visit(node.name);
        this.visit(node.externalName);
    }
    visitExportMember(node) {
        this.visit(node.localName);
        this.visit(node.exportedName);
    }
    visitExportStatement(node) {
        this.visit(node.path);
        this.visit(node.members);
    }
    visitExportDefaultStatement(node) {
        this.visit(node.declaration);
    }
    visitExpressionStatement(node) {
        this.visit(node.expression);
    }
    visitFieldDeclaration(node) {
        this.visit(node.name);
        this.visit(node.type);
        this.visit(node.initializer);
        this.visit(node.decorators);
    }
    visitForStatement(node) {
        this.visit(node.initializer);
        this.visit(node.condition);
        this.visit(node.incrementor);
        this.visit(node.body);
    }
    visitFunctionDeclaration(node, isDefault = false) {
        this.visit(node.name);
        this.visit(node.decorators);
        this.visit(node.typeParameters);
        this.visit(node.signature);
        this.depth++;
        this.visit(node.body);
        this.depth--;
    }
    visitIfStatement(node) {
        this.visit(node.condition);
        this.visit(node.ifTrue);
        this.visit(node.ifFalse);
    }
    visitImportDeclaration(node) {
        this.visit(node.foreignName);
        this.visit(node.name);
        this.visit(node.decorators);
    }
    visitImportStatement(node) {
        this.visit(node.namespaceName);
        this.visit(node.declarations);
    }
    visitIndexSignature(node) {
        this.visit(node.keyType);
        this.visit(node.valueType);
    }
    visitInterfaceDeclaration(node, isDefault = false) {
        this.visit(node.name);
        this.visit(node.typeParameters);
        this.visit(node.implementsTypes);
        this.visit(node.extendsType);
        this.depth++;
        this.visit(node.members);
        this.depth--;
    }
    visitMethodDeclaration(node) {
        this.visit(node.name);
        this.visit(node.typeParameters);
        this.visit(node.signature);
        this.visit(node.decorators);
        this.depth++;
        this.visit(node.body);
        this.depth--;
    }
    visitNamespaceDeclaration(node, isDefault = false) {
        this.visit(node.name);
        this.visit(node.decorators);
        this.visit(node.members);
    }
    visitReturnStatement(node) {
        this.visit(node.value);
    }
    visitSwitchCase(node) {
        this.visit(node.label);
        this.visit(node.statements);
    }
    visitSwitchStatement(node) {
        this.visit(node.condition);
        this.depth++;
        this.visit(node.cases);
        this.depth--;
    }
    visitThrowStatement(node) {
        this.visit(node.value);
    }
    visitTryStatement(node) {
        this.visit(node.bodyStatements);
        this.visit(node.catchVariable);
        this.visit(node.catchStatements);
        this.visit(node.finallyStatements);
    }
    visitTypeDeclaration(node) {
        this.visit(node.name);
        this.visit(node.decorators);
        this.visit(node.type);
        this.visit(node.typeParameters);
    }
    visitVariableDeclaration(node) {
        this.visit(node.name);
        this.visit(node.type);
        this.visit(node.initializer);
    }
    visitVariableStatement(node) {
        this.visit(node.decorators);
        this.visit(node.declarations);
    }
    visitWhileStatement(node) {
        this.visit(node.condition);
        this.depth++;
        this.visit(node.body);
        this.depth--;
    }
    visitVoidStatement(node) { }
    visitComment(node) { }
    visitDecoratorNode(node) {
        this.visit(node.name);
        this.visit(node.args);
    }
    visitParameter(node) {
        this.visit(node.name);
        this.visit(node.implicitFieldDeclaration);
        this.visit(node.initializer);
        this.visit(node.type);
    }
}
//# sourceMappingURL=base.js.map