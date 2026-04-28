import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const oldLoad = `  // const load = async () => {
    if (!conn) return;
    setLoading(true);
    setError(null);
    try {
      const list = await connSelect(conn, effectiveTable);
      setRows(list);
      const cols = new Set<string>();
      list.forEach((r: any) => Object.keys(r).forEach((k) => cols.add(k)));
      setColumns(Array.from(cols));
    } catch (e: any) {
      setError(String(e?.message || e));
      setRows([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connId, table, customTable]);`;

content = content.replace(oldLoad, ``);

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);
