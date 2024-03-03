"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("solidity-ast/utils");
const utils_2 = require("../utils");
const issue = {
    regexOrAST: 'AST',
    title: 'Using `msg.value` in a loop',
    description: 'This is a classic dangerous pattern',
    detector: (files) => {
        let instances = [];
        if (!!files.ast) {
            for (const a of (0, utils_1.findAll)('ForStatement', files.ast)) {
                for (const b of (0, utils_1.findAll)('MemberAccess', a)) {
                    if (b.memberName == 'value' && b.expression && b.expression['name'] == 'msg') {
                        instances.push((0, utils_2.instanceFromSRC)(files, b.src));
                    }
                }
            }
        }
        return instances;
    }
};
exports.default = issue;
//# sourceMappingURL=msg.valueInLoop.js.map