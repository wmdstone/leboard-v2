import fs from 'fs';
import path from 'path';

const dir = process.cwd();
const files = fs.readdirSync(dir);

for (const file of files) {
  if (
    file.endsWith('.cjs') ||
    (file.startsWith('fix') && file.endsWith('.ts')) ||
    (file.startsWith('rep') && (file.endsWith('.ts') || file.endsWith('.cjs'))) ||
    (file.startsWith('run_') && file.endsWith('.ts')) ||
    (file.startsWith('script') && file.endsWith('.js')) ||
    (file.startsWith('update') && file.endsWith('.cjs')) ||
    (file.startsWith('clean') && file.endsWith('.ts')) ||
    (file.startsWith('extract') && file.endsWith('.js')) ||
    (file.startsWith('restore') && file.endsWith('.cjs'))
  ) {
    fs.unlinkSync(path.join(dir, file));
    console.log('Deleted', file);
  }
}
