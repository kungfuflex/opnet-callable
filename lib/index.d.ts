import { InterfaceDeclaration, MethodDeclaration, FunctionTypeNode, ParameterNode } from "visitor-as/as";
import { Decorator } from "visitor-as";
export declare class Parameter {
    name: string;
    typeName: string;
    constructor(name: string, typeName: string);
    static fromNode(node: ParameterNode): Parameter;
}
export declare class CallableMethod {
    name: string;
    parameters: Parameter[];
    returnType: string;
    constructor(name: string, parameters: Parameter[], returnType: string);
    static fromNode(node: MethodDeclaration): CallableMethod;
    static parametersFromSignature(node: FunctionTypeNode): Parameter[];
    static returnTypeFromSignature(node: FunctionTypeNode): string;
}
export declare class CallableClass {
    name: string;
    methods: CallableMethod[];
    constructor(name: string, methods: CallableMethod[]);
    static fromNode(node: InterfaceDeclaration): CallableClass;
}
export declare class CallableTransformer {
    visit(node: InterfaceDeclaration): void;
    buildClass(klass: CallableClass): string;
}
export declare class CallableDecorator extends Decorator {
    get name(): string;
    get sourceFilter(): (_: any) => boolean;
    visitInterfaceDeclaration(node: InterfaceDeclaration, isDefault?: boolean): void;
}
