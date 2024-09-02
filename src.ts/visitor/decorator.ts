import { PathTransformVisitor, mergeTransformer } from "./transformer.js";
import {
  ClassDeclaration,
  FieldDeclaration,
  Node,
  MethodDeclaration,
  Parser,
  VariableDeclaration,
  InterfaceDeclaration,
  FunctionDeclaration,
  Source,
  DecoratorNode,
  DeclarationStatement,
} from "assemblyscript/dist/assemblyscript.js";
import { toString, decoratorName, decorates, not, isStdlib } from "./utils.js";

export function registerDecorator(decorator: DecoratorVisitor) {
  TopLevelDecorator.registerVisitor(decorator);
  return TopLevelDecorator;
}

interface DecoratorVisitor extends PathTransformVisitor {
  decoratorMatcher: (node: DecoratorNode) => boolean;
  sourceFilter: (s: Source) => boolean;
}

export class TopLevelDecorator extends PathTransformVisitor {
  private static _visitor: DecoratorVisitor;

  static registerVisitor(visitor: DecoratorVisitor): void {
    TopLevelDecorator._visitor = visitor;
  }

  private get visitor(): DecoratorVisitor {
    return TopLevelDecorator._visitor;
  }

  visitInterfaceDeclaration(node: InterfaceDeclaration) {
    if (node.decorators && node.decorators.length) {
      if (
        (node.decorators[0] as any).name.text === (this.visitor as any).name
      ) {
        this.visitor.currentPath = this.currentParentPath;
        (this.visitor as any).visitInterfaceDeclaration(node);
        return;
      }
    }
    super.visitInterfaceDeclaration(node);
  }

  afterParse(parser: Parser): void {
    mergeTransformer(this, this.visitor);
    this.visit((this as any).visitor.sources.filter(this.visitor.sourceFilter));
    //    (parser as any).sources = (parser as any).sources.filter((v) => !(this.visitor as any).removal.includes(v))
    (this.visitor as any).sources.forEach((source) =>
      (parser as any).sources.push(source),
    );
  }
}

export abstract class Decorator extends PathTransformVisitor {
  /**
   * Default filter that removes library files
   */
  get sourceFilter(): (s: Source) => boolean {
    return not(isStdlib);
  }

  get decoratorMatcher(): (node: DecoratorNode) => boolean {
    return (node: DecoratorNode) => {
      return decoratorName(node) === this.name;
    };
  }

  get name(): string {
    return "";
  }

  getDecorator(node: DeclarationStatement): DecoratorNode | null {
    return (
      (node.decorators && node.decorators.find(this.decoratorMatcher)) || null
    );
  }
}

export abstract class ClassDecorator extends Decorator {
  abstract visitFieldDeclaration(node: FieldDeclaration): void;
  abstract visitMethodDeclaration(node: MethodDeclaration): void;
  abstract visitClassDeclaration(node: ClassDeclaration): void;
}

export abstract class FunctionDecorator extends Decorator {
  abstract visitFunctionDeclaration(node: FunctionDeclaration): void;
}

export abstract class VariableDecorator extends Decorator {
  abstract visitVariableDeclaration(node: VariableDeclaration): void;
}
