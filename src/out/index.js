"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./main"));
const basePath = process.argv.length > 2 ? (process.argv[2].endsWith("/") ? process.argv[2] : process.argv[2] + "/") : "contract/";
const scopePath = process.argv.length > 3 ? (process.argv[3].endsWith(".sol") ? process.argv[3] : process.argv[3] + ".sol") : null;
(0, main_1.default)(basePath, scopePath);
//# sourceMappingURL=index.js.map