import { RegexIssue } from '../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  title: 'Use Custom Errors instead of Revert Strings to save Gas',
  description:
    'Custom errors are available from solidity version 0.8.4. Custom errors save [**~50 gas**]',
  regex: /(require|revert)\(.*,?".*"\)/gi,
};

export default issue;
