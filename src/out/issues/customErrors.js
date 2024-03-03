"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const issue = {
    regexOrAST: 'Regex',
    title: 'Use Custom Errors instead of Revert Strings to save Gas',
    description: 'Custom errors are available from solidity version 0.8.4. Custom errors save [**~50 gas**]',
    regex: /(require|revert)\(.*,?".*"\)/gi,
};
exports.default = issue;
//# sourceMappingURL=customErrors.js.map