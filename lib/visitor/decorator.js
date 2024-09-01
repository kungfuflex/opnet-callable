import { PathTransformVisitor, mergeTransformer } from "./transformer.js";
import { decoratorName, not, isStdlib } from "./utils.js";
export function registerDecorator(decorator) {
    TopLevelDecorator.registerVisitor(decorator);
    return TopLevelDecorator;
}
export class TopLevelDecorator extends PathTransformVisitor {
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
        mergeTransformer(this, this.visitor);
        this.visit(this.visitor.sources.filter(this.visitor.sourceFilter));
        //    (parser as any).sources = (parser as any).sources.filter((v) => !(this.visitor as any).removal.includes(v))
        this.visitor.sources.forEach((source) => parser.sources.push(source));
    }
}
export class Decorator extends PathTransformVisitor {
    /**
     * Default filter that removes library files
     */
    get sourceFilter() {
        return not(isStdlib);
    }
    get decoratorMatcher() {
        return (node) => {
            return decoratorName(node) === this.name;
        };
    }
    get name() {
        return "";
    }
    getDecorator(node) {
        return ((node.decorators && node.decorators.find(this.decoratorMatcher)) || null);
    }
}
export class ClassDecorator extends Decorator {
}
export class FunctionDecorator extends Decorator {
}
export class VariableDecorator extends Decorator {
}
//# sourceMappingURL=decorator.js.map