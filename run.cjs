const { spawn } = require('child_process');
const child = spawn('npm', ['run', 'dev']);

child.stdout.on('data', (data) => console.log(data.toString()));
child.stderr.on('data', (data) => console.error(data.toString()));

setTimeout(() => {
  const http = require('http');
  http.get('http://localhost:3000/', (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`BODY: ${data.substring(0, 500)}`));
  }).on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
  });
}, 25000);

setTimeout(() => {
  child.kill();
  process.exit(0);
}, 60000);
