import * as fs from 'fs';

let content = fs.readFileSync('src/components/AdminBackendTab.tsx', 'utf-8');

const badCode = `  // };
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

content = content.replace(badCode, `  };`);

fs.writeFileSync('src/components/AdminBackendTab.tsx', content);
