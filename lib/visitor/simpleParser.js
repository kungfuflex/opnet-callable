import { Parser, Tokenizer, Source, } from "assemblyscript/dist/assemblyscript.js";
export class SimpleParser {
    static get parser() {
        return new Parser();
    }
    static getTokenizer(s, file = "index.ts") {
        return new Tokenizer(new Source(0 /* SourceKind.User */, file, s));
    }
    static parseClassDeclaration(s) {
        const tn = this.getTokenizer(s);
        tn.next();
        const parser = this.parser;
        const res = parser.parseClassOrInterface(tn, 0, [], tn.pos || 0);
        if (res == null) {
            throw new Error(parser.diagnostics.join(""));
        }
        return res;
    }
    static parseExpression(s) {
        const res = this.parser.parseExpression(this.getTokenizer(s));
        if (res == null) {
            throw new Error("Failed to parse the expression: '" + s + "'");
        }
        return res;
    }
    static parseStatement(s, topLevel = false) {
        const res = this.parser.parseStatement(this.getTokenizer(s), topLevel);
        if (res == null) {
            throw new Error("Failed to parse the statement: '" + s + "'");
        }
        return res;
    }
    static parseTopLevelStatement(s, namespace) {
        const res = this.parser.parseTopLevelStatement(this.getTokenizer(s), namespace);
        if (res == null) {
            throw new Error("Failed to parse the top level statement: '" + s + "'");
        }
        return res;
    }
    static parseClassMember(s, _class) {
        let res = this.parser.parseClassMember(this.getTokenizer(s, _class.range.source.normalizedPath), _class);
        if (res == null) {
            throw new Error("Failed to parse the class member: '" + s + "'");
        }
        return res;
    }
}
//# sourceMappingURL=simpleParser.js.map