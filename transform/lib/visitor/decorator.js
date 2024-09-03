"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableDecorator = exports.FunctionDecorator = exports.ClassDecorator = exports.Decorator = exports.TopLevelDecorator = void 0;
exports.registerDecorator = registerDecorator;
const transformer_js_1 = require("./transformer.js");
const utils_js_1 = require("./utils.js");
function registerDecorator(decorator) {
    TopLevelDecorator.registerVisitor(decorator);
    return TopLevelDecorator;
}
class TopLevelDecorator extends transformer_js_1.PathTransformVisitor {
    static _visitor;
    static registerVisitor(visitor) {
        TopLevelDecorator._visitor = visitor;
    }
    get visitor() {
        return TopLevelDecorator._visitor;
    }
    visitInterfaceDeclaration(node) {
        if (node.decorators && node.decorators.length) {
            if (node.decorators[0].name.text === this.visitor.name) {
                this.visitor.currentPath = this.currentParentPath;
                this.visitor.visitInterfaceDeclaration(node);
                return;
            }
        }
        super.visitInterfaceDeclaration(node);
    }
    afterParse(parser) {
        (0, transformer_js_1.mergeTransformer)(this, this.visitor);
        this.visit(this.visitor.sources.filter(this.visitor.sourceFilter));
        //    (parser as any).sources = (parser as any).sources.filter((v) => !(this.visitor as any).removal.includes(v))
        this.visitor.sources.forEach((source) => parser.sources.push(source));
    }
}
exports.TopLevelDecorator = TopLevelDecorator;
class Decorator extends transformer_js_1.PathTransformVisitor {
    /**
     * Default filter that removes library files
     */
    get sourceFilter() {
        return (0, utils_js_1.not)(utils_js_1.isStdlib);
    }
    get decoratorMatcher() {
        return (node) => {
            return (0, utils_js_1.decoratorName)(node) === this.name;
        };
    }
    get name() {
        return "";
    }
    getDecorator(node) {
        return ((node.decorators && node.decorators.find(this.decoratorMatcher)) || null);
    }
}
exports.Decorator = Decorator;
class ClassDecorator extends Decorator {
}
exports.ClassDecorator = ClassDecorator;
class FunctionDecorator extends Decorator {
}
exports.FunctionDecorator = FunctionDecorator;
class VariableDecorator extends Decorator {
}
exports.VariableDecorator = VariableDecorator;
