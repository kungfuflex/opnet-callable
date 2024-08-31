import {
  InterfaceDeclaration,
  MethodDeclaration,
  TypeNode,
  ClassDeclaration,
  Expression,
  Token,
  IndexSignature,
  ElementAccessExpression,
  ClassExpression,
  ExpressionStatement,
  ArrayLiteralExpression,
  FieldDeclaration,
  Statement,
  BinaryExpression,
  VariableStatement,
  TypeParameterNode,
  TypeName,
  TypeDeclaration,
  ObjectLiteralExpression,
  FunctionDeclaration,
  Parser,
  Source,
  FunctionExpression,
  FunctionTypeNode,
  ParameterNode,
  DeclarationStatement,
} from "assemblyscript";
import { toString, getTypeName, getName } from "./visitor/utils.js";
import {
  registerDecorator,
  BaseVisitor,
  SimpleParser,
  Decorator
} from "./visitor/index.js";


class Parameter {
  public name: string;
  public typeName: string;
  constructor(name: string, typeName: string) {
    this.name = name;
    this.typeName = typeName;
  }
  static fromNode(node: ParameterNode): Parameter {
    return new Parameter(toString(node.name), getName(node as any));
  }
}

class CallableMethod {
  public name: string;
  public parameters: Parameter[];
  public returnType: string;
  constructor(name: string, parameters: Parameter[], returnType: string) {
    this.name = name;
    this.parameters = parameters;
    this.returnType = returnType;
  }
  static fromNode(node: MethodDeclaration): CallableMethod {
    return new CallableMethod(
      toString(node.name),
      CallableMethod.parametersFromSignature(node.signature),
      CallableMethod.returnTypeFromSignature(node.signature),
    );
  }
  static parametersFromSignature(node: FunctionTypeNode): Parameter[] {
    return node.parameters.map((v) => Parameter.fromNode(v));
  }
  static returnTypeFromSignature(node: FunctionTypeNode): string {
    return getName(node.returnType as any);
  }
}

class CallableClass {
  public name: string;
  public methods: CallableMethod[];
  constructor(name: string, methods: CallableMethod[]) {
    this.name = name;
    this.methods = methods;
  }
  static fromNode(node: InterfaceDeclaration): CallableClass {
    return new CallableClass(
      toString(node.name),
      node.members.map((v) => CallableMethod.fromNode(v as MethodDeclaration)),
    );
  }
}

class CallableTransformer {
  public decorator: CallableDecorator;
  public source: Source[];
  constructor(decorator: CallableDecorator) {
    this.decorator = decorator;
  }
  visit(node: InterfaceDeclaration) {
    (this.decorator as any).visitClassExpression(SimpleParser.parseClassExpression(this.buildClass(CallableClass.fromNode(node))));
  }
  buildClass(klass: CallableClass): string {
    return (
      `class ${klass.name} implements callable.Callable {\n` +
      `  public _target: callable.Address;\n` +
      `  constructor(address: callable.Address) {\n` +
      `    this._target = address;\n` +
      `  }\n` +
      `  static at(address: callable.Address): ${klass.name} {\n` +
      `    return new ${klass.name}(address);\n` +
      `  }\n` +
      klass.methods.map((v, i, ary) => {
        return (
          `  ${v.name}(${v.parameters.map(({ name, typeName }, i) => {
            return `${name}: ${typeName}` + (i !== ary.length - 1 ? "," : "");
          })}): ${v.returnType} {\n` +
          `    const writer = new callable.BytesWriter();\n` +
          `    writer.writeSelector(callable.encodeSelector("${v.name}"));\n` +
          v.parameters
            .map((v) => {
              switch (v.typeName) {
                case "string":
                  return `    writer.writeStringWithLength(${v.name});\n`;
                case "u256":
                  return `    writer.writeU256(${v.name});\n`;
                case "u128":
                  return `    write.writeU256(u256.fromU128(${v.name}));\n`;
                case "u64":
                case "u32":
                case "u16":
                case "u8":
                  return `    writer.write${v.typeName.toUpperCase()}(${v.name});\n`;
                case "boolean":
                  return `    writer.writeBoolean(${v.name});\n;`;
                case "ArrayBuffer":
                  return `    writer.writeBytesWithLength(Uint8Array.wrap(${v.name}));\n`;
                case "Uint8Array":
                  return `    writer.writeBytesWithLength(${v.name});\n`;
                case "Address":
                  return `    writer.writeAddress(${v.name});\n`;
                case "Address[]":
                case "Array<Address>":
                  return `    writer.writeAddressArray(${v.name});\n`;
                case "u256[]":
                case "Array<u256>":
                  return `    writer.writeTuple(${v.name});\n`;
                default:
                  return `    throw Error('no type detected');`;
              }
            })
            .join("") +
          `    const reader = callable.extcall(this._target, writer);\n` +
          (() => {
            switch (v.returnType) {
              case "string":
                return `    return reader.readStringWithLength();\n`;
              case "u256":
                return `    return reader.readU256();\n`;
              case "u128":
                return `    return reader.readU256().toU128();\n`;
              case "u64":
              case "u32":
              case "u16":
              case "u8":
                return `    return reader.read${v.returnType.toUpperCase()}();\n`;
              case "boolean":
                return `    return reader.readBoolean();\n;`;
              case "ArrayBuffer":
                return `    return reader.readBytesWithLength().buffer;\n`;
              case "Uint8Array":
                return `    return Uint8Array.wrap(reader.readBytesWithLength());\n`;
              case "Address":
                return `    return reader.readAddress(${v.name});\n`;
              case "Address[]":
              case "Array<Address>":
                return `    return reader.readAddressArray();\n`;
              case "u256[]":
              case "Array<u256>":
                return `    return reader.readTuple();\n`;
              default:
                return `   return changetype<${v.returnType}>(0)\n`;
            }
          })() +
          `  }\n`
        );
      }) +
      `}`
    );
  }
}

class CallableDecorator extends Decorator {
  get name(): string {
    return "callable";
  }
  visitInterfaceDeclaration(
    node: InterfaceDeclaration,
    isDefault = false,
  ): void {
    new CallableTransformer(this).visit(node);
  }
}

export default registerDecorator(new CallableDecorator());
