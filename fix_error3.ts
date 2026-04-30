import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const targetStr = `  const [connId, setConnId] = useState<string>(activeId);
  const [table, setTable] = useState<string>(APP_TABLES[0]);
  const [customTable, setCustomTable] = useState("");
  // const [rows, setRows] = useState<any[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ row: any; isNew: boolean } | null>(null);`;

const replStr = `  const [connId, setConnId] = useState<string>(activeId);
  const [table, setTable] = useState<string>(APP_TABLES[0]);
  const [customTable, setCustomTable] = useState("");
  const [editing, setEditing] = useState<{ row: any; isNew: boolean } | null>(null);`;

content = content.replace(targetStr, replStr);

console.log('Replaced error?', content.indexOf(replStr) !== -1);

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);
