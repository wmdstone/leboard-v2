import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const handleDeleteStr = `  const handleDelete = async (row: any) => {
    if (!conn || !row.id) return;
    if (!confirm("Delete this row?")) return;
    try {
      await connDeleteById(conn, effectiveTable, row.id);
      await load();
      if (conn.id === activeId) await onChanged();
    } catch (e: any) {
      alert(e?.message || String(e));
    }
  };`;

const newHandleDelete = `  const removeMutation = useMutation({
    mutationFn: async (rowId: string) => {
      if (!conn) throw new Error("No conn");
      await connDeleteById(conn, effectiveTable, rowId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['db-rows', conn?.id, effectiveTable] });
      if (conn?.id === activeId) await onChanged();
    },
    onError: (e: any) => alert(e?.message || String(e)),
  });

  const handleDelete = async (row: any) => {
    if (!conn || !row.id) return;
    if (!confirm("Delete this row?")) return;
    removeMutation.mutate(row.id);
  };`;

content = content.replace(handleDeleteStr, newHandleDelete);

const loadRgx = /  \/\/ const load = async \(\) => {[\s\S]*?\}, \[connId, table, customTable\]\);/;
content = content.replace(loadRgx, '');

content = content.replace("  const [error, setError] = useState<string | null>(null);", "  // const [error, setError] = useState<string | null>(null);");

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);
