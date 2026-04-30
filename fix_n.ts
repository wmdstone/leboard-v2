import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

// The file currently has literal \\n strings linking lines!
// Because I joined with '\\\\n'.
// I need to split it by literal '\\n'.
let realContent = content.split('\\\\n').join('\\n');

fs.writeFileSync('src/components/AdminBackendTab.tsx', realContent);
