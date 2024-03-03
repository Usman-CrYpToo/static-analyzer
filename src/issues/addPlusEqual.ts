import { RegexIssue } from '../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  title: '`a = a + b` is more gas effective than `a += b` for state variables (excluding arrays and mappings)',
  description:
    'This saves **16 gas per instance.**',
  regex: /\+=/gi,
};

export default issue;
