import type { SourceUnit } from "solidity-ast"


export type ToCompile = { 
    [file: string]: { content: string } 
};

export type Sources = {
     file: string;
      index: number; 
      content: string; 
      version: string;
       compiled: boolean; 
       ast?: SourceUnit 
    }

    export type Instance = {
        fileName: string; // Name of the file in which the issue has been found
        fileContent: string; // Content of the file in which the issue has been found
        line: string;
        endLine?: number;
      };


    export type Issue = RegexIssue | ASTIssue;

    // Type to follow to add an issue detected by a regex
    export type RegexIssue = {
      title: string;
      regex: RegExp;
      description?: string;
      regexOrAST: 'Regex';
    };
    
    // Type to follow to add an issue detected by AST analysis
    export type ASTIssue = {
      title: string;
      impact?: string;
      description?: string;
      detector?:  (files: InputType) => Instance[]; // Function analyzing the AST and returning instances of the issue
      regexOrAST: 'AST';
    };

    export type InputType = { content: string; name: string; ast: SourceUnit };

    export type Aanlyze = { issue: Issue; instances: Instance[] }