import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');
let lines = content.split('\\n');

let replaced = false;
for (let i=0; i<lines.length; i++) {
  if (lines[i].includes('const [error, setError] = useState<string | null>(null);') && lines[i+1] && lines[i+1].includes('const [editing, setEditing]')) {
    lines[i] = '  // const [error, setError] = useState<string | null>(null);';
    replaced = true;
    break;
  }
}

console.log('Replaced error?', replaced);
fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n'));
