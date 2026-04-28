import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const sIdx = content.indexOf("saveMutation.mutate({ payload, isNew });");
const eIdx = content.indexOf("  return (", sIdx);

if (sIdx !== -1 && eIdx !== -1) {
  const newContent = content.substring(0, sIdx + "saveMutation.mutate({ payload, isNew });\\n  };\\n\\n".length) + content.substring(eIdx);
  fs.writeFileSync('src/components/AdminBackendTab.tsx', newContent);
  console.log('Fixed syntax');
} else {
  console.log('Could not find', sIdx, eIdx);
}
