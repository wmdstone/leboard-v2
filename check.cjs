const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { console.log(`BODY: ${data.substring(0, 1000)}`); });
}).on('error', (e) => {
  console.error(`ERROR: ${e.message}`);
});
