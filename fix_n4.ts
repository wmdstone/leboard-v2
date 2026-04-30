import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');
let lines = content.split('\\n');

lines = lines.slice(0, 1232); // Keep lines exactly up to 1232

// Filter out any trailing lines that are just whitespace OR have weird chars
while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
  lines.pop();
}

fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n') + '\\n');
