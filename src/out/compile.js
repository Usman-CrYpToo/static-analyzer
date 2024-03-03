"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const semver_1 = __importDefault(require("semver"));
const versions = Object.keys(require('../package.json').dependencies)
    .filter(s => s.startsWith('solc-'))
    .map(s => s.replace('solc-', ''))
    .sort(semver_1.default.compare)
    .reverse();
const compile = (version, toCompile) => {
    const solc = require(`solc-${version}`);
    const input = {
        language: 'Solidity',
        sources: toCompile,
        settings: {
            outputSelection: { '*': { '': ['ast'] } }
        }
    };
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    return output;
};
const compileAndBuildAST = (filePath) => {
    let source = [];
    let i = 0;
    for (const file of filePath) {
        const content = fs_1.default.readFileSync(file, { encoding: 'utf8', flag: 'r' });
        console.log(content);
        if (!!content) {
            if (!content.match(/pragma solidity (.*);/)) {
                throw new Error(`Cannot find pragma in ${file}`);
            }
            else {
                source.push({
                    file: file.split("/")[file.split("/").length - 1],
                    index: i++,
                    content,
                    version: content.match(/pragma solidity (.*);/)[1],
                    compiled: false
                });
            }
        }
    }
    let k = 0;
    for (const version of versions) {
        const filteredSource = source.filter(f => semver_1.default.satisfies(version, f.version) && !f.compiled);
        if (!!filteredSource && filteredSource.length > 0) {
            for (const f of filteredSource) {
                source[f.index].compiled = true;
            }
            const output = compile(version, filteredSource.reduce((res, curr) => {
                res[curr.file] = { content: curr.content };
                return res;
            }, {}));
            if (output.errors && output.errors.length > 0) {
                for (const error of output.errors) {
                    if (error.type === 'Warning')
                        console.warn(error);
                    else
                        console.error(error);
                }
            }
            for (const f of filteredSource)
                if (!output.sources[f.file]?.ast)
                    throw new Error(`ast not found in the ${f.file}`);
                else
                    source[f.index].ast = output.sources[f.file].ast;
        }
        for (const f of source) {
            if (!!f.compiled)
                break;
        }
    }
    return source;
};
exports.default = compileAndBuildAST;
//# sourceMappingURL=compile.js.map