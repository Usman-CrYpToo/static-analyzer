"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issue = {
    regexOrAST: 'Regex',
    title: '`a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)',
    description: 'This saves **16 gas per instance.**',
    regex: /\+=/gi,
};
exports.default = issue;
//# sourceMappingURL=addPlusEqual.js.map