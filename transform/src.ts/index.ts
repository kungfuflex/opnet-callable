import {
  InterfaceDeclaration,
  IdentifierExpression,
  Node,
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
} from "assemblyscript/dist/assemblyscript.js";
import { cloneNode, toString, getName } from "visitor-as/dist/utils.js";
import {
  TransformVisitor,
  SimpleParser
} from "visitor-as/dist/index.js";

const DEBUG = process.env.OPNET_CALLABLE_DEBUG;

const ln = (v) => {
  if (DEBUG) console.log(v);
  return v;
};

class LessSimpleParser extends SimpleParser {
  static parseClassDeclaration(s: string): ClassDeclaration {
    const tn = (this as any).getTokenizer(s);
    tn.next();
    const res = new Parser().parseClassOrInterface(tn, 0, [], tn.pos || 0);
    if (res == null) {
        throw new Error("Failed to parse the expression: '" + s + "'");
    }
    return res as ClassDeclaration;
  }
}


const buildTypeName = (v) => {
  let identifier = v.name.identifier.text;
  if (identifier === 'Address') identifier = 'callable.Address';
  return identifier + (v.typeArguments.length === 0 ? '' : '<' + v.typeArguments.map((v) => buildTypeName(v)).join(', ') + '>');
};

class Parameter {
  public name: string;
  public typeName: string;
  constructor(name: string, typeName: string) {
    this.name = name;
    this.typeName = typeName;
  }
  static fromNode(node: ParameterNode): Parameter {
    return new Parameter(toString(node.name), buildTypeName(node.type));
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
    return (node as any).returnType.name.identifier.text as string;
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

const recurseApplyRange = (v: any, range: any) => {
  if (typeof v === 'object') {
    if (v === null) return;
    if (Array.isArray(v)) return v.forEach((v) => recurseApplyRange(v, range));
    if (v.range) v.range = range;
    Object.entries(v).forEach(([k, v]) => {
      if (k === 'range') return;
      return recurseApplyRange(v, range);
    });
  }
};

export default class CallableTransform extends TransformVisitor {
  afterParse(parser: Parser): void {
    // Create new transform
    // Loop over every source
    for (const source of parser.sources) {
      // Ignore all lib (std lib). Visit everything else.
      if (!source.isLibrary && !source.internalPath.startsWith(`~lib/`)) {
        this.visit(source);
      }
    }
  }
  visitInterfaceDeclaration(node: InterfaceDeclaration, isDefault: boolean = false): InterfaceDeclaration {
    if (node.decorators && node.decorators.length) {
      if (((node.decorators[0]).name as IdentifierExpression).text === this.name) {
        const cloned = cloneNode(node);
        const klass = LessSimpleParser.parseClassDeclaration(ln(this.buildClass(CallableClass.fromNode(node))));
	cloned.kind = klass.kind;
	cloned.name = klass.name;
	cloned.decorators = [];
	const members = cloned.members;
	cloned.members = klass.members;
	cloned.members.forEach((v, i, ary) => {
          const member = members[Math.max(0, i - 3)];
          recurseApplyRange(v, member.range);
	});
	return cloned;
      }
    }
    return super.visitInterfaceDeclaration(node);
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
          `  ${v.name}(${v.parameters.map((v, i, ary) => {
            let { name, typeName } = v;
            if (typeName === 'Address') typeName = 'callable.Address';
            return `${name}: ${typeName}` + (i === ary.length - 1 ? "" : ", ");
          }).join('')}): ${v.returnType} {\n` +
          `    const writer = callable.BytesWriter();\n` +
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
                  return `    writer.writeBoolean(${v.name});\n`;
                case "ArrayBuffer":
                  return `    writer.writeBytesWithLength(Uint8Array.wrap(${v.name}));\n`;
                case "Uint8Array":
                  return `    writer.writeBytesWithLength(${v.name});\n`;
                case "Address":
                case "callable.Address":
                  return `    writer.writeAddress(${v.name});\n`;
                case "Address[]":
                case "callable.Address[]":
                case "Array<Address>":
                case "Array<callable.Address>":
                  return `    writer.writeAddressArray(${v.name});\n`;
                case "u256[]":
                case "Array<u256>":
                  return `    writer.writeTuple(${v.name});\n`;
                default:
                  return `    throw Error('no type detected');\n`;
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
              case "callable.Address":
                return `    return reader.readAddress();\n`;
              case "Address[]":
              case "callable.Address[]":
              case "Array<Address>":
              case "Array<callable.Address>":
                return `    return reader.readAddressArray();\n`;
              case "u256[]":
              case "Array<u256>":
                return `    return reader.readTuple();\n`;
              case 'void':
	        return `    return;\n`;
	      default:
                return `    return changetype<${v.returnType}>(0);\n`;
            }
          })() +
          `  }\n`
        );
      }).join('') +
      `}`
    );
  }
  get name(): string {
    return "callable";
  }
}

