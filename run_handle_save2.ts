import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');
let lines = content.split('\\n');

// Find the index of "  // };"
const startIdx = lines.findIndex(l => l === "  // };");
const endIdx = lines.findIndex((l, i) => i > startIdx && l === "  };");

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx + 1, "  };");
  fs.writeFileSync('src/components/AdminBackendTab.tsx', lines.join('\\n'));
  console.log('Fixed handleSave');
} else {
  console.log('Could not find bounds', startIdx, endIdx);
}
