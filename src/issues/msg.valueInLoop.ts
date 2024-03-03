import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, RegexIssue } from '../types';
import { instanceFromSRC, lineFromIndex } from '../utils';

const issue: ASTIssue = {
  regexOrAST: 'AST',
  title: 'Using `msg.value` in a loop',
  description: 'This is a classic dangerous pattern',
  detector: (files: InputType):any  => {
    let instances: Instance[] = [];
   
      if (!!files.ast) {
        for (const a of findAll('ForStatement', files.ast)) {
          for (const b of findAll('MemberAccess', a)) {
            if (b.memberName == 'value' && b.expression && b.expression['name'] == 'msg') {
              instances.push(instanceFromSRC(files, b.src));
            }
          }
        }
      }
      return instances;
    }
  }


export default issue;
