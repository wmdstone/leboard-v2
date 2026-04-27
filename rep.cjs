const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `        <div className="flex items-center gap-2">
          <button 
            onClick={async () => {
              setIsRefreshing(true);
              await refreshData();
              setIsRefreshing(false);
            }}
            disabled={isRefreshing}
            className="bg-base-100 border border-base-200 px-4 py-2 rounded-xl text-sm font-bold text-text-muted hover:bg-base-200 flex items-center gap-2 active:scale-95 transition-all"
          >
            {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreHorizontal className="w-4 h-4" />}
            Force Sync
          </button>

          <button 
            onClick={async () => {
              await apiFetch('/api/logout', { method: 'POST' });
              removeLocalToken();
              queryClient.setQueryData(['auth'], { authenticated: false });
              trackEvent('admin_logout', { isAdmin: true });
              navigateTo('/');
            }}
            className="bg-base-100 border border-red-200 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 flex items-center justify-center active:scale-95 transition-all md:hidden"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>`;

// Use regex to replace the exact block while ignoring slight whitespace differences
content = content.replace(/<button\s+onClick=\{async \(\) => \{\s+setIsRefreshing\(true\);\s+await refreshData\(\);\s+setIsRefreshing\(false\);\s+\}\}\s+disabled=\{isRefreshing\}\s+className="bg-base-100 border border-base-200 px-4 py-2 rounded-xl text-sm font-bold text-text-muted hover:bg-base-200 flex items-center gap-2 active:scale-95 transition-all"\s*>\s*\{isRefreshing \? <Loader2 className="w-4 h-4 animate-spin" \/> : <MoreHorizontal className="w-4 h-4" \/>\}\s*Force Sync\s*<\/button>\s*<\/div>/, replacement);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('done');
