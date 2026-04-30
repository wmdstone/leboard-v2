const fs = require('fs');
let content = fs.readFileSync('src/lib/firebaseApi.ts', 'utf-8');
content = content.replace(
  'const auth = headers?.get?.("Authorization") || headers?.Authorization;',
  'let auth = null;\n      if (headers && typeof headers.get === "function") auth = headers.get("Authorization") || headers.get("authorization");\n      else if (headers) auth = headers.Authorization || headers.authorization;'
);
fs.writeFileSync('src/lib/firebaseApi.ts', content);
