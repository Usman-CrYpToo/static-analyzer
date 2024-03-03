import { analyzer } from "./analyze";
import compileAndBuildAST from "./compile";
import issue from "./issues";
import { InputType } from "./types";
import fs from 'fs';

const main = (
    basePath : string,
    scopePath : string | null
) => {
     const filePath  = basePath + scopePath ;
     if(!filePath.endsWith(".sol")) {
         throw new Error("file path is not given");
     }else {
         const fileName: string[] = []
         fileName.push(filePath);
         
        const dataAndAst = compileAndBuildAST(fileName);
      
        let compiledfile : InputType[] = [];
        for(const data of dataAndAst) {
          if(data.ast) {
            compiledfile.push( {
                name : data.file,
                content : data.content,
                 ast : data.ast
             })
            }
        }
        if(fs.existsSync('regexIssueReport.md')) {
             fs.writeFileSync('regexIssueReport.md', '');
        }

        for(const f of compiledfile) {
             analyzer(f, issue);
        }
     }
}


export default main;
