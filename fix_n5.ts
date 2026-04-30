import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');
let lines = content.split('\\n');

// Line 1231 contains `}` which is index 1230.
lines = lines.slice(0, 1231);

fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n') + '\\n');
