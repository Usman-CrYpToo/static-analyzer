import fs from "fs";
import { Aanlyze, InputType, Instance } from "./types";

export const recursiveExploration = (basePath : string , extension : string) => {
     let tempFileName = fs.readdirSync(basePath);
     let fileNames: string[] = [];
     for(const file of tempFileName) {
         if(file.endsWith(".ts")){
             fileNames.push(file)
         }
     }
     
     return fileNames;
}

export const gettingTheLine = (input: string, index: number) => {
     const line = input.slice(index).split("\n");
     return line.length + 1;

}

export const issueStatement = (input: string, index: number) => {
    const _find = input.slice(index, input.length);
    const statement = _find.slice(0, _find.indexOf("\n"));
    return(statement);  
}

export const printIssueStatements = (analyze: Aanlyze[]) => {
    let _issue : string = '';
    let i :number = 0;
     for(const o of analyze) {
          _issue = `\n\n\n \t ###ISSUE NO : ${++i} \n  Title :: ${o.issue.title} \n \n Description :: ${o.issue.description}  \n\n Regex or Ast ::${o.issue.regexOrAST} \n\n`;
        
         for(const i of o.instances.reverse()) {
          
            _issue += `\t\t\t\t###################\n fileName :: ${i.fileName} \n\n${i.line} | +++++ ${i.fileContent} `
         }
        
     }
         
         fs.appendFileSync("regexIssueReport.md", _issue, { encoding : 'utf8'})
} 

export const lineFromIndex = (file: string, index: number) => {
    return 1 + [...file?.slice(0, index).matchAll(/\n/g)!].length;
  };
  

  export const instanceFromSRC = (file: InputType[][0], start: string, end?: string): Instance => {
    return {
      fileName: file.name,
      fileContent: file.content,
      line: lineFromIndex(file.content, parseInt(start.split(':')[0])).toString(),
      endLine: !!end ? lineFromIndex(file.content, parseInt(end.split(':')[0])) : undefined,
    };
  };
  

 export function getCodeAtLineNumber(contractData: string, lineNumber: number) {

  const lines = contractData.split('\r\n');
  return lines[lineNumber - 1];
}