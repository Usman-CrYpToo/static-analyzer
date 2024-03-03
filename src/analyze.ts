import { couldStartTrivia } from "typescript";
import { InputType, Issue, Instance, Aanlyze } from "./types";
import { getCodeAtLineNumber, gettingTheLine, issueStatement, printIssueStatements } from "./utils";



export const analyzer = (file: InputType, issue: Issue[] ) => {
    let analyze: Aanlyze[] = [];
     for(const _issue of issue) {
        let instances: Instance[] = [];
        if(_issue.regexOrAST == 'Regex') {

            
            const matches = file.content.matchAll(_issue.regex);
            for(const i of matches) {
                //  console.log(i)
                 if(i.index && i.input){
                //  console.log(i.input[i.index])

                //  console.log(gettingTheLine(i.input,i.index))
                //  console.log(issueStatement(i.input, i.index));
                 instances.push({
                     fileName : file.name,
                     fileContent : issueStatement(i.input, i.index),
                     line : gettingTheLine(i.input,i.index).toString()
                 }
                 )
                   
                 }
            }

            if(instances.length > 0) {
                const detail: Issue = {
                     title : _issue.title,
                     regex : _issue.regex,
                     description : _issue.description,
                     regexOrAST: 'Regex'
                     
                }
                 analyze.push({
                    issue : detail,
                     instances
                 }) 
            }
        }
        else {
        if(!!_issue.detector) {
       let  issueInstances= _issue.detector(file);
        for(const i of issueInstances) {
            instances.push({
                fileName : file.name,
                fileContent : getCodeAtLineNumber(i.fileContent, Number(i.line)),
                line : i.line
            })
        }

        if(instances.length > 0) {
            const detail: Issue = {
                 title : _issue.title,
                 description : _issue.description,
                 regexOrAST: 'AST',
                 impact : _issue.impact
            }
             analyze.push({
                issue : detail,
                 instances
             }) 
        }

      
    }

        }
       printIssueStatements(analyze);
     }
}