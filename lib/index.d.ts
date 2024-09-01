import { InterfaceDeclaration, Node, MethodDeclaration, Parser, FunctionTypeNode, ParameterNode } from "assemblyscript";
import { TransformVisitor, Collection } from "./visitor/index.js";
declare class Parameter {
    name: string;
    typeName: string;
    constructor(name: string, typeName: string);
    static fromNode(node: ParameterNode): Parameter;
}
declare class CallableMethod {
    name: string;
    parameters: Parameter[];
    returnType: string;
    constructor(name: string, parameters: Parameter[], returnType: string);
    static fromNode(node: MethodDeclaration): CallableMethod;
    static parametersFromSignature(node: FunctionTypeNode): Parameter[];
    static returnTypeFromSignature(node: FunctionTypeNode): string;
}
declare class CallableClass {
    name: string;
    methods: CallableMethod[];
    constructor(name: string, methods: CallableMethod[]);
    static fromNode(node: InterfaceDeclaration): CallableClass;
}
export default class CallableTransform extends TransformVisitor {
    afterParse(parser: Parser): void;
    visitInterfaceDeclaration(node: InterfaceDeclaration, isDefault?: boolean): InterfaceDeclaration;
    visit(node: Collection<Node>): Collection<Node>;
    buildClass(klass: CallableClass): string;
    get name(): string;
}
export {};
