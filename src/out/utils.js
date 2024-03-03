"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeAtLineNumber = exports.instanceFromSRC = exports.lineFromIndex = exports.printIssueStatements = exports.issueStatement = exports.gettingTheLine = exports.recursiveExploration = void 0;
const fs_1 = __importDefault(require("fs"));
const recursiveExploration = (basePath, extension) => {
    let tempFileName = fs_1.default.readdirSync(basePath);
    let fileNames = [];
    for (const file of tempFileName) {
        if (file.endsWith(".ts")) {
            fileNames.push(file);
        }
    }
    return fileNames;
};
exports.recursiveExploration = recursiveExploration;
const gettingTheLine = (input, index) => {
    const line = input.slice(index).split("\n");
    return line.length + 1;
};
exports.gettingTheLine = gettingTheLine;
const issueStatement = (input, index) => {
    const _find = input.slice(index, input.length);
    const statement = _find.slice(0, _find.indexOf("\n"));
    return (statement);
};
exports.issueStatement = issueStatement;
const printIssueStatements = (analyze) => {
    let _issue = '';
    let i = 0;
    for (const o of analyze) {
        _issue = `\n\n\n \t ###ISSUE NO : ${++i} \n  Title :: ${o.issue.title} \n \n Description :: ${o.issue.description}  \n\n Regex or Ast ::${o.issue.regexOrAST} \n\n`;
        for (const i of o.instances.reverse()) {
            _issue += `\t\t\t\t###################\n fileName :: ${i.fileName} \n\n${i.line} | +++++ ${i.fileContent} `;
        }
    }
    fs_1.default.appendFileSync("regexIssueReport.md", _issue, { encoding: 'utf8' });
};
exports.printIssueStatements = printIssueStatements;
const lineFromIndex = (file, index) => {
    return 1 + [...file?.slice(0, index).matchAll(/\n/g)].length;
};
exports.lineFromIndex = lineFromIndex;
const instanceFromSRC = (file, start, end) => {
    return {
        fileName: file.name,
        fileContent: file.content,
        line: (0, exports.lineFromIndex)(file.content, parseInt(start.split(':')[0])).toString(),
        endLine: !!end ? (0, exports.lineFromIndex)(file.content, parseInt(end.split(':')[0])) : undefined,
    };
};
exports.instanceFromSRC = instanceFromSRC;
function getCodeAtLineNumber(contractData, lineNumber) {
    const lines = contractData.split('\r\n');
    return lines[lineNumber - 1];
}
exports.getCodeAtLineNumber = getCodeAtLineNumber;
//# sourceMappingURL=utils.js.map