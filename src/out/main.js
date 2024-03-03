"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analyze_1 = require("./analyze");
const compile_1 = __importDefault(require("./compile"));
const issues_1 = __importDefault(require("./issues"));
const fs_1 = __importDefault(require("fs"));
const main = (basePath, scopePath) => {
    const filePath = basePath + scopePath;
    if (!filePath.endsWith(".sol")) {
        throw new Error("file path is not given");
    }
    else {
        const fileName = [];
        fileName.push(filePath);
        const dataAndAst = (0, compile_1.default)(fileName);
        let compiledfile = [];
        for (const data of dataAndAst) {
            if (data.ast) {
                compiledfile.push({
                    name: data.file,
                    content: data.content,
                    ast: data.ast
                });
            }
        }
        if (fs_1.default.existsSync('regexIssueReport.md')) {
            fs_1.default.writeFileSync('regexIssueReport.md', '');
        }
        for (const f of compiledfile) {
            (0, analyze_1.analyzer)(f, issues_1.default);
        }
    }
};
exports.default = main;
//# sourceMappingURL=main.js.map