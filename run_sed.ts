import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const oldHandleSave = `  // };
    if (!conn) return;
    try {
  //     if (isNew) {
  //       await connInsert(conn, effectiveTable, [payload]);
      } else {
  //       // Update via upsert by id (works for both publishable + service-role).
  //       await connInsert(conn, effectiveTable, [payload], { upsert: true, onConflict: "id" });
      }
      setEditing(null);
      await load();
      if (conn.id === activeId) await onChanged();
    } catch (e: any) {
      alert(e?.message || String(e));
    }
  };`;

content = content.replace(oldHandleSave, `  };`);

const oldHandleDelete = `  const handleDelete = async (row: any) => {
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

content = content.replace(oldHandleDelete, newHandleDelete);

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);
