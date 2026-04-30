import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');
let lines = content.split('\\n');

lines[542] = '  // const [error, setError] = useState<string | null>(null);';

fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n'));
