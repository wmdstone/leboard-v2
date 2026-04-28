const fs = require('fs');

const corrupted = fs.readFileSync('src/App.tsx', 'utf8');
const X = "{appSettings.appName || 'PPMH'}";

// Just try a simple split and join first
let recovered = corrupted.split(X).join("");

fs.writeFileSync('src/App.tsx.recovered', recovered);
console.log("Recovered length:", recovered.length);
console.log("First 100 chars of recovered:");
console.log(recovered.substring(0, 100));
