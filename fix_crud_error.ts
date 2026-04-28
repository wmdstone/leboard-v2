import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

// The first replace messed up the top one in ConnectionForm probably
content = content.replace("  // const [error, setError] = useState<string | null>(null);", "  const [error, setError] = useState<string | null>(null);");

// Now we want the one in CrudSection.
// I will just use RegExp and target it specifically in function CrudSection
const fixErrorState = /function CrudSection\(\{[\s\S]*?const \[customTable, setCustomTable\] = useState\(""\);\n  \/\/ const \[rows, setRows\].*\n  \/\/ const \[columns, setColumns\].*\n  \/\/ const \[loading, setLoading\].*\n  const \[error, setError\] = useState<string \| null>\(null\);/;

const repl = `function CrudSection({
  connections,
  activeId,
  onChanged,
}: {
  connections: DbConnection[];
  activeId: string;
  onChanged: () => Promise<void> | void;
}) {
  const [connId, setConnId] = useState<string>(activeId);
  const [table, setTable] = useState<string>(APP_TABLES[0]);
  const [customTable, setCustomTable] = useState("");
  // const [rows, setRows] = useState<any[]>([]);
  // const [columns, setColumns] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);`;

content = content.replace(fixErrorState, repl);

content = content.replace(/await load\(\);/g, `await queryClient.invalidateQueries({ queryKey: ['db-rows', conn?.id, effectiveTable] });`);

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);

