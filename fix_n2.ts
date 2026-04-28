import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

// The string "\\n" was replaced with a real newline char inside join("...") 
// Let's replace real newline inside join("
// ") back to \\n
const badString = \`log.join("
")\`;
content = content.replace(badString, 'log.join("\\\\n")');

// Lines from 1232 are just garbage. Let's slice the array up to line 1231.
let lines = content.split('\\n');
lines = lines.slice(0, 1231);

fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n'));
