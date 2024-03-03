"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzer = void 0;
const utils_1 = require("./utils");
const analyzer = (file, issue) => {
    let analyze = [];
    for (const _issue of issue) {
        let instances = [];
        if (_issue.regexOrAST == 'Regex') {
            const matches = file.content.matchAll(_issue.regex);
            for (const i of matches) {
                //  console.log(i)
                if (i.index && i.input) {
                    //  console.log(i.input[i.index])
                    //  console.log(gettingTheLine(i.input,i.index))
                    //  console.log(issueStatement(i.input, i.index));
                    instances.push({
                        fileName: file.name,
                        fileContent: (0, utils_1.issueStatement)(i.input, i.index),
                        line: (0, utils_1.gettingTheLine)(i.input, i.index).toString()
                    });
                }
            }
            if (instances.length > 0) {
                const detail = {
                    title: _issue.title,
                    regex: _issue.regex,
                    description: _issue.description,
                    regexOrAST: 'Regex'
                };
                analyze.push({
                    issue: detail,
                    instances
                });
            }
        }
        else {
            if (!!_issue.detector) {
                let issueInstances = _issue.detector(file);
                for (const i of issueInstances) {
                    instances.push({
                        fileName: file.name,
                        fileContent: (0, utils_1.getCodeAtLineNumber)(i.fileContent, Number(i.line)),
                        line: i.line
                    });
                }
                if (instances.length > 0) {
                    const detail = {
                        title: _issue.title,
                        description: _issue.description,
                        regexOrAST: 'AST',
                        impact: _issue.impact
                    };
                    analyze.push({
                        issue: detail,
                        instances
                    });
                }
            }
        }
        (0, utils_1.printIssueStatements)(analyze);
    }
};
exports.analyzer = analyzer;
//# sourceMappingURL=analyze.js.map