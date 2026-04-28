import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

// The file has some weird null or invalid chars at the end maybe.
// The error was "src/components/AdminBackendTab.tsx(1232,1): error TS1127: Invalid character."
// I will just remove all characters from line 1230 onwards and add the closing brace.
const idx = content.lastIndexOf('  );\\n}');
if (idx !== -1) {
  content = content.substring(0, idx + 6) + '\\n';
}

// replace the broken log.join
// actually, I can just replace log.join("\\n") safely:
content = content.replace(/log\\.join\\("[\\s\\S]?"\\)/, 'log.join("\\\\n")');

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);

