"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
const fileNames = (0, utils_1.recursiveExploration)(path_1.default.join(__dirname, '/'), '.ts');
const issues = [];
for (let file of fileNames) {
    file = path_1.default.join(__dirname, file);
    if (file !== __filename) {
        issues.push(require(file).default);
    }
}
exports.default = issues;
//# sourceMappingURL=index.js.map